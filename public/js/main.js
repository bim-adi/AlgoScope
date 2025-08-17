// public/js/main.js

// --- Global variables ---
let network = null;
let nodes = new vis.DataSet();
let edges = new vis.DataSet();

// --- Helper function to format graph data for vis.js ---
function formatDataForVis(graph) {
  const nodeIds = Object.keys(graph);
  const visNodes = nodeIds.map((id) => ({
    id: id,
    label: id,
    color: { background: "#97C2FC", border: "#2B7CE9" },
  }));

  const visEdges = [];
  const addedEdges = new Set();
  for (const node in graph) {
    graph[node].forEach((neighbor) => {
      // Ensure each edge is added only once (e.g., A-B not B-A)
      const edge1 = `${node}-${neighbor}`;
      const edge2 = `${neighbor}-${node}`;
      if (!addedEdges.has(edge1) && !addedEdges.has(edge2)) {
        visEdges.push({
          from: node,
          to: neighbor,
          color: { color: "#cccccc" },
        });
        addedEdges.add(edge1);
      }
    });
  }
  return { nodes: visNodes, edges: visEdges };
}

// --- Main function to draw the graph ---
function drawGraph() {
  const container = document.getElementById("mynetwork");
  const { nodes: visNodes, edges: visEdges } =
    formatDataForVis(graphDataFromServer);

  nodes.clear();
  edges.clear();
  nodes.add(visNodes);
  edges.add(visEdges);

  const data = { nodes, edges };
  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      arrows: {
        to: { enabled: false },
      },
    },
  };
  network = new vis.Network(container, data, options);
}

// --- Animation logic ---
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function visualizeAlgorithm(algorithm) {
  const startNode = document.getElementById("start-node").value;
  const logMessage = document.getElementById("log-message");
  const queueStackDisplay = document.getElementById("queue-stack-display");

  // Disable buttons during animation
  document.getElementById("bfs-btn").disabled = true;
  document.getElementById("dfs-btn").disabled = true;

  // Fetch the steps from our backend API
  const response = await fetch(`/api/${algorithm}/${startNode}`);
  const steps = await response.json();

  for (const step of steps) {
    logMessage.textContent = step.message;

    // Update queue/stack display
    if (step.queue) queueStackDisplay.textContent = JSON.stringify(step.queue);
    if (step.stack) queueStackDisplay.textContent = JSON.stringify(step.stack);

    // Update graph colors based on the step type
    switch (step.type) {
      case "visit":
      case "dequeue":
        nodes.update({
          id: step.node,
          color: { background: "#2ECC71", border: "#27AE60" },
        }); // Green for visited
        break;
      case "traverse":
        // Temporarily highlight the traversed edge
        const edgeId = network.getConnectedEdges(step.from).find((id) => {
          const edge = edges.get(id);
          return (
            (edge.from === step.from && edge.to === step.to) ||
            (edge.from === step.to && edge.to === step.from)
          );
        });
        if (edgeId) {
          edges.update({ id: edgeId, color: { color: "orange" }, width: 3 });
          await delay(300); // Keep it highlighted for a bit
          edges.update({ id: edgeId, color: { color: "#cccccc" }, width: 1 }); // Reset
        }
        break;
      case "revisit":
        nodes.update({
          id: step.node,
          color: { background: "#F1C40F", border: "#F39C12" },
        }); // Yellow for checking already visited
        await delay(300); // Keep it yellow for a bit
        nodes.update({
          id: step.node,
          color: { background: "#2ECC71", border: "#27AE60" },
        }); // Revert to green
        break;
    }

    await delay(800); // Pause between steps
  }

  // Re-enable buttons
  document.getElementById("bfs-btn").disabled = false;
  document.getElementById("dfs-btn").disabled = false;
}

// --- Event Listeners ---
document.addEventListener("DOMContentLoaded", () => {
  drawGraph();

  document.getElementById("bfs-btn").addEventListener("click", () => {
    drawGraph(); // Reset graph before starting
    visualizeAlgorithm("bfs");
  });

  document.getElementById("dfs-btn").addEventListener("click", () => {
    drawGraph(); // Reset graph before starting
    visualizeAlgorithm("dfs");
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    drawGraph();
    document.getElementById("log-message").textContent = "Ready to start...";
    document.getElementById("queue-stack-display").textContent = "[]";
  });
});

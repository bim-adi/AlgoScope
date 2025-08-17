// app.js

const express = require("express");
const app = express();
const PORT = 3000;

// --- Configuration ---
app.set("view engine", "ejs"); // Set EJS as the templating engine
app.use(express.static("public")); // Serve static files (CSS, client-side JS) from the 'public' directory

// --- Graph Data Structure (Adjacency List) ---
// This is the graph we will be visualizing.
const graph = {
    A: ["B", "C"],
    B: ["A", "D", "E"],
    C: ["A", "F"],
    D: ["B"],
    E: ["B", "F"],
    F: ["C", "E"],
};

// --- Algorithm Implementation (with step recording) ---

/**
 * Performs Breadth-FirCst Search and returns a list of steps for visualization.
 * @param {object} graph - The graph as an adjacency list.
 * @param {string} startNode - The node to start the search from.
 * @returns {Array} - An array of objects representing each step of the animation.
 */
function bfsWithSteps(graph, startNode) {
    const steps = [];
    const visited = new Set();
    const queue = [startNode];

    visited.add(startNode);
    steps.push({
        type: "visit",
        node: startNode,
        queue: [...queue],
        message: `Start at node ${startNode}. Add to queue.`,
    });

    while (queue.length > 0) {
        const node = queue.shift();
        steps.push({
            type: "dequeue",
            node: node,
            queue: [...queue],
            message: `Dequeue ${node} to explore its neighbors.`,
        });

        for (const neighbor of graph[node]) {
            steps.push({
                type: "traverse",
                from: node,
                to: neighbor,
                message: `Checking neighbor ${neighbor} of ${node}.`,
            });
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                steps.push({
                    type: "visit",
                    node: neighbor,
                    queue: [...queue],
                    message: `Node ${neighbor} is unvisited. Add to queue.`,
                });
            } else {
                steps.push({
                    type: "revisit",
                    node: neighbor,
                    message: `Node ${neighbor} has already been visited.`,
                });
            }
        }
    }
    steps.push({ type: "done", message: "BFS complete. Queue is empty." });
    return steps;
}

/**
 * Performs Depth-First Search (iterative) and returns a list of steps for visualization.
 * @param {object} graph - The graph as an adjacency list.
 * @param {string} startNode - The node to start the search from.
 * @returns {Array} - An array of objects representing each step of the animation.
 */
function dfsWithSteps(graph, startNode) {
    const steps = [];
    const visited = new Set();
    const stack = [startNode];

    while (stack.length > 0) {
        const node = stack.pop();

        if (!visited.has(node)) {
            visited.add(node);
            steps.push({
                type: "visit",
                node: node,
                stack: [...stack],
                message: `Visit node ${node} and mark as visited.`,
            });

            // We add neighbors to the stack. The loop is reversed to explore in alphabetical order (optional, but good for consistency)
            const neighbors = graph[node].slice().reverse();
            for (const neighbor of neighbors) {
                steps.push({
                    type: "traverse",
                    from: node,
                    to: neighbor,
                    message: `Checking neighbor ${neighbor} of ${node}.`,
                });
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                    steps.push({
                        type: "push",
                        node: neighbor,
                        stack: [...stack],
                        message: `Node ${neighbor} is unvisited. Push to stack.`,
                    });
                } else {
                    steps.push({
                        type: "revisit",
                        node: neighbor,
                        message: `Node ${neighbor} has already been visited.`,
                    });
                }
            }
        } else {
            steps.push({
                type: "revisit",
                node: node,
                stack: [...stack],
                message: `Node ${node} was already visited (popped from stack).`,
            });
        }
    }
    steps.push({ type: "done", message: "DFS complete. Stack is empty." });
    return steps;
}

// --- Routes ---

// Main route to render the page
app.get("/", (req, res) => {
    res.render("index", { graph: graph }); // Pass the graph data to the EJS template
});

// API route to get the BFS steps
app.get("/api/bfs/:startNode", (req, res) => {
    const { startNode } = req.params;
    if (!graph[startNode]) {
        return res.status(404).json({ error: "Start node not found in graph" });
    }
    const steps = bfsWithSteps(graph, startNode);
    res.json(steps);
});

// API route to get the DFS steps
app.get("/api/dfs/:startNode", (req, res) => {
    const { startNode } = req.params;
    if (!graph[startNode]) {
        return res.status(404).json({ error: "Start node not found in graph" });
    }
    const steps = dfsWithSteps(graph, startNode);
    res.json(steps);
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

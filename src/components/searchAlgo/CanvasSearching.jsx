import React, { useEffect, useRef, useState } from 'react'
import StatusDisplay from '../StatusDisplay'

export const CanvasSearching = ({ algorithm, vertex }) => {
  const containerRef = useRef(null)
  const networkRef = useRef(null)
  const nodesRef = useRef(null)
  const edgesRef = useRef(null)
  const [status, setStatus] = useState('select an algo to display progress...'); 

  // initialize network
  useEffect(() => {
    if (!window.vis || !containerRef.current) return
    const someNodes = [
      { id: 1, label: '1' },
      { id: 2, label: '2' },
      { id: 3, label: '3' },
      { id: 4, label: '4' },
      { id: 5, label: '5' },
      { id: 6, label: '6' },
      { id: 7, label: '7' },
      { id: 8, label: '8' },
      { id: 9, label: '9' },
      { id: 10, label: '10' },
      { id: 11, label: '11' },
      { id: 12, label: '12' },
      { id: 13, label: '13' },
      { id: 14, label: '14' },
      { id: 15, label: '15' },
    ]
    const nodes = new window.vis.DataSet(someNodes)
    // const length = someNodes.length
    const edges = new window.vis.DataSet([
      // Main chain (like a backbone)
      { id: 1, from: 1, to: 2 },
      { id: 2, from: 2, to: 3 },
      { id: 3, from: 3, to: 4 },
      { id: 4, from: 4, to: 5 },
      { id: 5, from: 5, to: 6 },
      { id: 6, from: 6, to: 7 },

      // Branches from the main chain
      { id: 7, from: 2, to: 8 },
      { id: 8, from: 3, to: 9 },
      { id: 9, from: 5, to: 10 },
      { id: 10, from: 6, to: 11 },
      { id: 11, from: 4, to: 12 },

      // Sub-branches
      { id: 12, from: 8, to: 13 },
      { id: 13, from: 9, to: 14 },
      { id: 14, from: 10, to: 15 },

      // Light cross-connections (for reachability, not clutter)
      { id: 15, from: 7, to: 11 },
      { id: 16, from: 9, to: 5 },
      { id: 17, from: 10, to: 6 },
      { id: 18, from: 8, to: 4 },
      { id: 19, from: 3, to: 12 },
      { id: 20, from: 2, to: 1 },
    ])

    const data = { nodes, edges }

    const options = {
      physics: {
        enabled: false,
        stabilization: {
          enabled: true,
          iterations: 100,
          updateInterval: 25,
        },
      },
      nodes: {
        shape: 'dot',
        size: 15,
        color: {
          background: '#D92C54',
          border: '#000000',
          highlight: { background: '#8ABB6C', border: '#000000' },
        },
        font: {
          size: 20,
          color: '#3E3F29',
          face: 'Arial',
          bold: true,
        },
        borderWidth: 2,
        shadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.3)',
          size: 5,
          x: 5,
          y: 5,
        },
      },
      edges: {
        arrows: { to: { enabled: true, scaleFactor: 1.0 } },
        color: {
          color: '#000000',
          highlight: '#8ABB6C',
          hover: '#8ABB6C',
        },
        width: 3,
        smooth: {
          type: 'curvedCW',
          roundness: 0.0,
        },
        shadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.3)',
          size: 10,
          x: 5,
          y: 5,
        },
      },
      interaction: {
        hover: true,
        tooltipDelay: 200,
      },
    }

    const network = new window.vis.Network(containerRef.current, data, options)

    nodesRef.current = nodes
    edgesRef.current = edges
    networkRef.current = network

    return () => {
      network.destroy()
    }
  }, [])

  // Reset nodes to default color with smooth transition
  const resetNodes = () => {
    if (nodesRef.current) {
      nodesRef.current.get().forEach((n) => {
        nodesRef.current.update({
          id: n.id,
          color: {
            background: '#D92C54',
            border: '#000000',
          },
          size: 15,
        })
      })
    }
    if (edgesRef.current) {
      edgesRef.current.get().forEach((e) => {
        edgesRef.current.update({
          id: e.id,
          color: { color: '#000000' },
          width: 3,
        })
      })
    }
  }

  // Reset nodes when algorithm or vertex changes
  useEffect(() => {
    resetNodes()
  }, [algorithm, vertex])

  // animate algorithm with enhanced visual effects
  useEffect(() => {
    if (!algorithm || !vertex || !nodesRef.current || !edgesRef.current) return

    const nodes = nodesRef.current
    const edges = edgesRef.current

    // reset all nodes to default color before starting
    nodes.get().forEach((n) =>
      nodes.update({
        id: n.id,
        color: { background: '#cccccc', border: '#000000' },
        size: 25,
      })
    )

    const adjacency = {}
    edges.get().forEach((e) => {
      if (!adjacency[e.from]) adjacency[e.from] = []
      adjacency[e.from].push(e.to)
    })

    const timers = []
    const visit = (id, delay) => {
      const t = setTimeout(() => {
        // Animate node size and color
        nodes.update({
          id,
          color: { background: '#ff4136', border: '#000000' },
          size: 35,
        })
        console.log(`node ${id} is visited.`);
        setStatus(`node ${id} is visited.`);
        // Add pulsing effect
        setTimeout(() => {
          nodes.update({ id, size: 30 })
        }, 200)
      }, delay)
      timers.push(t)
    }

    const markCompleted = (completionDelay) => {
      const t = setTimeout(() => {
        // Show completion by changing all visited nodes to green with animation
        nodes.get().forEach((n) => {
          if (n.color.background === '#ff4136') {
            nodes.update({
              id: n.id,
              color: { background: '#8ABB6C', border: '#000000' },
              size: 28,
            })
          }
        })
      }, completionDelay)
      timers.push(t)
    }

    if (algorithm === 'bfs') {
      let queue = [parseInt(vertex)]
      let visited = new Set([parseInt(vertex)])
      let delay = 0

      while (queue.length) {
        let node = queue.shift()
        visit(node, delay)
        delay += 1200
        // console.log(`${node} node has been visited.`)
        ;(adjacency[node] || []).forEach((n) => {
          // Animate edges to neighbors
          if (!visited.has(n)) {
            visited.add(n)
            queue.push(n)

            // Highlight edge
            const edge = edges.get().find((e) => e.from === node && e.to === n)
            if (edge) {
              setTimeout(() => {
                edges.update({
                  id: edge.id,
                  color: { color: '#8ABB6C' },
                  width: 5,
                })
              }, delay - 200)
            }
          }
        })
      }

      // Mark completion
      markCompleted(delay + 500)
    }

    if (algorithm === 'dfs') {
      let visited = new Set()
      let delay = 0

      const dfs = (node) => {
        if (visited.has(node)) return
        visited.add(node)
        visit(node, delay)
        delay += 1200
        // Animate edges to neighbors
        ;(adjacency[node] || []).forEach((n) => {
          if (!visited.has(n)) {
            const edge = edges.get().find((e) => e.from === node && e.to === n)
            if (edge) {
              setTimeout(() => {
                edges.update({
                  id: edge.id,
                  color: { color: '#8ABB6C' },
                  width: 5,
                })
              }, delay - 200)
            }
            dfs(n)
          }
        })
      }

      dfs(parseInt(vertex))

      // Mark completion
      markCompleted(delay + 500)
    }

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [algorithm, vertex])

  return (
    <>
      <div
        id="cy"
        ref={containerRef}
        className="h-[600px] m-8 rounded-lg border-2 border-stone-500 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg md:w-auto lg:w-auto xl:w-auto 2xl:w-auto"
        style={{
          background: 'linear-gradient(135deg, #DDDEAB 0%, #fefce8 100%)',
        }}
      />
      <StatusDisplay message={status}/>
    </>
  )
}

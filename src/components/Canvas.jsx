import React, { useEffect, useRef } from 'react'

export const Canvas = ({ algorithm }) => {
    const containerRef = useRef(null)
    const networkRef = useRef(null)
    const nodesRef = useRef(null)
    const edgesRef = useRef(null)

    // initialize network
    useEffect(() => {
        if (!window.vis || !containerRef.current) return

        const nodes = new window.vis.DataSet([
            { id: 1, label: 'Node 1' },
            { id: 2, label: 'Node 2' },
            { id: 3, label: 'Node 3' },
            { id: 4, label: 'Node 4' },
            { id: 5, label: 'Node 5' },
            { id: 6, label: 'Node 6' },
        ])

        const edges = new window.vis.DataSet([
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
            { from: 4, to: 5 },
            { from: 5, to: 1 },
            { from: 6, to: 1 },
            { from: 6, to: 2 },
            { from: 6, to: 3 },
            { from: 6, to: 4 },
            { from: 6, to: 5 },
        ])

        const data = { nodes, edges }

        const options = {
            physics: { enabled: true },
            nodes: { shape: 'dot', size: 20, font: { size: 14, color: '#000' } },
            edges: { arrows: { to: false }, color: { inherit: 'from' } }
        }

        const network = new window.vis.Network(containerRef.current, data, options)

        nodesRef.current = nodes
        edgesRef.current = edges
        networkRef.current = network

        return () => {
            network.destroy()
        }
    }, [])

    // animate algorithm
    useEffect(() => {
        if (!algorithm || !nodesRef.current || !edgesRef.current) return

        const nodes = nodesRef.current
        const edges = edgesRef.current

        // reset all nodes to gray before starting
        nodes.get().forEach(n => nodes.update({ id: n.id, color: { background: '#cccccc' } }))

        const adjacency = {}
        edges.get().forEach(e => {
            if (!adjacency[e.from]) adjacency[e.from] = []
            adjacency[e.from].push(e.to)
        })

        const timers = []
        const visit = (id, delay) => {
            const t = setTimeout(() => {
                nodes.update({ id, color: { background: '#ff4136' } })
            }, delay)
            timers.push(t)
        }

        if (algorithm === "bfs") {
            let queue = [1]
            let visited = new Set([1])
            let delay = 0

            while (queue.length) {
                let node = queue.shift()
                visit(node, delay)
                delay += 1000;
                (adjacency[node] || []).forEach(n => {
                    if (!visited.has(n)) {
                        visited.add(n)
                        queue.push(n)
                    }
                })
            }
        }

        if (algorithm === "dfs") {
            let visited = new Set()
            let delay = 0

            const dfs = (node) => {
                if (visited.has(node)) return
                visited.add(node)
                visit(node, delay)
                delay += 1000;
                (adjacency[node] || []).forEach(n => dfs(n))
            }

            dfs(1)
        }

        return () => {
            timers.forEach(clearTimeout)
        }
    }, [algorithm])

    return (
        <div
            id="cy"
            ref={containerRef}
            className="w-[800px] h-[400px] m-8 rounded-lg border border-gray-200 bg-stone-300"
        />
    )
}
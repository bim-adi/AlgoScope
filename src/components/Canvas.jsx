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
            { id: 1, label: '1' },
            { id: 2, label: '2' },
            { id: 3, label: '3' },
            { id: 4, label: '4' },
            { id: 5, label: '5' },
            { id: 6, label: '6' },
            { id: 7, label: '7' },
            { id: 8, label: '8' },
            { id: 9, label: '9' },
        ])

        const edges = new window.vis.DataSet([
            { from: 2, to: 1 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
            { from: 4, to: 5 },
            { from: 1, to: 5 },
            { from: 6, to: 1 },
            { from: 6, to: 2 },
            { from: 6, to: 3 },
            { from: 4, to: 6 },
            { from: 6, to: 5 },
            { from: 5, to: 9 },
            { from: 9, to: 8 },
            { from: 8, to: 7 },
            { from: 7, to: 9 },
            { from: 7, to: 2 },
        ])

        const data = { nodes, edges }

        const options = {
            physics: { enabled: true },
            nodes: { shape: 'dot', size: 20, color: "#C562AF", font: { size: 14, color: '#3338A0' } },
            edges: { arrows: { to: true }, color: { inherit: 'from' } }
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
            className="h-[600px] m-8 rounded-lg border border-stone-500 bg-stone-300 md:w-auto lg:w-auto xl:w-auto 2xl:w-auto"
        />
    )
}
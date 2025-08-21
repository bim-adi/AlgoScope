import React, { useEffect, useRef } from 'react'

export const CanvasSearching= ({ algorithm, vertex }) => {
    // const [vert, setNode] = useState(null)

    const containerRef = useRef(null)
    const networkRef = useRef(null)
    const nodesRef = useRef(null)
    const edgesRef = useRef(null)

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
            // { id: 10, label: '10' },
            // { id: 11, label: '11' },
            // { id: 12, label: '12' },
            // { id: 13, label: '13' },
            // { id: 14, label: '14' }
        ]
        const nodes = new window.vis.DataSet(someNodes)
        // const length = someNodes.length
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

        // const edges = new window.vis.DataSet([
        //   // Outer hexagon ring
        //   { from: 1, to: 2 },
        //   { from: 2, to: 3 },
        //   { from: 3, to: 4 },
        //   { from: 4, to: 5 },
        //   { from: 5, to: 6 },
        //   { from: 6, to: 1 },

        //   // Inner diamond (7–10)
        //   { from: 7, to: 8 },
        //   { from: 8, to: 9 },
        //   { from: 9, to: 10 },
        //   { from: 10, to: 7 },

        //   // Connect inner diamond to outer hexagon
        //   { from: 7, to: 1 },
        //   { from: 8, to: 3 },
        //   { from: 9, to: 5 },
        //   { from: 10, to: 6 },

        //   // Spokes with remaining nodes (11–14)
        //   { from: 11, to: 2 },
        //   { from: 12, to: 4 },
        //   { from: 13, to: 6 },
        //   { from: 14, to: 1 },

        //   // Extra cross-connections for symmetry
        //   { from: 11, to: 9 },
        //   { from: 12, to: 8 },
        //   { from: 13, to: 10 },
        //   { from: 14, to: 7 }
        // ])

        const data = { nodes, edges }

        const options = {
            physics: { enabled: true },
            nodes: {
                shape: 'dot',
                size: 20,
                color: '#000000',
                font: { size: 14, color: '#3338A0' }
            },
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

    // Reset nodes to default color
    const resetNodes = () => {
        if (nodesRef.current) {
            nodesRef.current.get().forEach(n => {
                nodesRef.current.update({ id: n.id, color: { background: '#C562AF' } })
            })
        }
    }

    // Reset nodes when algorithm or vertex changes
    useEffect(() => {
        resetNodes()
    }, [algorithm, vertex])

    // animate algorithm
    useEffect(() => {
        if (!algorithm || !vertex || !nodesRef.current || !edgesRef.current) return

        const nodes = nodesRef.current
        const edges = edgesRef.current

        // reset all nodes to gray before starting
        nodes
            .get()
            .forEach(n =>
                nodes.update({ id: n.id, color: { background: '#cccccc' } })
            )

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

        const markCompleted = delay => {
            const t = setTimeout(() => {
                // Show completion by changing all visited nodes to green
                nodes.get().forEach(n => {
                    if (n.color.background === '#ff4136') {
                        nodes.update({ id: n.id, color: { background: '#2ecc40' } })
                    }
                })
            }, delay)
            timers.push(t)
        }

        if (algorithm === 'bfs') {
            let queue = [parseInt(vertex)]
            let visited = new Set([parseInt(vertex)])
            let delay = 0

            while (queue.length) {
                let node = queue.shift()
                visit(node, delay)
                delay += 1000
                    ; (adjacency[node] || []).forEach(n => {
                        if (!visited.has(n)) {
                            visited.add(n)
                            queue.push(n)
                        }
                    })
            }

            // Mark completion
            markCompleted(delay + 500)
        }

        if (algorithm === 'dfs') {
            let visited = new Set()
            let delay = 0

            const dfs = node => {
                if (visited.has(node)) return
                visited.add(node)
                visit(node, delay)
                delay += 1000
                    ; (adjacency[node] || []).forEach(n => dfs(n))
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
        <div
            id='cy'
            ref={containerRef}
            className='h-[600px] m-8 rounded-lg border border-stone-500 bg-yellow-100 md:w-auto lg:w-auto xl:w-auto 2xl:w-auto'
        />
    )
}

import React, { useEffect, useRef } from 'react'

export const CanvasShortestPath = ({ algorithm, source, target }) => {
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
        ]

        const nodes = new window.vis.DataSet(someNodes)

        // Weighted, directed sample graph (no negative cycles)
        const edges = new window.vis.DataSet([
            { from: 1, to: 2, label: '2', weight: 2 },
            { from: 1, to: 3, label: '4', weight: 4 },
            { from: 2, to: 3, label: '1', weight: 1 },
            { from: 2, to: 4, label: '7', weight: 7 },
            { from: 3, to: 5, label: '3', weight: 3 },
            { from: 4, to: 6, label: '1', weight: 1 },
            { from: 5, to: 4, label: '2', weight: 2 },
            { from: 5, to: 6, label: '5', weight: 5 },
            { from: 6, to: 7, label: '2', weight: 2 },
            { from: 7, to: 8, label: '1', weight: 1 },
            { from: 8, to: 9, label: '4', weight: 4 },
            { from: 3, to: 9, label: '12', weight: 12 },
            // small negative edge but no negative cycle for Bellman-Ford
            { from: 4, to: 3, label: '-1', weight: -1 },
        ])

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

    const resetStyles = () => {
        if (!nodesRef.current || !edgesRef.current) return
        nodesRef.current.get().forEach(n => {
            nodesRef.current.update({ id: n.id, color: { background: '#C562AF' } })
        })
        edgesRef.current.get().forEach(e => {
            edgesRef.current.update({ id: e.id, color: undefined })
        })
    }

    useEffect(() => {
        // reset on inputs change
        resetStyles()
    }, [algorithm, source, target])

    // Run and animate shortest path
    useEffect(() => {
        if (!algorithm || !source || !target) return
        if (!nodesRef.current || !edgesRef.current) return

        const nodes = nodesRef.current
        const edges = edgesRef.current
        const nodeIds = nodes.get().map(n => n.id)

        // Build adjacency list with weights for directed graph
        /** @type {Record<number, Array<{to:number, w:number, edgeId:any}>>} */
        const adj = {}
        nodeIds.forEach(id => { adj[id] = [] })
        edges.get().forEach(e => {
            const edgeId = e.id
            const w = typeof e.weight === 'number' ? e.weight : parseFloat(e.label ?? '1')
            if (!Number.isFinite(w)) return
            if (!adj[e.from]) adj[e.from] = []
            adj[e.from].push({ to: e.to, w, edgeId })
        })

        const src = parseInt(source)
        const dst = parseInt(target)

        const timers = []
        const visitLaterNode = (id, delay) => {
            const t = setTimeout(() => {
                nodes.update({ id, color: { background: '#ff4136' } })
            }, delay)
            timers.push(t)
        }
        const visitLaterEdge = (edgeId, delay) => {
            const t = setTimeout(() => {
                edges.update({ id: edgeId, color: { color: '#ff4136' } })
            }, delay)
            timers.push(t)
        }

        const reconstructAndAnimatePath = (parent) => {
            const pathNodes = []
            const pathEdges = []
            let cur = dst
            if (parent[cur] == null) return // unreachable
            while (cur != null && cur !== src) {
                const prev = parent[cur]
                if (prev == null) break
                pathNodes.push(cur)
                // find edge from prev->cur to color it
                const e = (adj[prev] || []).find(x => x.to === cur)
                if (e) pathEdges.push(e.edgeId)
                cur = prev
            }
            pathNodes.push(src)
            pathNodes.reverse()
            pathEdges.reverse()

            let delay = 0
            pathNodes.forEach((n) => {
                visitLaterNode(n, delay)
                delay += 700
            })
            pathEdges.forEach((eId) => {
                visitLaterEdge(eId, delay)
                delay += 200
            })
        }

        const runDijkstra = () => {
            const dist = {}
            const parent = {}
            const used = new Set()
            nodeIds.forEach(id => { dist[id] = Infinity; parent[id] = null })
            dist[src] = 0

            while (used.size < nodeIds.length) {
                let u = null
                let best = Infinity
                for (const id of nodeIds) {
                    if (used.has(id)) continue
                    if (dist[id] < best) { best = dist[id]; u = id }
                }
                if (u == null || best === Infinity) break
                used.add(u)
                for (const { to, w } of adj[u] || []) {
                    if (dist[u] + w < dist[to]) {
                        dist[to] = dist[u] + w
                        parent[to] = u
                    }
                }
            }
            reconstructAndAnimatePath(parent)
        }

        const runBellmanFord = () => {
            const dist = {}
            const parent = {}
            nodeIds.forEach(id => { dist[id] = Infinity; parent[id] = null })
            dist[src] = 0
            const edgeList = []
            edges.get().forEach(e => {
                const w = typeof e.weight === 'number' ? e.weight : parseFloat(e.label ?? '1')
                if (Number.isFinite(w)) edgeList.push({ from: e.from, to: e.to, w })
            })
            for (let i = 0; i < nodeIds.length - 1; i++) {
                let changed = false
                for (const { from, to, w } of edgeList) {
                    if (dist[from] !== Infinity && dist[from] + w < dist[to]) {
                        dist[to] = dist[from] + w
                        parent[to] = from
                        changed = true
                    }
                }
                if (!changed) break
            }
            reconstructAndAnimatePath(parent)
        }

        const runFloydWarshall = () => {
            const n = nodeIds.length
            const idxOf = new Map(nodeIds.map((id, i) => [id, i]))
            const dist = Array.from({ length: n }, () => Array(n).fill(Infinity))
            const next = Array.from({ length: n }, () => Array(n).fill(null))

            for (let i = 0; i < n; i++) {
                dist[i][i] = 0
            }
            edges.get().forEach(e => {
                const i = idxOf.get(e.from)
                const j = idxOf.get(e.to)
                const w = typeof e.weight === 'number' ? e.weight : parseFloat(e.label ?? '1')
                if (!Number.isFinite(w)) return
                if (w < dist[i][j]) {
                    dist[i][j] = w
                    next[i][j] = e.to
                }
            })

            for (let k = 0; k < n; k++) {
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                        if (dist[i][k] + dist[k][j] < dist[i][j]) {
                            dist[i][j] = dist[i][k] + dist[k][j]
                            next[i][j] = next[i][k]
                        }
                    }
                }
            }

            const buildParentFromNext = () => {
                const parent = {}
                const i = idxOf.get(src)
                const j = idxOf.get(dst)
                if (next[i][j] == null) return parent
                let u = src
                while (u !== dst) {
                    const v = next[idxOf.get(u)][j]
                    if (v == null) break
                    parent[v] = u
                    u = v
                }
                return parent
            }

            const parent = buildParentFromNext()
            reconstructAndAnimatePath(parent)
        }

        if (algorithm === 'dijkstra') runDijkstra()
        if (algorithm === 'bellmanford') runBellmanFord()
        if (algorithm === 'floydwarshall') runFloydWarshall()

        return () => { timers.forEach(clearTimeout) }
    }, [algorithm, source, target])

    return (
        <div
            id='cy-sp'
            ref={containerRef}
            className='h-[600px] m-8 rounded-lg border border-stone-500 bg-yellow-100 md:w-auto lg:w-auto xl:w-auto 2xl:w-auto'
        />
    )
}
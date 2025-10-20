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
            physics: { 
                enabled: false,
                stabilization: {
                    enabled: true,
                    iterations: 100,
                    updateInterval: 25
                }
            },
            nodes: {
                shape: 'dot',
                size: 25,
                color: { 
                    background: '#D92C54',
                    border: '#000000',
                    highlight: { background: '#8ABB6C', border: '#000000' }
                },
                font: { 
                    size: 16, 
                    color: '#3E3F29',
                    face: 'Arial',
                    bold: true
                },
                borderWidth: 3,
                shadow: {
                    enabled: true,
                    color: 'rgba(0,0,0,0.3)',
                    size: 10,
                    x: 5,
                    y: 5
                }
            },
            edges: { 
                arrows: { to: { enabled: true, scaleFactor: 0.8 } }, 
                color: { 
                    color: '#000000',
                    highlight: '#8ABB6C',
                    hover: '#8ABB6C'
                },
                width: 3,
                smooth: {
                    type: 'curvedCW',
                    roundness: 0.0
                },
                shadow: {
                    enabled: true,
                    color: 'rgba(0,0,0,0.3)',
                    size: 10,
                    x: 5,
                    y: 5
                },
                font: {
                    size: 14,
                    color: '#000000',
                    face: 'Arial',
                    bold: true,
                    align: 'middle'
                }
            },
            interaction: {
                hover: true,
                tooltipDelay: 200
            }
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
            nodesRef.current.update({ 
                id: n.id, 
                color: { background: '#D92C54', border: '#000000' },
                size: 25
            })
        })
        edgesRef.current.get().forEach(e => {
            edgesRef.current.update({ 
                id: e.id, 
                color: { color: '#000000' },
                width: 3
            })
        })
    }

    useEffect(() => {
        // reset on inputs change
        resetStyles()
    }, [algorithm, source, target])

    // Run and animate shortest path with enhanced visual effects
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
                // Animate node with size and color change
                nodes.update({ 
                    id, 
                    color: { background: '#ff4136', border: '#000000' },
                    size: 35
                })
                
                // Add pulsing effect
                setTimeout(() => {
                    nodes.update({ id, size: 30 })
                }, 300)
            }, delay)
            timers.push(t)
        }
        
        const visitLaterEdge = (edgeId, delay) => {
            const t = setTimeout(() => {
                // Animate edge with color and width change
                edges.update({ 
                    id: edgeId, 
                    color: { color: '#8ABB6C' },
                    width: 6
                })
                
                // Add pulsing effect
                setTimeout(() => {
                    edges.update({ id: edgeId, width: 5 })
                }, 200)
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
            // Animate path nodes with staggered timing
            pathNodes.forEach((n, index) => {
                visitLaterNode(n, delay)
                delay += 800
                
                // Add connection line animation
                if (index < pathEdges.length) {
                    visitLaterEdge(pathEdges[index], delay - 200)
                }
            })
            
            // Final completion animation
            setTimeout(() => {
                pathNodes.forEach(n => {
                    nodes.update({ 
                        id: n, 
                        color: { background: '#8ABB6C', border: '#000000' },
                        size: 28
                    })
                })
                pathEdges.forEach(eId => {
                    edges.update({ 
                        id: eId, 
                        color: { color: '#8ABB6C' },
                        width: 5
                    })
                })
            }, delay + 500)
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
            className='h-[600px] m-8 rounded-lg border-2 border-stone-500 shadow-lg md:w-auto lg:w-auto xl:w-auto 2xl:w-auto'
            style={{
                background: 'linear-gradient(135deg, #DDDEAB 0%, #fefce8 100%)'
            }}
        />
    )
}
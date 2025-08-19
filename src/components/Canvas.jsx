import React, { useEffect, useRef } from 'react'

export const Canvas = () => {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!window.vis || !containerRef.current) return

        const nodes = new window.vis.DataSet([
            { id: 1, label: 'Node 1' },
            { id: 2, label: 'Node 2' },
            { id: 3, label: 'Node 3' },
            { id: 4, label: 'Node 4' },
            { id: 5, label: 'Node 5' },
        ])

        const edges = new window.vis.DataSet([
            { from: 1, to: 3 },
            { from: 1, to: 2 },
            { from: 2, to: 4 },
            { from: 2, to: 5 },
            { from: 3, to: 3 },
        ])

        const data = { nodes, edges }

        const options = {
            physics: {
                enabled: true,
                barnesHut: {
                    gravitationalConstant: -2000,
                    centralGravity: 0.1,
                    springLength: 95,
                    springConstant: 0.04,
                    damping: 0.09,
                    avoidOverlap: 0,
                },
            },
            nodes: {
                shape: 'dot',
                size: 15,
                font: { size: 12, color: '#000000' },
            },
            edges: {
                width: 1,
                color: { inherit: 'from' },
            },
        }

        const network = new window.vis.Network(containerRef.current, data, options)

        return () => {
            network.destroy()
        }
    }, [])

    return (
        <div
            id="cy"
            ref={containerRef}
            className="w-full h-[400px] m-8 rounded-lg border border-gray-200 bg-white"
        />
    )
}
import React from 'react'
import { Link } from 'react-router-dom'
import { ShortestPathPage } from './shortestPahAlgo/ShortestPathPage'
import AlgoCard from './AlgoCard'
import SortingImg from '../assets/Picture1.png'
import SearchingImg from '../assets/bfs_dfs.png'
import LinearSearchImg from '../assets/new-arr.png'
import GraphAlgoImg from '../assets/graph.png'

export const Home = () => {
    return (
        <div className="w-full px-8 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-semibold mb-4">Welcome to AlgoScope</h1>
                <p className="text-slate-700 mb-6">Choose a module to explore:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AlgoCard
                    title="Sorting Algorithms"
                    description="Bubble, Merge, Quick, Heap Sort, etc."
                    color="bg-blue-100"
                    link="/sort"
                    time={0.7}
                    image={SortingImg}
                />
                <AlgoCard
                    title="Searching Algorithms"
                    description="BFS, DFS..."
                    color="bg-green-100"
                    link="/search"
                    time={0.8}
                    image={SearchingImg}
                />
                <AlgoCard
                    title="Graph Algorithms"
                    description="Dijkstra, Floyd-Warshall, Topological Sort..."
                    color="bg-pink-100"
                    link="/spath"
                    time={0.9}
                    image={GraphAlgoImg}
                />
                <AlgoCard
                    title="Array Searching"
                    description="Linear Search, Binary Search..."
                    color="bg-purple-100"
                    link="/ldssearch"
                    time={1}
                    image={LinearSearchImg}
                />
            </div>
            </div>
        </div>
    )
}

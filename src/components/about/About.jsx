import React from 'react'
import AuthorCard from './AuthorCard'
import FeatureCard from './FeatureCard'
import { motion } from 'framer-motion'

export default function AboutAlgoScope() {
  const features = [
    {
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: 'Real-time Visualization',
      description:
        'Watch algorithms come alive with smooth, step-by-step animations',
      gradient: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
      title: 'Adjustable Speed',
      description: 'Control animation speed to learn at your own pace',
      gradient: 'bg-gradient-to-br from-green-400 to-emerald-500',
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: 'Multiple Algorithms',
      description: 'Explore sorting, searching, and graph algorithms',
      gradient: 'bg-gradient-to-br from-blue-400 to-cyan-500',
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      title: 'Clean Code View',
      description: 'See implementation in multiple programming languages',
      gradient: 'bg-gradient-to-br from-purple-400 to-pink-500',
    },
  ]

  return (
    <motion.div
      className="flex flex-col gap-4 p-4"
      initial={{ opacity: 0, y: 20 }} // Start: invisible and 20px down
      animate={{ opacity: 1, y: 0 }} // End: fully visible at original position
      transition={{ duration: 1, ease: 'easeInOut' }} // Animation settings
    >
      {/* Hero Section */}
      <div className="max-w-6xl m-auto text-center py-12"></div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40">
          {/* About Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-800">
                About AlgoScope
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                AlgoScope is an interactive web application built to help
                learners visualize algorithms in an intuitive and engaging way.
                Whether you're a beginner exploring how sorting works or an
                advanced student analyzing graph traversal, AlgoScope transforms
                abstract code into dynamic, step-by-step animations that make
                complex logic easier to grasp.
              </p>
              <p>
                Our goal is simple — to make Data Structures and Algorithms
                (DSA) learning more visual, hands-on, and fun. Instead of
                reading static pseudocode, users can watch how each algorithm
                behaves in real time, adjust input data, and compare performance
                across different techniques.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-800">✨ Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* Vision Section */}
          <div className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-800">
                👩‍💻 Our Vision
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Learning algorithms shouldn't be about memorizing code — it should
              be about understanding how they work. AlgoScope bridges that gap
              by turning logic into motion, empowering learners to see the flow
              behind every operation.
            </p>
          </div>

          {/* Team Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-800">
                🚀 Meet The Team
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AuthorCard
                name="Aditya Paul"
                role="Full Stack Developer"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                github="https://github.com"
                linkedin="https://linkedin.com"
                description="Passionate about creating interactive learning experiences and building scalable web applications."
              />
              <AuthorCard
                name="Bratik Mukherjee"
                role="Frontend Developer"
                image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
                github="https://github.com"
                linkedin="https://linkedin.com"
                description="Specializing in UI/UX design and algorithm visualization with modern web technologies."
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

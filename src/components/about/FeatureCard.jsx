export default function FeatureCard({ icon, title, description, gradient }) {
  return (
    <div className="group relative">
      <div
        className={`absolute inset-0 ${gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
      ></div>
      <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/40 hover:border-white/60 transition-all duration-300 h-full">
        <div
          className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

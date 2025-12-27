export default function FeatureCard({ icon, title, description, gradient }) {
  return (
    <div className="group relative h-full">
      <div
        className={`absolute inset-0 ${gradient} rounded-2xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
      ></div>
      <div className="relative bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
        <div
          className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg shrink-0`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

import React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
//
// export default function SpeedSlider({ value, onChange, min = 0.5, max = 3, step = 0.1 }) {
//   return (
//     <Box sx={{ width: 300 }}>
//       <Slider
//         value={value}
//         onChange={onChange}
//         valueLabelDisplay="auto"
//         step={step}
//         marks
//         min={min}
//         max={max}
//       />
//       <p>Speed: {value.toFixed(1)}x</p>
//     </Box>
//   );
// }

// Define the gradient
const sliderGradient = 'linear-gradient(to right, #22d3ee, #3b82f6)' // cyan-400 to blue-500

export default function SpeedSlider({
  value,
  onChange,
  min = 0.5,
  max = 3,
  step = 0.1,
}) {
  return (
    <Box
      sx={{
        // 1. "Glassmorphism" container
        background: 'rgba(15, 23, 42, 0.6)', // slate-900/60
        backdropFilter: 'blur(10px)',
        borderRadius: '16px', // rounded-2xl
        padding: '24px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        width: '100%',
      }}
    >
      <Slider
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
        step={step}
        marks
        min={min}
        max={max}
        // 2. Custom styling for the slider itself
        sx={{
          height: 8,
          '& .MuiSlider-track': {
            border: 'none',
            // 3. The sexy gradient track
            background: sliderGradient,
          },
          '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#0f172a', // slate-900
            border: '2px solid #22d3ee', // cyan-400
            // 4. The "glow" effect on hover/focus
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
              boxShadow: '0 0 0 8px rgba(34, 211, 238, 0.15)', // cyan-400 with 15% opacity
            },
            '&:before': {
              display: 'none', // Removes default Mui ripple
            },
          },
          '& .MuiSlider-valueLabel': {
            // 5. Styled tooltip
            background: '#0f172a', // slate-900
            border: '1px solid #334155', // slate-700
            borderRadius: '8px',
            padding: '4px 8px',
            color: '#22d3ee', // cyan-400
          },
          '& .MuiSlider-rail': {
            opacity: 0.3,
            backgroundColor: '#94a3b8', // slate-400
          },
          '& .MuiSlider-mark': {
            backgroundColor: '#94a3b8',
            opacity: 0.5,
          }
        }}
      />
      {/* 6. Styled text below */}
      <p className="text-center text-cyan-400 font-mono text-sm mt-2 font-bold tracking-wide">
        SPEED: {value.toFixed(1)}x
      </p>
    </Box>
  )
}

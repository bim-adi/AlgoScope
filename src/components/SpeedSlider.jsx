// import React from 'react';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
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

import React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

// Define the gradient
const sliderGradient = 'linear-gradient(to right, #38bdf8, #818cf8)' // sky-400 to indigo-300

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
        width: 300,
        // 1. "Glassmorphism" container
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px', // rounded-2xl
        padding: '24px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
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
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            // 4. The "glow" effect on hover/focus
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
              boxShadow: '0 0 0 8px rgba(56, 189, 248, 0.25)', // sky-400 with 25% opacity
            },
            '&:before': {
              display: 'none', // Removes default Mui ripple
            },
          },
          '& .MuiSlider-valueLabel': {
            // 5. Styled tooltip
            background: '#1e293b', // slate-800
            borderRadius: '8px',
            padding: '4px 8px',
          },
          '& .MuiSlider-rail': {
            opacity: 0.5,
            backgroundColor: '#374151', // gray-700
          },
        }}
      />
      {/* 6. Styled text below */}
      <p className="text-center text-blue-500 font-medium mt-2">
        Speed: {value.toFixed(1)}x
      </p>
    </Box>
  )
}

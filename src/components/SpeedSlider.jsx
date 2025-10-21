import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function SpeedSlider({ value, onChange, min = 0.5, max = 3, step = 0.1 }) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
        step={step}
        marks
        min={min}
        max={max}
      />
      <p>Speed: {value.toFixed(1)}x</p>
    </Box>
  );
}

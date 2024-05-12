import React, { useState } from 'react';
import Slider, { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';

interface CustomSliderProps extends SliderProps<number | number[]> {
  onChange?: (val: number | number[]) => void; // Update onChange prop type
}

const marks = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10+',
};

const CustomSlider: React.FC<CustomSliderProps> = ({ onChange, ...rest }) => {
  // State to hold the slider value
  const [sliderValue, setSliderValue] = useState<number | number[]>(6);

  // Function to handle slider value change
  const handleSliderChange = (value: number | number[]) => {
    // Update the slider value state
    setSliderValue(value);

    // Call the onChange prop if provided
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Slider
      min={0}
      max={10}
      marks={marks}
      value={sliderValue}
      step={1}
      onChange={handleSliderChange}
      {...rest}
    />
  );
};

export default CustomSlider;
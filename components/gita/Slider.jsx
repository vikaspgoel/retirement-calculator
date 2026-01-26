import { useMemo } from 'react';

export default function Slider({ 
  label, 
  prompt, 
  value, 
  onChange, 
  min = 1, 
  max = 10,
  lowLabel,
  highLabel 
}) {
  const percentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-medium text-earth-800">{label}</label>
        <span className="text-lg font-semibold text-saffron-600">{value}</span>
      </div>
      
      <p className="text-sm text-earth-600 italic">{prompt}</p>
      
      <div className="relative pt-1">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-track w-full"
          style={{
            background: `linear-gradient(to right, #ed7412 0%, #ed7412 ${percentage}%, #e0d4c5 ${percentage}%, #e0d4c5 100%)`
          }}
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-earth-500">{lowLabel}</span>
          <span className="text-xs text-earth-500">{highLabel}</span>
        </div>
      </div>
    </div>
  );
}

import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { PIN_CONFIGS } from './constants/pins/index';

const ElectronicNode = ({ data }: NodeProps) => {
  const pins = PIN_CONFIGS[data.componentType] || [];

  const getHandlePosition = (side: string) => {
    switch (side) {
      case 'top': return Position.Top;
      case 'bottom': return Position.Bottom;
      case 'left': return Position.Left;
      case 'right': return Position.Right;
      default: return Position.Top;
    }
  };

  return (
      <div style={{ 
  position: 'relative', 
  transform: 'scale(1)', 
  transformOrigin: 'top left', 
}}>
        {React.createElement(data.tag, { ...data.props })}
        
        {/* Pins (Handles) တည်ဆောက်ခြင်း */}
        {pins.map((pin) => (
          <div
            key={pin.name}>
            <Handle
              id={pin.name}
              type="source" // ကြိုးက အဝင်ရော အထွက်ရော လုပ်လို့ရအောင်
              position={getHandlePosition(pin.dir)} // နေရာက coordinate နဲ့ ချိန်မှာမလို့ position က default ထားလို့ရပါတယ်
              className="absolute" 
              title={pin.name}
              style={{ 
                transform: 'translate(-50%, -50%)',
                width: "6px",
                height: "6px",
                borderRadius: '2px',
                pointerEvents: 'all',
                 left: `${pin.x}px`, top: `${pin.y}px`
              }}
              data-signals={JSON.stringify(pin.signals)}
            />
            {/* Hover လုပ်ရင် Pin Name ပြရန် */}
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-[8px] bg-black/80 text-white px-1 rounded opacity-0 hover:opacity-100 whitespace-nowrap">
              {pin.name}
            </span>
          </div>
        ))}
      </div>
  );
};

export default memo(ElectronicNode);
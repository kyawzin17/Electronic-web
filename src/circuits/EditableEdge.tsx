import React, { useState, useEffect, useCallback } from 'react';
import { type EdgeProps, BaseEdge, EdgeLabelRenderer, Position, useReactFlow, useStore } from 'reactflow';

type Point = { x: number; y: number };

const GRID_SIZE = 10.5; 
const CORNER_RADIUS = 8; // ပုံထဲကလို ထောင့်ချိုးလေးတွေ ဝိုင်းစေရန်
const STUB_LENGTH = 15; // Pin ကနေ တည့်တည့်ထွက်မယ့် အကွာအဝေး

// --- Custom Algorithm: ၉၀ ဒီဂရီလိုင်းများကို ထောင့်ဝိုင်းလေးတွေဖြစ်အောင် ဆွဲပေးခြင်း ---
function createRoundedPath(points: Point[], radius: number) {
  if (points.length < 2) return '';
  let path = `M ${points[0].x},${points[0].y}`;

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    const dx1 = curr.x - prev.x;
    const dy1 = curr.y - prev.y;
    const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

    const dx2 = next.x - curr.x;
    const dy2 = next.y - curr.y;
    const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

    if (len1 === 0 || len2 === 0) continue; // Overlap ဖြစ်နေရင် ကျော်မယ်

    // Corner ကို Segment ရဲ့ တစ်ဝက်ထက် ပိုမဝိုင်းအောင် ထိန်းခြင်း
    const r = Math.min(radius, len1 / 2, len2 / 2);

    const p1x = curr.x - (dx1 / len1) * r;
    const p1y = curr.y - (dy1 / len1) * r;
    const p2x = curr.x + (dx2 / len2) * r;
    const p2y = curr.y + (dy2 / len2) * r;

    path += ` L ${p1x},${p1y}`;
    path += ` Q ${curr.x},${curr.y} ${p2x},${p2y}`; // Quadratic Bezier ဖြင့် ထောင့်ဝိုင်းခြင်း
  }

  const last = points[points.length - 1];
  path += ` L ${last.x},${last.y}`;
  return path;
}

export default function EditableEdge({
  id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, data, markerEnd,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const zoom = useStore((s) => s.transform[2]);

  const getInitialPoints = useCallback((): Point[] => {
    const getOffset = (pos: Position, x: number, y: number) => {
      switch (pos) {
        case Position.Top: return { x, y: y - STUB_LENGTH };
        case Position.Bottom: return { x, y: y + STUB_LENGTH };
        case Position.Left: return { x: x - STUB_LENGTH, y };
        case Position.Right: return { x: x + STUB_LENGTH, y };
        default: return { x, y };
      }
    };
    const p1 = { x: sourceX, y: sourceY };
    const p2 = getOffset(sourcePosition, sourceX, sourceY);
    const p6 = { x: targetX, y: targetY };
    const p5 = getOffset(targetPosition, targetX, targetY);
    const midX = Math.round((p2.x + (p5.x - p2.x) / 2) / GRID_SIZE) * GRID_SIZE;
    return [p1, p2, { x: midX, y: p2.y }, { x: midX, y: p5.y }, p5, p6];
  }, [sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition]);

  const [points, setPoints] = useState<Point[]>(data?.points || getInitialPoints());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Component ရွှေ့ရင် လိုင်းအစ/အဆုံး ပြုတ်မသွားအောင် ထိန်းခြင်း
  useEffect(() => {
    setPoints((prev) => {
      if (!data?.points) return getInitialPoints();
      const newPts = [...prev];
      newPts[0] = { x: sourceX, y: sourceY };
      newPts[newPts.length - 1] = { x: targetX, y: targetY };
      if (sourcePosition === Position.Top || sourcePosition === Position.Bottom) newPts[1].x = sourceX;
      else newPts[1].y = sourceY;
      if (targetPosition === Position.Top || targetPosition === Position.Bottom) newPts[newPts.length - 2].x = targetX;
      else newPts[newPts.length - 2].y = targetY;
      return newPts;
    });
  }, [sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, getInitialPoints, data?.points]);

  // --- Double Click နှိပ်လျှင် Joint အသစ် (U-shape) ထည့်ပေးမည့် Algorithm ---
  const onSegmentDoubleClick = (e: React.MouseEvent, index: number, isVertical: boolean) => {
    e.stopPropagation();
    if (index === 0 || index === points.length - 2) return; // Stubs တွေကို မခွဲပါ

    const newPts = [...points];
    const p1 = newPts[index];
    const p2 = newPts[index + 1];

    if (!isVertical) {
      const midX = (p1.x + p2.x) / 2;
      const dirX = Math.sign(p2.x - p1.x) || 1;
      const offset = Math.min(15, Math.abs(p2.x - p1.x) / 4); 
      
      // Horizontal လိုင်းကို ခွဲပြီး အောက်ကို 20px ကျတဲ့ U ပုံစံ ဖန်တီးမယ်
      newPts.splice(index + 1, 0, 
        { x: midX - dirX * offset, y: p1.y },
        { x: midX - dirX * offset, y: p1.y + 20 }, 
        { x: midX + dirX * offset, y: p1.y + 20 },
        { x: midX + dirX * offset, y: p1.y }
      );
    } else {
      const midY = (p1.y + p2.y) / 2;
      const dirY = Math.sign(p2.y - p1.y) || 1;
      const offset = Math.min(15, Math.abs(p2.y - p1.y) / 4);
      
      // Vertical လိုင်းကို ခွဲပြီး ညာဘက်ကို 20px ထွက်တဲ့ U ပုံစံ ဖန်တီးမယ်
      newPts.splice(index + 1, 0, 
        { x: p1.x, y: midY - dirY * offset },
        { x: p1.x + 20, y: midY - dirY * offset }, 
        { x: p1.x + 20, y: midY + dirY * offset },
        { x: p1.x, y: midY + dirY * offset }
      );
    }

    setPoints(newPts);
    setEdges((eds) => eds.map((edge) => edge.id === id ? { ...edge, data: { ...edge.data, points: newPts } } : edge));
  };

  // --- ရိုးရိုး Drag ဆွဲလျှင် အကန့်လိုက် ရွှေ့မည့် Algorithm ---
  const onSegmentMouseDown = (e: React.MouseEvent, index: number, isVertical: boolean) => {
    e.stopPropagation();
    if (index === 0 || index === points.length - 2) return;
    const startMouse = { x: e.clientX, y: e.clientY };
    const startPoints = points.map((p) => ({ ...p }));

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = (moveEvent.clientX - startMouse.x) / zoom;
      const deltaY = (moveEvent.clientY - startMouse.y) / zoom;
      const newPts = startPoints.map((p) => ({ ...p }));

      if (isVertical) {
        const newX = Math.round((startPoints[index].x + deltaX) / GRID_SIZE) * GRID_SIZE;
        newPts[index].x = newX;
        newPts[index + 1].x = newX;
      } else {
        const newY = Math.round((startPoints[index].y + deltaY) / GRID_SIZE) * GRID_SIZE;
        newPts[index].y = newY;
        newPts[index + 1].y = newY;
      }
      setPoints(newPts);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      setEdges((eds) => eds.map((edge) => edge.id === id ? { ...edge, data: { ...edge.data, points } } : edge));
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const edgePath = createRoundedPath(points, CORNER_RADIUS);

  const segments = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const isVertical = Math.abs(p1.x - p2.x) < 1;
    const isDraggable = i !== 0 && i !== points.length - 2; 
    segments.push({ p1, p2, isVertical, isDraggable, d: `M ${p1.x},${p1.y} L ${p2.x},${p2.y}` });
  }

  return (
    <>
      {/* Main Visible Edge (ပုံထဲကလို Dark Blue အရောင်နဲ့ ခပ်ထူထူလေး) */}
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{ stroke: style.stroke || '#0a1161', strokeWidth: 4, ...style, zIndex: 100 }} 
      />

      {/* Invisible Interactive Areas */}
      {segments.map((seg, index) => (
        <path
          key={index}
          d={seg.d}
          fill="none"
          stroke={hoveredIndex === index ? "rgba(100,149,237,0.3)" : "transparent"}
          strokeWidth={seg.isDraggable ? 20 : 0} 
          style={{ cursor: !seg.isDraggable ? 'default' : seg.isVertical ? 'col-resize' : 'row-resize', transition: 'stroke 0.2s', zIndex: 100 }}
          onMouseEnter={() => seg.isDraggable && setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onMouseDown={(e) => seg.isDraggable && onSegmentMouseDown(e, index, seg.isVertical)}
          onDoubleClick={(e) => seg.isDraggable && onSegmentDoubleClick(e, index, seg.isVertical)} // The Magic Action!
        />
      ))}
      
      {/* Tooltip Hint for Double Click */}
      {hoveredIndex !== null && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              left: (segments[hoveredIndex].p1.x + segments[hoveredIndex].p2.x) / 2,
              top: (segments[hoveredIndex].p1.y + segments[hoveredIndex].p2.y) / 2 - 15,
              transform: 'translate(-50%, -100%)',
              pointerEvents: 'none',
              background: '#333',
              color: '#fff',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '10px'
            }}
            className="z-50 shadow-md"
          >
            Double-click to split
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
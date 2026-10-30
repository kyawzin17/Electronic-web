import { CrossIcon } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { type EdgeProps, BaseEdge, EdgeLabelRenderer, Position, useReactFlow, useStore } from 'reactflow';
import { insertWireBend } from './wireUtils';

type Point = { x: number; y: number };

const GRID_SIZE = 10;
const CORNER_RADIUS = 8; 
const HANDLE_RADIUS = 2.8; 
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
    if (len1 === 0 || len2 === 0) continue; 
    const r = Math.min(radius, len1 / 2, len2 / 2);
    const p1x = curr.x - (dx1 / len1) * r;
    const p1y = curr.y - (dy1 / len1) * r;
    const p2x = curr.x + (dx2 / len2) * r;
    const p2y = curr.y + (dy2 / len2) * r;
    path += ` L ${p1x},${p1y}`;
    path += ` Q ${curr.x},${curr.y} ${p2x},${p2y}`; 
  }
  const last = points[points.length - 1];
  path += ` L ${last.x},${last.y}`;
  return path;
}

export default function EditableEdge({
  id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, data, markerStart, markerEnd,
}: EdgeProps) {
  const stubLength = data?.stubLength || 0;

  const { setEdges } = useReactFlow();
  const zoom = useStore((s) => s.transform[2]);
  
  // 🌟 Stale closure ကို ဖြေရှင်းဖို့ Ref သုံးပါမည်
  const pointsRef = useRef<Point[]>([]);

  const getTrueCenter = (x: number, y: number, position: Position) => {
    switch (position) {
      case Position.Left: return { x: x + HANDLE_RADIUS, y };
      case Position.Right: return { x: x - HANDLE_RADIUS, y };
      case Position.Top: return { x, y: y + HANDLE_RADIUS };
      case Position.Bottom: return { x, y: y - HANDLE_RADIUS };
      default: return { x, y };
    }
  };

  const trueSource = getTrueCenter(sourceX, sourceY, sourcePosition);
  const trueTarget = getTrueCenter(targetX, targetY, targetPosition);

  const getInitialPoints = useCallback((): Point[] => {
    const getOffset = (pos: Position, x: number, y: number) => {
      if (pos === Position.Top) return { x, y: y - stubLength };
      if (pos === Position.Bottom) return { x, y: y + stubLength };
      if (pos === Position.Left) return { x: x - stubLength, y };
      return { x: x + stubLength, y };
    };

    const p1 = { x: trueSource.x, y: trueSource.y };
    const p2 = getOffset(sourcePosition, trueSource.x, trueSource.y);
    const pTargetStub = getOffset(targetPosition, trueTarget.x, trueTarget.y);
    const pTarget = { x: trueTarget.x, y: trueTarget.y };

    const isSourceVertical = sourcePosition === Position.Top || sourcePosition === Position.Bottom;
    const isTargetVertical = targetPosition === Position.Top || targetPosition === Position.Bottom;

    if (isSourceVertical !== isTargetVertical) {
      const midPoint = isSourceVertical ? { x: p2.x, y: pTargetStub.y } : { x: pTargetStub.x, y: p2.y };
      return [p1, p2, midPoint, pTargetStub, pTarget];
    } 

    if (isSourceVertical) {
      const midX = Math.round(((p2.x + pTargetStub.x) / 2) / GRID_SIZE) * GRID_SIZE;
      return [p1, p2, { x: midX, y: p2.y }, { x: midX, y: pTargetStub.y }, pTargetStub, pTarget];
    } else {
      const midY = Math.round(((p2.y + pTargetStub.y) / 2) / GRID_SIZE) * GRID_SIZE;
      return [p1, p2, { x: p2.x, y: midY }, { x: pTargetStub.x, y: midY }, pTargetStub, pTarget];
    }
  }, [trueSource.x, trueSource.y, trueTarget.x, trueTarget.y, sourcePosition, targetPosition]);

  const [points, setPoints] = useState<Point[]>(data?.points || getInitialPoints());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Synchronize points with ref
  useEffect(() => { pointsRef.current = points; }, [points]);

  // Persist the generated initial route so the context menu can identify
  // the exact segment selected by the user.
  useEffect(() => {
    if (Array.isArray(data?.points)) return;
    const initialPoints = pointsRef.current;
    if (initialPoints.length < 2) return;

    setEdges((currentEdges) =>
      currentEdges.map((edge) =>
        edge.id === id
          ? {
              ...edge,
              data: {
                ...edge.data,
                points: initialPoints.map((point) => ({ ...point })),
              },
            }
          : edge,
      ),
    );
  }, [data?.points, id, setEdges]);

  useEffect(() => {
    setPoints((prev) => {
      // Always render from the latest edge data. Direction buttons and
      // drag handlers update edge.data.points; using only prev here leaves
      // the SVG path stuck on the previous local state.
      const sourcePoints = Array.isArray(data?.points)
        ? (data.points as Point[])
        : getInitialPoints();

      const newPts = sourcePoints.map((point) => ({ ...point }));
      const len = newPts.length;

      if (len < 2) return newPts;

      newPts[0] = { x: trueSource.x, y: trueSource.y };
      newPts[len - 1] = { x: trueTarget.x, y: trueTarget.y };

      const updateStub = (pos: Position, x: number, y: number) => {
        if (pos === Position.Top) return { x, y: y - stubLength };
        if (pos === Position.Bottom) return { x, y: y + stubLength };
        if (pos === Position.Left) return { x: x - stubLength, y };
        return { x: x + stubLength, y };
      };

      if (len >= 3) {
        newPts[1] = updateStub(sourcePosition, trueSource.x, trueSource.y);
        newPts[len - 2] = updateStub(targetPosition, trueTarget.x, trueTarget.y);
      }

      if (len >= 4) {
        const isSVert = sourcePosition === Position.Top || sourcePosition === Position.Bottom;
        if (isSVert) newPts[2].x = newPts[1].x; else newPts[2].y = newPts[1].y;
        const isTVert = targetPosition === Position.Top || targetPosition === Position.Bottom;
        if (isTVert) newPts[len - 3].x = newPts[len - 2].x; else newPts[len - 3].y = newPts[len - 2].y;
      }
      return newPts;
    });
  }, [trueSource.x, trueSource.y, trueTarget.x, trueTarget.y, sourcePosition, targetPosition, getInitialPoints, data?.points]);

  // const onSegmentMouseDown = (e: React.MouseEvent, index: number, isVertical: boolean) => {
  //   e.stopPropagation();
  //  // (၁၉, ၆, ၂၀၂၆) if (index === 0 || index === points.length - 2) return;
    
  //   const startMouse = { x: e.clientX, y: e.clientY };
  //   const startPoints = [...pointsRef.current]; // Ref ကနေ လက်ရှိ Point တွေကို ယူမယ်
  //   let lastCalculatedPoints = startPoints;

  //   const onMouseMove = (moveEvent: MouseEvent) => {
  //     const deltaX = (moveEvent.clientX - startMouse.x) / zoom;
  //     const deltaY = (moveEvent.clientY - startMouse.y) / zoom;
  //     const newPts = startPoints.map((p) => ({ ...p }));

  //     if (isVertical) {
  //       const newX = Math.round((startPoints[index].x + deltaX) / GRID_SIZE) * GRID_SIZE;
  //       newPts[index].x = newX;
  //       newPts[index + 1].x = newX;
  //     } else {
  //       const newY = Math.round((startPoints[index].y + deltaY) / GRID_SIZE) * GRID_SIZE;
  //       newPts[index].y = newY;
  //       newPts[index + 1].y = newY;
  //     }
  //     lastCalculatedPoints = newPts;
  //     setPoints(newPts);
  //   };

  //   const onMouseUp = () => {
  //     window.removeEventListener('mousemove', onMouseMove);
  //     window.removeEventListener('mouseup', onMouseUp);
      
  //     // 🌟 ပြင်ထားတဲ့ Point အသစ်တွေကို Edge Data ထဲမှာ သိမ်းလိုက်မယ်
  //     setEdges((eds) => eds.map((edge) => 
  //       edge.id === id ? { ...edge, data: { ...edge.data, points: lastCalculatedPoints } } : edge
  //     ));
  //   };

  //   window.addEventListener('mousemove', onMouseMove);
  //   window.addEventListener('mouseup', onMouseUp);
  // };

  
const onSegmentPointerDown = (
  e: React.PointerEvent<SVGPathElement>,
  index: number,
  isVertical: boolean,
) => {
  e.stopPropagation();
  e.preventDefault();

  // Pointer ကို လက်ရှိ path ပေါ်မှာ capture လုပ်ထားမယ်။
  // Pointer path အပြင်ထွက်သွားလည်း drag ဆက်လုပ်နိုင်မယ်။
  setSelectedIndex(index);
  const target = e.currentTarget;
  target.setPointerCapture(e.pointerId);

  const startPointer = {
    x: e.clientX,
    y: e.clientY,
  };

  const startPoints = [...pointsRef.current];
  let lastCalculatedPoints = startPoints;

  const onPointerMove = (moveEvent: PointerEvent) => {
    if (moveEvent.pointerId !== e.pointerId) return;

    const deltaX =
      (moveEvent.clientX - startPointer.x) / zoom;
    const deltaY =
      (moveEvent.clientY - startPointer.y) / zoom;

    const newPts = startPoints.map((p) => ({ ...p }));

    if (isVertical) {
      const newX =
        Math.round(
          (startPoints[index].x + deltaX) / GRID_SIZE,
        ) * GRID_SIZE;

      newPts[index].x = newX;
      newPts[index + 1].x = newX;
    } else {
      const newY =
        Math.round(
          (startPoints[index].y + deltaY) / GRID_SIZE,
        ) * GRID_SIZE;

      newPts[index].y = newY;
      newPts[index + 1].y = newY;
    }

    lastCalculatedPoints = newPts;
    setPoints(newPts);
  };

  const cleanup = () => {
    window.removeEventListener(
      "pointermove",
      onPointerMove,
    );
    window.removeEventListener(
      "pointerup",
      onPointerUp,
    );
    window.removeEventListener(
      "pointercancel",
      onPointerCancel,
    );

    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
  };

  const onPointerUp = (upEvent: PointerEvent) => {
    if (upEvent.pointerId !== e.pointerId) return;

    cleanup();

    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === id
          ? {
              ...edge,
              data: {
                ...edge.data,
                points: lastCalculatedPoints,
              },
            }
          : edge,
      ),
    );
  };

  const onPointerCancel = (cancelEvent: PointerEvent) => {
    if (cancelEvent.pointerId !== e.pointerId) return;
    cleanup();
  };

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerCancel);
};

  const onSegmentDoubleClick = (e: React.MouseEvent, index: number, isVertical: boolean) => {
    e.stopPropagation();
    const newPts = insertWireBend(pointsRef.current, index, isVertical);
    if (!newPts) return;

    setPoints(newPts);
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === id
          ? { ...edge, data: { ...edge.data, points: newPts } }
          : edge,
      ),
    );
  };

  const validation = data?.validation as
    | {
        isValid?: boolean;
        severity?: "error" | "warning";
        code?: string;
        message?: string;
      }
    | undefined;

  const isInvalid =
    validation?.isValid === false;

  const simulation = data?.simulation as
    | {
        isActive?: boolean;
        currentMa?: number;
        netId?: string;
        traceActive?: boolean;
      }
    | undefined;

  const isActive =
    simulation?.isActive === true;

  const isTraceActive =
    simulation?.traceActive === true;

  const currentMa =
    typeof simulation?.currentMa === "number"
      ? simulation.currentMa
      : undefined;

  const flowColor = "#22d3ee";

  const edgePath = createRoundedPath(points, CORNER_RADIUS);

  const labelPoint =
    points.length > 1
      ? points[Math.floor(points.length / 2)]
      : trueSource;

  const segments = points.slice(0, -1).map((p1, i) => {
    const p2 = points[i + 1];
    return { p1, p2, isVertical: Math.abs(p1.x - p2.x) < 0.1, isDraggable: true}; //i !== 0 && i !== points.length - 2
  });
  const wireColor = isInvalid
    ? "#ef4444"
    : (style.stroke || '#ff0000');

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        markerStart={markerStart}
        style={{
          ...style,
          stroke: isInvalid
            ? "#ef4444"
            : (style.stroke || '#0a1161'),
          strokeWidth: isInvalid
            ? 3
            : (isTraceActive ? 4 : 2),
          filter: isTraceActive ? "drop-shadow(0 0 4px rgba(34,211,238,0.85))" : undefined,
        }}
      />

      {isActive && (
        <path
          d={edgePath}
          fill="none"
          stroke={flowColor}
          strokeWidth={isTraceActive ? 4 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="circuit-wire-flow"
          pointerEvents="none"
        >
          <title>
            {currentMa !== undefined
              ? "Current flow: " + currentMa.toFixed(2) + " mA"
              : "Current flow detected"}
          </title>
        </path>
      )}

      {segments.map((seg, index) => (
        
      <path
        key={index}
        d={`M ${seg.p1.x},${seg.p1.y} L ${seg.p2.x},${seg.p2.y}`}
        fill="none"
        stroke={
            selectedIndex === index
              ? "rgba(0, 209, 255, 0.65)"
              : hoveredIndex === index
                ? "rgba(239, 68, 68, 0.3)"
                : "transparent"
          }
        strokeWidth={seg.isDraggable ? (selectedIndex === index ? 4 : 10) : 0}
        style={{
          cursor: !seg.isDraggable
            ? "default"
            : seg.isVertical
              ? "col-resize"
              : "row-resize",
          pointerEvents: seg.isDraggable ? "stroke" : "none",
          touchAction: "none",
        }}
        onPointerEnter={() => {
          if (seg.isDraggable) setHoveredIndex(index);
        }}
        onPointerLeave={(e) => {
          // Keep the selection while dragging.
          if (e.buttons === 0) setHoveredIndex(null);
        }}
        onPointerDown={(e) => {
          if (!seg.isDraggable) return;

          e.preventDefault();
          e.stopPropagation();

          setHoveredIndex(index);

          window.dispatchEvent(
            new CustomEvent("rde:wire-segment-select", {
              detail: {
                id,
                segmentIndex: index,
                isVertical: seg.isVertical,
                x: e.clientX,
                y: e.clientY,
              },
            })
          );

          onSegmentPointerDown(e, index, seg.isVertical);
        }}
        onDoubleClick={(e) => {
          if (seg.isDraggable) {
            onSegmentDoubleClick(e, index, seg.isVertical);
          }
        }}
      />

      ))}
     <EdgeLabelRenderer>
        {isInvalid && (
          <div
            title={validation?.message ?? "Invalid circuit connection"}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform:
                "translate(" +
                labelPoint.x +
                "px, " +
                labelPoint.y +
                "px) translate(-50%, -50%)",
              width: "16px",
              height: "16px",
              borderRadius: "9999px",
              background: "transparent",
              color: "#ffffff",
              border: "1.5px solid #ef4444",
              boxShadow: "0 2px 8px rgba(0,0,0,0.28)",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              padding: "0px",
              lineHeight: 1,
              pointerEvents: "auto",
              cursor: "help",
              zIndex: 2000,
            }}
          >
            <CrossIcon size={10} strokeWidth={3} className="text-red-500  rotate-45" />
          </div>
        )}

        {isActive && (
          <div
            className="circuit-wire-current-badge"
            style={{
              left: 0,
              top: 0,
              transform:
                "translate(" +
                labelPoint.x +
                "px, " +
                labelPoint.y +
                "px) translate(-50%, -50%)",
            }}
          >
            <span className="circuit-wire-current-dot" />
            {currentMa !== undefined
              ? currentMa.toFixed(1) + " mA"
              : "FLOW"}
          </div>
        )}

        {/* Source Dot (အစ) - True Center ကို အသုံးပြုထားသည် */}
         <div
          style={{
            position: 'absolute',
            left: 0, top: 0,
            transform: `translate(${trueSource.x}px, ${trueSource.y}px) translate(-50%, -50%)`,
            width: '5px',
            height: '5px',
            background: wireColor,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1001,
          }}
        />
         {/* Target Dot (အဆုံး) - True Center ကို အသုံးပြုထားသည် */}
         <div
          style={{
            position: 'absolute',
            left: 0, top: 0,
            transform: `translate(${trueTarget.x}px, ${trueTarget.y}px) translate(-50%, -50%)`,
            width: '5px',
            height: '5px',
            background: wireColor,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1001,
          }}
        />
      </EdgeLabelRenderer> 
    </>
  );
}
import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
 addEdge,
 updateEdge,
 Background,
 BackgroundVariant,
 Controls,
 useNodesState,
 useEdgesState,
  ConnectionMode,
 type EdgeTypes,
 type Connection,
 type Edge,
 type ReactFlowInstance
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar.tsx';
import ElectronicNode from './ElectronicNode.tsx';


// CircuitEditor.tsx အပေါ်ဆုံးမှာ Import လုပ်ပါ
import EditableEdge from './EditableEdge';

// ၁။ Error ပျောက်အောင် EdgeTypes ကို ဒီလို သတ်မှတ်ပါ
const edgeTypes: EdgeTypes = {
 editable: EditableEdge,
};

const nodeTypes = {
 electronicNode: ElectronicNode,
};

const getEdgeColor = (handleId: string | null) => {
 if (!handleId) return '#2ecc71'; // Default Green
 if (handleId.startsWith('digital')) return '#2563eb'; // Blue if (handleId.startsWith('analog')) return '#eab308'; // Yellow
 if (handleId === 'power_5v') return '#ef4444';// Red
 if (handleId === 'power_gnd') return '#000000'; // Black
 return '#2ecc71';
};

const GRID_SIZE = 10.5;

const CircuitEditor = () => {
 const reactFlowWrapper = useRef<HTMLDivElement>(null);
 const [nodes, setNodes, onNodesChange] = useNodesState([]);
 const [edges, setEdges, onEdgesChange] = useEdgesState([]);
 const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

 // ... အပေါ်က useState တွေရဲ့အောက်မှာ ထည့်ပါ ...
const [edgeMenu, setEdgeMenu] = useState<{ id: string, x: number, y: number, color: string } | null>(null);


const onConnect = useCallback((params: Connection | Edge) => {
 const strokeColor = getEdgeColor(params.sourceHandle || null);

 const newEdge = {
 ...params,
  type: 'editable', // ဒါကို ထည့်ဖို့ အရေးကြီးဆုံးပါ (ဒါမှ hover နဲ့ grid အလုပ်လုပ်မှာပါ)
  data: { points: null }, // initialization အတွက်
  style: {
  strokeWidth: 1,
  stroke: strokeColor
 },
};

setEdges((eds) => addEdge(newEdge, eds));
}, [setEdges]);

// --- ကြိုးကို ဆွဲရွှေ့တဲ့အခါ ခေါ်မယ့် function (onEdgeUpdate) ---
 const onEdgeUpdate = useCallback(
 (oldEdge: Edge, newConnection: Connection) => {
 setEdges((eds) => updateEdge(oldEdge, newConnection, eds));
 },
 [setEdges]
 );


const onDragOver = useCallback((event: React.DragEvent) => {
 event.preventDefault();
 event.dataTransfer.dropEffect = 'move';
}, []);

// App.tsx သို့မဟုတ် Flow.tsx ထဲမှာ

const onDrop = useCallback(
  (event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;

    const position = reactFlowInstance?.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // Sidebar က အစိတ်အပိုင်းအလိုက် Tag နှင့် Props များ သတ်မှတ်ခြင်း
    const componentConfigs: Record<string, any> = {
      'arduino': { tag: 'wokwi-arduino-uno', label: 'Arduino Uno' },
      'mega': { tag: 'wokwi-arduino-mega', label: 'Arduino Mega' },
      'nano': { tag: 'wokwi-arduino-nano', label: 'Arduino Nano' },
      'led-red': { tag: 'wokwi-led', props: { color: 'red' }, label: 'Red LED' },
      'led-green': { tag: 'wokwi-led', props: { color: 'green' }, label: 'Green LED' },
      'led-blue': { tag: 'wokwi-led', props: { color: 'blue' }, label: 'Blue LED' },
      'resistor': { tag: 'wokwi-resistor', props: { value: '1000' }, label: 'Resistor' },
      'pushbutton': { tag: 'wokwi-pushbutton', label: 'Pushbutton' },
      'potentiometer': { tag: 'wokwi-potentiometer', label: 'Potentiometer' },
      'slide-switch': { tag: 'wokwi-slide-switch', label: 'Slide Switch' },
      '7segment': { tag: 'wokwi-7segment', label: '7-Segment' },
      'lcd1602': { tag: 'wokwi-lcd1602', label: 'LCD 16x2' },
      'neopixel': { tag: 'wokwi-neopixel', label: 'NeoPixel' },
      'buzzer': { tag: 'wokwi-buzzer', label: 'Buzzer' },
      'servo': { tag: 'wokwi-servo', label: 'Servo' },
      'hc-sr04': { tag: 'wokwi-hc-sr04', label: 'Ultrasonic Sensor HC-SR04' },
      'membrane-keypad': { tag: 'wokwi-membrane-keypad', label: 'Keypad Membrane' },

      // ... ကျန်တဲ့ ၂၀ လုံးကို ဒီမှာ ထည့်ပေးပါ
    };

    const config = componentConfigs[type] || { tag: 'wokwi-led', label: 'Unknown' };

    const newNode = {
      id: `${type}-${Date.now()}`,
      type: 'electronicNode', // ကျွန်တော်တို့ ရေးခဲ့တဲ့ custom node type
      position,
      data: { 
        tag: config.tag, 
        props: config.props,
        label: config.label 
      },
    };

    setNodes((nds: any) => nds.concat(newNode));
  },
  [reactFlowInstance]
);
 // --- ကြိုးကို Click နှိပ်တဲ့အခါ Menu ပေါ်စေရန် ---
 const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
 event.stopPropagation(); // Canvas ကိုပါ နှိပ်မိသလို မဖြစ်အောင် တားထားခြင်း
 if (reactFlowWrapper.current) {
 const bounds = reactFlowWrapper.current.getBoundingClientRect();
 setEdgeMenu({
 id: edge.id,
 x: event.clientX - bounds.left,
 y: event.clientY - bounds.top,
  color: edge.style?.stroke?.toString() || '#2ecc71',
 });
}
 }, []);

// --- အပြင် (Canvas) ကို နှိပ်မိရင် Menu ပြန်ဖျောက်ရန် ---
 const onPaneClick = useCallback(() => {
  setEdgeMenu(null);
 }, []);

 // --- ကြိုးအရောင် ပြောင်းရန် ---
 const updateEdgeColor = (color: string) => {
   if (!edgeMenu) return;
   setEdges((eds) =>
 eds.map((e) =>
 e.id === edgeMenu.id ? { ...e, style: { ...e.style, stroke: color } } : e
 )
 );
  // Menu ပေါ်က အရောင်ကိုပါ ချက်ချင်း Update လုပ်ပေးရန်
 //  setEdgeMenu((prev) => (prev ? { ...prev, color } : null)); 
 };

 // --- ကြိုး ဖြုတ်ရန် (Delete Edge) ---
 const deleteEdge = () => {
   if (!edgeMenu) return;
   setEdges((eds) => eds.filter((e) => e.id !== edgeMenu.id));
   setEdgeMenu(null); // ဖျက်ပြီးရင် Menu ကို ဖျောက်ပါ
 };

 return (
   <div className="flex w-full h-screen bg-gray-100">

     <Sidebar />
{/*       Sidebar - မြန်မာစာသားများဖြင့် အဆင့်မြှင့်ထားသည်
      <aside className="w-72 bg-gray-900 p-6 flex flex-col gap-4 shadow-2xl z-10 border-r border-gray-700">
        <h2 className="text-cyan-400 font-bold text-xl mb-4 border-b border-gray-700 pb-2">
          အစိတ်အပိုင်းများ
        </h2>
        
        <div 
          className="bg-gray-800 p-4 rounded-lg cursor-grab hover:bg-gray-700 transition border border-gray-600 group"
          onDragStart={(event) => onDragStart(event, 'arduino')}
          draggable
        >
          <div className="text-blue-400 font-bold group-hover:text-blue-300">Arduino Uno</div>
          <div className="text-[10px] text-gray-400">Microcontroller Board</div>
        </div>

        <div 
          className="bg-gray-800 p-4 rounded-lg cursor-grab hover:bg-gray-700 transition border border-gray-600 group"
          onDragStart={(event) => onDragStart(event, 'led')}
          draggable
        >
          <div className="text-red-400 font-bold group-hover:text-red-300">Red LED</div>
          <div className="text-[10px] text-gray-400">Light Emitting Diode</div>
        </div>

        <div className="mt-auto text-[10px] text-gray-500 italic text-center">
          RedDargon Virtual Lab v1.0
        </div>
      </aside> */}

      {/* Editor Canvas Area */}
      <div className="flex-1 relative bg-white" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          snapToGrid={true} // Grid ပေါ်မှာပဲ ရွှေ့ခွင့်ပေးမယ်
          snapGrid={[GRID_SIZE, GRID_SIZE]} // X နဲ့ Y ကို 10px စီ snap လုပ်မယ်
          onEdgeUpdate={onEdgeUpdate} // Props အသစ်ထည့်ပါ
          onEdgeClick={onEdgeClick} // ထပ်တိုး
          onPaneClick={onPaneClick} // ထပ်တိုး
          connectionMode={ConnectionMode.Loose}
          fitView
        >
          <Background color="#e2e8f0" gap={GRID_SIZE} size={1} variant={BackgroundVariant.Lines} />
          <Controls />
        </ReactFlow>
        {/* --- Floating Edge Edit Menu (ကြိုးပြင်ဆင်ရန် UI) --- */}
        {edgeMenu && (
          <div
            className="absolute z-50 bg-white p-4 rounded-xl shadow-2xl border border-gray-200 flex flex-col gap-3 w-48"
            style={{ top: edgeMenu.y, left: edgeMenu.x }}
          >
            <div className="text-xs font-bold text-gray-500 border-b pb-2">ကြိုး ပြင်ဆင်ရန်</div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 font-medium">အရောင်ရွေးပါ</label>
              <input
                type="color"
                value={edgeMenu.color}
                onChange={(e) => updateEdgeColor(e.target.value)}
                className="w-8 h-8 cursor-pointer rounded border-0 p-0"
              />
            </div>

            <button
              onClick={deleteEdge}
              className="mt-2 w-full bg-red-50 hover:bg-red-500 hover:text-white text-red-600 border border-red-200 text-sm py-1.5 px-3 rounded-lg transition-colors font-medium"
            >
              ကြိုးဖြုတ်မည်
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircuitEditor;
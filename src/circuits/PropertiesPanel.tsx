import React, { useEffect, useState } from "react";
import {
  Pencil,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Trash2,
  X,
} from "lucide-react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { LuBrainCircuit } from "react-icons/lu";


import type { Node, Edge } from "reactflow";
import PinPlanes from "./PinPlanes";

type Props = {
  nodes: Node[];
  edges: Edge[];

  selectedNode: Node;

  onRename?: (
    nodeId: string,
    newName: string
  ) => void;

  onUpdateNode?: (
    nodeId: string,
    updates: any
  ) => void;

  onDelete?: (
    nodeId: string
  ) => void;

  onDocumentation?: (
    componentType: string
  ) => void;

  rotateNode: (
    nodeId: string,
    rotation?: number
  ) => void;

  updateResistorValue: (
    nodeId: string,
    value: string
  ) => void;

  onValid: (
    nodeId: string,
    newValid: boolean
  ) => void;
};


export default function PropertiesPanel({
  selectedNode,
  onRename,
  onDelete,
  onDocumentation,
  rotateNode,
  onValid,
  nodes,
  edges,
  updateResistorValue,
  }: Props) {

    const [showSidebar, setShowSidebar] =
    useState(true);

    const [isValidOn, setIsValidOn] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("properties");

  const [isEditingName, setIsEditingName] =
    useState(false);

    const [isEditingValue, setIsEditingValue] =
    useState(false);

  const [name, setName] =
    useState("");

    const [value, setValue] =
    useState<string>("1000");

  const [copied, setCopied] =
    useState(false);

  const [additionalOpen, setAdditionalOpen] =
    useState(false);

    const [connected, setConnected] =
    useState(false);


  // =========================
  // Selected Node Change
  // =========================

  useEffect(() => {
    if (selectedNode) {

      setName(
        selectedNode.data?.label || ""
      );

      setIsEditingName(false);

      setActiveTab("properties");
    }
  }, [selectedNode]);


  if (!selectedNode) {
    return null;
  }

  // =========================
  // DATA
  // =========================

  const data = selectedNode.data || {};

  const label =
    data.label || "Unnamed Component";

  const componentType =
    data.componentType || selectedNode.type;


  const rotation =
    data.rotation ?? 0;


  // =========================
  // RENAME
  // =========================

  const handleSaveName = () => {

    const trimmedName =
      name.trim();

    if (!trimmedName) {
      return;
    }

    onRename?.(
      selectedNode.id,
      trimmedName
    );

    setIsEditingName(false);
  };


  const handleCancelName = () => {

    setName(label);

    setIsEditingName(false);
  };


  // =========================
  // COPY ID
  // =========================

  const handleCopyId = async () => {

    try {

      await navigator.clipboard.writeText(
        selectedNode.id
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);

    } catch (error) {
      console.error(error);
    }
  };


  // =========================
  // UPDATE POSITION
  // =========================

  // const handlePositionChange = (
  //   axis: "x" | "y",
  //   value: string
  // ) => {

  //   const numberValue =
  //     Number(value);

  //   if (Number.isNaN(numberValue)) {
  //     return;
  //   }

  //   onUpdateNode?.(
  //     selectedNode.id,
  //     {
  //       position: {
  //         ...position,
  //         [axis]: numberValue,
  //       },
  //     }
  //   );
  // };


  // =========================
  // UPDATE ROTATION
  // =========================

  // const handleRotationChange = (
  //   value: number
  // ) => {

  //   onUpdateNode?.(
  //     selectedNode.id,
  //     {
  //       data: {
  //         rotation: value,
  //       },
  //     }
  //   );
  // };

  if (!selectedNode) {
    return null;
  }

  function isResistor(componentType: string) {
  return componentType?.toLowerCase().includes("resistor");
}

  function isPotentiometer(componentType: any) {
    return componentType?.toLowerCase().includes("potentiometer");
  }

  function isUltrasonic(componentType: any) {
    return componentType?.toLowerCase().includes("hc");
  }

  function isLdrSensor(componentType: any) {
    return componentType?.toLowerCase().includes("ldr");
  }

  function isRipMotion(componentType: any) {
    return componentType?.toLowerCase().includes("pir");
  }

  function isRtc(componentType: any) {
    return componentType?.toLowerCase().includes("ds1307");
  }

  

  // useEffect မလိုဘဲ componentType ပြောင်းလဲတိုင်း true (သို့) false ကို တိုက်ရိုက် ထွက်စေရန်
  const isValid = 
    isPotentiometer(componentType) ||
    isUltrasonic(componentType) ||
    isLdrSensor(componentType) ||
    isRipMotion(componentType) ||
    isRtc(componentType);

  return (
    <aside
      className={`
        w-87
        h-[calc(100vh-132px)]
        p-0 m-0 gap-0
        absolute 
        bottom-0
        transition-all duration-300
        flex
        justify-between
        ${showSidebar ? "right-0" : "-right-82"}
      `}
    >
      {/* =========================
                COLLAPSE BUTTON
            ========================= */}
      <div className="flex items-center justify-center p-0 m-0 w-2 h-full">
        <button
              onClick={() =>
                setShowSidebar(
                  (previous) =>
                    !previous
                )
              }
              className="
                -translate-y-1/2

                w-36
                h-8
                px-1
      
                dark:bg-[#0d1c30]
                bg-soft
                border
                border-[#254563]
                
                rotate-90
      
                rounded-b-xl
      
                flex
                items-center
                justify-center
                gap-2
      
                text-text-main
      
                hover:bg-[#13263e]/90
                hover:text-blue-400
      
                transition
      
                cursor-pointer
              "
              title={
                showSidebar
                  ? "Collapse Sidebar"
                  : "Expand Sidebar"
              }
            >
      
              {showSidebar ? (
      
                <HiOutlineChevronLeft
                  className="
                    text-xl
                    rotate-90
                  "
                />
      
              ) : (
      
                <HiOutlineChevronRight
                  className="
                    text-xl
                    rotate-90
                  "
                />
      
              )}
              <span className="text-xs -rotate-180">
                Properties
              </span>
              <LuBrainCircuit size={16} className="-rotate-90" />
            </button>
      </div>
            
      <div className="custom-scrollbar bg-card/95
        rounded-md
        border-2
        border-text-secondary/30
        overflow-y-auto
        text-text-main
        w-82 h-full">
        {/* =================================
            HEADER
        ================================= */}

        <div className="p-4 border-b border-text-secondary/30">

          <div className="flex items-center gap-2 mb-4 justify-between">

            <div
              className="
                w-26
                h-5
                flex
                items-center
                justify-center
                text-text-secondary
              "
            >
              ⚯
              <span
              className="
                text-[10px]
                tracking-[0.15em]
                text-text-main/90
                uppercase
                ms-2
                mt-1.5
              "
            >
              Component
            </span>
            </div>
            {isValid && (
              <button
                onClick={() => {
                  setIsValidOn(!isValidOn);
                  onValid(selectedNode.id, isValidOn);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${
                  isValidOn ? 'bg-slate-700' : 'bg-blue-600'
                }`}
              >
                {/* ရွှေ့လျားမည့် အလုံးလေး (Circle) */}
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-md ${
                    isValidOn ? 'translate-x-1' : 'translate-x-6'
                  }`}
                />
              </button>
            )}

          </div>


          <div className="flex gap-3">

            {/* Component Preview */}

            <div
              className="
                w-16
                h-16
                shrink-0
                rounded-md
                border
                border-text-secondary/70
                bg-card/90
                flex
                items-center
                justify-center
                overflow-hidden
              "
            >

              {data.image ? (

                <img
                  src={data.image}
                  alt={label}
                  className="
                    max-w-[90%]
                    max-h-[90%]
                    object-contain
                  "
                />

              ) : data.tag ? (
              
                        /* WOKWI COMPONENT */
              
                        <div
                          className="
                            flex
                            items-center
                            justify-center
                            transition-transform
                            duration-200
                            group-hover:scale-100
                          "
                          style={{
                            transform: `
                              scale(${data.scale})
                              translateY(${data.yOffset})
                            `,
                            transformOrigin:
                              "center center",
                          }}
                        >
              
                          {React.createElement(
                            data.tag,
                            data.props || {}
                          )}
              
                        </div>
              
                      ) : (

                <div
                  className="
                    w-10
                    h-10
                    rounded
                    bg-card/90
                    flex
                    items-center
                    justify-center
                    text-[10px]
                    text-text-secondary
                  "
                >
                  {componentType
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

              )}

            </div>


            {/* Component Name */}

            <div className="flex-1 min-w-0">

              <div className="flex items-center gap-2">

                <h2
                  className="
                    text-lg
                    font-bold
                    text-text-main
                    truncate
                  "
                >
                  {name}
                </h2>

                <button
                  onClick={() =>
                    setIsEditingName(true)
                  }
                  className="
                    shrink-0
                    text-text-secondary
                    hover:text-secondary
                    transition
                  "
                  title="Rename component"
                >
                  <Pencil size={15} />
                </button>

              </div>


              <p
                className="
                  text-xs
                  text-text-secondary/80
                  mt-1
                "
              >
                {componentType}
              </p>


              {/* Status */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  mt-2
                "
              >

                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-emerald-400
                  "
                />

                <span
                  className={`${connected ? "text-success" : "text-error"} text-xs`}
                >
                  {connected ? "Connected" : "Not Connected"}
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* =================================
            TABS
        ================================= */}

        <div
          className="
            grid
            grid-cols-3
            border-b
            border-[#1e3148]
            text-text-main/80
          "
        >

          <TabButton
            active={activeTab === "properties"}
            onClick={() =>
              setActiveTab("properties")
            }
          >
            Properties
          </TabButton>


          <TabButton
            active={activeTab === "pins"}
            onClick={() =>
              setActiveTab("pins")
            }
          >
            Pins
          </TabButton>


          <TabButton
            active={activeTab === "info"}
            onClick={() =>
              setActiveTab("info")
            }
          >
            Info
          </TabButton>

        </div>


        {/* =================================
            CONTENT
        ================================= */}

        <div className="p-4">


          {/* =================================
              PROPERTIES TAB
          ================================= */}

          {activeTab === "properties" && (

            <div className="text-text-main/90">

              {/* BASIC */}

              <SectionTitle>
                Basic
              </SectionTitle>


              {/* NAME */}

              <PropertyRow
                label="Name"
              >

                {!isEditingName ? (

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      w-full
                      px-3
                      py-2
                      rounded-md
                      bg-soft
                      border
                      border-[#29405b]
                    "
                  >

                    <span
                      className="
                        text-xs
                        text-text-main
                        truncate
                      "
                    >
                      {name}
                    </span>


                    <button
                      onClick={() =>
                        setIsEditingName(true)
                      }
                      className="
                        text-text-secondary
                        hover:text-blue-400
                      "
                    >
                      <Pencil size={14} />
                    </button>

                  </div>

                ) : (

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <input
                      autoFocus
                      value={name}
                      onChange={(event) =>
                        setName(
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {

                        if (
                          event.key === "Enter"
                        ) {
                          handleSaveName();
                        }

                        if (
                          event.key === "Escape"
                        ) {
                          handleCancelName();
                        }

                      }}
                      className="
                        flex-1
                        min-w-0
                        px-3
                        py-2
                        text-xs
                        text-text-main
                        bg-soft
                        border
                        border-blue-500
                        rounded-md
                        outline-none
                      "
                    />


                    <button
                      onClick={handleSaveName}
                      className="
                        p-2
                        text-emerald-400
                        hover:bg-emerald-500/10
                        rounded
                      "
                    >
                      <Check size={15} />
                    </button>


                    <button
                      onClick={handleCancelName}
                      className="
                        p-2
                        text-red-400
                        hover:bg-red-500/10
                        rounded
                      "
                    >
                      <X size={15} />
                    </button>

                  </div>

                )}

              </PropertyRow>


              {/* COMPONENT TYPE */}

              <PropertyRow
                label="Component Type"
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    px-3
                    py-2
                    mt-px
                    rounded-md
                    bg-soft
                    border
                    border-[#29405b]
                    text-xs
                    text-text-main
                  "
                >

                  <span>
                    {componentType}
                  </span>

                  {/* <ChevronDown size={14} /> */}

                </div>

              </PropertyRow>


              {/* ID */}

              <PropertyRow
                label="ID"
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <div
                    className="
                      flex-1
                      min-w-0
                      px-3
                      py-2
                      rounded-md
                      bg-soft
                      border
                      border-[#29405b]
                      text-xs
                      text-text-main
                      truncate
                    "
                  >
                    {selectedNode.id}
                  </div>


                  <button
                    onClick={handleCopyId}
                    className="
                      p-2
                      rounded-md
                      border
                      border-[#29405b]
                      text-text-secondary
                      hover:text-text-main
                      hover:bg-text-secondary/20
                    "
                  >
                    {copied
                      ? <Check size={15} />
                      : <Copy size={15} />
                    }
                  </button>

                </div>

              </PropertyRow>


              {/* =================================
                  TRANSFORM
              ================================= */}

              <div className="mt-6">

                {/* <SectionTitle>
                  Transform
                </SectionTitle>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                  "
                >

                  <NumberInput
                    label="Position X"
                    value={position.x}
                    onChange={(value) =>
                      handlePositionChange(
                        "x",
                        value
                      )
                    }
                  />


                  <NumberInput
                    label="Position Y"
                    value={position.y}
                    onChange={(value) =>
                      handlePositionChange(
                        "y",
                        value
                      )
                    }
                  />

                </div> */}


                {/* Rotation */}

                <div className="mt-4">

                  <p
                    className="
                      text-xs
                      text-text-secondary
                      mb-2
                    "
                  >
                    Rotation
                  </p>


                  <div
                    className="
                      grid
                      grid-cols-5
                      gap-2
                    "
                  >

                    {[0, 90, 180, 270, 360].map(
                      (value) => {

                        const active =
                          rotation === value;

                        return (

                          <button
                            key={value}
                            onClick={() =>
                              rotateNode(
                                selectedNode.id,
                                value
                              )
                            }
                            className={`
                              py-2
                              rounded-md
                              text-[10px]
                              transition
                              border
                              hover:border-2
                              ${
                                active
                                  ? `
                                    bg-blue-500/20
                                    border-blue-500
                                    text-blue-400
                                    border-2
                                  `
                                  : `
                                    bg-soft/60
                                    border-[#29405b]
                                    text-text-secondary
                                    hover:border-blue-500/50
                                  `
                              }
                            `}
                          >
                            {value}°
                          </button>

                        );
                      }
                    )}

                  </div>

                </div>

              </div>

                {/* =================================
      RESISTOR SETTINGS
  ================================= */}
  {isResistor(componentType) && (
    <div className="mt-6">

    {/* NAME */}

              <PropertyRow
                label="Resistance Value (Ohms)"
              >

                {!isEditingValue ? (

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      w-full
                      px-3
                      py-2
                      rounded-md
                      bg-soft
                      border
                      border-[#29405b]
                    "
                  >

                    <span
                      className="
                        text-xs
                        text-text-main
                        truncate
                      "
                    >
                      {value}
                    </span>


                    <button
                      onClick={() =>
                        setIsEditingValue(true)
                      }
                      className="
                        text-slate-400
                        hover:text-blue-400
                      "
                    >
                      <Pencil size={14} />
                    </button>

                  </div>

                ) : (

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <input
                      type="number"
                      autoFocus
                      value={value}
                      onChange={(event) =>
                        setValue(
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {

                        if (
                          event.key === "Enter"
                        ) {
                          () => {
                                  updateResistorValue(
                                    selectedNode.id,
                                    value
                                  );
                                  setIsEditingValue(false);
                                }
                        }

                        if (
                          event.key === "Escape"
                        ) {
                          () => {
                                  setIsEditingValue(false);
                                }}
                        }

                      }
                      className="
                        flex-1
                        min-w-0
                        px-3
                        py-2
                        text-xs
                        text-text-main
                        bg-soft/80
                        border
                        border-blue-500
                        rounded-md
                        outline-none
                      "
                    />


                    <button
                      onClick={() => {
                                  updateResistorValue(
                                    selectedNode.id,
                                    value
                                  );
                                  setIsEditingValue(false);
                                }}
                      className="
                        p-2
                        text-emerald-400
                        hover:bg-emerald-500/10
                        rounded
                      "
                    >
                      <Check size={15} />
                    </button>


                    <button
                      onClick={() => {
                        setIsEditingValue(false);
                      }}
                      className="
                        p-2
                        text-red-400
                        hover:bg-red-500/10
                        rounded
                      "
                    >
                      <X size={15} />
                    </button>

                  </div>

                )}

              </PropertyRow>

      {/* Preset Values (Quick Select) */}
      <div className="mt-3">
        <p className="text-xs text-text-secondary mb-2">Quick Presets</p>
        <div className="grid grid-cols-4 gap-2">
          {["220", "1000", "4700", "10000"].map((val) => (
            <button
              key={val}
              onClick={() => {
                setValue(val);
                updateResistorValue(
                                    selectedNode.id,
                                    val
                                  );
                }
              }
              className={`
                py-1.5
                rounded-md
                text-[10px]
                border
                hover:border-2
                transition
                ${
                  (data.props?.value || String(data.value)) === val
                    ? "bg-blue-500/20 border-blue-500 text-blue-400 border-2"
                    : "bg-soft/60 border-[#29405b] text-text-secondary hover:border-blue-500/50"
                }
              `}
            > 
              {Number(val) >= 1000 ? `${Number(val) / 1000}kΩ` : `${val}Ω`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )}

              {/* =================================
                  BOARD SETTINGS
              ================================= */}

              {isArduino(componentType) && (

                <div className="mt-6">

                  <SectionTitle>
                    Board Settings
                  </SectionTitle>


                  <SelectLike
                    label="Microcontroller"
                    value={
                      data.microcontroller ||
                      "ATmega328P"
                    }
                  />


                  <SelectLike
                    label="Clock Speed"
                    value={
                      data.clockSpeed ||
                      "16 MHz"
                    }
                  />

                </div>

              )}


              {/* =================================
                  ADDITIONAL SETTINGS
              ================================= */}

              <button
                onClick={() =>
                  setAdditionalOpen(
                    !additionalOpen
                  )
                }
                className="
                  w-full
                  mt-5
                  flex
                  items-center
                  gap-2
                  py-3
                  text-xs
                  uppercase
                  tracking-wide
                  text-text-main
                  border-t
                  border-b
                  border-[#1e3148]
                "
              >

                {additionalOpen
                  ? <ChevronDown size={15} />
                  : <ChevronRight size={15} />
                }

                Additional Settings

              </button>


              {additionalOpen && (

                <div
                  className="
                    mt-4
                    p-3
                    rounded-md
                    bg-soft
                    border
                    border-[#263b55]
                  "
                >

                  <p
                    className="
                      text-xs
                      text-text-secondary
                    "
                  >
                    Additional component
                    settings will appear here.
                  </p>

                </div>

              )}


              {/* =================================
                  ACTIONS
              ================================= */}

              <div className="mt-6 space-y-3">

                <button
                  onClick={() =>
                    onDocumentation?.(
                      componentType
                    )
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-3
                    rounded-md
                    bg-blue-600
                    hover:bg-blue-500
                    text-white
                    text-sm
                    font-semibold
                    transition
                  "
                >

                  <BookOpen size={16} />

                  Component Documentation

                </button>


                <button
                  onClick={() =>
                    onDelete?.(
                      selectedNode.id
                    )
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-3
                    rounded-md
                    border
                    border-error/60
                    text-error
                    hover:bg-error/10
                    text-sm
                    font-semibold
                    transition
                  "
                >

                  <Trash2 size={16} />

                  Delete Component

                </button>

              </div>

            </div>

          )}


          {/* =================================
              PINS TAB
          ================================= */}

          {/* Pins */}

          {activeTab === "pins" && (

            <PinPlanes
              selectedNode={selectedNode}
              nodes={nodes}
              edges={edges}
              setConnected={setConnected}
            />

          )}


          {/* =================================
              INFO TAB
          ================================= */}

          {activeTab === "info" && (

            <InfoTab
              selectedNode={selectedNode}
            />

          )}

        </div>
      </div>
    </aside>
  );
}


/* =====================================
   SMALL COMPONENTS
===================================== */


type TabButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function TabButton({
  active,
  onClick,
  children,
}: TabButtonProps) {

  return (

    <button
      onClick={onClick}
      className={`
        relative
        py-3
        text-xs
        font-medium
        transition

        ${
          active
            ? "text-blue-400"
            : "text-slate-500 hover:text-slate-300"
        }
      `}
    >

      {children}

      {active && (

        <span
          className="
            absolute
            bottom-0
            left-0
            w-full
            h-0.5
            bg-blue-500
          "
        />

      )}

    </button>

  );
}


function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <h3
      className="
        text-xs
        uppercase
        tracking-wider
        text-text-main
        font-semibold
        mb-4
      "
    >
      {children}
    </h3>

  );
}


function PropertyRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {

  return (

    <div className="mb-4">

      <p
        className="
          text-xs
          text-text-secondary
          mb-2
        "
      >
        {label}
      </p>

      {children}

    </div>

  );
}


// function NumberInput({
//   label,
//   value,
//   onChange,
// }: {
//   label: string;
//   value: number;
//   onChange: (value: string) => void;
// }) {

//   return (

//     <div>

//       <p
//         className="
//           text-xs
//           text-slate-400
//           mb-2
//         "
//       >
//         {label}
//       </p>


//       <input
//         type="number"
//         value={value}
//         onChange={(event) =>
//           onChange(
//             event.target.value
//           )
//         }
//         className="
//           w-full
//           px-3
//           py-2
//           text-xs
//           text-slate-200
//           bg-[#111e2f]
//           border
//           border-[#29405b]
//           rounded-md
//           outline-none
//           focus:border-blue-500
//         "
//       />

//     </div>

//   );
// }


function SelectLike({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div className="mb-4">

      <p
        className="
          text-xs
          text-text-secondary
          mb-2
        "
      >
        {label}
      </p>


      <div
        className="
          flex
          items-center
          justify-between
          px-3
          py-2
          bg-soft
          border
          border-[#29405b]
          rounded-md
          text-xs
          text-text-main
        "
      >

        <span>
          {value}
        </span>

        <ChevronDown size={14} />

      </div>

    </div>

  );
}


/* =====================================
   PINS TAB
===================================== */

// function PinsTab({
//   selectedNode,
// }: {
//   selectedNode: any;
// }) {

//   const pins =
//     selectedNode.data?.pins || [];

//   return (

//     <div>

//       <SectionTitle>
//         Pins
//       </SectionTitle>


//       {pins.length === 0 ? (

//         <div
//           className="
//             py-10
//             text-center
//             text-sm
//             text-slate-500
//           "
//         >
//           No pin data available
//         </div>

//       ) : (

//         <div className="space-y-2">

//           {pins.map(
//             (pin: any) => (

//               <div
//                 key={pin.id}
//                 className="
//                   flex
//                   items-center
//                   justify-between
//                   p-3
//                   rounded-md
//                   bg-[#111e2f]
//                   border
//                   border-[#263b55]
//                 "
//               >

//                 <span className="text-xs text-white">
//                   {pin.name}
//                 </span>


//                 <span
//                   className={`
//                     text-[10px]

//                     ${
//                       pin.connected
//                         ? "text-emerald-400"
//                         : "text-slate-500"
//                     }
//                   `}
//                 >
//                   {pin.connected
//                     ? "Connected"
//                     : "Available"}
//                 </span>

//               </div>

//             )
//           )}

//         </div>

//       )}

//     </div>

//   );
// }


/* =====================================
   INFO TAB
===================================== */

function InfoTab({
  selectedNode,
}: {
  selectedNode: any;
}) {

  const data =
    selectedNode.data || {};

  return (

    <div>

      <SectionTitle>
        Component Information
      </SectionTitle>


      <div
        className="
          space-y-4
          text-sm
        "
      >

        <InfoRow
          label="Name"
          value={data.label}
        />


        <InfoRow
          label="Type"
          value={
            data.componentType
          }
        />


        <InfoRow
          label="ID"
          value={
            selectedNode.id
          }
        />

      </div>

    </div>

  );
}


function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div>

      <p
        className="
          text-xs
          text-text-secondary
          mb-1
        "
      >
        {label}
      </p>

      <p
        className="
          text-sm
          text-text-main
          break-all
          bg-soft/60
          p-2
          border
         border-[#29405b]
          rounded-md
        "
      >
        {value}
      </p>

    </div>

  );
}


/* =====================================
   HELPERS
===================================== */

function isArduino(
  componentType: string
) {

  return componentType
    ?.toLowerCase()
    .includes("arduino");

}

      
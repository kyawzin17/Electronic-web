import { ReactFlowProvider } from "reactflow";

import "@wokwi/elements";

import CircuitEditor from "./CircuitEditor";

const Circuit = () => {
    return (
        <div className="relative h-[calc(100vh-65px)] w-full flex  flex-col overflow-hidden">
            <ReactFlowProvider>
                <CircuitEditor />
            </ReactFlowProvider>
        </div>
    );
};

export default Circuit;

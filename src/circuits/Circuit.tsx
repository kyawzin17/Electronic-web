import { ReactFlowProvider } from "reactflow";

import "@wokwi/elements";

import CircuitEditor from "./CircuitEditor";

const Circuit = () => {
    return (
        <div className="fixed top-14 md:top-16.25 left-0 right-0 h-[calc(100dvh-56px)] md:h-[calc(100dvh-65px)] w-full flex  flex-col overflow-hidden">
            <ReactFlowProvider>
                <CircuitEditor />
            </ReactFlowProvider>
        </div>
    );
};

export default Circuit;

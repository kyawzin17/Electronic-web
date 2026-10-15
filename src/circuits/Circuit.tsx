import { ReactFlowProvider } from "reactflow";

// Register Wokwi custom elements only when the circuit route is loaded.
// Keeping this side-effect import here prevents it from being pulled into
// the initial application entry chunk.
import "@wokwi/elements";

import CircuitEditor from "./CircuitEditor";

const Circuit = () => {
    return (
        <div className="relative flex h-[calc(100vh-65px)] w-full flex-col overflow-hidden">
            <ReactFlowProvider>
                <CircuitEditor />
            </ReactFlowProvider>
        </div>
    );
};

export default Circuit;

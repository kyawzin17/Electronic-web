import CircuitEditor from "./CircuitEditor";
import CodeSection from "./CodeSection";
// import VirtualLab from "./VirtualLab";

const Circuit = () => (
  <div className="w-full min-h-screen">
        <CircuitEditor />
        <CodeSection />
        {/* <VirtualLab /> */}
  </div>
);
export default Circuit;
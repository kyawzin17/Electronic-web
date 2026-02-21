import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useAppContext } from "./hooks/useAppContext";
import BottomNav from "./components/BottomNav";

export default function App() {

  const { headerHeight }= useAppContext();
  //style={{height: `calc(100vh - ${headerHeight}px)`}}

  return (
    <div className="min-h-screen w-full bg-bg text-text-main relative">
      <Header />
      <BottomNav />
      <main className="w-full h-auto">
        <Outlet />
      </main>
    </div>
  );
}
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useAppContext } from "./hooks/useAppContext";
import Footer from "./components/Footer";

export default function App() {

  const { headerHeight }= useAppContext();
  //style={{height: `calc(100vh - ${headerHeight}px)`}}

  return (
    <div className="min-h-screen min-w-screen bg-bg text-text-main relative">
      <Header />
      <main className="w-full h-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
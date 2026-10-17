import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import MobileRightSidebar from "./components/MobileRightSidebar";
import { useEffect } from "react";
import "./index.css";
export default function App() {

  const location = useLocation();

  useEffect(() => {
    const isCircuit = location.pathname.startsWith("/circuit");

    document.documentElement.classList.toggle(
      "circuit-page",
      isCircuit
    );

    return () => {
      document.documentElement.classList.remove("circuit-page");
    };
  }, [location.pathname]);

  return (
    <div className={`${location.pathname.startsWith("/circuit") ? "h-screen" : "min-h-screen"} max-w-screen bg-bg text-text-main relative`}>
      <Header />
      <MobileRightSidebar />
      <main className={`w-full ${location.pathname.startsWith("/circuit") ? "h-[calc(100vh-65px)]" : "h-auto"}`}>
        <Outlet />
        <ScrollRestoration />
      </main>
      {!location.pathname.startsWith("/circuit") && <Footer />}
    </div>
  );
}
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import MobileRightSidebar from "./components/MobileRightSidebar";
export default function App() {
  const location = useLocation();
 console.log("Current pathname:", location.pathname); // Debugging line to check the current pathname
  return (
    <div className="min-h-screen max-w-screen bg-bg text-text-main relative">
      <Header />
      <MobileRightSidebar />
      <main className="w-full h-auto">
        <Outlet />
        <ScrollRestoration />
      </main>
      {location.pathname === "/circuit" ? null : <Footer />}
    </div>
  );
}
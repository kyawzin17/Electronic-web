import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileRightSidebar from "./components/MobileRightSidebar";

export default function App() {

  return (
    <div className="min-h-screen max-w-screen bg-bg text-text-main relative">
      <Header />
      <MobileRightSidebar />
      <main className="w-full h-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
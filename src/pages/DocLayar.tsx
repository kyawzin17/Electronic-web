import { Outlet } from "react-router-dom";


const DocLayar: React.FC = () => {
    return (
        <section className="w-full relative h-auto">
            <Outlet />
        </section>
    );
}
export default DocLayar;
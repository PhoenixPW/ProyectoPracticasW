import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";


export default function Sidebar(){
    return(
        <div className="bg-secondary-900 h-[100vh] overflow-y-scroll scrollbar-hide
        p-4">
            <h1 className="text-center text-2xl font-bold mb-10">
                BUAP
            </h1>
            <nav>
                <Link to="/" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-primary">
                    <FaChalkboardTeacher/>
                    Clases
                </Link>
                <Link to="/historico" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-primary">
                    <IoTimeOutline/>
                    Historial
                </Link>
            </nav>
        </div>
    )
}
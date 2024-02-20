import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar"
import Header from "../components/header"

export default function Layout(){
    return(
        <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6 scrollbar-hide">
            <Sidebar/>
            <div className="xl:col-span-5 bg bg-secondary-900 ">
                <Header/>
                <div className="h-[92vh] overflow-y-scroll scrollbar-hide p-4 bg-secondary-100">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
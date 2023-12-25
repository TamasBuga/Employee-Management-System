

import { FaUsers, FaBriefcaseMedical, FaHandHoldingMedical } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";



export default function UsersLayout() {

    return (
        <section className="w-full flex flex-col gap-2">

            {/* <Header title={"Nyílvántartás"} /> */}

            <div className="flex flex-wrap w-full gap-4 p-4">

                <NavLink
                    to={"/api/dashboard/users/alluser"}
                    className="group flex flex-col h-32 w-32 focus:bg-teal-600 focus:border-4 focus:border-orange-500 border-4 border-transparent text-white text-2xl bg-teal-800 hover:bg-teal-600 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                >
                    <FaUsers className="cursor-pointer transition-all text-5xl" />
                    <p className="text-lg border-t white">Személyzet</p>
                </NavLink>
                <NavLink
                    to={"/api/dashboard/users/departments"}
                    className="group flex flex-col h-32 w-32 focus:bg-teal-600 focus:border-4 focus:border-orange-500 border-4 border-transparent text-white text-2xl bg-teal-800 hover:bg-teal-600 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                >
                    <FaHandHoldingMedical className="cursor-pointer transition-all text-5xl" />
                    <p className="text-lg border-t white">Osztályok</p>
                </NavLink>
                <NavLink
                    to={"/api/dashboard/users/posts"}
                    className="group flex flex-col h-32 w-32 focus:bg-teal-600 focus:border-4 focus:border-orange-500 border-4 border-transparent text-white text-2xl bg-teal-800 hover:bg-teal-600 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                >
                    <FaBriefcaseMedical className="cursor-pointer transition-all text-5xl" />
                    <p className="text-lg border-t white">Beosztások</p>
                </NavLink>

            </div>

            <Outlet />

        </section>
    )
}

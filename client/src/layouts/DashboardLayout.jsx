


import { Outlet, NavLink } from "react-router-dom";
import { FaHospitalAlt, FaEnvelope, FaBars, FaSignOutAlt, FaUsers, FaUser, FaRegCalendarAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import DefaultImage from "../assets/default-image.png";
import Footer from "../components/Footer";
import { Dna } from "react-loader-spinner";
import { DataContext } from "../context/DataContext";




export default function DashboardLayout() {

    const [active, setActive] = useState(false);
    const { admin, profileImage } = useContext(DataContext);
    
    const handleLogout = () => {
        const quit = confirm("Biztos ki szeretne lépni?");
        if (quit) {
            localStorage.clear();
        }
    }

    return (
        <>
            {!admin
                ? <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                />
                :
                <div className="w-full min-h-screen z-20">
                    <header className="w-full bg-teal-800">
                        <nav className="flex max-md:flex-col max-sm:gap-4 justify-between p-4">
                            <div className="w-full flex justify-between">
                                <div className="flex gap-2">
                                    <div className="rounded-full w-12 h-12 overflow-hidden border-2 border-white flex items-center">
                                        <img src={profileImage ? profileImage : DefaultImage} alt="profile-image" className=" bg-gray-200" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-xl text-white font-bold italic border-b-2 border-orange-500">{admin.employee.lastName} {admin.employee.firstName}</p>
                                    </div>
                                </div>
                                <button className="group p-2 rounded-lg border-4 border-gray-300 text-gray-700 min-[768px]:hidden hover:border-red-300 transition-all" type="button" onClick={() => setActive(!active)}>
                                    <FaBars className="text-3xl text-gray-300 group-hover:text-red-500 transition-all" />
                                </button>
                            </div>
                            {
                                active ?
                                    <ul id="menu-list" className="flex flex-col text-white text-xl w-full pl-2 pt-2 indent-2">
                                        <li className="flex items-center p-2 hover:text-black hover:border-y-2 hover:border-gray-300 hover:indent-4 hover:bg-slate-200 hover:font-bold border-y-2 border-transparent transition-all cursor-pointer">
                                            <FaHospitalAlt />
                                            <NavLink to={"/api/dashboard/home/news"} className={"w-full h-full"} onClick={() => setActive(false)} >Kezdőlap</NavLink>
                                        </li>
                                        <li className="flex items-center p-2 hover:text-black hover:border-y-2 hover:border-gray-300 hover:indent-4 hover:bg-slate-200 hover:font-bold border-y-2 border-transparent transition-all cursor-pointer">
                                            <FaUsers />
                                            <NavLink to={"/api/dashboard/users/alluser"} className={"w-full h-full"} onClick={() => setActive(false)} >Nyílvántartás</NavLink>
                                        </li>
                                        <li className="flex items-center p-2 hover:text-black hover:border-y-2 hover:border-gray-300 hover:indent-4 hover:bg-slate-200 hover:font-bold border-y-2 border-transparent transition-all cursor-pointer">
                                            <FaRegCalendarAlt />
                                            <NavLink to={`/api/dashboard/calendar/${admin.employee._id}`} className={"w-full h-full"} onClick={() => setActive(false)} >Naptáram</NavLink>
                                        </li>
                                        <li className="flex items-center p-2 hover:text-black hover:border-y-2 hover:border-gray-300 hover:indent-4 hover:bg-slate-200 hover:font-bold border-y-2 border-transparent transition-all cursor-pointer">
                                            <FaUser />
                                            <NavLink to={`/api/dashboard/profile/${admin.employee._id}`} className={"w-full h-full"} onClick={() => setActive(false)} >Profilom</NavLink>
                                        </li>
                                        <li className="flex items-center p-2 hover:text-black hover:border-y-2 hover:border-gray-300 hover:indent-4 hover:bg-slate-200 hover:font-bold border-y-2 border-transparent transition-all cursor-pointer">
                                            <FaSignOutAlt />
                                            <NavLink className={"w-full h-full"} onClick={() => { setActive(false); handleLogout(); }} >Kilépés</NavLink>
                                        </li>
                                    </ul>
                                    :
                                    null
                            }
                        </nav>
                    </header>

                    <main className="flex min-h-screen max-md:flex-col bg-slate-200 overflow-hidden">
                        <aside className="max-md:py-0 py-6 border-r-2 border-gray-300">
                            <nav className="w-52 max-md:w-full mt-14 max-md:mt-0">
                                <ul id="menu-list" className="flex flex-col text-xl w-full pl-2 indent-2 max-md:hidden">
                                    <li className="group flex items-center hover:indent-4 hover:bg-white hover:font-bold border-y-2 border-transparent transition-all cursor-pointer">
                                        <NavLink to={"/api/dashboard/home/news"} className={"flex items-center p-2 w-full h-full"} >
                                            <FaHospitalAlt />
                                            Kezdőlap
                                        </NavLink>
                                    </li>
                                    <li className="flex items-center hover:indent-4 hover:bg-white hover:font-bold border-y-2 border-transparent transition-all cursor-pointer">
                                        <NavLink to={"/api/dashboard/users/alluser"} className={"flex items-center p-2 w-full h-full"} >
                                            <FaUsers />
                                            Nyílvántartás
                                        </NavLink>
                                    </li>
                                    <li className="flex items-center hover:indent-4 hover:bg-white hover:font-bold border-y-2 border-transparent transition-all cursor-pointer">
                                        <NavLink to={`/api/dashboard/calendar/${admin.employee._id}`} className={"flex items-center p-2 w-full h-full"} >
                                            <FaRegCalendarAlt />
                                            Naptáram
                                        </NavLink>
                                    </li>
                                    <li className="flex items-center hover:indent-4 hover:bg-white hover:font-bold border-y-2 border-transparent transition-all cursor-pointer">
                                        <NavLink to={`/api/dashboard/profile/${admin.employee._id}`} className={"flex items-center p-2 w-full h-full"} >
                                            <FaUser />
                                            Profilom
                                        </NavLink>
                                    </li>
                                    <li className="flex items-center hover:indent-4 hover:bg-white hover:font-bold border-y-2 border-transparent transition-all cursor-pointer">
                                        <NavLink to={"/api/dashboard/logout"} className={"flex items-center p-2 w-full h-full"} onClick={handleLogout} >
                                            <FaSignOutAlt />
                                            Kilépés
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </aside>

                        <div className="flex justify-center w-full ">
                            <Outlet />
                        </div>

                    </main>

                    <Footer />

                </div>
            }
        </>
    )
}

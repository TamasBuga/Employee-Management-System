


import { useContext } from "react";
import uuid from "react-uuid";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Dna } from "react-loader-spinner";

import InfoCard from "../components/InfoCard";
import { DataContext } from "../context/DataContext";



export default function Departments() {

    const { departments, admin : user } = useContext(DataContext);

    return (
        <>
            {user.role.type === "SUPER_ADMIN"
                ? <div className="flex gap-2">
                    <NavLink
                        to={"/api/dashboard/users/add/department"}
                        className="group ml-4 flex flex-col text-center h-32 w-32 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                    >
                        <FaPlus className="cursor-pointer transition-all text-5xl" />
                        <p className="text-lg border-t white font-bold">Új Osztály</p>
                    </NavLink>
                </div>
                : null
            }


            <div className="w-full flex flex-col justify-between p-4">
                <div className="w-full flex flex-wrap items-start gap-8">
                    {departments
                        ? departments.map(dep => {
                            return (
                                <InfoCard key={uuid()} props={dep} item={"department"} />
                            )
                        })

                        : <Dna
                            visible={true}
                            height="100"
                            width="100"
                            ariaLabel="dna-loading"
                        />
                    }


                </div>
            </div>
        </>
    )
}

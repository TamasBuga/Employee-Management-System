

import { NavLink } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import UserCard from "../components/UserCard";
import uuid from "react-uuid";
import { Dna } from "react-loader-spinner";
import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";



export default function AllUser() {

    const { employees, departments } = useContext(DataContext);
    const [search, setSearch] = useState();
    const departmentList = () => {
        const groups = [];
        for (let i = 0; i < departments.length; i++) {
            let obj = {};
            obj.departmentName = departments[i].value;
            obj.employees = employees.filter(emp => emp.department.option === departments[i].option);
            if (obj.employees.length > 0) {
                groups.push(obj);
            }
        }
        return groups;
    }


    return (
        <>
            <div className="flex gap-2 mb-10">
                <NavLink
                    to={"/api/dashboard/users/adduser"}
                    className="group ml-4 flex flex-col h-32 w-32 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                >
                    <FaPlus className="cursor-pointer transition-all text-5xl" />
                    <p className="text-lg border-t white font-bold">Új személy</p>
                </NavLink>

                <NavLink
                    to={"/api/dashboard/users/searchuser"}
                    className="group ml-4 flex flex-col h-32 w-32 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                >
                    <FaSearch className="cursor-pointer transition-all text-5xl" />
                    <p className="text-lg border-t white font-bold">Keresés</p>
                </NavLink>
            </div>
            <div className="flex flex-wrap gap-8">
                {!employees
                    ? <Dna
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                    />
                    : departmentList().map(department => {
                        return (
                            <div key={uuid()} className="flex w-full flex-col gap-4 p-4 border-t border-teal-800">
                                <h2 className="text-4xl italic tracking-widest font-bold text-black">{department.departmentName}</h2>
                                <div className="flex flex-wrap gap-4 max-sm:justify-center">
                                    {department.employees.map(employee => {
                                        return (
                                            <UserCard key={uuid()} user={employee} />
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

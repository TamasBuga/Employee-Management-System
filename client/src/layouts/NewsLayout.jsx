

import { Outlet } from "react-router-dom";
import Header from "../components/Header";


export default function UsersLayout() {

    return (
        <section className="w-full flex flex-col gap-8">
            
            <Outlet />

        </section>
    )
}

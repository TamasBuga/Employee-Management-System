

import { Outlet } from "react-router-dom";


export default function UsersLayout() {

    return (
        <section className="w-full flex flex-col gap-8">
            
            <Outlet />

        </section>
    )
}

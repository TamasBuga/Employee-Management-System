


import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


export default function NotFind() {
    const navigate = useNavigate();

    useEffect(() => {
        const local = localStorage.getItem("user");
        if (local) {
            navigate('/api/dashboard/home/news')
        } else {
            navigate('/')
        }
    }, [])

    return (
        <div>Hiba történt!</div>
    )
}

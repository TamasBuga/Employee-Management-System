


import { FaUserEdit, FaPhone, FaBriefcaseMedical, FaUserLock, FaHandHoldingMedical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DefaultImage from "../assets/default-image.png";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";


export default function UserCard({ user }) {

    const { admin, profileImage } = useContext(DataContext);
    const [image, setImage] = useState();
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/api/dashboard/users/useredit/${user._id}`);
    }

    useEffect(() => {
        const fetchImage = async () => {
            if (user._id === admin.employee._id) {
                setImage(profileImage)
            } else {
                await axios.get(`http://localhost:3000/api/v1/upload/:${user.image}`, { responseType: "blob", withCredentials: true })
                    .then(data => {
                        const reader = new FileReader();
                        reader.readAsDataURL(data.data);
                        reader.onload = function (e) {
                            setImage(e.target.result);
                        }
                    })
                    .catch(error => alert("Hiba történt a kép betöltésénél! " + error.message));
            }
        }
        if (user.image !== undefined) {
            fetchImage();
        }
    }, [])

    return (
        <article className="flex flex-col w-[260px] shadow-xl bg-white">
            <div className="flex justify-center w-full h-24 bg-teal-800 relative">
                {image
                    ? <img src={image} alt="user-image" className="w-32 h-32 rounded-full absolute top-6" />
                    : <img src={DefaultImage} alt="user-image" className="w-32 h-32 rounded-full absolute top-6" />
                }
            </div>
            <div className="flex flex-col justify-center items-center gap-4 py-10">
                <h2 className="italic text-4xl text-center mt-6 text-slate-400">{user.lastName} {user.firstName}</h2>
                <div className="flex items-center gap-2 text-xl">
                    <FaHandHoldingMedical className="transition-all" />
                    <p className="font-bold">{user.department.value}</p>
                </div>
                <div className="flex items-center gap-2 text-xl">
                    <FaBriefcaseMedical className="transition-all" />
                    <p className="font-bold">{user.post.value}</p>
                </div>
                <div className="flex items-center gap-2 text-xl ">
                    <FaPhone className="transition-all" />
                    <p className="font-bold">{user.companyPhone ? user.companyPhone : user.phone}</p>
                </div>
                <button
                    className="group p-1 flex flex-col h-14 w-14 border-4 border-transparent text-white text-3xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer"
                    onClick={handleEdit}
                >
                    <FaUserEdit className="transition-all" />
                </button>

                {admin.role.type === "SUPER_ADMIN"
                    ? <button
                        className="group p-1 flex flex-col h-14 w-14 border-4 border-transparent text-white text-3xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer"
                        onClick={() => navigate(`/api/dashboard/users/register/${user._id}`)}
                    >
                        <FaUserLock className="transition-all" />
                    </button>
                    : null
                }
            </div>
        </article>
    )
}

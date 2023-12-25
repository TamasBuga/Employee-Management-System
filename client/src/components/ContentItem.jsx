


import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import { formatDate } from "../lib/common";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt, FaArrowDown, FaArrowUp } from "react-icons/fa";


export default function ContentItem({
    data,
    user
}) {


    const { admin } = useContext(DataContext);
    const [itemImage, setItemImage] = useState();
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/api/dashboard/home/news/${data._id}`);
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`http://localhost:3000/api/v1/upload/:${data.image}`, { responseType: "blob", withCredentials: true })
                .then(data => {
                    const reader = new FileReader();
                    reader.readAsDataURL(data.data);
                    reader.onload = function (e) {
                        setItemImage(e.target.result);
                    }
                })
                .catch(error => alert("Hiba történt a kép betöltésénél! " + error.message));
        }
        if (data.image) {
            fetchData();
        }
    }, [])


    return (
        <article className="flex flex-col max-w-[410px] relative shadow-xl bg-white">
            {itemImage
                ? <img src={itemImage} alt="content-image" className="w-full h-auto" />
                : <span className="w-full h-64 bg-slate-400"></span>
            }
            {user._id === admin.employee._id
                ? <button
                    className="group absolute top-2 right-2 p-1 flex flex-col h-10 w-10 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer"
                    onClick={handleEdit}
                >
                    <FaPencilAlt className="cursor-pointer transition-all text-2xl" />
                </button>
                : null
            }
            <p className="pt-2 pl-2 italic font-bold text-lg tracking-widest text-slate-400">{formatDate(data.createdAt)}</p>
            <div className="w-full flex flex-col">
                <h2 className="p-4 max-sm:p-4 text-3xl italic font-bold text-black">{data.title}</h2>
            </div>
            {showMore
                ? <p className="indent-8 text-justify text-lg font-medium p-4">{data.description}</p>
                : null
            }
            <div className="flex items-center justify-between">
                <button
                    className="group flex flex-col h-10 w-10 m-4 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                >
                    {showMore
                        ? <FaArrowUp onClick={() => setShowMore(false)} className="cursor-pointer transition-all text-5xl" />
                        : <FaArrowDown onClick={() => setShowMore(true)} className="cursor-pointer transition-all text-5xl" />
                    }
                </button>
                <p className="italic font-bold text-lg tracking-widest mr-4 text-slate-400">{user.lastName} {user.firstName}</p>
            </div>
        </article>
    )
}

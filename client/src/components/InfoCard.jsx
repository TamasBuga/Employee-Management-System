

import React, { useContext, useState } from 'react';
import { FaPencilAlt, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';


export default function InfoCard({ props, item }) {

    const { admin } = useContext(DataContext);
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);
    const handleEdit = () => {
        navigate(`/api/dashboard/users/edit/${item}/${props._id}`);
    }


    return (
        <article className="flex flex-col w-[410px] relative shadow-xl bg-white">
            <div className="flex">
                <div className="grid relative w-[120px] h-[120px]">
                    {admin.role.type === "SUPER_ADMIN"
                        ? <button
                            className="group absolute left-2 top-2 p-1 flex flex-col h-10 w-10 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer"
                            onClick={handleEdit}
                        >
                            <FaPencilAlt className="cursor-pointer transition-all text-2xl" />
                        </button>
                        : null
                    }

                    {props.image
                        ? <img src={props.image} alt="department-image" className="w-full h-full" />
                        : <span className="w-full h-full bg-teal-800" ></span>
                    }
                </div>
                <div className="p-4 flex flex-col gap-2">
                    <h2 className="text-3xl italic font-bold text-black border-b border-teal-800">{props.value}</h2>
                    <p className="text-xl">{props.code}</p>
                </div>
            </div>
            {showMore
                ? <p className="indent-8 text-justify text-lg font-medium px-4 pt-8 pb-12">{props.description}</p>
                : null
            }
            <button
                className="group absolute bottom-2 right-2 flex h-10 w-10 text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
            >
                {showMore
                    ? <FaArrowUp onClick={() => setShowMore(false)} className="cursor-pointer transition-all text-5xl" />
                    : <FaArrowDown onClick={() => setShowMore(true)} className="cursor-pointer transition-all text-5xl" />
                }
            </button>
        </article>
    )
}

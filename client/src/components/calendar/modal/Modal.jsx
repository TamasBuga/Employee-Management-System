

import { useContext, useEffect, useState } from "react";
import { FaRegTimesCircle , FaRegPlusSquare } from "react-icons/fa";

import { formatDate } from "../../../lib/common";
import ListOfEvents from "./ListOfEvents";
import EventEditor from "./EventEditor";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../context/DataContext";



export default function Modal({ date, setIsOpen }) {

    const { id } = useParams();
    const { events } = useContext(DataContext);
    const [listOfEvents, setListOfEvents] = useState([]);
    const [addEvent, setAddEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            const getEvents = await events.filter(event => event.userID === id && formatDate(date) === formatDate(event.date));
            setListOfEvents(getEvents);
        }
        fetchEvents();
    }, [events])


    return (
        <div className="fixed z-20 left-0 top-0 flex flex-col items-center w-full min-h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-75">
            <div className="absolute top-[10%] z-30 max-sm:w-full max-w-xl w-[560px] items-center flex flex-col gap-4 bg-slate-200 shadow-2xl overflow-hidden">
                <div className="w-full flex justify-between px-2 bg-teal-800 p-4">
                    <h1 className="text-3xl indent-4 font-bold italic text-slate-300">
                        {formatDate(date)}
                    </h1>
                    <button className="cursor-pointer"
                        onClick={() => setIsOpen(false)}>
                        <FaRegTimesCircle  className="text-3xl text-white font-bold hover:text-red-500 transition-all" />
                    </button>
                </div>
                <div className="flex flex-col gap-8 min-h-[220px] w-full max-w-md items-center pb-10">

                    {addEvent ?
                        <EventEditor eventDate={date} userID={id} event={selectedEvent} addEvent={addEvent} setAddEvent={setAddEvent} />
                        :
                        <>
                            <div className="flex flex-col gap-2">
                                <ListOfEvents events={listOfEvents} setSelectedEvent={setSelectedEvent} setAddEvent={setAddEvent} />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    className="group flex flex-col h-32 w-32 focus:bg-teal-600 focus:border-4 focus:border-orange-500 border-4 border-transparent text-white text-2xl bg-teal-800 hover:bg-teal-600 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                                    onClick={() => {
                                        setAddEvent(true);
                                        setSelectedEvent({});
                                    }}
                                >
                                    <FaRegPlusSquare className="cursor-pointer transition-all text-5xl" />
                                    <p className="text-lg border-t white">Új Esemény</p>
                                </button>
                                <button className="group flex flex-col h-32 w-32 focus:bg-teal-600 focus:border-4 focus:border-orange-500 border-4 border-transparent text-white text-2xl bg-teal-800 hover:bg-teal-600 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                                    onClick={() => setIsOpen(false)}>
                                    <FaRegTimesCircle className="cursor-pointer transition-all text-5xl" />
                                    <p className="text-lg border-t white">Bezárás</p>
                                </button>
                            </div>
                        </>
                    }


                </div>
            </div>
        </div>
    )
}

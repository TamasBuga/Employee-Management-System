

import { FaRegCalendar } from "react-icons/fa";
import uuid from "react-uuid";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { formatDate } from "../../lib/common";
import { DataContext } from "../../context/DataContext";



function DateItem({ day, setSelectedDate, isWrapped, style, isOpen, setIsOpen }) {

    const { id } = useParams();
    const { events } = useContext(DataContext);
    const currentDate = formatDate(new Date(day.year, day.month - 1, day.date));
    const wrappedSytle = isWrapped ? "flex flex-wrap gap-2" : "flex flex-col w-full overflow-y-auto";
    const [currentEvents, setCurrentEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const getEvents = await events?.filter(event => (formatDate(event.date) === currentDate) && (event.userID === id));
            setCurrentEvents(getEvents);
        }
        fetchEvents();
    }, [])


    // Calendar Cell Component
    function DisplayDate() {
        if (isWrapped) {
            return (
                <span className="flex text-lg w-20 h-20 justify-center items-center relative" >
                    <p className="absolute mt-4 font-bold text-2xl bg-white w-11 h-10 rounded-md text-center">{day.date}.</p>
                    <FaRegCalendar className="absolute text-6xl" />
                </span>
            )
        }
        return (
            <div className="w-full flex justify-between">
                <span className="text-gray-500 italic indent-4">{day.date}.</span>
                {currentEvents && currentEvents.length > 0 ?
                    <span className="text-white text-xs italic rounded-full bg-red-500 p-1 px-2 shadow-md">{currentEvents.length}</span>
                    :
                    null
                }
            </div>
        )
    }


    // Calendar Cell Event
    function EventItem({ item }) {
        if (isWrapped) {
            return (
                <p key={uuid()} className="text-ellipsis p-2 shadow-md text-md text-center font-bold border border-black transition-all"
                    style={{ backgroundColor: item.color }}
                >
                    {item.title}
                </p>
            )
        }
        return (
            <div key={uuid()} className="w-full text-ellipsis overflow-hidden">
                <p className="text-ellipsis rounded-sm shadow-sm text-sm text-center border border-black hover:scale-105 transition-all" style={{ backgroundColor: item.color }}>
                    {item.title}
                </p>
            </div>
        )
    }

    // List of events in calendar cell
    function ListOfEvents({ events }) {
        return (
            <div className={wrappedSytle}>
                {events?.map((item) => {
                    return (
                        <EventItem key={uuid()} item={item} />
                    )
                })}
            </div>)
    }


    // Return DateItem Component
    return (
        <div
            className={style}
            onClick={(e) => {
                e.stopPropagation();
                setSelectedDate(day.dateString())
                setIsOpen(!isOpen);
            }}
        >
            <DisplayDate />
            <div className="overflow-y-auto">
                <ListOfEvents events={currentEvents} />
            </div>
        </div>
    )

}


export default DateItem;
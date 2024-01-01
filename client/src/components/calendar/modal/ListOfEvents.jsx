

import uuid from "react-uuid";
import { FaEdit } from "react-icons/fa";
import { formatTime } from "../../../lib/common";


function InputItem({
    event,
    setSelectedEvent,
    setAddEvent
}) {

    return (
        <div className="w-full max-w-sm flex gap-2 items-center justify-between shadow-md text-lg p-4 border-4 border-white" style={{ backgroundColor: event.color }}>
            <div className="flex flex-col gap-2">
                <p className="font-bold underline">{event.title}</p>
                <p className="">{event.description}</p>
                <p>{formatTime(event.startHour)}:{formatTime(event.startMinute)} - {formatTime(event.endHour)}:{formatTime(event.endMinute)}</p>
            </div>
            <button type="button" className="flex justify-center" onClick={() => {
                setAddEvent(true);
                setSelectedEvent(event);
            }}>
                <FaEdit className="cursor-pointer hover:text-red-500 transition-all text-xl" />
            </button>
        </div>
    )
}


export default function ListOfEvents({ events, setSelectedEvent, setAddEvent }) {
    return ( 
        <>
            {events?.map(event => {
                return (
                    <InputItem
                        key={uuid()}
                        event={event}
                        setSelectedEvent={setSelectedEvent}
                        setAddEvent={setAddEvent}
                    />
                )
            })}
        </>
    )
}

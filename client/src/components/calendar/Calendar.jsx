

import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";

import CalendarSheet from "./CalendarSheet";
import CalendarItem from "./CalendarItem";
import Modal from "./modal/Modal";
import uuid from "react-uuid";


export default function Calendar() {

    const months = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
    const weekDays = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const handleDate = (year, month) => {
        const updateYear = currentDate.getFullYear() + year;
        const updateMonth = currentDate.getMonth() + month;
        const date = new Date(updateYear, updateMonth);
        setCurrentDate(date);
    }


    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""
    }, [isOpen]);



    function WeekdayItem({ text }) {
        return <span className="flex justify-center items-center font-bold border border-gray-400 p-2">{text}</span>
    }



    function WideCalendar({ currentDate }) {

        const Calendar = CalendarSheet({ currentDate });

        return (
            <>
                {Calendar.map(item => {
                    return (
                        <div key={uuid()} className="grid grid-cols-8">
                            <div className="flex flex-col font-bold border border-gray-400 w-full h-full">{""}</div>
                            {
                                item.map((day) => {
                                    const style = `group flex flex-col font-bold border ${day.isCurrent ? "bg-white" : "bg-gray-300"} hover:bg-gray-200 border-gray-400 w-full min-h-[92px] max-h-[102px] transition-all cursor-pointer`;
                                    return (
                                        <CalendarItem
                                            key={uuid()}
                                            day={day}
                                            setSelectedDate={setSelectedDate}
                                            isWrapped={false}
                                            style={style}
                                            isOpen={isOpen}
                                            setIsOpen={setIsOpen}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </>
        )
    }



    function WrappedCalendar({ currentDate }) {

        const Calendar = CalendarSheet({ currentDate });

        return (
            <>
                {Calendar.map(item => {
                    return (
                        <div key={uuid()} className="flex flex-col gap-4">
                            {
                                item.map((day) => {
                                    const style = "grid user-date-grid bg-gray-300 gap-2 hover:scale-105 hover:bg-gray-600 cursor-pointer border border-transparent shadow-lg transition-all";
                                    if (day.isCurrent) {
                                        return (
                                            <CalendarItem
                                                key={uuid()}
                                                day={day}
                                                setSelectedDate={setSelectedDate}
                                                isWrapped={true}
                                                style={style}
                                                isOpen={isOpen}
                                                setIsOpen={setIsOpen}
                                            />
                                        )
                                    }
                                })
                            }
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <div className="max-w-7xl p-4">
            <div className="flex flex-col items-center gap-4 mb-8">
                <div className="flex items-center justify-between w-60">
                    <span className="text-4xl text-gray-400 hover:text-red-400 transition-all cursor-pointer">
                        <FaRegArrowAltCircleLeft onClick={() => handleDate(-1, 0)} />
                    </span>
                    <h3 className="text-3xl font-bold text-gray-400">{currentDate.getFullYear()}</h3>
                    <span className="text-4xl text-gray-400 hover:text-red-400 transition-all cursor-pointer">
                        <FaRegArrowAltCircleRight onClick={() => handleDate(1, 0)} />
                    </span>
                </div>
                <div className="flex items-center justify-between w-60">
                    <span className="text-4xl text-gray-400 hover:text-red-400 transition-all cursor-pointer">
                        <FaRegArrowAltCircleLeft onClick={() => handleDate(0, -1)} />
                    </span>
                    <h3 className="text-3xl italic">{months[currentDate.getMonth()]}</h3>
                    <span className="text-4xl text-gray-400 hover:text-red-400 transition-all cursor-pointer">
                        <FaRegArrowAltCircleRight onClick={() => handleDate(0, 1)} />
                    </span>
                </div>
            </div>

            <div className="w-full h-full max-sm:hidden">
                <div className="w-full grid grid-rows-1 max-sm:text-md">
                    <div className="grid grid-cols-8 bg-teal-800 text-white">
                        <WeekdayItem text={""} />
                        <WeekdayItem text={weekDays[1].slice(0, 3)} />
                        <WeekdayItem text={weekDays[2].slice(0, 3)} />
                        <WeekdayItem text={weekDays[3].slice(0, 3)} />
                        <WeekdayItem text={weekDays[4].slice(0, 3)} />
                        <WeekdayItem text={weekDays[5].slice(0, 3)} />
                        <WeekdayItem text={weekDays[6].slice(0, 3)} />
                        <WeekdayItem text={weekDays[0].slice(0, 3)} />
                    </div>
                </div>


                {/* FOR WIDE SCREENS */}
                <div className="w-full grid grid-rows-6 max-sm:text-md">
                    <WideCalendar currentDate={currentDate} />
                </div>
            </div>

            {/* WRAPPED CALENDAR */}
            <div className="flex flex-col gap-4 min-[640px]:hidden">
                <WrappedCalendar currentDate={currentDate} />
            </div>

            {isOpen ?
                <Modal
                    date={selectedDate}
                    setIsOpen={setIsOpen}
                />
                :
                null
            }

        </div>
    )
}



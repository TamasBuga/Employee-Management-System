
import { useContext, useState } from "react";
import { Formik, Form } from "formik";
import { FaSave, FaTrashAlt, FaRegClock, FaClock, FaPaintBrush, FaPencilAlt, FaArrowLeft } from "react-icons/fa";
import uuid from "react-uuid";
import UserInput from "../../Inputs";
import { colors } from "../../../lib/colors";
import { eventSchema } from "../../../lib/schemas";
import { isEmpty } from "../../../lib/common";
import axios from "axios";
import { DataContext } from "../../../context/DataContext";




function ColorPalette({ setNewColor }) {
    return (
        <div className="flex flex-wrap w-full justify-center gap-2">
            {
                colors.map(color => {
                    return (
                        <button
                            key={uuid()}
                            className="p-4 hover:ring-4 rounded-full border-2 border-white shadow-md transition-all"
                            style={{ backgroundColor: color.color }}
                            onClick={() => setNewColor(color.color)}
                            type="button">

                        </button>
                    )
                })
            }
        </div>
    )
}


export default function EventEditor({
    setAddEvent,
    event,
    userID,
    eventDate
}) {

    const [newColor, setNewColor] = useState(event.color || colors[Math.floor(Math.random() * (colors.length - 1))].color);
    const { setEvents } = useContext(DataContext);
    const handleDelete = async (item) => {
        await axios.delete(`http://localhost:3000/api/v1/events/:${item._id}`, { withCredentials: true })
            .then(() => console.log("Event deleted"))
            .catch(error => console.log(error));
        await axios.get("http://localhost:3000/api/v1/events/")
            .then(data => {
                setEvents(data.data.events)
            })
            .catch(error => console.log(error));
    }
    const handleSubmit = async (values, actions) => {
        try {
            actions.setSubmitting(true);
            const eventData = {
                ...values,
                date: eventDate,
                userID: userID,
                color: newColor
            }
            if (!isEmpty(event)) {
                await axios.put(`http://localhost:3000/api/v1/events/:${event._id}`, eventData, { withCredentials: true });
                console.log("Event updated!");
            } else {
                await axios.post(`http://localhost:3000/api/v1/events/add-event`, eventData, { withCredentials: true });
                console.log("Event created!");
            }
            await axios.get("http://localhost:3000/api/v1/events/")
                .then(data => {
                    setEvents(data.data.events)
                })
                .catch(error => console.log(error));
        } catch (error) {
            console.log(error);
        } finally {
            actions.setSubmitting(false);
            setAddEvent(false);
        }
    }


    return (
        <Formik
            initialValues={{
                title: event.title ?? 'Cím...',
                description: event.description ?? 'Leírás...',
                startHour: event.startHour ?? '0',
                startMinute: event.startMinute ?? '0',
                endHour: event.endHour ?? '0',
                endMinute: event.endMinute ?? '0'
            }}
            onSubmit={handleSubmit}
            validationSchema={eventSchema}
        >{({
            handleChange,
            handleBlur,
            values,
            isSubmitting
        }) => (

            <Form className="flex flex-col w-full gap-4">

                <div className="flex flex-col w-full gap-4 p-4 border-4 border-white" style={{ backgroundColor: newColor }}>


                    <div className="grid grid-cols-calModalField">
                        <div className="flex gap-1">
                            <FaPencilAlt className="text-xl" />
                            <label htmlFor="title" className="font-bold">Cím</label>
                        </div>
                        <UserInput
                            label={null}
                            type="text"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            values={values.title}
                            className="text-lg font-bold text-center py-1"
                        />
                    </div>

                    <div className="grid grid-cols-calModalField">
                        <div className="flex gap-1">
                            <FaPencilAlt className="text-xl" />
                            <label htmlFor="description" className="font-bold">Leírás</label>
                        </div>
                        <UserInput
                            label={null}
                            type="text-area"
                            name="description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            values={values.description}
                            rows="4"
                            className="text-lg font-bold text-center py-1"
                        />
                    </div>

                    <div className="grid grid-cols-calModalField">
                        <div className="flex gap-1 items-center">
                            <FaRegClock className="text-xl" />
                            <label htmlFor="startHour" className="font-bold">Mettől</label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <UserInput
                                label={null}
                                type="select"
                                name="startHour"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                values={Time.Hours}
                                className="text-lg font-bold text-center py-1"
                            />
                            <p className="font-bold">:</p>
                            <UserInput
                                label={null}
                                type="select"
                                name="startMinute"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                values={Time.Minutes}
                                className="text-lg font-bold text-center py-1"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-calModalField">
                        <div className="flex gap-1 items-center">
                            <FaClock className="text-xl" />
                            <label htmlFor="endHour" className="font-bold">Meddig</label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <UserInput
                                label={null}
                                type="select"
                                name="endHour"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                values={Time.Hours}
                                className="text-lg font-bold text-center py-1"
                            />
                            <p className="font-bold">:</p>
                            <UserInput
                                label={null}
                                type="select"
                                name="endMinute"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                values={Time.Minutes}
                                className="text-lg font-bold text-center py-1"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-calModalField">
                        <span className="flex gap-2">
                            <FaPaintBrush className="text-xl" />
                            <p className="font-bold">Szín:</p>
                        </span>
                        <ColorPalette setNewColor={setNewColor} />
                    </div>
                </div>

                <div className="flex flex-wrap justify-between p-2 gap-2">
                    <button className="group flex flex-col h-32 w-32 focus:bg-teal-600 focus:border-4 focus:border-orange-500 border-4 border-transparent text-white text-2xl bg-teal-800 hover:bg-teal-600 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        <FaSave className="cursor-pointer transition-all text-5xl" />
                        <p className="text-lg border-t white">Mentés</p>
                    </button>
                    <button className="group flex flex-col h-32 w-32 focus:bg-teal-600 focus:border-4 focus:border-orange-500 border-4 border-transparent text-white text-2xl bg-teal-800 hover:bg-teal-600 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => {
                            setAddEvent(false);
                        }}>
                        <FaArrowLeft className="cursor-pointer transition-all text-5xl" />
                        <p className="text-lg border-t white">Vissza</p>
                    </button>

                    {!isEmpty(event) ?
                        <button className="group flex flex-col h-32 w-32 focus:bg-teal-600 focus:border-4 focus:border-orange-500 border-4 border-transparent text-white text-2xl bg-teal-800 hover:bg-teal-600 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => {
                                handleDelete(event);
                                setAddEvent(false);
                            }}>
                            <FaTrashAlt className="cursor-pointer transition-all text-5xl" />
                            <p className="text-lg border-t white">Törlés</p>
                        </button>
                        :
                        null
                    }
                </div>

            </Form>
        )}
        </Formik>
    )

}

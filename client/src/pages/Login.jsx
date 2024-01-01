


import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaUser, FaUnlockAlt } from "react-icons/fa";
import axios from "axios";
import { loginSchema } from "../lib/schemas";
import { useNavigate } from "react-router-dom";
import { useState } from "react";




export default function Login() {

    const navigate = useNavigate();
    const [error, setError] = useState("");

    return (
        <div className="relative max-sm:w-full w-96 z-20">
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);
                    try {
                        const request = await axios.post('http://localhost:3000/api/v1/login', values, { withCredentials: true });
                        const data = await request.data;

                        if (request.statusText === "OK") {
                            localStorage.setItem("user", JSON.stringify(data));
                            navigate("/api/dashboard/home/news");
                        }
                    } catch (error) {
                        setError(error.response.data);
                    } finally {
                        actions.setSubmitting(false);
                    }
                }}
                validationSchema={loginSchema}
            >
                {({ isSubmitting }) => (
                    <Form className="w-full flex flex-col justify-center items-center gap-6 bg-slate-200 shadow-xl">

                        <h1 className="w-full p-4 text-4xl font-bold icalic text-white bg-teal-800 italic text-left mb-8">Bejelentkezés</h1>

                        <div className="flex flex-col">
                            <div className="flex shadow-lg">
                                <div className="group flex flex-col h-14 w-14 border-4 border-transparent text-white text-2xl bg-orange-500 gap-2 items-center justify-center transition-all shadow-lg">
                                    <FaUser className="transition-all text-5xl p-2" />
                                </div>
                                <Field
                                    name="username"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Felhasználónév"
                                    className={"w-full text-center text-lg text-black tracking-widest font-bold p-2 bg-white placeholder:text-slate-300"}
                                />
                            </div>
                            <ErrorMessage component="p" name="username" className={"text-center text-lg text-red-500 p-2 font-bold"} />
                        </div>

                        <div className="flex flex-col">
                            <div className="flex shadow-lg">
                                <div className="group flex flex-col h-14 w-14 border-4 border-transparent text-white text-2xl bg-orange-500 gap-2 items-center justify-center transition-all shadow-lg">
                                    <FaUnlockAlt className="transition-all text-5xl p-2" />
                                </div>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Jelszó"
                                    className={"w-full text-center text-lg text-black tracking-widest font-bold p-2 bg-white placeholder:text-slate-300"}
                                />
                            </div>
                            <ErrorMessage component="p" name="password" className={"text-center text-lg text-red-500 p-2 font-bold"} />
                        </div>

                        <div className="w-full flex flex-col text-center items-center mt-4">
                            <button
                                className="w-48 py-2 text-xl font-bold bg-teal-800 hover:bg-teal-600 shadow-lg text-white transition-all disabled:bg-gray-500 disabled:text-gray-300"
                                type="submit"
                                disabled={isSubmitting}>
                                Tovább
                            </button>
                            <div className="w-full flex flex-col my-2 text-center max-w-sm">
                                <p className={"text-center text-lg text-red-500 p-2 font-bold"}>{error}</p>
                            </div>
                        </div>


                    </Form>
                )}
            </Formik>
        </div>
    )
}




import { useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { Formik, Form } from "formik";
import { useEffect } from "react";
import axios from "axios";

import UserInput from "../components/Inputs";
import { registerSchema } from "../lib/schemas";


export default function Register() {

    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        if (!id) {
            navigate("/api/dashboard/home/news")
        }
    }, []);


    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                confirmPassword: ''
            }}
            onSubmit={async (values, actions) => {
                try {
                    actions.setSubmitting(true);
                    values.employee = id;
                    await axios.post("http://localhost:3000/api/v1/dashboard/admin", values, { withCredentials: true })
                        .then(() => {
                            navigate("/api/dashboard/users/alluser")
                        })
                        .catch(error => console.log(error));
                } catch (error) {
                    console.log(error);
                } finally {
                    actions.setSubmitting(false);
                    actions.resetForm();
                }

            }}
            validationSchema={registerSchema}
        >
            {({
                isSubmitting,
                values,
                handleBlur,
                handleChange
            }) => (

                <Form className="flex flex-col gap-6 p-6 justify-center">

                    {/* Username */}
                    <UserInput
                        label={"Felhasználónév"}
                        type={"text"}
                        name={"username"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        values={values.username}
                        className="w-full text-lg font-bold text-center py-2"
                    />

                    {/* Password */}
                    <UserInput
                        label={"Jelszó"}
                        type={"password"}
                        name={"password"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        values={values.password}
                        className="w-full text-lg font-bold text-center py-2"
                    />

                    {/* Confirm Password */}
                    <UserInput
                        label={"Jelszó újra"}
                        type={"password"}
                        name={"confirmPassword"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        values={values.confirmPassword}
                        className="w-full text-lg font-bold text-center py-2"
                    />

                    {/* Create new ROLE for an Employee */} 
                    <div className="w-full flex flex-col my-2 text-center items-center">
                        <button
                            className="group flex flex-col h-32 w-32 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg disabled:bg-slate-500"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            <FaSave className="cursor-pointer transition-all text-5xl" />
                            <p className="text-lg border-t white font-bold">Mentés</p>
                        </button>
                    </div>


                </Form>
            )}
        </Formik>
    )
}

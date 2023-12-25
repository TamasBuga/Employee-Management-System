


import React, { useContext, useEffect, useState } from 'react'
import { FaSave, FaArrowLeft, FaTrashAlt, FaNotesMedical } from "react-icons/fa";
import { Formik, Form } from "formik";
import UserInput from "../components/Inputs";
import { itemSchema } from "../lib/schemas";
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import axios from 'axios';
import { Dna } from "react-loader-spinner";


export default function EditItem() {


    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split("/");
    const pathLength = path.length;
    const [id, locate, handler] = [path[pathLength - 1], path[pathLength - 2], path[pathLength - 3]];
    const isEditing = [id, locate, handler].includes("edit");
    const isCreating = [id, locate, handler].includes("add");
    const isPost = [id, locate, handler].includes("post");
    const isDepartment = [id, locate, handler].includes("department");
    const { departments, posts, setDepartments, setPosts } = useContext(DataContext);
    const [itemValues, setItemValues] = useState();
    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true);


        if (id && isEditing && isDepartment) {
            await axios.put(`http://localhost:3000/api/v1/departments/:${id}`,
                values,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(() => alert(`A(z) ${values.value} osztály sikeresen módosítva!`))
                .catch(error => console.log(error))
                .finally(() => {
                    actions.setSubmitting(false)
                })


        } else if (id && isEditing && isPost) {
            await axios.put(`http://localhost:3000/api/v1/posts/:${id}`,
                values,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(() => alert(`A(z) ${values.value} beosztás sikeresen módosítva!`))
                .catch(error => console.log(error))
                .finally(() => {
                    actions.setSubmitting(false);
                })
        } else {


            if (isDepartment && isCreating) {
                await axios.post("http://localhost:3000/api/v1/departments/add-department",
                    values,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(async () => {
                        alert(`A(z) ${values.value} osztály sikeresen regisztrálva!`);
                        await axios.get("http://localhost:3000/api/v1/departments/",
                            { withCredentials: true }
                        ).then(data => {
                            setDepartments(data.data.departments);
                        }).catch(error => alert("Hiba történt! " + error.message));
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        actions.setSubmitting(false);
                        actions.resetForm();
                        navigate("/api/dashboard/users/departments");
                    })


            } else if (isPost && isCreating) {
                await axios.post("http://localhost:3000/api/v1/posts/add-post",
                    values,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(async () => {
                        alert(`A(z) ${values.value} beosztás sikeresen regisztrálva!`);
                        await axios.get("http://localhost:3000/api/v1/posts/",
                            { withCredentials: true }
                        ).then(data => {
                            setPosts(data.data.posts);
                        }).catch(error => alert("Hiba történt! " + error.message));
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        actions.setSubmitting(false);
                        actions.resetForm();
                        navigate("/api/dashboard/users/posts");
                    })
            }
        }
    }

    const handleDelete = async () => {
        const conf = confirm(`Biztos törli ezt? ${itemValues.value}`);

        if (conf) {


            if (id && isEditing && isDepartment) {
                await axios.delete(`http://localhost:3000/api/v1/departments/:${id}`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(async () => {
                        alert(`Az osztály sikeresen törölve!`);
                        await axios.get("http://localhost:3000/api/v1/departments/",
                            { withCredentials: true }
                        ).then(data => {
                            setDepartments(data.data.departments);
                        }).catch(error => alert("Hiba történt! " + error.message));
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        navigate("/api/dashboard/users/departments");
                    })


            } else if (id && isEditing && isPost) {
                await axios.delete(`http://localhost:3000/api/v1/posts/:${id}`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(async () => {
                        alert(`A beosztás sikeresen törölve!`);
                        await axios.get("http://localhost:3000/api/v1/posts/",
                            { withCredentials: true }
                        ).then(data => {
                            setPosts(data.data.posts);
                        }).catch(error => alert("Hiba történt! " + error.message));
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        navigate("/api/dashboard/users/posts");
                    })
            }
        }
    }

    useEffect(() => {
        const getItem = async () => {
            if (isPost) {
                const getPost = await posts.find(post => post._id === id);
                setItemValues(getPost);
            }
            if (isDepartment) {
                const getDepartment = await departments.find(dep => dep._id === id);
                setItemValues(getDepartment);
            }
        }
        if (id && (isDepartment || isPost)) {
            getItem();
        }
    }, [departments, posts]);


    return (
        <>
            {departments && posts
                ? <Formik
                    enableReinitialize
                    initialValues={{
                        value: itemValues ? itemValues.value : "",
                        option: itemValues ? itemValues.option : "",
                        code: itemValues ? itemValues.code : "",
                        description: itemValues ? itemValues.description : ""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={itemSchema}
                >{({
                    handleChange,
                    handleBlur,
                    values,
                    isSubmitting
                }) => (
                    <Form className="flex flex-col gap-4 p-4 my-10 max-w-lg">

                        <div className='flex gap-2 items-center'>
                            <FaNotesMedical className='text-3xl' />
                            <h2 className="text-3xl font-bold my-4">Adatok</h2>
                        </div>
                        <hr className="border my" />

                        <UserInput
                            label={"Megnevezés"}
                            type={"text"}
                            name={"value"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            values={values.value}
                            rows="6"
                            className="w-full text-lg font-bold text-center py-2"
                        />

                        <UserInput
                            label={"Mentés mint"}
                            type={"text"}
                            name={"option"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            values={values.option}
                            className="w-full text-lg font-bold text-center py-2"
                        />

                        <UserInput
                            label={"Kód"}
                            type={"text"}
                            name={"code"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            values={values.code}
                            className="w-full text-lg font-bold text-center py-2"
                        />

                        <div className="flex flex-col gap-2">
                            <p className="text-2xl font-bold">Leírás</p>
                            <UserInput
                                label={"Leírás"}
                                type={"text-area"}
                                name={"description"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                values={values.description}
                                rows="10"
                                className="w-full text-lg font-bold text-center py-2 shadow-xl"
                            />
                        </div>

                        <div className='flex justify-between gap-4 max-sm:flex-col'>
                            <button
                                className="group flex flex-col h-32 w-32 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <FaSave className="cursor-pointer transition-all text-5xl" />
                                <p className="text-lg border-t white font-bold">Mentés</p>
                            </button>
                            <button
                                onClick={() => navigate(`/api/dashboard/users/${isPost ? "posts" : "departments"}`)}
                                className="group flex flex-col h-32 w-32 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                                type="button"
                            >
                                <FaArrowLeft className="cursor-pointer transition-all text-5xl" />
                                <p className="text-lg border-t white font-bold">Vissza</p>
                            </button>
                            {isEditing &&
                                <button
                                    onClick={handleDelete}
                                    className="group flex flex-col h-32 w-32 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                                    type="button"
                                >
                                    <FaTrashAlt className="cursor-pointer transition-all text-5xl" />
                                    <p className="text-lg border-t white font-bold">Törlés</p>
                                </button>
                            }
                        </div>

                        <hr className="border my" />

                    </Form>
                )}
                </Formik>

                : <Dna
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="dna-loading"
                />

            }
        </>
    )
}

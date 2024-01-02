

import { FaNotesMedical, FaSave, FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import { Dna } from "react-loader-spinner";
import axios from 'axios';

import UserInput from '../components/Inputs';
import { newschema } from "../lib/schemas";
import PreviewFile from '../components/PreviewFile';
import { DataContext } from '../context/DataContext';



export default function EditNews() {

    const { id } = useParams();
    const { news, setNews, admin } = useContext(DataContext);
    const navigate = useNavigate();
    const [newsItem, setNewsItem] = useState();
    const [selectedFile, setSelectedFile] = useState({
        file: undefined,
        previewURI: undefined
    });


    const handleSubmit = async (values, actions) => {
        const formValues = {
            ...values,
            userID: admin.employee._id
        }

        // Upload image
        if (selectedFile.file !== undefined) {

            const formData = new FormData();
            const fileName = Date.now() + "-" + admin.username;
            formData.append("image", selectedFile.file, fileName);

            const updateImage = await axios.post("http://localhost:3000/api/v1/upload/upload",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .catch(error => alert("A képet nem tudtuk feltölteni! " + error.message));
            formValues.image = updateImage.data.id;
        }

        // URL has id
        if (id) {
            // Update News
            await axios.put(`http://localhost:3000/api/v1/news/:${id}`, formValues, { withCredentials: true })
                .then(async data => {
                    await axios.get("http://localhost:3000/api/v1/news", { withCredentials: true })
                        .then(data => {
                            setNews(data.data.news);
                            actions.resetForm();
                            navigate("/api/dashboard/home/news");
                        })
                })
                .catch(error => alert("Hiba történt! " + error.message));
        } else {
            // Create News
            await axios.post('http://localhost:3000/api/v1/news/add-news', formValues, { withCredentials: true })
                .then(async data => {
                    await axios.get("http://localhost:3000/api/v1/news", { withCredentials: true })
                        .then(data => {
                            setNews(data.data.news);
                            actions.resetForm();
                            navigate("/api/dashboard/home/news");
                        })
                })
                .catch(error => alert("Hiba történt! " + error.message));
        }
    }

    const handleDelete = async () => {
        const conf = confirm("Biztosan törli ezt a bejegyzést?");

        if (conf) {
            // If accepted delete item
            await axios.delete(`http://localhost:3000/api/v1/news/:${id}`,
                { withCredentials: true })
                .then(async () => {
                    alert("Bejegyzés sikeresen törölve!");
                    if (newsItem.image) {
                        await axios.delete(`http://localhost:3000/api/v1/upload/:${newsItem.image}`,
                            { withCredentials: true })
                            .catch(error => {
                                alert("Hiba Történt a fénykép törlésénél! " + error.message);
                            });
                    }
                    await axios.get("http://localhost:3000/api/v1/news/",
                        { withCredentials: true })
                        .then(data => {
                            setNews(data.data.news);
                        }).catch(error => {
                            alert("Hiba Történt a Bejegyzés betöltésénél! " + error.message);
                        });
                    setNewsItem(null);
                    navigate("/api/dashboard/home/news");
                })
                .catch(error => {
                    alert("Hiba Történt a Bejegyzés törlésénél! " + error.message);
                });
        }
    };


    useEffect(() => {
        const getItem = async () => {
            await axios.get(`http://localhost:3000/api/v1/news/:${id}`, { withCredentials: true })
                .then(data => {
                    setNewsItem(data.data.news)
                });
        }
        if (id) {
            getItem();
        }
    }, []);


    return (
        <>
            {news
                ? <Formik
                    enableReinitialize
                    initialValues={{
                        title: newsItem ? newsItem.title : "",
                        description: newsItem ? newsItem.description : "",
                        image: undefined,
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={newschema}
                >{({
                    handleChange,
                    handleBlur,
                    values,
                    isSubmitting
                }) => (

                    <Form className="flex flex-col gap-4 p-4 my-10 max-w-lg bg-slate-200 border-2 border-slate-800">

                        <div className='flex gap-2 items-center'>
                            <FaNotesMedical className='text-3xl' />
                            <h2 className="text-3xl font-bold my-4">Adatok</h2>
                        </div>
                        <hr className="border my" />

                        {/* News title */}
                        <UserInput
                            label={"Cím"}
                            type={"text"}
                            name={"title"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            values={values.title}
                            rows="6"
                            className="w-full text-lg font-bold text-center py-2"
                        />

                        {/* News description */}
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

                        {/* News image */}
                        <div className="w-full max-w-xl flex max-sm:flex-col justify-between items-center my-2 text-center">
                            <div className="w-full max-w-xs h-full max-h-80 overflow-hidden text-lg font-bold shadow-lg">
                                <PreviewFile
                                    name={"image"}
                                    height={"auto"}
                                    width={320}
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile}
                                    url={newsItem?.image}
                                />
                            </div>
                            <ErrorMessage component="p" name="image" className={"text-center text-md text-red-500 py-2 font-bold"} />
                        </div>

                        {/* Handle News */}
                        <div className='flex gap-4 max-sm:flex-col'>
                            <button
                                className="group flex flex-col h-32 w-32 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg disabled:bg-slate-500"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <FaSave className="cursor-pointer transition-all text-5xl" />
                                <p className="text-lg border-t white font-bold">Mentés</p>
                            </button>
                            <button
                                onClick={() => navigate("/api/dashboard/home/news")}
                                className="group flex flex-col h-32 w-32 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg disabled:bg-slate-500"
                                type="button"
                                disabled={isSubmitting}
                            >
                                <FaArrowLeft className="cursor-pointer transition-all text-5xl" />
                                <p className="text-lg border-t white font-bold">Vissza</p>
                            </button>

                            {/* URL has id */}
                            {id &&
                                <button
                                    onClick={handleDelete}
                                    className="group flex flex-col h-32 w-32 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg disabled:bg-slate-500"
                                    type="button"
                                    disabled={isSubmitting}
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

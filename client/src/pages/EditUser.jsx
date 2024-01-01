


import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { FaTrashAlt, FaSave } from "react-icons/fa";
import { Dna } from "react-loader-spinner";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios";

import PreviewFile from "../components/PreviewFile";
import Calendar from "../components/calendar/Calendar";
import UserInput from "../components/Inputs";
import DefaultImage from "../assets/default-image.png";
import { userSchema } from "../lib/schemas";
import { DataContext } from "../context/DataContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function EditUser() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { employees, setEmployees, events, departments, posts, profileImage, admin } = useContext(DataContext);
    const [currentEmployee, setCurrentEmployee] = useState();
    const [currentEvents, setCurrentEvents] = useState();
    const [selectedFile, setSelectedFile] = useState({
        file: undefined,
        previewURI: undefined
    });
    const isUndefined = value => value === undefined ? true : false;

    
    useEffect(() => {
        const fetchEmployee = async () => {
            if (employees && events && id) {

                const findEmployee = await employees.find(e => e._id === id);
                const findEvents = await events.filter(e => e.userID === id);

                setCurrentEmployee(findEmployee);
                setCurrentEvents(findEvents);

                if (findEmployee._id !== admin.employee._id && findEmployee.image) {
                    await axios.get(`http://localhost:3000/api/v1/upload/:${findEmployee.image}`,
                        {
                            responseType: "blob",
                            withCredentials: true
                        })
                        .then(data => {
                            const reader = new FileReader();
                            reader.readAsDataURL(data.data);
                            reader.onload = function (e) {
                                setCurrentEmployee(prev => ({
                                    ...prev,
                                    displayImage: e.target.result
                                }))
                            }
                        })
                        .catch(error => console.log(error));
                }
            }
        }
        fetchEmployee();
    }, [employees]);


    const handleDelete = async () => {
        const conf = confirm(`Biztosan törli ezt a személyt? ${currentEmployee.lastName + " " + currentEmployee.firstName}`);
        if (conf) {
            await axios.delete(`http://localhost:3000/api/v1/dashboard/employees/:${id}`,
                { withCredentials: true })
                .then(async () => {
                    // alert("Személy sikeresen törölve!");
                    toast.success("Személy sikeresen törölve!");
                    if (currentEmployee.image) {
                        await axios.delete(`http://localhost:3000/api/v1/upload/:${currentEmployee.image}`,
                            { withCredentials: true })
                            .catch(error => {
                                // alert("Hiba Történt a fénykép törlésénél! " + error.message);
                                toast.error(error.message);
                            });
                    }
                    await axios.get("http://localhost:3000/api/v1/dashboard/employees/",
                        { withCredentials: true })
                        .then(data => {
                            setEmployees(data.data.employees);
                        }).catch(error => {
                            // alert("Hiba Történt a személyzet betöltésénél! " + error.message)
                            toast.error(error.message);
                        });
                    setCurrentEmployee(null);
                    navigate("/api/dashboard/users/alluser");
                })
                .catch(error => {
                    // alert("Hiba Történt a személy törlésénél! " + error.message);
                    toast.error(error.message);
                });
        }
    }

    /**
     * 
     * @param {Form} values  Form values => firstName, lastName, etc...
     * @param {FormActions} actions  Formik actions => setSubmitting, resetForm, etc...
     */
    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true);

        const formValues = {
            ...values,
            address: {
                zip: values.zip,
                city: values.city,
                street: values.street,
                houseNumber: values.houseNumber,
                storey: values.storey,
                door: values.door
            },
            post: posts.find(post => post.option === values.post),
            department: departments.find(dep => dep.option === values.department)
        }

        // Upload image
        if (selectedFile.file !== undefined) {

            const formData = new FormData();
            const fileName = [values.firstName, values.lastName].join("-");
            formData.append("image", selectedFile.file, fileName);

            const updateImage = await axios.post("http://localhost:3000/api/v1/upload/upload",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .catch(error => toast.error("A képet nem tudtuk feltölteni! " + error.message));
            formValues.image = updateImage.data.id;
        }

        if (!isUndefined(id)) {

            // Update User
            await axios.put(
                `http://localhost:3000/api/v1/dashboard/employees/:${id}`,
                formValues,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(() => {
                    // alert("Személy adatai sikeresen módosítva!");
                    toast.success("Személy adatai sikeresen módosítva!");
                    actions.resetForm();
                    navigate("/api/dashboard/users/alluser");
                })
                .catch(error => {
                    // alert("Hiba történt! " + error.message);
                    toast.error("Hiba történt " + error.message);
                })
                .finally(() => {
                    actions.setSubmitting(false);
                });

        } else {

            // Create new User
            await axios.post(
                "http://localhost:3000/api/v1/dashboard/employees/add-employee",
                formValues,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(async () => {
                    await axios.get("http://localhost:3000/api/v1/dashboard/employees/",
                        { withCredentials: true })
                        .then(data => setEmployees(data.data.employees))
                        .catch(error => {
                            // alert("Hiba Történt a személyzet betöltésénél! " + error.message);
                            toast.error("Hiba Történt a személyzet betöltésénél! " + error.message);
                        });
                    actions.resetForm();
                    // alert("Sikeres regisztrálás!");
                    toast.success("Sikeres regisztrálás!");
                    navigate("/api/dashboard/users/alluser");
                })
                .catch(error => {
                    // alert("Hiba történt a személy létrehozásánál! " + error.message);
                    toast.error("Hiba történt a személy létrehozásánál! " + error.message);
                })
                .finally(() => {
                    actions.setSubmitting(false)
                });
        }
    }


    return (
        <div>
            <ToastContainer
                position='top-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />

            {(!currentEmployee && id) || !departments || !posts
                // Loading Spinner
                ? <Dna
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="dna-loading"
                />

                : <Formik
                    enableReinitialize
                    initialValues={{
                        firstName: currentEmployee ? currentEmployee.firstName : "",
                        lastName: currentEmployee ? currentEmployee.lastName : "",
                        birthDate: currentEmployee ? new Date(currentEmployee.birthDate) : new Date("1970-01-01T12:00:00.000Z"),
                        email: currentEmployee ? currentEmployee.email : "",
                        phone: currentEmployee ? currentEmployee.phone : "",
                        companyPhone: currentEmployee ? currentEmployee.companyPhone : "",
                        department: currentEmployee ? currentEmployee.department.option : "sbo",
                        post: currentEmployee ? currentEmployee.post.option : "betegkisero",
                        image: undefined,
                        zip: currentEmployee ? currentEmployee.address.zip : "",
                        city: currentEmployee ? currentEmployee.address.city : "",
                        street: currentEmployee ? currentEmployee.address.street : "",
                        houseNumber: currentEmployee ? currentEmployee.address.houseNumber : "",
                        storey: currentEmployee ? currentEmployee.address.storey : "",
                        door: currentEmployee ? currentEmployee.address.door : ""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={userSchema}
                >{({
                    handleChange,
                    handleBlur,
                    values,
                    isSubmitting
                }) => (

                    <Form
                        className="w-full flex flex-col p-4"
                    >
                        <h2 className="text-3xl font-bold my-4">Profil</h2>
                        <hr />

                        {/* USER PROFILE */}
                        {!isUndefined(id) ?
                            <div className="flex justify-between items-center my-8 max-sm:justify-center max-sm:flex-col max-w-2xl">
                                <div className="mb-6 flex gap-4 items-center max-sm:flex-col">
                                    <div className="rounded-full w-36 h-36 overflow-hidden border-4 border-white flex items-center">
                                        <img src={currentEmployee.displayImage
                                            ? currentEmployee.displayImage
                                            : admin.employee._id === currentEmployee._id
                                                ? profileImage
                                                : DefaultImage}
                                            alt="profile-image" className="bg-gray-200" />
                                    </div>
                                    <div className="flex flex-col max-sm:text-center">
                                        <h2 className="text-3xl">{currentEmployee.lastName} {currentEmployee.firstName}</h2>
                                        <h3 className="text-xl font-bold text-gray-400">{currentEmployee.department.value}</h3>
                                        <h3 className="text-xl text-gray-400 italic tracking-widest">{currentEmployee.post.value}</h3>
                                    </div>
                                </div>
                                {admin.role.type === "SUPER_ADMIN"
                                    ? <div className="flex flex-col items-center gap-2">
                                        <button
                                            onClick={handleDelete}
                                            className="group flex flex-col h-32 w-32 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
                                            type="button"
                                            disabled={isSubmitting}
                                        >
                                            <FaTrashAlt className="cursor-pointer transition-all text-5xl" />
                                            <p className="text-lg border-t white font-bold">Törlés</p>
                                        </button>
                                    </div>
                                    : null
                                }

                            </div>
                            :
                            null
                        }


                        <div className="flex flex-wrap w-full justify-around gap-4">

                            <div className="flex flex-col w-full max-w-xl">

                                {/* DIVIDING LINE */}
                                <hr className="border my" />


                                {/* TITLE */}
                                <h2 className="text-3xl font-bold my-4">Adatok</h2>


                                {/* INPUT FIELDS */}
                                <div className="flex flex-col gap-8 my-8">

                                    <UserInput
                                        label={"Vezetéknév"}
                                        type={"text"}
                                        name={"lastName"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.firstName}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />
                                    <UserInput
                                        label={"Keresztnév"}
                                        type={"text"}
                                        name={"firstName"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.lastName}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />
                                    <UserInput
                                        label={"Email"}
                                        type={"email"}
                                        name={"email"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.email}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />
                                    <UserInput
                                        label={"Elérhetőség"}
                                        type={"text"}
                                        name={"phone"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.phone}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />
                                    <UserInput
                                        label={"Céges telefonszám"}
                                        type={"text"}
                                        name={"companyPhone"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.companyPhone}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />
                                    <UserInput
                                        label={"Osztály"}
                                        type={"select"}
                                        name={"department"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={departments}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />
                                    <UserInput
                                        label={"Beosztás"}
                                        type={"select"}
                                        name={"post"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={posts}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />


                                    {/* DATEPICKER */}
                                    <div className="w-full max-w-xl flex max-sm:flex-col overflow-hidden shadow-lg">
                                        <label htmlFor="birthDate" className="text-xl py-2 flex items-center indent-4 w-full h-full italic tracking-widest bg-teal-800 text-white break-keep">
                                            Születési Dátum:
                                        </label>
                                        <div className="flex flex-col w-full">
                                            <Field name="birthDate">
                                                {({ field, form }) => (
                                                    <DatePicker
                                                        id="date"
                                                        {...field}
                                                        selected={field.value}
                                                        onChange={(date) => form.setFieldValue(field.name, date)}
                                                        className="text-lg text-center w-full py-2 font-bold"
                                                        dateFormat={"yyyy-MM-dd"}
                                                        placeholderText="2020-01-01"
                                                        autoComplete="off"
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage component="p" name="birthDate" className={"text-center text-md text-red-500 py-2 font-bold"} />
                                        </div>
                                    </div>


                                </div>


                                {/* USER IMAGE */}
                                <div className="w-full max-w-xl flex max-sm:flex-col justify-between items-center my-2 text-center">
                                    <div className="w-full max-w-xs h-full max-h-80 overflow-hidden text-lg font-bold shadow-lg">
                                        <PreviewFile
                                            name={"image"}
                                            height={"auto"}
                                            width={320}
                                            selectedFile={selectedFile}
                                            setSelectedFile={setSelectedFile}
                                            url={currentEmployee?.image}
                                        />
                                    </div>
                                    <ErrorMessage component="p" name="image" className={"text-center text-md text-red-500 py-2 font-bold"} />
                                </div>

                            </div>




                            <div className="flex flex-col w-full max-w-xl">

                                <hr className="border my" />
                                <h2 className="text-3xl font-bold my-4">Cím</h2>

                                {/* INPUT FIELDS */}
                                <div className="flex flex-wrap gap-8 my-8">
                                    <UserInput
                                        label={"Irányítószám"}
                                        type={"text"}
                                        name={"zip"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.zip}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />
                                    <UserInput
                                        label={"Város / Község"}
                                        type={"text"}
                                        name={"city"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.city}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />
                                    <UserInput
                                        label={"Utca"}
                                        type={"text"}
                                        name={"street"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.street}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />
                                    <UserInput
                                        label={"Házszám"}
                                        type={"text"}
                                        name={"houseNumber"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.houseNumber}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />
                                    <UserInput
                                        label={"Emelet"}
                                        type={"text"}
                                        name={"storey"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.storey}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />
                                    <UserInput
                                        label={"Ajtó"}
                                        type={"text"}
                                        name={"door"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.door}
                                        className="w-full text-lg font-bold text-center py-2"
                                    />
                                </div>
                            </div>

                        </div>

                        <hr className="my-4" />


                        {/* SAVE DATA */}
                        <div className="flex w-full justify-center my-8">
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

            }


            {/* DISPLAY  CELANDAR */}
            {
                !isUndefined(id) && admin?.employee._id !== currentEmployee?._id ?
                    <div className="flex flex-col gap-4">
                        <h2 className="indent-4 text-3xl font-bold">Naptár</h2>
                        <hr className="border my" />

                        {/* CALENDAR */}
                        {currentEvents
                            ? <Calendar events={currentEvents} user={currentEmployee} />
                            : null
                        }
                    </div>
                    :
                    null
            }



        </div >
    )
}



import * as yup from "yup";
import axios from "axios";


const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
const hours = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const minutes = ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];


export const fetchData = async () => {
    const result = (
        await Promise.all([
            axios.get("http://localhost:3000/api/v1/departments/"),
            axios.get("http://localhost:3000/api/v1/posts/")
        ])
    );
    const [departmentsResult, postsResult] = await Promise.all(result);
    const departments = await departmentsResult.data.departments.map(item => item.option);
    const posts = await postsResult.data.posts.map(item => item.option);

    return [departments, posts]
}


export const userSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(2, 'Túl rövid!')
        .max(21, 'Túl hosszú!')
        .required("Helytelen adat!"),
    lastName: yup
        .string()
        .min(2, 'Túl rövid!')
        .max(24, 'Túl hosszú!')
        .required("Helytelen adat!"),
    birthDate: yup
        .date()
        .required("Helytelen adat!"),
    email: yup
        .string()
        .email()
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/, "Helytelen Email!"),
    phone: yup
        .string()
        .min(10, "Helytelen adat!")
        .max(14, "Helytelen adat!")
        .required("Helytelen adat!"),
    companyPhone: yup
        .string()
        .min(4, "Helytelen adat!")
        .max(5, "Helytelen adat!"),
    department: yup
        .string()
        .oneOf(Array.from(await fetchData())[0], "Válasszon az alábbi lehetőségek közül!")
        .label("...")
        .required("Helytelen adat!"),
    post: yup
        .string()
        .oneOf(Array.from(await fetchData())[1], "Válasszon az alábbi lehetőségek közül!")
        .label("...")
        .required("Helytelen adat!"),
    image: yup
        .mixed()
        .test("fileSize", "A fájl mérete túl nagy! Max 1.5Mb",
            (file) => {
                if (file) {
                    return file.size <= 1_500_000 && SUPPORTED_FORMATS.includes(file.type)
                } else {
                    return true;
                }
            }),
    zip: yup
        .string()
        .min(4, "Helytelen adat!")
        .max(5, "Helytelen adat!")
        .required("Helytelen adat!"),
    city: yup
        .string()
        .required("Helytelen adat!"),
    street: yup
        .string()
        .required("Helytelen adat!"),
    houseNumber: yup
        .string()
        .min(1, "Helytelen adat!")
        .max(5, "Helytelen adat!")
        .required("Helytelen adat!"),
    storey: yup
        .string()
        .min(1, "Helytelen adat!")
        .max(2, "Helytelen adat!"),
    door: yup
        .string()
        .min(1, "Helytelen adat!")
        .max(5, "Helytelen adat!")
});


export const loginSchema = yup.object().shape({
    username: yup.string()
        .min(6, 'Túl rövid!')
        .max(21, 'Túl hosszú!')
        .required('Helytelen felhasználónév!'),
    password: yup.string()
        .min(8, 'Túl rövid!')
        .max(21, 'Túl hosszú!')
        .required('Helytelen jelszó!')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@#\$%\^&\*])(?=.{8,})/,
            "Legalább 1 nagybetű, 1 kisbetűt, 1 szám és egy speciális karaktert kell tartalmaznia!"
        ),
});



export const registerSchema = yup.object().shape({
    username: yup.string()
        .min(6, 'Min 6 karakter!')
        .max(14, 'Max 14 karakter!')
        .required('Helytelen felhasználónév!')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,14}$/,
            "Tartalmaznia kell legalább, 1 nagybetűt, 1 kisbetűt, 1 számot!"
        ),
    password: yup.string()
        .min(8, 'Min 8 karakter!')
        .max(21, 'Max 21 karakter!')
        .required('Helytelen jelszó!')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@#\$%\^&\*])(?=.{8,})/,
            "Tartalmaznia kell legalább, 1 nagybetűt, 1 kisbetűt, 1 számot és 1 speciális karaktert (!, _, #, @, &)!"
        ),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Jelszavak nem egyeznek!')
});


export const eventSchema = yup.object().shape({
    title: yup.string(),
    description: yup.string()
        .max(150, 'Túl hosszú!'),
    hourStart: yup.mixed()
        .oneOf(hours),
    minStart: yup.mixed()
        .oneOf(minutes),
    hourEnd: yup.mixed()
        .oneOf(hours),
    minEnd: yup.mixed()
        .oneOf(minutes),
    color: yup.string()
});


export const messageSchema = yup.object().shape({
    message: yup.string().max(250, "Maximum 250 karakter hosszú lehet az üzenet!")
});


export const itemSchema = yup.object().shape({
    value: yup
        .string()
        .required('Hiányos mező!'),
    option: yup
        .string()
        .required('Hiányos mező!'),
    code: yup
        .string()
        .required('Hiányos mező!'),
    description: yup
        .string()
        .required('Hiányos mező!'),
});

export const newschema = yup.object().shape({
    title: yup
        .string()
        .required('Hiányos mező!'),
    description: yup
        .string()
        .required('Hiányos mező!'),
    image: yup
        .mixed()
        .test("fileSize", "A fájl mérete túl nagy! Max 1.5Mb",
            (file) => {
                if (file) {
                    return file.size <= 1_500_000 && SUPPORTED_FORMATS.includes(file.type)
                } else {
                    return true;
                }
            }),
});


export const selectHours = [
    {
        option: "0",
        value: "00"
    },
    {
        option: "1",
        value: "01"
    },
    {
        option: "2",
        value: "02"
    },
    {
        option: "3",
        value: "03"
    },
    {
        option: "4",
        value: "04"
    },
    {
        option: "5",
        value: "05"
    },
    {
        option: "6",
        value: "06"
    },
    {
        option: "7",
        value: "07"
    },
    {
        option: "8",
        value: "08"
    },
    {
        option: "9",
        value: "09"
    },
    {
        option: "10",
        value: "10"
    },
    {
        option: "11",
        value: "11"
    },
    {
        option: "12",
        value: "12"
    },
    {
        option: "13",
        value: "13"
    },
    {
        option: "14",
        value: "14"
    },
    {
        option: "15",
        value: "15"
    },
    {
        option: "16",
        value: "16"
    },
    {
        option: "17",
        value: "17"
    },
    {
        option: "18",
        value: "18"
    },
    {
        option: "19",
        value: "19"
    },
    {
        option: "20",
        value: "20"
    },
    {
        option: "21",
        value: "21"
    },
    {
        option: "22",
        value: "22"
    },
    {
        option: "23",
        value: "23"
    },
];

export const selectMinutes = [
    {
        option: "0",
        value: "00"
    },
    {
        option: "5",
        value: "05"
    },
    {
        option: "10",
        value: "10"
    },
    {
        option: "15",
        value: "15"
    },
    {
        option: "20",
        value: "20"
    },
    {
        option: "25",
        value: "25"
    },
    {
        option: "30",
        value: "30"
    },
    {
        option: "35",
        value: "35"
    },
    {
        option: "40",
        value: "40"
    },
    {
        option: "45",
        value: "45"
    },
    {
        option: "50",
        value: "50"
    },
    {
        option: "55",
        value: "55"
    }
]
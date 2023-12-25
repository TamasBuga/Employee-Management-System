

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const DataContext = createContext(null);


export default function DataProvider({ children }) {

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [employees, setEmployees] = useState();
    const [admin, setAdmin] = useState();
    const [profileImage, setProfileImage] = useState();
    const [departments, setDepartments] = useState();
    const [posts, setPosts] = useState();
    const [events, setEvents] = useState();
    const [news, setNews] = useState();
    const [messages, setMessages] = useState();


    useEffect(() => {

        if (!user) {
            navigate("/");
        }

        const fetchAdmin = async () => {
            await axios.get(`http://localhost:3000/api/v1/dashboard/admin/:${user.user.id}`, { withCredentials: true })
                .then((data) => {
                    setAdmin(data.data.user);
                    axios.get(`http://localhost:3000/api/v1/upload/:${data.data.user.employee.image}`, { responseType: "blob", withCredentials: true })
                        .then(data => {
                            const reader = new FileReader();
                            reader.readAsDataURL(data.data);
                            reader.onload = function (e) {
                                setProfileImage(e.target.result);
                            }
                        })
                })
                .catch(error => console.log(error));
        }


        const fetchData = async () => {
            const result = (
                await Promise.all([
                    axios.get(`http://localhost:3000/api/v1/dashboard/employees/`),
                    axios.get(`http://localhost:3000/api/v1/departments/`),
                    axios.get(`http://localhost:3000/api/v1/posts/`),
                    axios.get(`http://localhost:3000/api/v1/events/`),
                    axios.get(`http://localhost:3000/api/v1/news/`),
                    axios.get(`http://localhost:3000/api/v1/messages/`)
                ])
            )

            const [employeesResult, departmentsResult, postsResult, eventsResult, newsResult, messagesResult] = await Promise.all(result);

            setEmployees(employeesResult.data.employees);
            setDepartments(departmentsResult.data.departments);
            setPosts(postsResult.data.posts);
            setEvents(eventsResult.data.events);
            setNews(newsResult.data.news);
            setMessages(messagesResult.data.messages);
        }

        fetchAdmin();
        fetchData();

    }, []);



    return (
        <DataContext.Provider value={{
            employees, setEmployees,
            admin, setAdmin,
            profileImage,
            events, setEvents,
            departments, setDepartments,
            posts, setPosts,
            news, setNews,
            messages, setMessages
        }}>
            {children}
        </DataContext.Provider>
    )
}
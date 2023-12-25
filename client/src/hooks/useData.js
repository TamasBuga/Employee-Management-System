

import axios from "axios";
import { useState, useEffect } from "react";



export const useAllData = () => {

    const [employees, setEmployees] = useState();
    const [departments, setDepartments] = useState();
    const [posts, setPosts] = useState();
    const [events, setEvents] = useState();


    useEffect(() => {
        const dataFetch = async () => {
            // waiting for all the things in parallel
            const result = (
                await Promise.all([
                    axios.get(`http://localhost:3000/api/v1/dashboard/employees/`),
                    axios.get(`http://localhost:3000/api/v1/departments/`),
                    axios.get(`http://localhost:3000/api/v1/posts/`),
                    axios.get(`http://localhost:3000/api/v1/events/`)
                ])
            );

            // and waiting a bit more - fetch API is cumbersome
            const [employeesResult, departmentsResult, postsResult, eventsResult] = await Promise.all(result);
            // when the data is ready, save it to state
            setEmployees(employeesResult.data.employees);
            setDepartments(departmentsResult.data.departments);
            setPosts(postsResult.data.posts);
            setEvents(eventsResult.data.events);

        };
        console.log("Fetch data in context");
        dataFetch();
        
    }, []);

    return { employees, departments, posts, events };
};


export const useUserData = (id) => {
    if (id !== null) {

        const [employee, setEmployee] = useState({});
        const [events, setEvents] = useState([]);
        const [messages, setMessages] = useState([]);

        useEffect(() => {
            const dataFetch = async () => {
                // waiting for all the things in parallel
                const result = (
                    await Promise.all([
                        axios.get(`http://localhost:3000/api/v1/dashboard/employees/:${id}`),
                        axios.get(`http://localhost:3000/api/v1/events/user/:${id}`)
                    ])
                );

                // and waiting a bit more - fetch API is cumbersome
                const [employeeResult, eventsResult] = await Promise.all(result);
                // when the data is ready, save it to state
                setEmployee(employeeResult.data.employee);
                setEvents(eventsResult.data.events);

            };

            dataFetch();
        }, []);

        return { employee, events };
    } else {
        return null
    }

}
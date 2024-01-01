

import React, { useContext, useState } from 'react';
import uuid from 'react-uuid';

import { DataContext } from '../context/DataContext';
import UserCard from '../components/UserCard';


export default function SearchUser() {

    const { employees } = useContext(DataContext);
    const [search, setSearch] = useState("");


    const searchResult = () => {
        if (search !== "") {
            const result = employees.filter(emp => {
                const fullName = (emp.firstName + emp.lastName).toLowerCase();
                const searchWords = search.split("");
                const letters = new Array(searchWords.length).fill(false);
                for (let i = 0; i < searchWords.length; i++) {
                    if (fullName.includes(searchWords[i].toLowerCase())) {
                        letters[i] = true;
                    }
                }
                if (!letters.includes(false)) {
                    return emp;
                }
            });
            return result;
        } else {
            return null
        }
    }


    return (
        <div className="flex flex-col gap-8 p-4">
            
            <input
                type="text"
                name="search"
                placeholder="Keresés..."
                id="search"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                value={search}
                className="p-2 text-lg font-bold italic text-center shadow-lg w-[320px]"
            />

            <div className='flex flex-wrap gap-8 justify-center'>
                {searchResult()
                    ? searchResult().map(user => {
                        return (
                            <UserCard key={uuid()} user={user} />
                        )
                    })
                    : null}
            </div>
        </div>
    )
}

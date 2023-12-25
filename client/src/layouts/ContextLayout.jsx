


import React from 'react'
import DataProvider from '../context/DataContext';
import { Outlet } from 'react-router-dom';


export default function ContextLayout() {
    return (
        <DataProvider>
            <Outlet />
        </DataProvider>
    )
}

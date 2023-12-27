

import { Routes, Route } from "react-router-dom";
import './index.css'

import DashboardLayout from "./layouts/DashboardLayout";
import NewsLayout from "./layouts/NewsLayout";
import CalendarLayout from "./layouts/CalendarLayout";
import UsersLayout from "./layouts/UsersLayout";

import Register from './pages/Register';
import Login from './pages/Login';
import NotFind from './pages/NotFind';
import News from "./pages/News";
import EditNews from "./pages/EditNews";
import EditUser from "./pages/EditUser";
import AllUser from "./pages/AllUser";
import ContextLayout from "./layouts/ContextLayout";
import Departments from "./pages/Departments";
import Posts from "./pages/Posts";
import EditItem from "./pages/EditItem";
import SearchUser from "./pages/SearchUser";



function App() {

  return (
    <div className='relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black bg-app-background bg-cover'>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="api" element={<ContextLayout />}>
            <Route path="dashboard" element={<DashboardLayout />}>

              <Route path="home" element={<NewsLayout />}>
                <Route index path="news" element={<News />} />
                <Route path="news/add" element={<EditNews />} />
                <Route path="news/:id" element={<EditNews />} />
              </Route>

              <Route path="users" element={<UsersLayout />}>
                <Route index path="alluser" element={<AllUser />} />
                <Route path="adduser" element={<EditUser />} />
                <Route path="useredit/:id" element={<EditUser />} />
                <Route path="departments" element={<Departments />} />
                <Route path="posts" element={<Posts />} />
                <Route path="add/department" element={<EditItem />} />
                <Route path="add/post" element={<EditItem />} />
                <Route path="edit/department/:id" element={<EditItem />} />
                <Route path="edit/post/:id" element={<EditItem />} />
                <Route path="register/:id" element={<Register />} />
                <Route path="searchuser" element={<SearchUser />} />
              </Route>

              <Route path="calendar/:id" element={<CalendarLayout />} />
              <Route path="profile/:id" element={<EditUser />} />

            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFind />} />
      </Routes>
    </div >
  )
}

export default App


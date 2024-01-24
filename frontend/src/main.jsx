import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Home from './pages/Home.jsx'
import PostDetail from './pages/PostDetail.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Register from './pages/Register.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Authors from './pages/Authors.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CategoryPosts from './pages/CategoryPosts.jsx'
import AuthorPost from './pages/AuthorPost.jsx'
import Logout from './pages/Logout.jsx'
import Profile from './pages/Profile.jsx'
import UserProvider from './context/UserContext.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage/>,
    children:[
      {
        index: true,
        element: <Home/>,
      },
      {
        path:"/posts/:id",
        element: <PostDetail/>,
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"profile/:id",
        element:<UserProfile/>,
      },
      {
        path:"authors",
        element:<Authors/>,
      },
      {
        path:"create",
        element:<CreatePost/>,
      },
      {
        path:"posts/:id/edit",
        element:<EditPost/>,
      },
      {
        path:"myposts/:id",
        element:<Dashboard/>,
      },
      {
        path:"posts/categories/:category",
        element:<CategoryPosts/>,
      },
      {
        path:"posts/users/:id",
        element:<AuthorPost/>,
      },
      
    ]
  },
  {
    path:"/login",
    element: <UserProvider><LoginPage/></UserProvider>,
  },
  {
    path:"/register",
    element: <UserProvider><Register/></UserProvider>,
  },
  {
    path:"/logout",
    element: <UserProvider><Logout/></UserProvider>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}/>
    </ChakraProvider>
  </React.StrictMode>,
)

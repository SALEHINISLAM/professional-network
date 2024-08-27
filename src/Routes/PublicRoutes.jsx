import { createBrowserRouter } from 'react-router-dom';
import PublicOutlet from '../LayOut/PublicOutlet';
import Home from '../PublicPages/Home/Home';
import EmployerPages from '../LayOut/EmployerPages';
import EmployerHome from '../EmployerPages/EmployerHome/EmployerHome';
import Register from '../PublicPages/Register/Register';
import Login from '../PublicPages/Login/Login';
import UpdateUserInfo from '../PublicPages/UpdateUserInfo/UpdateUserInfo';

const router=createBrowserRouter([
    {
        path:'/',
        element:<PublicOutlet/>,
        children:[
            {
                path:'/',
                element:<Home/>,
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/updateuser',
                element:<UpdateUserInfo/>
            }
        ]
    },
    {
        path:'/employer',
        element:<EmployerPages/>,
        children:[
            {
                path:'home',
                element:<EmployerHome/>
            }
        ]
    }
])

export default router;
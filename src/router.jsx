import React from "react";
import {
    createBrowserRouter
} from "react-router-dom";

import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import MainLayout from "./components/MainLayout";
import Home from "./views/Home";
import Menu from "./views/student/Menu";
import TutorMenu from "./views/tutor/Menu";
import MyLessons from "./views/student/MyLessons";
import AccountSettings from "./views/student/AccountSettings";
import TutorAccountSettings from "./views/tutor/AccountSettings";
import MyWallet from "./views/student/MyWallet";
import OrderHistory from "./views/student/OrderHistory";
import  TutorOrderHistory  from "./views/tutor/OrderHistory";
import  TutorMyLessons  from "./views/tutor/MyLessons";
import PaymentMethods from "./views/student/PaymentMethods";
import MyTutorProfile from "./views/tutor/MyTutorProfile";
import MySchedule from "./views/tutor/MySchedule";
import MyCertificates from "./views/tutor/MyCertificates";
import MyEarnings from "./views/tutor/MyEarnings";
import FindTutors from "./views/FindTutors";
import Faq from "./views/Faq";
import TutorPage from "./views/TutorPage";
import BecomeTutor from "./views/BecomeTutor";
import About from "./views/About";
import Support from "./views/Support";
import Blog from "./views/Blog";
import Terms from "./views/Terms";
import BlogSingle from "./views/BlogSingle";

import Reschedule from "./views/student/Reschedule";
import TutorReschedule from "./views/tutor/Reschedule";
import Cache from "./components/Cache";
import VerifEmail from "./components/VerifEmail";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
                exact: true,
            },
            {
                path: '/cache',
                element: <Cache />,
                exact: true,
            },
            {
                path: '/verif-token/:token',
                element: <VerifEmail />,
                exact: true,
            },
            {
                path: '/about',
                element: <About />,
                exact: true,
            },
            {
                path: '/support',
                element: <Support />,
                exact: true,
            },
            {
                path: '/find-tutor',
                element: <FindTutors />,
                exact: true,
            },
            {
                path: '/become-tutor',
                element: <BecomeTutor />,
                exact: true,
            },
            {
                path: '/faq',
                element: <Faq />,
                exact: true,
            },
            {
                path: '/blog/:id',
                element: <BlogSingle />,
                exact: true,
            },
            {
                path: '/blog',
                element: <Blog />,
                exact: true,
            },
            {
                path: '/terms',
                element: <Terms />,
                exact: true,
            },
            {
                path: '/tutor/:id',
                element: <TutorPage />,
                exact: true,
            },
            // STUDENT ROUTES
            {
                path: 'student',
                element: <Menu />,
                children: [
                    {
                        path: 'my-lessons',
                        element: <MyLessons />,
                        exact: true,
                    },
                    // {
                    //     path: 'chat',
                    //     element: <HomeChat />,
                    //     exact: true,
                    // },
                    {
                        path: 'account-settings',
                        element: <AccountSettings />,
                        exact: true,
                    },
                    {
                        path: 'my-wallet',
                        element: <MyWallet />,
                        exact: true,
                    },
                    {
                        path: 'order-history',
                        element: <OrderHistory />,
                        exact: true,
                    },
                    {
                        path: 'payment-methods',
                        element: <PaymentMethods />,
                        exact: true,
                    },
                    {
                        path: 'reschedule/:id',
                        element: <Reschedule />,
                        exact: true,
                    }
                ],
                exact: true,
            },
            // TUTOR ROUTES
            {
                path: 'tutor',
                element: <TutorMenu />,
                children: [
                    {
                        path: 'my-lessons',
                        element: <TutorMyLessons/>,
                        exact: true
                    },
                    // {
                    //     path: 'chat',
                    //     element: <HomeChat />,
                    //     exact: true,
                    // },
                    {
                        path: 'my-tutor-profile',
                        element: <MyTutorProfile/>,
                        exact: true
                    },
                    {
                        path: 'my-schedule',
                        element: <MySchedule/>,
                        exact: true
                    },
                    {
                        path: 'my-certificates',
                        element: <MyCertificates />,
                        exact: true
                    },
                    {
                        path: 'order-history',
                        element: <TutorOrderHistory/>,
                        exact: true
                    },
                    {
                        path: 'my-earnings',
                        element: <MyEarnings/>,
                        exact: true
                    },
                    {
                        path: 'account-settings',
                        element: <TutorAccountSettings/>,
                        exact: true
                    },
                    {
                        path: 'reschedule/:id',
                        element: <TutorReschedule />,
                        exact: true,
                    }
                ],
                exact: true,
            },
        ],
        exact: true
    },
    {
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
                exact: true,
            },
            {
                path: '/signup',
                element: <Signup />,
                exact: true,
            }
        ]
    },


    // {
    //     path: 'student',
    //     element: <DefaultLayout />,
    //     children: [
    //         {
    //             path: 'dashboard',
    //             element: <Dashboard />,
    //             exact: true,
    //         },
    //     ]
    // },
    // {
    //     path: 'tutor',
    //     element: <TutorLayout />,
    //     children: [
    //         {
    //             path: 'dashboard',
    //             element: <Dashboard />,
    //             exact: true,
    //         },
    //     ]
    // },
    // {
    //     path: '*',
    //     element: <NoFound />
    // },

])

export default router;


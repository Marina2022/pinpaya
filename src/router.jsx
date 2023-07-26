import React from "react";
import {
    createBrowserRouter
} from "react-router-dom";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import GuestLayout from "./components/layouts/GuestLayout.jsx";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import Home from "./components/Home";
import Menu from "./components/student/Menu";
import TutorMenu from "./components/tutor/Menu";
import MyLessons from "./components/student/MyLessons";
import AccountSettings from "./components/student/AccountSettings";
import TutorAccountSettings from "./components/tutor/AccountSettings";
import MyWallet from "./components/student/MyWallet";
import OrderHistory from "./components/student/OrderHistory";
import  TutorOrderHistory  from "./components/tutor/OrderHistory";
import  TutorMyLessons  from "./components/tutor/MyLessons";
import PaymentMethods from "./components/student/PaymentMethods";
import MyTutorProfile from "./components/tutor/MyTutorProfile";
import MySchedule from "./components/tutor/MySchedule";
import MyCertificates from "./components/tutor/MyCertificates";
import MyEarnings from "./components/tutor/MyEarnings";
import FindTutors from "./components/pages/FindTutors/FindTutors";
import Faq from "./components/Faq";
import TutorPage from "./components/TutorPage";
import BecomeTutor from "./components/BecomeTutor";
import About from "./components/About";
import Support from "./components/Support";
import Blog from "./components/Blog";
import Terms from "./components/Terms";
import BlogSingle from "./components/BlogSingle";

import Reschedule from "./components/student/Reschedule";
import TutorReschedule from "./components/tutor/Reschedule";
import Cache from "./components/Cache";
import VerifEmail from "./components/VerifEmail";
import Video from "./components/Video";

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
            {
                path: '/lesson/:id',
                element: <Video />,
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


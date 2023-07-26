
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import "./i18n";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js'
import 'flag-icon-css/css/flag-icon.min.css'

import './index.scss';
import {ContextProvider} from "./contexts/ContextProvider";
import {RouterProvider} from "react-router-dom";
import router from "./router";
import {AuthContextProvider} from "./contexts/AuthContext";
import {ChatContextProvider} from "./contexts/ChatContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

        <React.StrictMode>
            <Suspense fallback={<div>Loading...</div>}>
            <ContextProvider>
                <AuthContextProvider>
                    <ChatContextProvider>
                        <RouterProvider router={router} />
                    </ChatContextProvider>
                </AuthContextProvider>
            </ContextProvider>
            </Suspense>
        </React.StrictMode>
);




import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {ContextProvider} from "./contexts/ContextProvider";
import {RouterProvider} from "react-router-dom";
import router from "./router";
import {AuthContextProvider} from "./contexts/AuthContext";
import {ChatContextProvider} from "./contexts/ChatContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
        <AuthContextProvider>
            <ChatContextProvider>
                <RouterProvider router={router} />
            </ChatContextProvider>
        </AuthContextProvider>
    </ContextProvider>
  </React.StrictMode>
);



import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contact } from "../components/Contact";
import { Info } from "../components/Info";
import { AddEdit } from "../containers/AddEdit";
import { ToastContainer } from "react-toastify";

export const Main = (): JSX.Element => (
    <BrowserRouter>
        <React.Fragment>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Contact />} />
                <Route path="/add" element={<AddEdit />} />
                <Route path="/edit/:id" element={<AddEdit />} />
                <Route path="/info/:id" element={<Info />} />
            </Routes>
        </React.Fragment>
    </BrowserRouter>
);



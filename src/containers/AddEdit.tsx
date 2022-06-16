import React from "react";
import "./AddEdit.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContAPI } from "../global/ContAPI";

const initialState = {
    name: "", email: "", phone: ""
};

export const AddEdit = (): JSX.Element => {
    const navigate = useNavigate();
    const [formValue, setFormValue] = React.useState(initialState);
    const [editMode, setEditMode] = React.useState(false);
    const [addContact] = ContAPI.useAddMutation();
    const [updateContact] = ContAPI.useUpdateMutation();

    const { name, email, phone } = formValue;
    const { id } = useParams();
    const { data, error } = ContAPI.useGetOneQuery(id!);

    React.useEffect(() => {
        if (error && id) {
            toast.error("Something went wrong");
        };
    }, [error]);

    React.useEffect(() => {
        if (id) {
            setEditMode(true);
            if (data) {
                setFormValue({...data});
            };
        } else {
            setEditMode(false);
            setFormValue({...initialState});
        };
    }, [id, data]);

    const handleChange = 
    (event: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = event.target;
        setFormValue({...formValue, [name]: value});
    };

    const handleSubmit = 
    async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name && !email && !phone) {
            toast.error("Please enter the info");
        } else {
            if (!editMode) {
                await addContact(formValue)
                navigate("/");
                toast.success("The Contact was added");
            } else {
                await updateContact(formValue);
                navigate("/");
                setEditMode(false);
                toast.success("The Contact was updated");
            }
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    id="name"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={handleChange}
                />
                <label htmlFor="phone">Phone</label>
                <input 
                    type="phone" 
                    id="phone"
                    name="phone"
                    placeholder="Enter Phone..."
                    value={phone}
                    onChange={handleChange}
                />
                <input 
                    type="submit" 
                    value={editMode ? "Update" : "Add"} 
                />
            </form>
        </main>
    );
};




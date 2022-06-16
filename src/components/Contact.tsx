import React from "react";
import "./Contact.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ContAPI } from "../global/ContAPI";

export const Contact = (): JSX.Element => {
    const { error, isLoading, data } = 
    ContAPI.useFetchAllQuery();
    const [deleteContact] = ContAPI.useDeleteMutation();
    console.log("error", error);

    React.useEffect(() => {
        if (error) toast.error("Something went wrong!");
    }, [error]);

    if (isLoading) return <h1>Loading...</h1>;

    const handleDelete = async (id: string) => {
        if (
            window.confirm("Are you sure you want to Delete?")
        ) {
            await deleteContact(id);
            toast.success("Contact was Deleted!");
        };
    };

    return (
        <main>
            <Link to="/add">
                <button className="btn btn-add">
                    Add Contact
                </button>
            </Link>
            <br />
            <br />
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((contact, index: number) => (
                        <tr key={contact.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>
                                <Link to={`/edit/${contact.id}`}>
                                    <button className="btn btn-edit">Edit</button>
                                </Link>
                                <button 
                                    className="btn btn-delete"
                                    onClick={() => handleDelete(contact.id)}
                                    >Delete
                                </button>
                                <Link to={`/info/${contact.id}`}>
                                <button 
                                    className="btn btn-view"
                                    >View
                                </button></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};



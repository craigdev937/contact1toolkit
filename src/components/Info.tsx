import React from "react";
import "./Info.css";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { ContAPI } from "../global/ContAPI";

export const Info = (): JSX.Element => {
    const { id } = useParams();
    const { error, data } = ContAPI.useGetOneQuery(id!);

    React.useEffect(() => {
        if (error) toast.error("Something went wrong!");
    }, [error]);

    return (
        <main>
            <section className="card">
                <aside className="card__header">
                    <p>User Contact Detail</p>
                </aside>
                <aside className="container">
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Name:</strong>
                    <span>{data && data.name}</span>
                    <br />
                    <br />
                    <strong>Email:</strong>
                    <span>{data && data.email}</span>
                    <br />
                    <br />
                    <strong>Phone:</strong>
                    <span>{data?.phone}</span>
                    <br />
                    <br />
                    <Link to="/">
                        <button 
                            className="btn btn-edit"
                            >Go Back
                        </button>
                    </Link>
                </aside>
            </section>
        </main>
    );
};




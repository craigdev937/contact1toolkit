import { createApi, 
    fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IContact } from "../models/Interfaces";

const URL = "http://localhost:5000/contacts";
export const ContAPI = createApi({
    reducerPath: "ContAPI",
    tagTypes: ["Contact"],
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        fetchAll: builder.query<IContact[], void>({
            query: () => "/",
            providesTags: ["Contact"],
        }),
        getOne: builder.query<IContact, string>({
            query: (id) => `/${id}`,
            providesTags: ["Contact"],
        }),
        add: builder.mutation<IContact, IContact>({
            query: (payload) => ({
                url: "/",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Contact"],
        }),
        update: builder.mutation<IContact, IContact>({
            query: ({id, ...contact}) => ({
                url: `/${id}`,
                method: "PUT",
                body: contact
            }),
            invalidatesTags: ["Contact"],
        }),
        delete: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Contact"],
        }),
    })
});



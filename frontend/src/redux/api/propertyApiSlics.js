import { PROPERTY_URL, UPLOAD_URL } from "../features/constants.js";
import { apiSlice } from "./apiSlice";

export const propertyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: ({ keyword }) => ({
        url: `${PROPERTY_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Property"],
    }),

    getPropertyById: builder.query({
      query: (propertyId) => `${PROPERTY_URL}/${propertyId}`,
      providesTags: (result, error, propertyId) => [
        { type: "Property", id: propertyId },
      ],
    }),

    allProperties: builder.query({
      query: () => `${PROPERTY_URL}/allProperties`,
    }),

    getPropertyDetails: builder.query({
      query: (propertyId) => ({
        url: `${PROPERTY_URL}/${propertyId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProperty: builder.mutation({
      query: (propertyData) => ({
        url: `${PROPERTY_URL}`,
        method: "POST",
        body: propertyData,
      }),
      invalidatesTags: ["Property"],
    }),

    updateProperty: builder.mutation({
      query: ({ propertyId, formData }) => ({
        url: `${PROPERTY_URL}/${propertyId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    uploadPropertyImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    deleteProperty: builder.mutation({
      query: (propertyId) => ({
        url: `${PROPERTY_URL}/${propertyId}`,
        method: "DELETE",
      }),
      providesTags: ["Property"],
    }),

    
    getNewProperties: builder.query({
      query: () => `${PROPERTY_URL}/new`,
      keepUnusedDataFor: 5,
    }),

  }),
});


export const {
  useCreatePropertyMutation,useGetPropertyByIdQuery,useGetPropertiesQuery,useGetPropertyDetailsQuery,useUpdatePropertyMutation,useDeletePropertyMutation,useGetNewPropertiesQuery, useUploadPropertyImageMutation,useAllPropertiesQuery
}=propertyApiSlice
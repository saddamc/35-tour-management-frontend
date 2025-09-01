import { baseApi } from "@/redux/baseApi";




export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeName,
            }),
            invalidatesTags: ["TOUR"],
        }),
        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET",
            }),
            providesTags: ["TOUR"],
            // specific data fetching / unused data remove for faster
            transformResponse: (arg) => arg.data,
        }),
    })
})

export const { useGetTourTypesQuery, useAddTourTypeMutation  } = tourApi; 
import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addDivision: builder.mutation({
            query: (divisionData) => ({
                url: "/division/create",
                method: "POST",
                data: divisionData,
            }),
            invalidatesTags: ["DIVISION"],
        }),
        // removeTourType: builder.mutation({
        //     query: (tourTypeId) => ({
        //         url: `/tour/tour-types/${tourTypeId}`,
        //         method: "DELETE",
        //         data: tourTypeId,
        //     }),
        //     invalidatesTags: ["TOUR"],
        // }),
        getDivisions: builder.query({
            query: () => ({
                url: "/division",
                method: "GET",
            }),
            providesTags: ["DIVISION"],
            // specific data fetching / unused data remove for faster
            transformResponse: (response) => response.data,
        }),
    })
})

export const { useAddDivisionMutation, useGetDivisionsQuery  } = divisionApi; 
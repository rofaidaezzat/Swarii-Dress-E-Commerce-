import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export interface IProduct {
    id:string,
    title:string,
    description:string,
    price:number,
    thumbnail:string,
}
interface ICreate {
    title:string,
    description:string,
    price:number,
    thumbnail:string,
}


interface IUpdate {
    title:string,
    description:string,
    price:number,
    thumbnail:string,
}
export type IProductResponse =IProduct[];

const SUPABASE_URL = 'https://ldufhmwdeanyvzdvkovm.supabase.co/rest/v1/';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdWZobXdkZWFueXZ6ZHZrb3ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTE0NTEsImV4cCI6MjA2NjM2NzQ1MX0.chHrpF1_SwajD-BkgSYDQphiPCE2_Mo5IJpHLbwxxQQ'; // ضع هنا الـ anon key

export const ProductApiSlice=createApi({
    reducerPath:'ApiProduct',
    // بعمل cash  للداتا
    tagTypes:['DashboardProduct'],
    // علشان لو النت فصل لما يرجع هيعمل فيتش تاني علشان لو في داتا اتغيرت ولا حاجه
    refetchOnReconnect: true,
    baseQuery:fetchBaseQuery({
        baseUrl: SUPABASE_URL,
        prepareHeaders: (headers) => {
            headers.set('apikey', SUPABASE_KEY);
            headers.set('Authorization', `Bearer ${SUPABASE_KEY}`);
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
        endpoints:(builder)=>({
        // -----------------Get =>get--------------------
        getDashboardProduct:builder.query<IProductResponse, void>({
            query: () => ({
                url: 'Products',
                method: 'GET',
            }),
            // to save the update in cash
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({
                        type: 'DashboardProduct' as const,
                        id: id, // لازم id هنا
                        })),
                        { type: 'DashboardProduct', id: 'LIST' },
                    ]
                    : [{ type: 'DashboardProduct', id: 'LIST' }],
        }),
        //------------------Create=>post------------------
        CreateDashboardProduct: builder.mutation({
            query: ({ body }: { body:ICreate }) => ({
                url: 'Products',
                method: "POST",
                body: body
            }),
             // to save the update in cash
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        ProductApiSlice.util.updateQueryData(
                        'getDashboardProduct',
                        undefined,
                        (draft) => {
                        draft.unshift(data);
                        }
                    )
                    );
                } catch (err) {
                    console.error("Error in cache update after create:", err);
                }
                },
                invalidatesTags: [{ type: "DashboardProduct", id: "LIST" }]
        }),
         //-----------------update=>patch---------------------
        UpdateDashboardProduct: builder.mutation({
            query: ({ id, body }: { id:string|null; body:IUpdate }) => ({
                url: `Products?id=eq.${id}`,
                method: "PATCH",
                body: body
            }),
            // to save the update in cash
            async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
                if (id === null) return;
            
                const patchResult = dispatch(
                    ProductApiSlice.util.updateQueryData('getDashboardProduct', undefined, (draft) => {
                    const index = draft.findIndex((member) => member.id === id);
                    if (index !== -1) {
                        draft[index] = { ...draft[index], ...body };
                    }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
                },
            invalidatesTags: [{ type: "DashboardProduct", id: "LIST" }]
        }),
         //-----------------------Delete=>delete---------------------
            deleteDashboardProduct:builder.mutation({
            query:(id:string|null)=>{
                return{
                    url:`Products?id=eq.${id}`,
                    method:"DELETE",
                    
                }
            },
            invalidatesTags: [{ type: 'DashboardProduct', id: 'LIST' }]
        }),
          
            
    })

})
export const {useGetDashboardProductQuery,useDeleteDashboardProductMutation,useCreateDashboardProductMutation,useUpdateDashboardProductMutation}=ProductApiSlice;
import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/loginslice'
import cartSlice from './features/cartSlice';
import globalSlice from './features/globalSlice';
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ProductApiSlice } from './services/crudDresses';
import networkSlice from './features/networkSlice';


const persistCartConfig = {
    key: 'cart',
    storage,

}
const persistedCart=persistReducer(persistCartConfig,cartSlice)
export const store = configureStore({
    reducer: {
        network:networkSlice,
        login:loginSlice,
        cart:persistedCart,
        global:globalSlice,
        [ProductApiSlice.reducerPath]:ProductApiSlice.reducer,

    }, 
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        })
        .concat(
            ProductApiSlice.middleware
        )
})

    export const persistor=persistStore(store)
    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch

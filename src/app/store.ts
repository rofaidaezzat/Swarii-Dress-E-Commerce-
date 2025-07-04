import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/loginslice'
import cartSlice from './features/cartSlice';
import globalSlice from './features/globalSlice';
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistCartConfig = {
    key: 'cart',
    storage,

}
const persistedCart=persistReducer(persistCartConfig,cartSlice)
export const store = configureStore({
    reducer: {
        login:loginSlice,
        cart:persistedCart,
        global:globalSlice

    }, 
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        })
        .concat(
            
        )
})

    export const persistor=persistStore(store)
    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch

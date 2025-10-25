//create store 
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice.ts'
import todosReducer from './todosSlice.ts'


const store = configureStore({
    reducer: {
        counter: counterReducer,
        todos: todosReducer
    }
})

export type RootState = ReturnType<typeof store.getState>


export default store 
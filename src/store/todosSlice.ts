import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import axios from "axios";


export interface Todo {
    id: number,
    title: string,
    status: 'incomplete' | 'complete'
}
interface TodosState {
    todos: Todo[],
    loading: boolean,
    error: string | null
}

// const testInitialTodos: Todo[] = [
//     { id: 0, title: 'task', status: 'complete' }
// ]

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null
}


const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        add(state, action: PayloadAction<Todo>) {
            // state.todos = [action.payload, ...state.todos] // immutable way
            state.todos.unshift(action.payload) // mutable way , allowed by immerjs
        },
        del(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter(item => item.id !== action.payload)
        },
        setTodos(state, action: PayloadAction<Todo[]>) {
            state.todos = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
    }

})
//export action crators for each case reducer fn , and the reduer fn for the whole slice 
export const { add, del, setTodos, setLoading, setError } = todosSlice.actions
export const selectTodos = (state: RootState) => state.todos.todos // aimed to make code more modular n reusable 
export const selectLoading = (state: RootState) => state.todos.loading
export const selectError = (state: RootState) => state.todos.error

//create thunks / async ations 
export const fetchtTodosAsync = async (dispatch: Dispatch, thunkPayload?: any) => {
    dispatch(setLoading(true))
    try {

        // // MockJS doen NOT intercept Fetch requests by default, so if u r using Fetch, MockJS wont' mock it. 
        // await fetch('http://www.test-server.com/api/todos')
        //     .then(response => response.json())
        //     .then((data: { todos: Todo[] }) => {
        //         console.log("fetched todos", data.todos);
        //         dispatch(setTodos(data.todos))
        //     })




        await axios.get<{ todos: Todo[] }>('http://www.test-server.com/api/todos')
            .then((response) => {
                return response.data.todos
            })
            .then((data) => {
                console.log("fetched todos", data);
                dispatch(setTodos(data))
            })



        // //simulate network delay
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // //siulate error 
        // Math.random() < 0.5 && (() => { throw new Error('Simulated network error') })()
        // dispatch(setTodos(testInitialTodos))


    } catch (error: any) {
        dispatch(setError(error.message || 'Failed to fetch todos'))
    } finally {
        dispatch(setLoading(false))
    }

}

export default todosSlice.reducer
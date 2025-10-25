import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { RootState } from '.'



const counterSlice = createSlice({

    name: 'counter',
    initialState: {
        loading: false,
        error: null,
        count: 0
    },
    reducers: {
        increment(state) {
            state.count++
        },
        decrement(state) {
            state.count -= 1
        },
        incrementByAmount(state, action) {
            state.count = action.payload
        },
        setCount(state, action) {
            state.count = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }

        // initialize(state) {
        //     // This is wrong because the proxy `state` is only valid during the reducer call.
        //     // By the time the timeout callback runs, the reducer call has finished and the proxy is revoked.
        //     setTimeout(() => {
        //         state.count = 0
        //     }, 2000);
        //     //so, instead, we should handle async operatoins with thunks(or other middleware). here's how to do it with createAsyncThunk 

        // },

    }
})

// sync actions:  we need to export the generated redux action creators for each case reducer fn  and the reducer fn for the whole slice
export const { increment, decrement, incrementByAmount, setCount, setLoading, setError } = counterSlice.actions

//abstract selector functions for concisness n reusability
export const selectCount = (state: RootState) => state.counter.count
export const selectLoading = (state: RootState) => state.counter.loading
export const selectError = (state: RootState) => state.counter.error


//async actions:  create a thunk (me: create an async action) without using createAsyncThunk
export const initializeCountAsync = async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true))
        await new Promise(resolve => setTimeout(resolve, 2000))
        Math.random() < 0.5 && (() => { throw new Error('Simulate network error') })()
        dispatch(setCount(0))
        dispatch(setError(null))
    }
    catch (error: any) {
        dispatch(setError(error.message || 'fail to async initialize redux state count'))
    }
    finally {
        dispatch(setLoading(false))
    }


}



export default counterSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toDoTask } from "../services/todoTask"


const initialState = {
    loading: false,
    taskList: [],
    error: ''
}

export const fetchTasks = createAsyncThunk('task/fetchTasks', async () => {
    return await toDoTask()
        .then((res) => {
            return res.data.map((task) => task)
        })
})

const toDoSlice = createSlice({
    name: 'todoList',
    initialState,
    reducer: {},
    extraReducers: builder => {
        builder.addCase(fetchTasks.pending, (state) => {
            // console.log("loading................................")
            state.loading = true
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            // console.log("action.................", action);
            state.loading = false
            state.taskList = action.payload
            state.error = ''
        })
        builder.addCase(fetchTasks.rejected, (state, action) => {
            // console.log("rejected......................");
            state.loading = false
            state.taskList = []
            state.error = action.error.message
        })
    }
})

export default toDoSlice.reducer
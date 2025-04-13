import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGoals = createAsyncThunk("goals/fetch", async () => {
    const res = await axios.get("http://localhost:5000/api/goals");
    return res.data;
});

export const fetchTasksByGoal = createAsyncThunk("goals/fetchTasks", async (goalId) => {
    const res = await axios.get(`http://localhost:5000/api/goals/${goalId}/tasks`);
    return { goalId, tasks: res.data };
});

const goalsSlice = createSlice({
    name: "goals",
    initialState: { list: [], tasks: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(fetchTasksByGoal.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks;
            });
    },
});

export default goalsSlice.reducer;
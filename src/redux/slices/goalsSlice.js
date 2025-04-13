import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    goals: [],
    tasks: [],
};

export const fetchGoals = createAsyncThunk('goals/fetch', async () => {
    const res = await axios.get('/api/goals');
    return res.data;
});

export const fetchTasks = createAsyncThunk('tasks/fetch', async (goalId) => {
    const res = await axios.get(`/api/goals/${goalId}/tasks`);
    return res.data;
});

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.goals = action.payload;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
            });
    },
});

export default goalsSlice.reducer;

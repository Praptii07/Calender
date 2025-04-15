import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Use Vite environment variable
const API_BASE_URL = 'http://localhost:5000';


export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/events`);
        return res.data;
    } catch (error) {
        const message = error.response ? error.response.data : error.message;
        return rejectWithValue(message);
    }
});

export const addEvent = createAsyncThunk('events/addEvent', async (event, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/api/events`, event);
        return res.data;
    } catch (error) {
        const message = error.response ? error.response.data : error.message;
        return rejectWithValue(message);
    }
});

export const updateEvent = createAsyncThunk('events/updateEvent', async (event, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${API_BASE_URL}/api/events/${event._id}`, event);
        return res.data;
    } catch (error) {
        const message = error.response ? error.response.data : error.message;
        return rejectWithValue(message);
    }
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_BASE_URL}/api/events/${id}`);
        return id;
    } catch (error) {
        const message = error.response ? error.response.data : error.message;
        return rejectWithValue(message);
    }
});

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch events
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Add event
            .addCase(addEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events.push(action.payload);
            })
            .addCase(addEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Update event
            .addCase(updateEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.events.findIndex(event => event._id === action.payload._id);
                if (index !== -1) {
                    state.events[index] = action.payload;
                }
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Delete event
            .addCase(deleteEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events = state.events.filter(event => event._id !== action.payload);
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default eventsSlice.reducer;

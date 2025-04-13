import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const res = await axios.get('http://localhost:5000/api/events');
    return res.data;
});

export const addEvent = createAsyncThunk('events/addEvent', async (event) => {
    const res = await axios.post('http://localhost:5000/api/events', event);
    return res.data;
});

export const updateEvent = createAsyncThunk('events/updateEvent', async (event) => {
    const res = await axios.put(`http://localhost:5000/api/events/${event._id}`, event);
    return res.data;
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    return id;
});

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.events = action.payload;
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.events.push(action.payload);
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                const index = state.events.findIndex(event => event._id === action.payload._id);
                if (index !== -1) {
                    state.events[index] = action.payload;
                }
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.events = state.events.filter(event => event._id !== action.payload);
            });
    },
});

export default eventsSlice.reducer;

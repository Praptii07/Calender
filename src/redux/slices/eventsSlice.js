import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEvents = createAsyncThunk("events/fetch", async () => {
    const res = await axios.get("http://localhost:5000/api/events");
    return res.data;
});

export const addEvent = createAsyncThunk("events/add", async (event) => {
    const res = await axios.post("http://localhost:5000/api/events", event);
    return res.data;
});

const eventsSlice = createSlice({
    name: "events",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.fulfilled, (state, action) =>
                action.payload.map(event => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end),
                }))
            )
            .addCase(addEvent.fulfilled, (state, action) => {
                // Also convert new event's dates to Date objects
                state.push({
                    ...action.payload,
                    start: new Date(action.payload.start),
                    end: new Date(action.payload.end),
                });
            });
    },
});

export default eventsSlice.reducer;

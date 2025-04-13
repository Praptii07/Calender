import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/eventsSlice";
import goalsReducer from "./slices/goalsSlice";

export default configureStore({
    reducer: {
        events: eventsReducer,
        goals: goalsReducer,
    },
});
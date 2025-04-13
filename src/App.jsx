import './App.css';
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import CalendarView from "./components/CalendarView";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <Provider store={store}>
            <div className="d-flex h-100">
                {/* Sidebar on the left side */}
                <div className="bg-light p-3" style={{ width: '250px', height: '100vh', overflowY: 'auto' }}>
                    <Sidebar />
                </div>

                {/* Calendar on the right side */}
                <div className="flex-grow-1 p-3">
                    <CalendarView />
                </div>
            </div>
        </Provider>
    );
}

export default App;

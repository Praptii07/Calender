import React from 'react';
import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

const App = () => {
    return (
        <Provider store={store}>
            <div className="app-container">
                <Sidebar />
                <Calendar />
            </div>
        </Provider>
    );
};

export default App;
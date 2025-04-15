import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/slices/eventsSlice';
import EventModal from './EventModal';

const localizer = momentLocalizer(moment);

const Calendar = () => {
    const dispatch = useDispatch();
    const { events } = useSelector((state) => state.events);
    const [modalInfo, setModalInfo] = useState({ open: false, event: null });

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    // Ensure events is an array before processing
    const processedEvents = Array.isArray(events) ? events.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
    })) : [];

    const handleSelectEvent = (event) => {
        console.log('Selected Event:', event);
        setModalInfo({ open: true, event });
    };

    const handleSelectSlot = ({ start, end }) => {
        setModalInfo({ open: true, event: { start, end, title: '', category: 'work' } });
    };

    return (
        <div className="calendar-container">
            <BigCalendar
                localizer={localizer}
                events={processedEvents}
                selectable
                defaultView="month"
                views={["month", "week", "day"]}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                style={{ height: '90vh' }}
            />
            {modalInfo.open && <EventModal modalInfo={modalInfo} setModalInfo={setModalInfo} />}
        </div>
    );
};

export default Calendar;

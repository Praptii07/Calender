import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, addEvent } from "../redux/slices/eventsSlice";
import EventModal from "./EventModal";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events);

    const [showModal, setShowModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const handleSelectSlot = (slotInfo) => {
        setSelectedSlot({
            start: slotInfo.start,
            end: slotInfo.end
        });
        setShowModal(true);
    };

    const handleSave = (eventData) => {
        dispatch(addEvent(eventData));
    };

    return (
        <div className="flex-grow p-4">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                style={{ height: "100%" }}
                draggableAccessor={() => true}
                resizable
            />

            <EventModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                onSave={handleSave}
                initialData={selectedSlot}
            />
        </div>
    );
};

export default CalendarView;

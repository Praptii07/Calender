import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent, deleteEvent } from '../redux/slices/eventsSlice';
import moment from 'moment';

const categories = ["exercise", "eating", "work", "relax", "family", "social"];

const EventModal = ({ modalInfo, setModalInfo }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        title: modalInfo.event?.title || '',
        category: modalInfo.event?.category || categories[0],
        start: moment(modalInfo.event?.start).format('YYYY-MM-DDTHH:mm'),
        end: moment(modalInfo.event?.end).format('YYYY-MM-DDTHH:mm'),
        _id: modalInfo.event?._id || null,
    });

    useEffect(() => {
        if (modalInfo.event) {
            setForm({
                title: modalInfo.event.title,
                category: modalInfo.event.category,
                start: moment(modalInfo.event.start).format('YYYY-MM-DDTHH:mm'),
                end: moment(modalInfo.event.end).format('YYYY-MM-DDTHH:mm'),
                _id: modalInfo.event._id,
            });
        }
    }, [modalInfo.event]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const data = {
            ...form,
            start: new Date(form.start),
            end: new Date(form.end),
        };

        if (form._id) {
            dispatch(updateEvent(data)); // Update event
        } else {
            dispatch(addEvent(data)); // Add new event
        }
        setModalInfo({ open: false });
    };

    const handleDelete = () => {
        if (form._id) {
            dispatch(deleteEvent(form._id)); // Delete event
        }
        setModalInfo({ open: false });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-header">{form._id ? "Edit Event" : "Add Event"}</h2>
                <input
                    className="input-field"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Event Title"
                />
                <select
                    className="input-field"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input
                    className="input-field"
                    type="datetime-local"
                    name="start"
                    value={form.start}
                    onChange={handleChange}
                />
                <input
                    className="input-field"
                    type="datetime-local"
                    name="end"
                    value={form.end}
                    onChange={handleChange}
                />
                <div className="modal-actions">
                    <button className="btn-save" onClick={handleSubmit}>Save</button>
                    {form._id && <button className="btn-delete" onClick={handleDelete}>Delete</button>}
                    <button className="btn-cancel" onClick={() => setModalInfo({ open: false })}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;

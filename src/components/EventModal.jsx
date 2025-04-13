// EventModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const categoryColors = {
    exercise: "#1abc9c",
    eating: "#f39c12",
    work: "#3498db",
    relax: "#9b59b6",
    family: "#e74c3c",
    social: "#2ecc71"
};

const EventModal = ({ show, handleClose, onSave, initialData }) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("work");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setCategory(initialData.category || "work");
            setStart(initialData.start ? new Date(initialData.start).toISOString().slice(0, 16) : "");
            setEnd(initialData.end ? new Date(initialData.end).toISOString().slice(0, 16) : "");
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (!title || !start || !end) {
            alert("Please fill out all fields.");
            return;
        }
        onSave({
            title,
            category,
            start: new Date(start),
            end: new Date(end),
            color: categoryColors[category]
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? "Edit Event" : "Add Event"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="exercise">Exercise</option>
                            <option value="eating">Eating</option>
                            <option value="work">Work</option>
                            <option value="relax">Relax</option>
                            <option value="family">Family</option>
                            <option value="social">Social</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Event
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EventModal;
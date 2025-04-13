import React from "react";

const Sidebar = () => {
    const staticGoals = [
        { _id: "1", name: "Be Fit", color: "#fce4ec" },
        { _id: "2", name: "Academics", color: "#e3f2fd" },
        { _id: "3", name: "Learn", color: "#f3e5f5" },
        { _id: "4", name: "Sports", color: "#fff3e0" },
        { _id: "5", name: "Music", color: "#e0f7fa" },
        { _id: "6", name: "Fitness+", color: "#f1f8e9" },
    ];

    const staticTasks = [
        { _id: "a1", name: "AI based agents", color: "#fce4ec" },
        { _id: "a2", name: "MLE", color: "#e3f2fd" },
        { _id: "a3", name: "DE related", color: "#f3e5f5" },
        { _id: "a4", name: "Basics", color: "#fff3e0" },
        { _id: "a5", name: "Extra Task 1", color: "#e0f2f1" },
        { _id: "a6", name: "Extra Task 2", color: "#ede7f6" },
    ];

    return (
        <div className="bg-white shadow-lg rounded p-3 d-flex flex-column h-100" style={{ minWidth: '250px', maxWidth: '300px' }}>
            <h2 className="font-weight-bold text-dark mb-3">Goals</h2>
            <div className="flex-grow-1 overflow-auto" style={{ maxHeight: '350px' }}>
                {staticGoals.map((goal) => (
                    <div key={goal._id} className="mb-3">
                        <button
                            className="w-100 text-left px-3 py-2 rounded shadow-sm"
                            style={{ backgroundColor: goal.color }}
                        >
                            <span className="font-weight-medium text-dark">{goal.name}</span>
                        </button>
                    </div>
                ))}
            </div>

            <h3 className="mt-4 font-weight-semibold text-dark">Tasks</h3>
            <div className="flex-grow-1 overflow-auto" style={{ maxHeight: '350px' }}>
                {staticTasks.map((task) => (
                    <div
                        key={task._id}
                        className="px-3 py-2 mt-2 rounded cursor-move shadow-sm"
                        draggable
                        onDragStart={(e) =>
                            e.dataTransfer.setData("text/plain", JSON.stringify(task))
                        }
                        style={{ backgroundColor: task.color }}
                    >
                        <span className="text-dark">{task.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

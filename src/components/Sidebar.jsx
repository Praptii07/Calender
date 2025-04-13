import React from "react";

const Sidebar = () => {
    const staticGoals = [
        { _id: "1", name: "Be Fit", color: "#FFEBEE" },
        { _id: "2", name: "Academics", color: "#E3F2FD" },
        { _id: "3", name: "Learn", color: "#E8F5E9" },
        { _id: "4", name: "Sports", color: "#FFF3E0" },
    ];

    const staticTasks = [
        { _id: "a1", name: "AI based agents", color: "#FCE4EC" },
        { _id: "a2", name: "MLE", color: "#E1F5FE" },
        { _id: "a3", name: "DE related", color: "#F3E5F5" },
        { _id: "a4", name: "Basics", color: "#F9FBE7" },
    ];

    return (
        <div className="w-100">
            {/* Goals Section */}
            <h2 className="font-weight-bold mb-3">Goals</h2>
            <div
                className="bg-light p-2 mb-3"
                style={{ height: "200px", overflowY: "auto" }} // Added overflowY
            >
                {staticGoals.map((goal) => (
                    <div key={goal._id} className="mb-2">
                        <button
                            className="w-100 text-left px-4 py-2 rounded shadow"
                            style={{ backgroundColor: goal.color }}
                        >
                            {goal.name}
                        </button>
                    </div>
                ))}
            </div>

            {/* Tasks Section */}
            <h3 className="font-weight-bold mb-3">Tasks</h3>
            <div
                className="bg-light p-2"
                style={{ height: "200px", overflowY: "auto" }} // Added overflowY
            >
                {staticTasks.map((task) => (
                    <div
                        key={task._id}
                        className="px-4 py-2 mt-1 rounded cursor-move mb-2"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify(task))}
                        style={{ backgroundColor: task.color }}
                    >
                        {task.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

import { useState } from "react";
import api from "../services/api";

const TaskDetailModal = ({ task, closeModal, refreshTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);

  const handleUpdate = async () => {
    await api.put(`/tasks/${task._id}`, {
      title,
      description,
      priority,
      status
    });
    refreshTasks();
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      await api.delete(`/tasks/${task._id}`);
      refreshTasks();
      closeModal();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* HEADER */}
        <div className="modal-header">
          <h3>Task Details</h3>
          <button className="close-btn" onClick={closeModal}>✕</button>
        </div>

        {!isEditing ? (
          <>
            <p><b>Title:</b> {title}</p>
            <p><b>Description:</b> {description || "—"}</p>
            <p><b>Priority:</b> {priority}</p>
            <p><b>Status:</b> {status}</p>
            <p>
              <b>Created:</b>{" "}
              {new Date(task.createdAt).toLocaleString()}
            </p>

            <div className="modal-actions">
              <button className="btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>

              <button className="btn btn-secondary" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <div className="modal-actions">
              <button className="btn" onClick={handleUpdate}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetailModal;

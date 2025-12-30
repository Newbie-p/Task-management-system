import { useState } from "react";
import api from "../services/api";

const NewTaskModal = ({ closeModal, refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", {
      title,
      description,
      priority,
      dueDate
    });
    refreshTasks();
    closeModal();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* HEADER */}
        <div className="modal-header">
          <h3>New Task</h3>
          <button className="close-btn" onClick={closeModal}>
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
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

          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          {/* ACTIONS */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="btn" type="submit">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;

import { useEffect, useState } from "react";
import api from "../services/api";
import NewTaskModal from "../components/NewTaskModal";
import TaskDetailModal from "../components/TaskDetailModal";

const Dashboard = () => {
  /* STATES */
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingPriorityId, setEditingPriorityId] = useState(null);

  /*  FETCH TASKS  */
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks?page=1&limit=100");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  /*  PRIORITY SORT  */
  const priorityRank = { high: 1, medium: 2, low: 3 };

  /*DASHBOARD VIEW  */
  const upcomingTasks = [...tasks]
    .filter((t) => t.status !== "completed")
    .sort((a, b) => {
      const dateDiff = new Date(a.dueDate) - new Date(b.dueDate);
      if (dateDiff !== 0) return dateDiff;
      return priorityRank[a.priority] - priorityRank[b.priority];
    })
    .slice(0, 10);

  /*  TASK ACTIONS  */
  const toggleStatus = async (task) => {
    await api.put(`/tasks/${task._id}`, {
      status: task.status === "completed" ? "pending" : "completed",
    });
    fetchTasks();
  };

  const updatePriority = async (taskId, priority) => {
    await api.put(`/tasks/${taskId}`, { priority });
    setEditingPriorityId(null);
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    if (confirm("Delete this task?")) {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    }
  };

  /*  DATE HELPERS  */
  const isToday = (date) => {
    const d = new Date(date);
    const t = new Date();
    return (
      d.getDate() === t.getDate() &&
      d.getMonth() === t.getMonth() &&
      d.getFullYear() === t.getFullYear()
    );
  };

  const isTomorrow = (date) => {
    const d = new Date(date);
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return (
      d.getDate() === t.getDate() &&
      d.getMonth() === t.getMonth() &&
      d.getFullYear() === t.getFullYear()
    );
  };

  const isThisWeek = (date) => {
    const d = new Date(date);
    const now = new Date();
    const weekEnd = new Date();
    weekEnd.setDate(now.getDate() + 7);
    return d > now && d <= weekEnd;
  };

  /*  MY TASKS GROUPING  */
  const todayTasks = tasks.filter((t) => t.dueDate && isToday(t.dueDate));
  const tomorrowTasks = tasks.filter((t) => t.dueDate && isTomorrow(t.dueDate));
  const weekTasks = tasks.filter(
    (t) =>
      t.dueDate &&
      !isToday(t.dueDate) &&
      !isTomorrow(t.dueDate) &&
      isThisWeek(t.dueDate)
  );

  /* REUSABLE TASK ROW  */
  const TaskRow = ({ task, dueLabel }) => (
    <div
      className={`task-list-row ${
        task.status === "completed" ? "completed" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={task.status === "completed"}
        onChange={() => toggleStatus(task)}
      />

      <span className="task-title" onClick={() => setSelectedTask(task)}>
        {task.title}
      </span>

      <span className="due-label">{dueLabel}</span>

      <span className="stage">
        {task.status === "completed" ? "Completed" : "In progress"}
      </span>

      {editingPriorityId === task._id ? (
        <select
          value={task.priority}
          onChange={(e) => updatePriority(task._id, e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      ) : (
        <span
          className={`badge ${task.priority}`}
          style={{ cursor: "pointer" }}
          onClick={() => setEditingPriorityId(task._id)}
        >
          {task.priority}
        </span>
      )}

      <div className="dots-menu">
        <span onClick={() => setSelectedTask(task)}>Edit</span>
        <span onClick={() => deleteTask(task._id)}>Delete</span>
      </div>
    </div>
  );

  /* JSX */
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-title">Task Manager</div>
        <button className="btn" onClick={() => setShowModal(true)}>
          + New Task
        </button>
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </nav>

      {/* MODALS */}
      {showModal && (
        <NewTaskModal
          closeModal={() => setShowModal(false)}
          refreshTasks={fetchTasks}
        />
      )}

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          closeModal={() => setSelectedTask(null)}
          refreshTasks={fetchTasks}
        />
      )}

      {/* MAIN LAYOUT */}
      <div className="dashboard-layout">
        <div className="sidebar">
          <div
            className={`sidebar-item ${
              activeView === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveView("dashboard")}
          >
            Dashboard
          </div>
          <div
            className={`sidebar-item ${
              activeView === "mytasks" ? "active" : ""
            }`}
            onClick={() => setActiveView("mytasks")}
          >
            My Tasks
          </div>
        </div>

        <div className="dashboard-content">
          {/* DASHBOARD */}
          {activeView === "dashboard" && (
            <div className="task-card">
              <h3>Upcoming Tasks</h3>
              {upcomingTasks.map((task) => (
                <div
                  key={task._id}
                  className={`task-row ${
                    task.status === "completed" ? "completed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => toggleStatus(task)}
                  />
                  <span
                    className="task-title"
                    onClick={() => setSelectedTask(task)}
                  >
                    {task.title}
                  </span>

                  {editingPriorityId === task._id ? (
                    <select
                      value={task.priority}
                      onChange={(e) =>
                        updatePriority(task._id, e.target.value)
                      }
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  ) : (
                    <span
                      className={`badge ${task.priority}`}
                      onClick={() => setEditingPriorityId(task._id)}
                      style={{ cursor: "pointer" }}
                    >
                      {task.priority}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* MY TASKS */}
          {activeView === "mytasks" && (
            <div className="task-section">
              <h3>Today</h3>
              {todayTasks.map((t) => (
                <TaskRow key={t._id} task={t} dueLabel="Today" />
              ))}

              <h3>Tomorrow</h3>
              {tomorrowTasks.map((t) => (
                <TaskRow key={t._id} task={t} dueLabel="Tomorrow" />
              ))}

              <h3>This Week</h3>
              {weekTasks.map((t) => (
                <TaskRow
                  key={t._id}
                  task={t}
                  dueLabel={new Date(t.dueDate).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

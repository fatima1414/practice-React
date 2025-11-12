// pages/TaskList.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewTask, deleteTask } from "../features/taskSlice";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TaskCard = ({ task, onDelete }) => {
  return (
    <div className="card mb-3 shadow-sm border-0 rounded-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title fw-semibold mb-1 text-capitalize">
              {task.task_title || "Untitled"}
            </h5>
            <p className="card-text text-muted mb-2">
              {task.description || "No description provided."}
            </p>
            <p className="mb-2">
              <span className="badge bg-primary me-2">
                {task.task_category || "Uncategorized"}
              </span>
              <span className="badge bg-secondary">
                Priority: {task.priority || "-"}
              </span>
            </p>
            <small className="text-muted">
              {task.dueDate ? `Due: ${task.dueDate}` : ""}
            </small>
          </div>
          <div className="text-end">
            <NavLink
              to={`/updateTask/${task.id}`}
              className="btn btn-sm btn-outline-primary me-2"
            >
              <i className="bi bi-pencil-square me-1"></i>Edit
            </NavLink>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(task.id)}
            >
              <i className="bi bi-trash me-1"></i>Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskList = () => {
  const dispatch = useDispatch();
  const { taskList, loading } = useSelector((state) => state.task);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdDesc");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(viewTask());
  }, [dispatch]);

  const categories = useMemo(() => {
    const s = new Set(taskList.map((t) => t.task_category).filter(Boolean));
    return Array.from(s);
  }, [taskList]);

  // 🗑️ Delete confirmation popup
  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you cannot recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(id));
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  }

  const filtered = useMemo(() => {
    let out = [...taskList];
    if (query) {
      const q = query.toLowerCase();
      out = out.filter(
        (t) =>
          (t.task_title || "").toLowerCase().includes(q) ||
          (t.description || "").toLowerCase().includes(q) ||
          (t.tags || "").toLowerCase().includes(q)
      );
    }
    if (category) out = out.filter((t) => t.task_category === category);
    if (sortBy === "titleAsc")
      out.sort((a, b) => (a.task_title || "").localeCompare(b.task_title || ""));
    else if (sortBy === "titleDesc")
      out.sort((a, b) => (b.task_title || "").localeCompare(a.task_title || ""));
    else if (sortBy === "createdAsc")
      out.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // createdDesc
    return out;
  }, [taskList, query, category, sortBy]);

  // ➕ Show popup when adding a new task
  function handleAddTask() {
    Swal.fire({
      title: "Add a new task?",
      text: "You can create a new task in the next step.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, let's go!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/addTask");
      }
    });
  }

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">📋 Task Manager</h3>
        <button className="btn btn-primary" onClick={handleAddTask}>
          <i className="bi bi-plus-circle me-1"></i> Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4 align-items-center">
        <div className="col-md-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control"
            placeholder="🔍 Search by title, description or tags"
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdDesc">Newest</option>
            <option value="createdAsc">Oldest</option>
            <option value="titleAsc">Title A-Z</option>
            <option value="titleDesc">Title Z-A</option>
          </select>
        </div>
      </div>

      {/* Loading / Empty / List */}
      {loading && <div className="text-center my-3">Loading...</div>}

      {!loading && filtered.length === 0 ? (
        <div className="alert alert-info text-center py-3">
          No tasks found. Try adding one!
        </div>
      ) : (
        filtered.map((t) => (
          <TaskCard key={t.id} task={t} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default TaskList;

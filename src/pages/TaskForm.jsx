// pages/TaskForm.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask, viewTask } from "../features/taskSlice";
import { useNavigate, useParams } from "react-router-dom";

const taskCategoryOptions = ["coding", "graphics", "ui/ux", "research"];

const TaskForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { taskList } = useSelector((state) => state.task);
  const singleTask = taskList?.find((t) => t.id === id);

  useEffect(() => {
    dispatch(viewTask());
  }, [dispatch]);

  useEffect(() => {
    if (singleTask) reset(singleTask);
  }, [singleTask, reset]);

  function onSubmit(data) {
    if (!id) {
      dispatch(createTask(data));
    } else {
      dispatch(updateTask({ id, ...data }));
    }
    reset();
    navigate("/");
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <h4>{id ? "Update Task" : "Add Task"}</h4>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    {...register("task_category", { required: "Please select category" })}
                    defaultValue=""
                  >
                    <option value="" disabled>-- select category --</option>
                    {taskCategoryOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  {errors.task_category && <small className="text-danger">{errors.task_category.message}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    {...register("task_title", {
                      required: "Title is required",
                      minLength: { value: 3, message: "Minimum 3 characters" }
                    })}
                    className="form-control"
                    placeholder="Task title"
                  />
                  {errors.task_title && <small className="text-danger">{errors.task_title.message}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                      minLength: { value: 10, message: "Minimum 10 characters" }
                    })}
                    className="form-control"
                    rows={3}
                    placeholder="Task description"
                  />
                  {errors.description && <small className="text-danger">{errors.description.message}</small>}
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Priority (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      {...register("priority", {
                        required: "Priority is required",
                        min: { value: 1, message: "Min 1" },
                        max: { value: 5, message: "Max 5" }
                      })}
                      className="form-control"
                    />
                    {errors.priority && <small className="text-danger">{errors.priority.message}</small>}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Due Date</label>
                    <input
                      type="date"
                      {...register("dueDate", { required: "Due date is required" })}
                      className="form-control"
                    />
                    {errors.dueDate && <small className="text-danger">{errors.dueDate.message}</small>}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Assignee Email</label>
                    <input
                      type="email"
                      {...register("assigneeEmail", {
                        required: "Assignee email required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                      })}
                      className="form-control"
                    />
                    {errors.assigneeEmail && <small className="text-danger">{errors.assigneeEmail.message}</small>}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Task Type</label>
                  <div>
                    <label className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" {...register("type", { required: "Select type" })} value="bug" />
                      Bug
                    </label>
                    <label className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" {...register("type")} value="feature" />
                      Feature
                    </label>
                  </div>
                  {errors.type && <small className="text-danger">{errors.type.message}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Tags (comma separated)</label>
                  <input {...register("tags")} className="form-control" placeholder="e.g. frontend,api" />
                </div>

                <div className="d-flex justify-content-between">
                  <button className="btn btn-dark">{id ? "Update" : "Create"}</button>
                  <button type="button" className="btn btn-secondary" onClick={() => { reset(); navigate("/"); }}>Cancel</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;

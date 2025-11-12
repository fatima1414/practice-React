import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, viewTask } from "../features/taskSlice";
import {  FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";

const TaskList = () => {
  const { taskList } = useSelector((state) => state)
  console.log(taskList)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewTask())
  }, [])

  function trash(id){
 if(confirm("do you want to delete")){
     dispatch(deleteTask(id))
     dispatch(viewTask())
 }
  }
  return (
    <>
      <div className="container my-5">
        <div className="row">
          {
          taskList.map((ele, index) => (
            <div className="col-lg-4" key={index}>
              <div className="card">
                <div className="card-body">
                  <h2>{ele.task_title}</h2>
                  <p>{ele.task_category}</p>
                  <button className="btn btn-danger" onClick={()=>trash(ele.id)}><FaTrash/></button>
                  <NavLink className="btn btn-warning" to={`/updateTask/${ele.id}`}><FaPencil/></NavLink>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </>
  );
};

export default TaskList;

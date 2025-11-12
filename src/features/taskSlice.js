import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore";
import {db} from "../../firebase";
// var API_URL = "http://localhost:5000/taskList";
let userId = localStorage.getItem('userId')
export const createTask = createAsyncThunk("/createTask", async (data) => {
  const newTask ={...data,userId}
  console.log(newTask)
  await addDoc(collection(db, 'taskList'),newTask);
});

export const viewTask = createAsyncThunk("/viewTask", async () => {
   const result = await getDocs(query(collection(db,'taskList')))
  //  console.log(result)
  let arr = []
  result.forEach((ele)=>{
    // console.log(ele.data(),ele.id)
    const task = {
      id:ele.id,
      ...ele.data()
    }
    // console.log(task)
    arr.push(task)
  })
  const filterData = arr.filter((ele)=>ele.userId===userId)
  console.log(filterData)
  return filterData;
});

export const deleteTask = createAsyncThunk("/deleteTask", async (id) => {
  await deleteDoc(doc(db, `taskList/${id}`));
  return id;
});

export const updateTask = createAsyncThunk("/updateTask", async (data) => {
  await updateDoc(doc(db, `taskList/${data.id}`), data);
  return data;
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    taskList: [],
  },
  reducers: {},
  extraReducers: (res) => {
    res
      .addCase(createTask.fulfilled, (state, action) => {
        state.taskList.push(action.payload);
      })
      .addCase(viewTask.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.taskList = state.taskList.filter((task) => task.id !== id);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id } = action.payload;
        const index = state.taskList.findIndex((task) => task.id === id);
        if (index !== -1) {
          state.taskList[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;

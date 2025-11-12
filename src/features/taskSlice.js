// features/taskSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

let userId = localStorage.getItem("userId") || null;

export const createTask = createAsyncThunk(
  "task/createTask",
  async (data, thunkAPI) => {
    const newTask = { ...data, userId, createdAt: new Date().toISOString() };
    const docRef = await addDoc(collection(db, "taskList"), newTask);
    // return the new task including firestore id
    return { id: docRef.id, ...newTask };
  }
);

export const viewTask = createAsyncThunk("task/viewTask", async () => {
  const result = await getDocs(query(collection(db, "taskList")));
  const arr = [];
  result.forEach((ele) => {
    arr.push({ id: ele.id, ...ele.data() });
  });
  const filterData = arr.filter((ele) => ele.userId === userId);
  return filterData;
});

export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  await deleteDoc(doc(db, `taskList/${id}`));
  return id; // return id so reducer knows which to remove
});

export const updateTask = createAsyncThunk("task/updateTask", async (data) => {
  const { id, ...rest } = data;
  await updateDoc(doc(db, `taskList/${id}`), rest);
  return data;
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    taskList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        // add new task to list
        state.taskList.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(viewTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewTask.fulfilled, (state, action) => {
        state.loading = false;
        state.taskList = action.payload;
      })
      .addCase(viewTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        const id = action.payload;
        state.taskList = state.taskList.filter((task) => task.id !== id);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const { id } = action.payload;
        const idx = state.taskList.findIndex((t) => t.id === id);
        if (idx !== -1) state.taskList[idx] = action.payload;
      });
  },
});

export default taskSlice.reducer;

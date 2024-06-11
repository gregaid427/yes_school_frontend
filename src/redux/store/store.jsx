import { configureStore } from "@reduxjs/toolkit";
// import student from "../slices/storeSlice";
import student from "../slices/studentSlice";
import user from "../slices/usersSlice";
import classes from "../slices/classSlice";



const store = configureStore({
  reducer: {
    student: student,
    user: user,
    classes: classes,


  },
});

export default store;

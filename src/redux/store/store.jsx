import { configureStore } from "@reduxjs/toolkit";
// import student from "../slices/storeSlice";
import student from "../slices/studentSlice";
import user from "../slices/usersSlice";
import classes from "../slices/classSlice";
import subject from "../slices/subjectSlice";
import inventory from "../slices/InventorySlice";
import statistics from "../slices/statisticsSlice";
import expense from "../slices/expenseSlice";





const store = configureStore({
  reducer: {
    student: student,
    user: user,
    classes: classes,
    inventory: inventory,
    subject: subject,
    statistics: statistics,
    expense: expense


  },
});

export default store;

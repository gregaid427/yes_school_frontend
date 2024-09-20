import { configureStore } from "@reduxjs/toolkit";
// import student from "../slices/storeSlice";
import student from "../slices/studentSlice";
import user from "../slices/usersSlice";
import classes from "../slices/classSlice";
import subject from "../slices/subjectSlice";
import inventory from "../slices/inventSlice";
import statistics from "../slices/statisticsSlice";
import expense from "../slices/expenseSlice";
import session from "../slices/sessionSlice";
import fees from "../slices/feeSlice";
import exam from "../slices/ExamSlice";








const store = configureStore({
  reducer: {
    student: student,
    user: user,
    classes: classes,
    inventory: inventory,
    subject: subject,
    statistics: statistics,
    expense: expense,
    session: session,
    fees: fees,
    exam: exam

  },
});

export default store;

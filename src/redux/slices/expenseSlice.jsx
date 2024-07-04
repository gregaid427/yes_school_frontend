import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}` ,   'Content-Type': 'application/json'  }

export const CreatesExpenseAction = createAsyncThunk(
  "new/NewExpense",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/expense/`,payload
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const CreatesExpenseHeadAction = createAsyncThunk(
  "new/NewExpenseHead",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/expense/head`,payload
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);



export const CreatesExpenseCartegoryAction = createAsyncThunk(
  "new/NewExpensecart",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/Expense/cart`,payload
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBulkStudentAction = createAsyncThunk(
  "fetch/allstudent",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/student/`
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchAllExpenseAction = createAsyncThunk(
  "fetch/AllExpense",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/expense/`
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchExpenseStockAction = createAsyncThunk(
  "fetch/Expensestock",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/Expense/getstock`
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const FetchExpenseHeadAction = createAsyncThunk(
  "fetch/allExpenseHead",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/expense/head`
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSectionByExpense = createAsyncThunk(
  "fetch/sectiondelete",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/Expense/single/sectiondelete`, payload
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchSingleExpenseAction = createAsyncThunk(
  "fetch/singleExpense",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/Expense/single/`, payload
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchInventCartegoryAction = createAsyncThunk(
  "fetch/sectionExpensecart",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/Expense/cart`, payload
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExpenseAction = createAsyncThunk(
  "Expense/Update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/Expense/`, payload
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExpenseItemAction = createAsyncThunk(
  "ExpenseItem/Update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/Expense/item`, payload
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);


export const GetCustomExpenseAction = createAsyncThunk(
  "expense/custom",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/expense/custom`, payload
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const  createSectionAction = createAsyncThunk(
  "password/reset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/Expense/section`, payload
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const  deleteAllExpenseAction = createAsyncThunk(
  "Expense/deleteAllExpense",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/Expense/`, 
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const  deleteSingleExpenseAction = createAsyncThunk(
  "Expense/deleteASingleExpense",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/Expense/`, payload
        
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);




const ExpenseSlices = createSlice({
  name: "Expense",
  initialState: {},
  reducers: {
  
    resetcreateExpense(state) {
      state.CreateExpense = null
    },
    resetcreateExpenseHead(state) {
      state.CreateExpenseHead = null
    },
    resetcreatestock(state) {
      state.CreateExpensestock = null
    }
,   
    resetUpdateExpenseItem(state) {
      state.updateExpenseItem = null
    } ,
    resetUpdateExpense(state) {
      state.updateCartegory = null
    } ,
    resetdeleteExpense(state) {
      state.deletesectionbyExpense = null
    } ,
  },
  extraReducers: builder => {
    builder.addCase(CreatesExpenseAction.pending, (state, action) => {
      state.CreateExpenseloading = true;
      state.CreateExpense = false;

    });
    builder.addCase(CreatesExpenseAction.fulfilled, (state, action) => {
      state.CreateExpense = action?.payload;
      state.CreateExpenseloading = false;
      state.error = undefined;
    });
    builder.addCase(CreatesExpenseAction.rejected, (state, action) => {
      state.CreateExpenseloading = false;
      state.error = action.payload;
      state.CreateExpense = undefined;
    });

    

    builder.addCase(CreatesExpenseHeadAction.pending, (state, action) => {
      state.CreateExpenseHeadloading = true;
      state.CreateExpenseHead = false;

    });
    builder.addCase(CreatesExpenseHeadAction.fulfilled, (state, action) => {
      state.CreateExpenseHead = action?.payload;
      state.CreateExpenseHeadloading = false;
      state.error = undefined;
    });
    builder.addCase(CreatesExpenseHeadAction.rejected, (state, action) => {
      state.CreateExpenseHeadloading = false;
      state.error = action.payload;
      state.CreateExpenseHead = undefined;
    });




    

    builder.addCase(GetCustomExpenseAction.pending, (state, action) => {
      state.GetCustomExpenseloading = true;
      state.GetCustomExpense = false;
      
    });
    builder.addCase(GetCustomExpenseAction.fulfilled, (state, action) => {
      state.GetCustomExpense = action?.payload;
      state.GetCustomExpenseloading = false;
      state.error = undefined;
    });
    builder.addCase(GetCustomExpenseAction.rejected, (state, action) => {
      state.error = action.payload;
      state.GetCustomExpense = undefined;
      state.GetCustomExpenseloading = undefined;

    });




    builder.addCase(updateExpenseItemAction.pending, (state, action) => {
      state.updateExpenseItemloading = true;
      state.updateExpenseItem = false;
      
    });
    builder.addCase(updateExpenseItemAction.fulfilled, (state, action) => {
      state.updateExpenseItem = action?.payload;
      state.updateExpenseItemloading = false;
      state.error = undefined;
    });
    builder.addCase(updateExpenseItemAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updateExpenseItem = undefined;
      state.updateExpenseItemloading = undefined;

    });

    

    builder.addCase(fetchExpenseStockAction.pending, (state, action) => {
      state.fetchExpenseStockloading = true;
      state.fetchExpenseStock = false;
      
    });
    builder.addCase(fetchExpenseStockAction.fulfilled, (state, action) => {
      state.fetchExpenseStock = action?.payload;
      state.fetchExpenseStockloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchExpenseStockAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchExpenseStock = undefined;
      state.fetchExpenseStockloading = undefined;

    });

    builder.addCase(fetchAllExpenseAction.pending, (state, action) => {
      state.fetchAllExpenseloading = true;
      state.fetchAllExpense = false;
      
    });
    builder.addCase(fetchAllExpenseAction.fulfilled, (state, action) => {
      state.fetchAllExpense = action?.payload;
      state.fetchAllExpenseloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchAllExpenseAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchAllExpense = undefined;
      state.fetchAllExpenseloading = undefined;

    });


    builder.addCase(fetchInventCartegoryAction.pending, (state, action) => {
      state.cartegoryloading = true;
      state.cartegory = false;
      
    });
    builder.addCase(fetchInventCartegoryAction.fulfilled, (state, action) => {
      state.cartegory = action?.payload;
      state.cartegoryloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchInventCartegoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.cartegoryloading = undefined;
      state.cartegory = undefined;

    });




    builder.addCase(deleteSectionByExpense.pending, (state, action) => {
      state.deletesectionbyExpenseloading = true;
      state.deletesectionbyExpense = false;
      
    });
    builder.addCase(deleteSectionByExpense.fulfilled, (state, action) => {
      state.deletesectionbyExpense = action?.payload;
      state.deletesectionbyExpenseloading = false;
      state.error = undefined;
      state.deleteExpensesection= false
    });
    builder.addCase(deleteSectionByExpense.rejected, (state, action) => {
      state.error = action.payload;
      state.deletesectionbyExpense = undefined;
      state.deletesectionbyExpenseloading = undefined;
      state.deleteExpensesection= true


    });
    builder.addCase(fetchSingleExpenseAction.pending, (state, action) => {
      state.singleExpenseloading = true;
      state.singleExpense = false;
      
    });
    builder.addCase(fetchSingleExpenseAction.fulfilled, (state, action) => {
      state.singleExpense = action?.payload;
      state.singleExpenseloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchSingleExpenseAction.rejected, (state, action) => {
      state.error = action.payload;
      state.singleExpense = undefined;
      state.singleExpenseloading = undefined;

    });


    
    builder.addCase(FetchExpenseHeadAction.pending, (state, action) => {
      state.fetchexpenseheadloading = true;
      state.fetchexpensehead = false;
      
    });
    builder.addCase(FetchExpenseHeadAction.fulfilled, (state, action) => {
      state.fetchexpensehead = action?.payload;
      state.sfetchexpenseheadloading = false;
      state.error = undefined;
    });
    builder.addCase(FetchExpenseHeadAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchexpensehead = undefined;
      state.fetchexpenseheadloading = undefined;

    });




    builder.addCase(updateExpenseAction.pending, (state, action) => {
      state.updatesingleExpenseloading = false;
      state.updateExpense = false
      
    });
    builder.addCase(updateExpenseAction.fulfilled, (state, action) => {
      state.updatesingleExpense = action?.payload;
      state.updatesingleExpenseloading = false;
      state.error = undefined;
      state.updateExpense = true

    });
    builder.addCase(updateExpenseAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updatesingleExpense = undefined;
      state.updatesingleExpenseloading = undefined;

    });




    builder.addCase(createSectionAction.pending, (state, action) => {
      state.loading = true;
      state.createExpenseSection = undefined;
    });
    builder.addCase(createSectionAction.fulfilled, (state, action) => {
      state.createExpenseSection = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(createSectionAction.rejected, (state, action) => {
      state.createSectionloading = false;
      state.error = action.payload;
      state.createExpenseSection = undefined;
    });
    

    builder.addCase(deleteAllExpenseAction.pending, (state, action) => {
      state.deleteAllExpenseesloading = true;
    });
    builder.addCase(deleteAllExpenseAction.fulfilled, (state, action) => {
      state.deleteAllExpensees = action?.payload;
      state.deleteExpenseloading = false;
      state.error = undefined;
    });
    builder.addCase(deleteAllExpenseAction.rejected, (state, action) => {
      state.deleteAllExpenseesloading = false;
      state.error = action.payload;
      state.deleteAllExpensees = undefined;
    });


    builder.addCase(deleteSingleExpenseAction.pending, (state, action) => {
      state.deleteExpenseloading = true;
    });
    builder.addCase(deleteSingleExpenseAction.fulfilled, (state, action) => {
      state.deleteExpensees = action?.payload;
      state.deleteExpenseloading = false;
      state.error = undefined;
    });
    builder.addCase(deleteSingleExpenseAction.rejected, (state, action) => {
      state.deleteExpenseloading = false;
      state.error = action.payload;
      state.deleteExpensees = undefined;
    });




  },
});


export const {resetcreatestock, resetUpdateExpenseItem,resetcreateExpense,resetUpdateExpense,resetdeleteExpense ,resetcreateExpenseHead } = ExpenseSlices.actions

export default ExpenseSlices.reducer;



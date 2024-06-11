import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}` ,   'Content-Type': 'application/json'  }

export const CreatesClassAction = createAsyncThunk(
  "new/NewClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/class/`,payload
        
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
export const fetchAllClassAction = createAsyncThunk(
  "fetch/AllClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/class/all`
        
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
export const fetchAllSectionAction = createAsyncThunk(
  "fetch/AllSection",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/class/section`
        
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
export const fetchSingleClassAction = createAsyncThunk(
  "fetch/singleclass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/class/single/`, payload
        
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

export const updateClassAction = createAsyncThunk(
  "class/Update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/class/`, payload
        
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
        `http://localhost:5000/api/class/section`, payload
        
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

export const  deleteAllClassAction = createAsyncThunk(
  "class/deleteAllClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/class/`, 
        
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

export const  deleteSingleClassAction = createAsyncThunk(
  "class/deleteASingleClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/class/`, payload
        
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




const ClassSlices = createSlice({
  name: "Class",
  initialState: {},
  extraReducers: builder => {
    builder.addCase(CreatesClassAction.pending, (state, action) => {
      state.CreateClassesloading = true;
      state.CreateClasses = false;

    });
    builder.addCase(CreatesClassAction.fulfilled, (state, action) => {
      state.CreateClasses = action?.payload;
      state.CreateClassesloading = false;
      state.error = undefined;
    });
    builder.addCase(CreatesClassAction.rejected, (state, action) => {
      state.CreateClassesloading = false;
      state.error = action.payload;
      state.CreateClasses = undefined;
    });



    builder.addCase(fetchAllClassAction.pending, (state, action) => {
      state.fetchAllClassloading = true;
      state.fetchAllClass = false;
      
    });
    builder.addCase(fetchAllClassAction.fulfilled, (state, action) => {
      state.fetchAllClass = action?.payload;
      state.fetchAllClassloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchAllClassAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchAllClass = undefined;
      state.fetchAllClassloading = undefined;

    });



    builder.addCase(fetchAllSectionAction.pending, (state, action) => {
      state.sectionloading = true;
      state.fetchSection = false;
      
    });
    builder.addCase(fetchAllSectionAction.fulfilled, (state, action) => {
      state.fetchSection = action?.payload;
      state.sectionloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchAllSectionAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchSection = undefined;
      state.sectionloading = undefined;

    });




    builder.addCase(updateClassAction.pending, (state, action) => {
      state.singleStudent = false;
      
    });
    builder.addCase(updateClassAction.fulfilled, (state, action) => {
      state.updatesingleclass = action?.payload;
      state.updatesingleclassloading = false;
      state.error = undefined;
    });
    builder.addCase(updateClassAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fupdatesingleclassStudent = undefined;
      state.updatesingleclassloading = undefined;

    });




    builder.addCase(createSectionAction.pending, (state, action) => {
      state.loading = true;
      state.createClassSection = undefined;
    });
    builder.addCase(createSectionAction.fulfilled, (state, action) => {
      state.createClassSection = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(createSectionAction.rejected, (state, action) => {
      state.createSectionloading = false;
      state.error = action.payload;
      state.createClassSection = undefined;
    });
    

    builder.addCase(deleteAllClassAction.pending, (state, action) => {
      state.deleteAllClassesloading = true;
    });
    builder.addCase(deleteAllClassAction.fulfilled, (state, action) => {
      state.deleteAllClasses = action?.payload;
      state.deleteClassloading = false;
      state.error = undefined;
    });
    builder.addCase(deleteAllClassAction.rejected, (state, action) => {
      state.deleteAllClassesloading = false;
      state.error = action.payload;
      state.deleteAllClasses = undefined;
    });


    builder.addCase(deleteSingleClassAction.pending, (state, action) => {
      state.deleteClassloading = true;
    });
    builder.addCase(deleteSingleClassAction.fulfilled, (state, action) => {
      state.deleteClasses = action?.payload;
      state.deleteClassloading = false;
      state.error = undefined;
    });
    builder.addCase(deleteSingleClassAction.rejected, (state, action) => {
      state.deleteClassloading = false;
      state.error = action.payload;
      state.deleteClasses = undefined;
    });




  },
});

export default ClassSlices.reducer;



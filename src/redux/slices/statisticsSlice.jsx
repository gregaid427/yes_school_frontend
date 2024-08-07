import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}` ,   'Content-Type': 'application/json'  }

export const studentStatAction = createAsyncThunk(
  "fetch/stat1",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/1`,payload
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

export const classStatAction = createAsyncThunk(
  "fetch/stat2",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/3`,payload
        
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

export const teacherStatAction = createAsyncThunk(
  "fetch/stat3",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/2`,payload
        
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

export const subjectStatAction = createAsyncThunk(
  "fetch/stat4",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/4`,payload
        
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


export const parentStatAction = createAsyncThunk(
  "fetch/stat6",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/6`,payload
        
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

export const chartStatAction = createAsyncThunk(
  "fetch/stat7",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/5`,payload
        
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

const StatisticsSlices = createSlice({
  name: "Statistics",
  initialState: {},
  reducers: {
  
   
  },
  extraReducers: builder => {
    
    
    builder.addCase(studentStatAction.pending, (state, action) => {
      state.studentStatloading = true;
      state.studentStat = false;

    });
    builder.addCase(studentStatAction.fulfilled, (state, action) => {
      state.studentStat = action?.payload;
      state.studentStatloading = false;
      state.error = undefined;
    });
    builder.addCase(studentStatAction.rejected, (state, action) => {
      state.studentStatloading = false;
      state.error = action.payload;
      state.studentStat = undefined;
    });


        
    builder.addCase(classStatAction.pending, (state, action) => {
      state.classStatloading = true;
      state.classStat = false;

    });
    builder.addCase(classStatAction.fulfilled, (state, action) => {
      state.classStat = action?.payload;
      state.classStatloading = false;
      state.error = undefined;
    });
    builder.addCase(classStatAction.rejected, (state, action) => {
      state.classStatloading = false;
      state.error = action.payload;
      state.classStat = undefined;
    });

         
    builder.addCase(teacherStatAction.pending, (state, action) => {
      state.teacherStatloading = true;
      state.teacherStat = false;

    });
    builder.addCase(teacherStatAction.fulfilled, (state, action) => {
      state.teacherStat = action?.payload;
      state.teacherStatloading = false;
      state.error = undefined;
    });
    builder.addCase(teacherStatAction.rejected, (state, action) => {
      state.teacherStatloading = false;
      state.error = action.payload;
      state.teacherStat = undefined;
    });
    
    
    builder.addCase(subjectStatAction.pending, (state, action) => {
      state.subjectStatloading = true;
      state.subjectStat = false;

    });
    builder.addCase(subjectStatAction.fulfilled, (state, action) => {
      state.subjectStat = action?.payload;
      state.subjectStatloading = false;
      state.error = undefined;
    });
    builder.addCase(subjectStatAction.rejected, (state, action) => {
      state.subjectStatloading = false;
      state.error = action.payload;
      state.subjectStat = undefined;
    });
    
    builder.addCase(parentStatAction.pending, (state, action) => {
      state.parentStatloading = true;
      state.parentStat = false;

    });
    builder.addCase(parentStatAction.fulfilled, (state, action) => {
      state.parentStat = action?.payload;
      state.parentStatloading = false;
      state.error = undefined;
    });
    builder.addCase(parentStatAction.rejected, (state, action) => {
      state.parentStatloading = false;
      state.error = action.payload;
      state.parentStat = undefined;
    });



    builder.addCase(chartStatAction.pending, (state, action) => {
      state.parentStatloading = true;
      state.chartStat = false;

    });
    builder.addCase(chartStatAction.fulfilled, (state, action) => {
      state.chartStat = action?.payload;
      state.parentStatloading = false;
      state.error = undefined;
    });
    builder.addCase(chartStatAction.rejected, (state, action) => {
      state.parentStatloading = false;
      state.error = action.payload;
      state.chartStat = undefined;
    });
  },
});



export default StatisticsSlices.reducer;



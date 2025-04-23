import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import ErrorAltToast from '../../components/Toasts/ErrorAlt';
import toast from 'react-hot-toast';
import axiosFile from '../../components/axiosFile';

let axios1 ={ headers: {
  'Authorization': 'Bearer ddd',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}};



export const studentStatAction = createAsyncThunk(
  'fetch/stat1',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const toastId = toast.loading('Loading...', {
      //   position: 'bottom-right',
      // });


      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/1`,
        axiosFile,payload,
      );

      // if (data) {
      //   toast.dismiss(toastId);
      // }
      return data;
    } catch (error) {
      console.log(error);
      //ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const classStatAction = createAsyncThunk(
  'fetch/stat2',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const toastId = toast.loading('Loading...', {
      //   position: 'bottom-right',
      // });


      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/3`,
        axiosFile,payload,
      );

      // if (data) {
      //   toast.dismiss(toastId);
      // }
      return data;
    } catch (error) {
      console.log(error);
      //ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const teacherStatAction = createAsyncThunk(
  'fetch/stat3',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const toastId = toast.loading('Loading...', {
      //   position: 'bottom-right',
      // });


      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/2`,
        axiosFile,payload,
      );

      // if (data) {
      //   toast.dismiss(toastId);
      // }
      return data;
    } catch (error) {
      console.log(error);
      //ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const subjectStatAction = createAsyncThunk(
  'fetch/stat4',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const toastId = toast.loading('Loading...', {
      //   position: 'bottom-right',
      // });


      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/4`,
        axiosFile,payload,
      );

      // if (data) {
      //   toast.dismiss(toastId);
      // }
      return data;
    } catch (error) {
      console.log(error);
      //ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const parentStatAction = createAsyncThunk(
  'fetch/stat6',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const toastId = toast.loading('Loading...', {
      //   position: 'bottom-right',
      // });


      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/6`,
        axiosFile,payload,
      );

      // if (data) {
      //   toast.dismiss(toastId);
      // }
      return data;
    } catch (error) {
      console.log(error);
      //ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const chartStatAction = createAsyncThunk(
  'fetch/stat7',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const toastId = toast.loading('Loading...', {
      //   position: 'bottom-right',
      // });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/5`,
        axiosFile,payload,
      );

      // if (data) {
      //   toast.dismiss(toastId);
      // }
      return data;
    } catch (error) {
      console.log(error);
   //   //ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
export const chart1StatAction = createAsyncThunk(
  'fetch/stat8',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const toastId = toast.loading('Loading...', {
      //   position: 'bottom-right',
      // });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/7`,
        axiosFile,payload,
      );

      // if (data) {
      //   toast.dismiss(toastId);
      // }
      return data;
    } catch (error) {
      console.log(error);
      //ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const AppUpdateAction = createAsyncThunk(
  'fetch/appupdate',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const toastId = toast.loading('Loading...', {
      //   position: 'bottom-right',
      // });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/statistics/10`,
        axiosFile,payload,
      );
console.log(data)
      // if (data) {
      //   toast.dismiss(toastId);
      // }
      return data;
    } catch (error) {
      console.log(error);
      //ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const StatisticsSlices = createSlice({
  name: 'Statistics',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
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
    
    builder.addCase(AppUpdateAction.pending, (state, action) => {
      state.AppUpdateloading = true;
      state.AppUpdate = false;
    });
    builder.addCase(AppUpdateAction.fulfilled, (state, action) => {
      state.AppUpdate = action?.payload;
      state.AppUpdateloading = false;
      state.AppUpdateerror = undefined;
    });
    builder.addCase(AppUpdateAction.rejected, (state, action) => {
      state.AppUpdateloading = false;
      state.AppUpdateerror = action.payload;
      state.AppUpdate = undefined;
    });


    builder.addCase(chart1StatAction.pending, (state, action) => {
      state.parentStatloading = true;
      state.chart1Stat = false;
    });
    builder.addCase(chart1StatAction.fulfilled, (state, action) => {
      state.chart1Stat = action?.payload;
      state.parentStatloading = false;
      state.error = undefined;
    });
    builder.addCase(chart1StatAction.rejected, (state, action) => {
      state.parentStatloading = false;
      state.error = action.payload;
      state.chart1Stat = undefined;
    });
    builder.addCase(chartStatAction.pending, (state, action) => {
      state.parentStatloading = true;
      state.chart1Stat = false;
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

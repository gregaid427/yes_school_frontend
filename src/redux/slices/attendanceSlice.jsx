import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchAllSectionAction } from './classSlice';
import toast from 'react-hot-toast';

import ErrorToast from '../../components/Toasts/Error';
import SuccessToast from '../../components/Toasts/Success';
import WarnToast from '../../components/Toasts/Warning';
import ErrorAltToast from '../../components/Toasts/ErrorAlt';
import axiosFile from '../../components/axiosFile';



export const CreateAttendanceAction = createAsyncThunk(
  'create/createAttendance',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/createattendance`,
        payload,axiosFile
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Marked Successfully');
      }

      if (data?.success == 0) {
        toast.error(data?.message);

        // toast.error(data.message);
      }

          if (data) {
        toast.dismiss(toastId);
   
      }
      return data;
    } catch (error) {
      console.log(error)
            ErrorToast('Error', error);

      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const GetTodayRecordAction = createAsyncThunk(
  'fetch/gettodayrecord',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/gettodayrecord`,
        payload,axiosFile
      );

      if (data?.success == 1 && data?.result?.length == 0) {
        toast.error('No Records Available');

        // toast.error(data.message);
      }
      if (data?.success == 0) {
        toast.error('Error Loading Record');

        // toast.error(data.message);
      }
          if (data) {
        toast.dismiss(toastId);
   
      }
      return data;
    } catch (error) {
      console.log(error)
                ErrorToast('Error', error);

      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const GetSesionRecordsAction = createAsyncThunk(
  'fetch/recordsbysession',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/sessionrecords`,
        payload,axiosFile
      );

      if (data?.success == 1 && data?.result?.length == 0) {
        toast.error('No Records Available');

        // toast.error(data.message);
      }
      if (data?.success == 0 && data?.result?.length == 0) {
        toast.error('No Records Available');

        // toast.error(data.message);
      }
          if (data) {
        toast.dismiss(toastId);
   
      }
      return data;
    } catch (error) {
      console.log(error)
                ErrorToast('Error', error);

      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const FetchAttendanceDetailAction = createAsyncThunk(
  'fetch/RecordsByDate',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/getdetail`,
        payload,axiosFile
      );

      if (data?.success == 1 && data?.result?.length == 0) {
        toast.error('No Records Available');

        // toast.error(data.message);
      }
      if (data?.success == 0 && data?.result?.length == 0) {
        toast.error('No Records Available');

        // toast.error(data.message);
      }
          if (data) {
        toast.dismiss(toastId);
   
      }
      return data;
    } catch (error) {
      console.log(error)
                ErrorToast('Error', error);

      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const UpdateStatusAction = createAsyncThunk(
  'fetch/updatestatus',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/updatestatus`,
        payload,axiosFile
      );

    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Record Updated Successfully');

        // toast.error(data.message);
      }
      if (data?.success == 0) {
        toast.error('Error Updating records');

        console.log(data.message);
      }
          if (data) {
        toast.dismiss(toastId);
   
      }
      return data;
    } catch (error) {
      console.log(error)
                ErrorToast('Error', error);

      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const GetRecordByDateAction = createAsyncThunk(
  'fetch/Detail',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/daterecords`,
        payload,axiosFile
      );

      if (data?.success == 1 && data?.result?.length == 0) {
        toast.error('No Records Available');

        // toast.error(data.message);
      }
      if (data?.success == 0 && data?.result?.length == 0) {
        toast.error('No Records Available');

        // toast.error(data.message);
      }
          if (data) {
        toast.dismiss(toastId);
   
      }
      return data;
    } catch (error) {
      console.log(error)
                ErrorToast('Error', error);

      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const AttendanceSlices = createSlice({
  name: 'Attendance',
  initialState: {},
  reducers: {
    resetcreateattendance(state) {
      state.CreateAttendance = null;
    },
    resetFetchAttendanceDetail(state) {
      state.FetchAttendanceDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateAttendanceAction.pending, (state, action) => {
      state.CreateAttendanceloading = true;
      state.CreateAttendance = false;
    });
    builder.addCase(CreateAttendanceAction.fulfilled, (state, action) => {
      state.CreateAttendance = action?.payload;
      state.CreateAttendanceloading = false;
      state.CreateAttendanceerror = undefined;
    });
    builder.addCase(CreateAttendanceAction.rejected, (state, action) => {
      state.CreateAttendanceerror = action.payload;
      state.CreateAttendance = undefined;
      state.CreateAttendanceloading = undefined;
    });

    builder.addCase(GetSesionRecordsAction.pending, (state, action) => {
      state.GetSesionRecordsloading = true;
      state.GetSesionRecords = false;
    });
    builder.addCase(GetSesionRecordsAction.fulfilled, (state, action) => {
      state.GetSesionRecords = action?.payload;
      state.GetSesionRecordsloading = false;
      state.GetSesionRecordsloadingerror = undefined;
    });
    builder.addCase(GetSesionRecordsAction.rejected, (state, action) => {
      state.GetSesionRecordsloadingerror = action.payload;
      state.GetSesionRecords = undefined;
      state.GetSesionRecordsloading = undefined;
    });

    builder.addCase(GetRecordByDateAction.pending, (state, action) => {
      state.GetRecordByDateloading = true;
      state.GetRecordByDate = false;
    });
    builder.addCase(GetRecordByDateAction.fulfilled, (state, action) => {
      state.GetRecordByDate = action?.payload;
      state.GetRecordByDateloading = false;
      state.GetRecordByDateerror = undefined;
    });
    builder.addCase(GetRecordByDateAction.rejected, (state, action) => {
      state.GetRecordByDateerror = action.payload;
      state.GetRecordByDate = undefined;
      state.GetRecordByDateloading = undefined;
    });
    builder.addCase(FetchAttendanceDetailAction.pending, (state, action) => {
      state.FetchAttendanceDetailloading = true;
      state.FetchAttendanceDetail = false;
    });
    builder.addCase(FetchAttendanceDetailAction.fulfilled, (state, action) => {
      state.FetchAttendanceDetail = action?.payload;
      state.FetchAttendanceDetailloading = false;
      state.FetchAttendanceDetailerror = undefined;
    });
    builder.addCase(FetchAttendanceDetailAction.rejected, (state, action) => {
      state.FetchAttendanceDetailerror = action.payload;
      state.FetchAttendanceDetail = undefined;
      state.FetchAttendanceDetailloading = undefined;
    });

    builder.addCase(UpdateStatusAction.pending, (state, action) => {
      state.UpdateStatusloading = true;
      state.UpdateStatus = false;
      state.FetchAttendanceDetail = false;
    });
    builder.addCase(UpdateStatusAction.fulfilled, (state, action) => {
      state.UpdateStatus = action?.payload;
      state.FetchAttendanceDetail = action?.payload;
      state.UpdateStatusloading = false;
      state.UpdateStatuserror = undefined;
    });
    builder.addCase(UpdateStatusAction.rejected, (state, action) => {
      state.UpdateStatuserror = action.payload;
      state.FetchAttendanceDetail = undefined;
      state.UpdateStatus = undefined;
      state.UpdateStatusloading = undefined;
    });

    builder.addCase(GetTodayRecordAction.pending, (state, action) => {
      state.GetTodayRecordloading = true;
      state.GetTodayRecord = false;
    });
    builder.addCase(GetTodayRecordAction.fulfilled, (state, action) => {
      state.GetTodayRecord = action?.payload;
      state.GetTodayRecordloading = false;
      state.GetTodayRecorderror = undefined;
    });
    builder.addCase(GetTodayRecordAction.rejected, (state, action) => {
      state.GetTodayRecorderror = action.payload;
      state.GetTodayRecord = undefined;
      state.GetTodayRecordloading = undefined;
    });
  },
});

export const { resetcreateattendance, resetFetchAttendanceDetail } =
  AttendanceSlices.actions;

export default AttendanceSlices.reducer;

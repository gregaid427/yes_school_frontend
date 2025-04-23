import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchAllSectionAction } from './classSlice';

import ErrorToast from '../../components/Toasts/Error';
import SuccessToast from '../../components/Toasts/Success';
import WarnToast from '../../components/Toasts/Warning';
import ErrorAltToast from '../../components/Toasts/ErrorAlt';
import toast from 'react-hot-toast';
import axiosFile from '../../components/axiosFile';

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export const fetchAllsessionAction = createAsyncThunk(
  'fetch/Allsession',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const toastId = toast.loading('Loading...', {
      //   position: 'bottom-right',
      // });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/session/fetch`,
        axiosFile,payload,

      );

      // if (data) {
      //   toast.dismiss(toastId);
      // }
      return data;
    } catch (error) {
      console.log(error);
      ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
export const fetchActivesessionAction = createAsyncThunk(
  'fetch/Activesession',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const toastId = toast.loading('Loading...', {
      //   position: 'bottom-right',
      // });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/session/active`,
        axiosFile,payload,

      );

      //     if (data) {
      //   toast.dismiss(toastId);

      // }
      return data;
    } catch (error) {
      console.log(error);
     // ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deletesessionByIdAction = createAsyncThunk(
  'delete/sessionbysession',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/session/single`, 
        payload,axiosFile

      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
            ErrorToast('Error', error);

      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updatesessionAction = createAsyncThunk(
  'session/Updates',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/session/`,
        payload,axiosFile
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
      ErrorToast('Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
export const updatesessionStatusAction = createAsyncThunk(
  'session/Updatestatus',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/session/status`,
        payload,axiosFile
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
            ErrorToast('Error', error);

      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
export const createsessionAction = createAsyncThunk(
  'create/session',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/session/create`,
        payload,axiosFile
      );
      if (data?.success == '1' ) {
        toast.success('Session Set Successfully');
      }
      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
            ErrorToast('Error', error);

      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const truncateTableAction = createAsyncThunk(
  'delete/allrecords',
  async ({ rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/student/truncate`,axiosFile
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
            ErrorToast('Error', error);

      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const SessionSlices = createSlice({
  name: 'Session',
  initialState: {},
  reducers: {
    resetcreatesession(state) {
      state.createsession = null;
    },
    resetUpdatesession(state) {
      state.updatesession = false;
    },
    resetdeletesession(state) {
      state.deletesessionById = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatesessionAction.pending, (state, action) => {
      state.updatesessionloading = true;
      state.updatesession = false;
      state.fetchsession = false;
    });
    builder.addCase(updatesessionAction.fulfilled, (state, action) => {
      state.updatesession = action?.payload;
      state.updatesessionloading = false;
      state.error = undefined;
      state.fetchsession = action?.payload;
    });
    builder.addCase(updatesessionAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updatesession = undefined;
      state.updatesessionloading = undefined;
      state.fetchsession = undefined;
    });

    builder.addCase(updatesessionStatusAction.pending, (state, action) => {
      state.updatesessionloading = true;
      state.updatesession = false;
      state.fetchsession = false;
    });
    builder.addCase(updatesessionStatusAction.fulfilled, (state, action) => {
      state.updatesession = action?.payload;
      state.updatesessionloading = false;
      state.error = undefined;
      state.fetchsession = action?.payload;
    });
    builder.addCase(updatesessionStatusAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updatesession = undefined;
      state.updatesessionloading = undefined;
      state.fetchsession = undefined;
    });

    builder.addCase(deletesessionByIdAction.pending, (state, action) => {
      state.deletesessionByIdloading = true;
      state.deletesessionById = false;
      state.fetchsession = false;
      state.createsession = false;
    });
    builder.addCase(deletesessionByIdAction.fulfilled, (state, action) => {
      state.deletesessionById = action?.payload;
      state.deletesessionByIdloading = false;
      state.error = undefined;
      state.fetchsession = action?.payload;
    });
    builder.addCase(deletesessionByIdAction.rejected, (state, action) => {
      state.error = action.payload;
      state.deletesessionById = undefined;
      state.deletesessionByIdloading = undefined;
      state.fetchsession = undefined;
    });

    builder.addCase(fetchAllsessionAction.pending, (state, action) => {
      state.sessionloading = true;
      state.fetchsession = false;
    });
    builder.addCase(fetchAllsessionAction.fulfilled, (state, action) => {
      state.fetchsession = action?.payload;
      state.sessionloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchAllsessionAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchsession = undefined;
      state.sessionloading = undefined;
    });

    builder.addCase(fetchActivesessionAction.pending, (state, action) => {
      state.activeloading = true;
      state.fetchsessionactive = false;
    });
    builder.addCase(fetchActivesessionAction.fulfilled, (state, action) => {
      state.activeloading = false;
      state.activeerror = undefined;
      state.fetchsessionactive = action?.payload;
    });
    builder.addCase(fetchActivesessionAction.rejected, (state, action) => {
      state.activeloading = false;
      state.activeerror = action.payload;
      state.fetchsessionactive = undefined;
    });

    builder.addCase(createsessionAction.pending, (state, action) => {
      state.loading = true;
      state.createsession = undefined;
      state.fetchsession = false;
    });
    builder.addCase(createsessionAction.fulfilled, (state, action) => {
      state.createsession = action?.payload;
      state.loading = false;
      state.error = undefined;
      state.fetchsession = action?.payload;
    });
    builder.addCase(createsessionAction.rejected, (state, action) => {
      state.createsession = false;
      state.error = action.payload;
      state.createsessionsession = undefined;
      state.fetchsession = undefined;
    });

    builder.addCase(truncateTableAction.pending, (state, action) => {
      state.truncateTableloading = true;
      state.truncateTable = false;
    });
    builder.addCase(truncateTableAction.fulfilled, (state, action) => {
      state.truncateTable = action?.payload;
      state.truncateTableloading = false;
      state.truncateTableerror = undefined;
    });
    builder.addCase(truncateTableAction.rejected, (state, action) => {
      state.truncateTableerror = action.payload;
      state.truncateTable = undefined;
      state.truncateTableloading = undefined;
    });
  },
});

export const { resetUpdatesession, resetcreatesession } = SessionSlices.actions;

export default SessionSlices.reducer;

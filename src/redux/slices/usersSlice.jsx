import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import toast from 'react-hot-toast';

import ErrorToast from '../../components/Toasts/Error';
import SuccessToast from '../../components/Toasts/Success';
import WarnToast from '../../components/Toasts/Warning';
import ErrorAltToast from '../../components/Toasts/ErrorAlt';

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export const CreateUserAction = createAsyncThunk(
  'new/user',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/`,
        payload,
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

export const CreateGuardianAction = createAsyncThunk(
  'new/guardian',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/guardian`,
        payload,
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

export const loginUserAction = createAsyncThunk(
  'login/User',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/login`,
        payload,
      );
      console.log(data);

      if (data?.success == 0 || data == undefined || data?.success== 1 || data?.success== 6) {
            toast.dismiss(toastId);

      }
   
      return data;
    } catch (error) {
      console.log(error);
     //       ErrorToast('Error', error);
     toast.dismiss();

      // console.log(error);
      // console.log(error?.response);

      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAllstaffAction = createAsyncThunk(
  'fetch/allStaff',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/users/staff`,
        payload,
      );

       if (data) {
        toast.dismiss(toastId);
   
      }
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
export const LoginLogAction = createAsyncThunk(
  'fetch/loginlog',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/users/loginlog`,
        payload,
      );

       if (data) {
        toast.dismiss(toastId);
   
      }
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
export const passwordsendmail = createAsyncThunk(
  'password/reset',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/users/mailPasswordreset`,
        payload,
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

export const passwordResetAction = createAsyncThunk(
  'password/Confirm',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/users/resetPassword`,
        payload,
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

export const verifyuser = createAsyncThunk(
  'verfy/user',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/users/verify`,
        payload,
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

export const CreatesStaffAction = createAsyncThunk(
  'create/userstaff',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/newstaff`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('New Staff Created Successfully');
      }

      if (data == null) {
        toast.error('Error Creating Staff');
      }
      if (data?.success == 0) {
        toast.error(data.message);
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

export const UpdateStaffAction = createAsyncThunk(
  'create/updatestaff',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/updatestaff`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Updated Successfully');
      }

      if (data == null) {
        toast.error('Error Updating Record');
      }
      if (data?.success == 0) {
        toast.error(data.message);
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

export const deleteStaffAction = createAsyncThunk(
  'delete/userstaff',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/deletestaff/${payload}`,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Staff Deleted Successfully');
      }

      if (data == null) {
        toast.error('Error Deleting Staff');
      }
      if (data?.success == 0) {
        toast.error(data.message);
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
export const inactiveStaffAction = createAsyncThunk(
  'inactive/userstaff',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/inactivestaff/${payload}`,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Staff Marked Inactive Successfully');
      }

      if (data == null) {
        toast.error('Error Marking Inactive Staff');
      }
      if (data?.success == 0) {
        toast.error(data.message);
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
export const activeStaffAction = createAsyncThunk(
  'active/userstaff',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/activestaff/${payload}`,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Staff Marked Active Successfully');
      }

      if (data == null) {
        toast.error('Error Marking Active Staff');
      }
      if (data?.success == 0) {
        toast.error(data.message);
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
export const fetchschoolinfoAction = createAsyncThunk(
  'fetch/schoool',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const toastId = toast.loading('Loading...', {
      //   position: 'bottom-right',
      // });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/users/school/`,
      );

      if (data == null) {
        toast.error('Network Error');
      }
      if (data?.success == 0) {
        toast.error(data.message);
      }
  
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
export const fetchuserbyidAction = createAsyncThunk(
  'fetch/userbyid',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // const toastId = toast.loading('Loading...', {
      //   position: 'bottom-right',
      // });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/userid/`,
        payload,
      );

      if (data == null) {
        toast.error('Error Loading Data');
      }
      if (data?.success == 0) {
        toast.error(data.message);
      }
      
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
export const updateschoolinfoAction = createAsyncThunk(
  'update/schoool',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/school/update`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Information Updated Successfully');
      }

      if (data == null) {
        toast.error('Error Updating Information');
      }
      if (data?.success == 0) {
        toast.error(data.message);
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
export const fetchUserdataAction = createAsyncThunk(
  'fetch/userdata',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/userdata`,
        payload,
      );

    if (data?.success == 1) {   toast.dismiss(toastId);
        setTimeout(() => toast.dismiss(), 2000);
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
export const SchoollogoAction = createAsyncThunk(
  'create/logo',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/logoschool`,
        payload,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Logo Uploaded Successfully');
      }

      if (data == null) {
        toast.error('Error Uploading Logo');
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

const initialState = {
  UserData: [],
  fetchuserbyid: {},
  loginUser: {},
};

const UsersSlices = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    reset() {
      return {
        ...initialState,
      };
    },
    resetcreateGuardian(state) {
      state.CreateUser = null;
    },
    resetallstaff(state) {
      state.allstaff = null;
    },
    setUser(state, data) {
      state.UserData = data;
      console.log('called');
      console.log(state.UserData);
    },
    setUsername(state, data) {
      state.username = data;
    },
    setUserMail(state, data) {
      state.userMail = data;
    },
    setRoleCode(state, data) {
      state.roleCode = data;
    },

    resetAllUserData(state) {
      (state.UserData = []), (state.fetchuserbyid = {}), (state.loginUser = {});
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(CreateUserAction.fulfilled, (state, action) => {
      state.CreateUser = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(CreateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.CreateUser = undefined;
    });


    

    builder.addCase(LoginLogAction.pending, (state, action) => {
      state.LoginLogloading = true;
      state.LoginLog = false;
    });
    builder.addCase(LoginLogAction.fulfilled, (state, action) => {
      state.LoginLog = action?.payload;
      state.LoginLogloading = false;
      state.LoginLogerror = undefined;
    });
    builder.addCase(LoginLogAction.rejected, (state, action) => {
      state.LoginLogloading = false;
      state.LoginLogerror = action.payload;
      state.LoginLog = undefined;
    });


    builder.addCase(UpdateStaffAction.pending, (state, action) => {
      state.UpdateStaffloading = true;
      state.UpdateStaff = false;
    });
    builder.addCase(UpdateStaffAction.fulfilled, (state, action) => {
      state.UpdateStaff = action?.payload;
      state.UpdateStaffloading = false;
      state.UpdateStafferror = undefined;
    });
    builder.addCase(UpdateStaffAction.rejected, (state, action) => {
      state.UpdateStaffloading = false;
      state.UpdateStafferror = action.payload;
      state.UpdateStaff = undefined;
    });

    builder.addCase(fetchuserbyidAction.pending, (state, action) => {
      state.fetchuserbyidloading = true;
      state.fetchuserbyid = false;
    });
    builder.addCase(fetchuserbyidAction.fulfilled, (state, action) => {
      state.fetchuserbyid = action?.payload;
      state.fetchuserbyidloading = false;
      state.fetchuserbyiderror = undefined;
    });
    builder.addCase(fetchuserbyidAction.rejected, (state, action) => {
      state.fetchuserbyidloading = false;
      state.fetchuserbyiderror = action.payload;
      state.fetchuserbyid = undefined;
    });

    builder.addCase(CreateGuardianAction.pending, (state, action) => {
      state.loading = true;
      state.createguard = false;
    });

    builder.addCase(CreateGuardianAction.fulfilled, (state, action) => {
      state.CreateUser = action?.payload;
      state.createguard = action?.payload;

      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(CreateGuardianAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.CreateUser = undefined;
      state.createguard = undefined;
    });

    builder.addCase(SchoollogoAction.pending, (state, action) => {
      state.logoloading = true;
    });
    builder.addCase(SchoollogoAction.fulfilled, (state, action) => {
      state.logo = action?.payload;
      state.logoloading = false;
      state.error = undefined;
    });
    builder.addCase(SchoollogoAction.rejected, (state, action) => {
      state.logoloading = false;
      state.error = action.payload;
      state.logo = undefined;
    });

    builder.addCase(fetchUserdataAction.pending, (state, action) => {
      state.fetchUserdatloading = true;
      state.fetchUserdat = false;
    });
    builder.addCase(fetchUserdataAction.fulfilled, (state, action) => {
      state.fetchUserdat = action?.payload;
      state.fetchUserdatloading = false;
      state.fetchUserdaterror = undefined;
    });
    builder.addCase(fetchUserdataAction.rejected, (state, action) => {
      state.logoloading = false;
      state.fetchUserdaterror = action.payload;
      state.fetchUserdat = undefined;
    });
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loginloading = true;
      state.loginUser = null;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loginUser = action?.payload;
      state.loginloading = false;
      state.loginerror = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loginloading = undefined;
      state.loginerror = action.payload;
      state.loginUser = false;
    });

    builder.addCase(CreatesStaffAction.pending, (state, action) => {
      state.allStaffloading = true;
      state.allstaff = undefined;
      state.allstaff1 = undefined;
    });
    builder.addCase(CreatesStaffAction.fulfilled, (state, action) => {
      state.allstaff = action?.payload;
      state.allstaff1 = action?.payload;
      state.allStaffloading = false;
      state.error = undefined;
    });
    builder.addCase(CreatesStaffAction.rejected, (state, action) => {
      state.allStaffloading = false;
      state.allstafferror = action.payload;
      state.allstaff = undefined;
    });

    builder.addCase(fetchAllstaffAction.pending, (state, action) => {
      state.allStaffloading = true;
      state.allstaff = undefined;
      state.allstaff1 = undefined;
    });
    builder.addCase(fetchAllstaffAction.fulfilled, (state, action) => {
      state.allstaff = action?.payload;
      state.allStaffloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchAllstaffAction.rejected, (state, action) => {
      state.allStaffloading = false;
      state.allstafferror = action.payload;
      state.allstaff = undefined;
    });

    builder.addCase(fetchschoolinfoAction.pending, (state, action) => {
      state.allschoolloading = true;
      state.allschool = undefined;
    });
    builder.addCase(fetchschoolinfoAction.fulfilled, (state, action) => {
      state.allschool = action?.payload;
      state.allschoolloading = false;
      state.allschoolerror = undefined;
    });
    builder.addCase(fetchschoolinfoAction.rejected, (state, action) => {
      state.allschoolloading = false;
      state.allschoolerror = action.payload;
      state.allschool = undefined;
    });

    builder.addCase(deleteStaffAction.pending, (state, action) => {
      state.allStaffloading = true;
      state.allstaff = undefined;
    });
    builder.addCase(deleteStaffAction.fulfilled, (state, action) => {
      state.allstaff = action?.payload;
      state.allStaffloading = false;
      state.error = undefined;
    });
    builder.addCase(deleteStaffAction.rejected, (state, action) => {
      state.allStaffloading = false;
      state.allstafferror = action.payload;
      state.allstaff = undefined;
    });
    builder.addCase(inactiveStaffAction.pending, (state, action) => {
      state.allStaffloading = true;
      state.allstaff = undefined;
    });
    builder.addCase(inactiveStaffAction.fulfilled, (state, action) => {
      state.allstaff = action?.payload;
      state.allStaffloading = false;
      state.error = undefined;
    });
    builder.addCase(inactiveStaffAction.rejected, (state, action) => {
      state.allStaffloading = false;
      state.allstafferror = action.payload;
      state.allstaff = undefined;
    });
    builder.addCase(activeStaffAction.pending, (state, action) => {
      state.allStaffloading = true;
      state.allstaff = undefined;
    });
    builder.addCase(activeStaffAction.fulfilled, (state, action) => {
      state.allstaff = action?.payload;
      state.allStaffloading = false;
      state.error = undefined;
    });
    builder.addCase(activeStaffAction.rejected, (state, action) => {
      state.allStaffloading = false;
      state.allstafferror = action.payload;
      state.allstaff = undefined;
    });

    builder.addCase(passwordResetAction.pending, (state, action) => {
      state.loading = true;
      state.passwordReset = undefined;
    });
    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      state.passwordReset = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.passwordReset = undefined;
    });

    builder.addCase(passwordsendmail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(passwordsendmail.fulfilled, (state, action) => {
      state.passwordsend = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(passwordsendmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.passwordsend = undefined;
    });

    builder.addCase(verifyuser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyuser.fulfilled, (state, action) => {
      state.verify = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(verifyuser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.verify = undefined;
    });
  },
});
export const {
  reset,
  resetcreateGuardian,
  setUser,
  resetallstaff,
  resetAllUserData,
  setUserMail,
  setRoleCode,
  setUsername,
} = UsersSlices.actions;

export default UsersSlices.reducer;

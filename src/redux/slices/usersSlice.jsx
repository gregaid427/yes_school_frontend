import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import toast from 'react-hot-toast';

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export const CreateUserAction = createAsyncThunk(
  'new/user',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/`,
        payload,
      );

      return data;
    } catch (error) {
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/guardian`,
        payload,
      );

      return data;
    } catch (error) {
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/login`,
        payload,
      );

      // if (data?.success == 0) {
      //   const toast = useRef(null);

      //     toast.current.show({severity:'warn', summary: 'Warning', detail:'Message Content', life: 3000});

      //            // toast.error("Incorrect Email or Password", { className: "toast-message1" });
      // }

      return data;
    } catch (error) {
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
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/users/staff`,
        payload,
      );

      return data;
    } catch (error) {
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
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/users/mailPasswordreset`,
        payload,
      );

      return data;
    } catch (error) {
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
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/users/resetPassword`,
        payload,
      );

      return data;
    } catch (error) {
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
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/users/verify`,
        payload,
      );

      return data;
    } catch (error) {
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/newstaff`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('New Staff Created Successfully');
      }

      if (data == null) {
        toast.error('Error Creating Staff');
      }
      if (data?.success == 0) {
        toast.error(data.message);
      }
      return data;
    } catch (error) {
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/deletestaff/${payload}`,
      );
      if (data?.success == 1) {
        toast.success('Staff Deleted Successfully');
      }

      if (data == null) {
        toast.error('Error Deleting Staff');
      }
      if (data?.success == 0) {
        toast.error(data.message);
      }
      return data;
    } catch (error) {
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/inactivestaff/${payload}`,
      );
      if (data?.success == 1) {
        toast.success('Staff Marked Inactive Successfully');
      }

      if (data == null) {
        toast.error('Error Marking Inactive Staff');
      }
      if (data?.success == 0) {
        toast.error(data.message);
      }
      return data;
    } catch (error) {
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/school/update`,payload
      );
      if (data?.success == 1) {
        toast.success('Information Updated Successfully');
      }

      if (data == null) {
        toast.error('Error Updating Information');
      }
      if (data?.success == 0) {
        toast.error(data.message);
      }
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {};

const UsersSlices = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    reset() {
      return {
        ...initialState,
      };
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

    builder.addCase(CreateGuardianAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(CreateGuardianAction.fulfilled, (state, action) => {
      state.CreateUser = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(CreateGuardianAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.CreateUser = undefined;
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

    builder.addCase(fetchAllstaffAction.pending, (state, action) => {
      state.allStaffloading = true;
      state.allstaff = undefined;
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

export default UsersSlices.reducer;
export const { reset } = UsersSlices.actions;
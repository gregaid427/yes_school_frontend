import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Toast } from 'primereact/toast';



axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}` ,   'Content-Type': 'application/json'  }

export const CreateUserAction = createAsyncThunk(
  "new/user",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/users/`,payload
        
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

export const loginUserAction = createAsyncThunk(
  "login/User",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/users/login`, payload
        
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
  }
);

export const adloginUserAction = createAsyncThunk(
  "adlogin/User",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/admin/login `, payload
        
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
export const  passwordsendmail = createAsyncThunk(
  "password/reset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/users/mailPasswordreset`,payload
        
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

export const passwordResetAction = createAsyncThunk(
  "password/Confirm",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/users/resetPassword`,payload
        
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

export const verifyuser = createAsyncThunk(
  "verfy/user",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com/api/users/verify`,payload
        
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


export const fakeloginUserAction = createAsyncThunk(
  "fake/user",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `https://api-optimum.seedogh.com`,
        
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

const initialState = {}

const UsersSlices = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    reset() {
      return {
        ...initialState
      }
    }  },
  extraReducers: builder => {

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
      state.loginUser = false
    });

////fake
    builder.addCase(fakeloginUserAction.pending, (state, action) => {
      state.loading = true;
      state.loginUser = undefined;
      state.CreateUser = undefined;
    
     
    });


    builder.addCase(adloginUserAction.pending, (state, action) => {
      state.loading = true;
      state.adloginUser = undefined;
    });
    builder.addCase(adloginUserAction.fulfilled, (state, action) => {
      state.adloginUser = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(adloginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.adloginUser = undefined;
    });
    
    builder.addCase(passwordResetAction.pending, (state, action) => {
      state.loading = true;
      state.passwordReset= undefined;
    });
    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      state.passwordReset = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.passwordReset= undefined;
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
export const { reset } = UsersSlices.actions




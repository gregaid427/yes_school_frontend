import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";



axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}` ,   'Content-Type': 'application/json'  }

export const CreatestudentAction = createAsyncThunk(
  "new/student",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/users/`,payload
        
      );
      console.log(data)
      if(data?.success == 1){
        toast.success('New Student Added Successfully')
      }
  
      if(data ==null){
        toast.error('Error Adding New Student')
      }
return data
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBulkStudent = createAsyncThunk(
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


export const fetchSingleStudent = createAsyncThunk(
  "fetch/singlestudent",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/student/single/${payload}`,
        
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

export const fetchStudentsClassAction = createAsyncThunk(
  "fetch/studentClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/student/custom`, payload
        
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

export const fetchCustomStudentsClassAction = createAsyncThunk(
  "fetch/studentClassCustom",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/student/custom1`, payload
        
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



const StudentSlices = createSlice({
  name: "student",
  initialState: {
    Successfetch : false,
    CreateStudent : null
  },
  reducers: {
    reset(state) {
      state.CreateStudent = null

    }
  },
  extraReducers: builder => {
    builder.addCase(CreatestudentAction.pending, (state, action) => {
      state.loading = true;
      state.CreateStudent = false;
      state.CreateStudentloading = true;


    });
    builder.addCase(CreatestudentAction.fulfilled, (state, action) => {
      state.CreateStudent = action?.payload;
      state.CreateStudentloading = false;
      state.error = undefined;
      state.Successfetch = action?.payload;
    });
    builder.addCase(CreatestudentAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.CreateStudent = undefined;
    });
    // builder.addCase(reset, (state, action) => {
    //   state.loading = null;
    //   state.error = null;
    //   state.CreateStudent = null;
    // });
    




    builder.addCase(fetchBulkStudent.pending, (state, action) => {
      state.loading = true;
      state.fetchStudent = false;
      
    });
    builder.addCase(fetchBulkStudent.fulfilled, (state, action) => {
      state.fetchStudent = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchBulkStudent.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchStudent = undefined;
      state.loading = undefined;

    });




    builder.addCase(fetchCustomStudentsClassAction.pending, (state, action) => {
      state.fetchStudentcustomloading = true;
      state.fetchStudentcustom = false;
      
    });
    builder.addCase(fetchCustomStudentsClassAction.fulfilled, (state, action) => {
      state.fetchStudentcustom = action?.payload;
      state.fetchStudentcustomloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchCustomStudentsClassAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchStudentcustom = undefined;
      state.fetchStudentcustomloading = undefined;

    });

    builder.addCase(fetchStudentsClassAction.pending, (state, action) => {
      state.fetchcustomloading = true;
      state.fetchcustom = false;
      
    });
    builder.addCase(fetchStudentsClassAction.fulfilled, (state, action) => {
      state.fetchcustom = action?.payload;
      state.fetchcustomloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchStudentsClassAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchcustom = undefined;
      state.fetchcustomloading = undefined;

    });

    builder.addCase(fetchSingleStudent.pending, (state, action) => {
      state.singleStudentloading = true;
      state.singleStudent = false;
      
    });
    builder.addCase(fetchSingleStudent.fulfilled, (state, action) => {
      state.singleStudent = action?.payload;
      state.singleStudentloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchSingleStudent.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchSingleStudent = undefined;
      state.studentloading = undefined;

    });  

  },
});

export const { reset} = StudentSlices.actions
export default StudentSlices.reducer;



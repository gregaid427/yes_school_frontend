import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export const CreatestudentAction = createAsyncThunk(
  'create/student',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {

      const { data } = await axios.post(
        `http://localhost:5000/api/users/`,
        payload,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      );
      if (data?.success == 1) {
        toast.success('New Student Added Successfully');
      }

      if (data == null) {
        toast.error('Error Adding New Student');
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

export const CreatestudentImageAction = createAsyncThunk(
  'create/studentImage',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {

      const { data } = await axios.post(
        `http://localhost:5000/api/users/picture`,
        payload,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      );
      if (data?.success == 1) {
        toast.success('Picture Uploaded Successfully');
      }

      if (data == null) {
        toast.error('Error Uploading Picture');
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

export const fetchBulkStudent = createAsyncThunk(
  'fetch/allstudent',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/student/`);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchSingleStudent = createAsyncThunk(
  'fetch/singlestudents',
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
  },
);


export const fetchStudentsClassAction = createAsyncThunk(
  'fetch/studentClass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/student/custom`,
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

export const fetchCustomStudentsClassAction = createAsyncThunk(
  'fetch/studentClassCustom',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/student/custom1`,
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

export const UpdatestudentAction = createAsyncThunk(
  'update/User',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/student/`,
        payload,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
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

export const deleteSingleStudentAction = createAsyncThunk(
  'delete/singlestudent',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/student/${payload}`,
        
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


export const truncateTableAction = createAsyncThunk(
  'delete/allrecords',
  async ( { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/student/truncate`,
        
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

const StudentSlices = createSlice({
  name: 'student',
  initialState: {
    Successfetch: false,
    CreateStudent: null,
    updateStudent: null,
  },
  reducers: {
    reset(state) {
      state.CreateStudent = null;
    },
    resetUdateStudent(state) {
      state.updateStudent = null;
    },
    resetcreateStudentimage(state) {
      state.studentImage = null;
    },
  },
  extraReducers: (builder) => {
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


    builder.addCase(CreatestudentImageAction.pending, (state, action) => {
      state.studentImageloading = true;
      state.studentImage = false;
    });
    builder.addCase(CreatestudentImageAction.fulfilled, (state, action) => {
      state.studentImage = action?.payload;
      state.studentImageloading = false;
      state.studentImageerror = undefined;
    });
    builder.addCase(CreatestudentImageAction.rejected, (state, action) => {
      state.studentImageerror = action.payload;
      state.studentImage = undefined;
      state.studentImageloading = undefined;
    });

    builder.addCase(fetchCustomStudentsClassAction.pending, (state, action) => {
      state.fetchStudentcustomloading = true;
      state.fetchStudentcustom = false;
    });
    builder.addCase(
      fetchCustomStudentsClassAction.fulfilled,
      (state, action) => {
        state.fetchStudentcustom = action?.payload;
        state.fetchStudentcustomloading = false;
        state.error = undefined;
      },
    );
    builder.addCase(
      fetchCustomStudentsClassAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.fetchStudentcustom = undefined;
        state.fetchStudentcustomloading = undefined;
      },
    );

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
      state.singleStudent = undefined;
      state.studentloading = undefined;
    });

    builder.addCase(UpdatestudentAction.pending, (state, action) => {
      state.updateStudentloading = true;
      state.updateStudent = false;
    });
    builder.addCase(UpdatestudentAction.fulfilled, (state, action) => {
      state.updateStudent = action?.payload;
      state.updateStudentloading = false;
      state.updateStudenterror = undefined;
    });
    builder.addCase(UpdatestudentAction.rejected, (state, action) => {
      state.updateStudenterror = action.payload;
      state.updateStudent = undefined;
      state.updateStudentloading = undefined;
    });

    builder.addCase(deleteSingleStudentAction.pending, (state, action) => {
      state.deleteSingleStudentloading = true;
      state.deleteSingleStudent = false;
    });
    builder.addCase(deleteSingleStudentAction.fulfilled, (state, action) => {
      state.deleteSingleStudent = action?.payload;
      state.deleteSingleStudentloading = false;
      state.deleteSingleStudenterror = undefined;
    });
    builder.addCase(deleteSingleStudentAction.rejected, (state, action) => {
      state.deleteSingleStudenterror = action.payload;
      state.deleteSingleStudent = undefined;
      state.deleteSingleStudentloading = undefined;
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

export const { reset, resetUdateStudent,resetcreateStudentimage } = StudentSlices.actions;
export default StudentSlices.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

import ErrorToast from '../../components/Toasts/Error';
import SuccessToast from '../../components/Toasts/Success';
import WarnToast from '../../components/Toasts/Warning';
import ErrorAltToast from '../../components/Toasts/ErrorAlt';

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export const CreatestudentAction = createAsyncThunk(
  'create/student',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/newstudent`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('New Student Added Successfully');

      }

      if (data == null) {
        toast.error('Error Adding New Student');
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

export const CreatestudentImageAction = createAsyncThunk(
  'create/studentImage',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/picture`,
        payload,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Picture Uploaded Successfully');
        toast.dismiss(toastId);
      }
      if (data?.success == 0) {
        toast.error('Error Uploading Picture');
        toast.dismiss(toastId);
      }
      if (data == null) {
        toast.error('Error Uploading Picture');
        toast.dismiss(toastId);
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

export const fetchBulkStudent = createAsyncThunk(
  'fetch/allstudent',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/student/`,
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

export const fetchSingleStudent = createAsyncThunk(
  'fetch/singlestudents',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/student/single/${payload}`,
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

export const MasrkstudentWaiting = createAsyncThunk(
  'update/studentWaiting',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/student/waiting`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Students Class Status Updated');
      }

      if (data == null) {
        toast.error('Error');
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
export const fetchStudentsClassAction = createAsyncThunk(
  'fetch/studentClass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/student/custom`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.dismiss();
      }
      if (data?.success == '1' && data?.data[0] == null) {
        toast.success('Empty Class List');
      }

      if (data == null) {
        toast.error('Error Adding New Student');
      }
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
export const fetchStudentsClassAccountAction = createAsyncThunk(
  'fetch/studentClassAccount',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/student/customaccount`,
        payload,
      );
      if (data?.success == '1' && data?.data[0] == null) {
        toast.success('Empty Class List');
      }

      if (data == null) {
        toast.error('Error Adding New Student');
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

export const fetchCustomStudentsClassAction = createAsyncThunk(
  'fetch/studentClassCustom',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/student/custom1`,
        payload,
      );
      // toast.loading('Empty Class List');
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.dismiss();
      }
      if (data?.success == '1' && data?.data[0] == null) {
        toast.success('Empty Class List');
        //   toast.dismiss();
        //  toast.promise(
        //   dispatch,
        //    {
        //      loading: 'Saving...',
        //      success: <b>Settings saved!</b>,
        //      error: <b>Could not save.</b>,
        //    }
        //  );
      }

      if (data == null) {
        toast.error('Error Adding New Student');
      }
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
export const fetchStudentsCustomAction = createAsyncThunk(
  'get/studentcustom',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/student/studentcustom`,
        payload,
      );
      // toast.loading('Empty Class List');

      if (data?.success == '1' && data?.data[0] == null) {
        toast.success('Empty Class List');
        //   toast.dismiss();
        //  toast.promise(
        //   dispatch,
        //    {
        //      loading: 'Saving...',
        //      success: <b>Settings saved!</b>,
        //      error: <b>Could not save.</b>,
        //    }
        //  );
      }

      if (data == null) {
        toast.error('Error Adding New Student');
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

export const fetchCustomStudentsClassAccountAction = createAsyncThunk(
  'fetch/studentClassCustomAccount',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/student/custom1account`,
        payload,
      );
      // toast.loading('Empty Class List');

      if (data?.success == '1' && data?.data[0] == null) {
        toast.success('Empty Class List');
        //   toast.dismiss();
        //  toast.promise(
        //   dispatch,
        //    {
        //      loading: 'Saving...',
        //      success: <b>Settings saved!</b>,
        //      error: <b>Could not save.</b>,
        //    }
        //  );
      }

      if (data == null) {
        toast.error('Error Adding New Student');
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

export const fetchStudentsClassPromoteAction = createAsyncThunk(
  'fetch/studentClassPromote',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/student/custompromote`,
        payload,
      );
      if (data?.success == '1' && data?.data[0] == null) {
        toast.success('Empty Class List');
      }

      if (data == null) {
        toast.error('Error Adding New Student');
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

export const fetchCustomStudentsClassPromoteAction = createAsyncThunk(
  'fetch/studentClassCustomPromote',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/student/custom1promote`,
        payload,
      );
      // toast.loading('Empty Class List');

      if (data?.success == '1' && data?.data[0] == null) {
        toast.success('Empty Class List');
        //   toast.dismiss();
        //  toast.promise(
        //   dispatch,
        //    {
        //      loading: 'Saving...',
        //      success: <b>Settings saved!</b>,
        //      error: <b>Could not save.</b>,
        //    }
        //  );
      }

      if (data == null) {
        toast.error('Error Adding New Student');
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

export const UpdatestudentAction = createAsyncThunk(
  'update/User',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/student/`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
     toast.dismiss()
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

export const StudentPicture = createAsyncThunk(
  'update/studentpicture',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/student/studentlogo`,
        payload,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
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
export const deleteSingleStudentAction = createAsyncThunk(
  'delete/singlestudent',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/student/delete`,
        payload,
      );

    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Deleted Successfully');
        setTimeout(() => toast.dismiss(), 2000);
      }

      if (data == null) {
        toast.error('Error Deleting Record');
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
export const PromoteAllAction = createAsyncThunk(
  'update/students',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/student/allpromote`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Students Promoted Succesfully');
      }

      if (data == null) {
        toast.error('Error Promoting Student');
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
export const PromoteSelectedAction = createAsyncThunk(
  'update/selectedstudents',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/student/selectedpromote`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Students Promoted Succesfully');
      }

      if (data == null) {
        toast.error('Error Promoting Student');
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
        `${import.meta.env.VITE_APP_BASE_URL}/student/truncate`,
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
    resetPromote(state) {
      state.studentPromote = null;
    },
    resetSinglestudent(state) {
      state.singleStudent = null;
    },
    resetFetchCustom(state) {
      state.fetchcustom = null;
    },
    resetFetchCustomStudent(state) {
      state.fetchcustomstudent = null;
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

    builder.addCase(PromoteSelectedAction.pending, (state, action) => {
      state.studentPromoteloading = true;
      state.studentPromote = false;
    });
    builder.addCase(PromoteSelectedAction.fulfilled, (state, action) => {
      state.studentPromote = action?.payload;
      state.studentPromoteloading = false;
      state.studentPromoterror = undefined;
    });
    builder.addCase(PromoteSelectedAction.rejected, (state, action) => {
      state.studentPromoterror = action.payload;
      state.studentPromote = undefined;
      state.studentPromoteloading = undefined;
    });

    builder.addCase(PromoteAllAction.pending, (state, action) => {
      state.studentPromoteloading = true;
      state.studentPromote = false;
    });
    builder.addCase(PromoteAllAction.fulfilled, (state, action) => {
      state.studentPromote = action?.payload;
      state.studentPromoteloading = false;
      state.studentPromoterror = undefined;
    });
    builder.addCase(PromoteAllAction.rejected, (state, action) => {
      state.studentPromoterror = action.payload;
      state.studentPromote = undefined;
      state.studentPromoteloading = undefined;
    });

    builder.addCase(fetchStudentsCustomAction.pending, (state, action) => {
      state.fetchcustomloading = true;
      state.fetchcustomstudent = false;
    });
    builder.addCase(fetchStudentsCustomAction.fulfilled, (state, action) => {
      state.fetchcustomstudent = action?.payload;
      state.fetchcustomloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchStudentsCustomAction.rejected, (state, action) => {
      state.fetchcustomstudenterror = action.payload;
      state.fetchcustomstudent = undefined;
      state.fetchcustomloading = undefined;
    });

    builder.addCase(
      fetchCustomStudentsClassAccountAction.pending,
      (state, action) => {
        state.fetchStudentcustomballoading = true;
        state.fetchStudentcustombal = false;
      },
    );
    builder.addCase(
      fetchCustomStudentsClassAccountAction.fulfilled,
      (state, action) => {
        state.fetchStudentcustombal = action?.payload;
        state.fetchStudentcustomballoading = false;
        state.error = undefined;
      },
    );
    builder.addCase(
      fetchCustomStudentsClassAccountAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.fetchStudentcustombal = undefined;
        state.fetchStudentcustomballoading = undefined;
      },
    );

    builder.addCase(
      fetchCustomStudentsClassPromoteAction.pending,
      (state, action) => {
        state.fetchStudentcustomloading = true;
        state.fetchStudentcustom = false;
      },
    );
    builder.addCase(
      fetchCustomStudentsClassPromoteAction.fulfilled,
      (state, action) => {
        state.fetchStudentcustom = action?.payload;
        state.fetchStudentcustomloading = false;
        state.error = undefined;
      },
    );
    builder.addCase(
      fetchCustomStudentsClassPromoteAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.fetchStudentcustom = undefined;
        state.fetchStudentcustomloading = undefined;
      },
    );

    builder.addCase(fetchCustomStudentsClassAction.pending, (state, action) => {
      state.fetchcustomloading = true;
      state.fetchcustom = false;
    });
    builder.addCase(
      fetchCustomStudentsClassAction.fulfilled,
      (state, action) => {
        state.fetchcustom = action?.payload;
        state.fetchcustomloading = false;
        state.error = undefined;
      },
    );
    builder.addCase(
      fetchCustomStudentsClassAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.fetchcustom = undefined;
        state.fetchcustomloading = undefined;
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

    builder.addCase(
      fetchStudentsClassAccountAction.pending,
      (state, action) => {
        state.fetchStudentcustomballoading = true;
        state.fetchStudentcustombal = false;
      },
    );
    builder.addCase(
      fetchStudentsClassAccountAction.fulfilled,
      (state, action) => {
        state.fetchStudentcustombal = action?.payload;
        state.fetchStudentcustomballoading = false;
        state.error = undefined;
      },
    );
    builder.addCase(
      fetchStudentsClassAccountAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.fetchStudentcustombal = undefined;
        state.fetchStudentcustomballoading = undefined;
      },
    );

    builder.addCase(
      fetchStudentsClassPromoteAction.pending,
      (state, action) => {
        state.fetchcustomloading = true;
        state.fetchcustom = false;
      },
    );
    builder.addCase(
      fetchStudentsClassPromoteAction.fulfilled,
      (state, action) => {
        state.fetchcustom = action?.payload;
        state.fetchcustomloading = false;
        state.error = undefined;
      },
    );
    builder.addCase(
      fetchStudentsClassPromoteAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.fetchcustom = undefined;
        state.fetchcustomloading = undefined;
      },
    );

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
      state.fetchcustom = false;
      state.fetchStudent = false;
    });
    builder.addCase(deleteSingleStudentAction.fulfilled, (state, action) => {
      state.deleteSingleStudent = action?.payload;
      state.deleteSingleStudentloading = false;
      state.deleteSingleStudenterror = undefined;
      state.fetchcustom = action?.payload;
      state.fetchStudent = action?.payload;
    });
    builder.addCase(deleteSingleStudentAction.rejected, (state, action) => {
      state.deleteSingleStudenterror = action.payload;
      state.deleteSingleStudent = undefined;
      state.deleteSingleStudentloading = undefined;
      state.fetchcustom = undefined;
      state.fetchStudent = undefined;
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

export const {
  reset,
  resetUdateStudent,
  resetcreateStudentimage,
  resetPromote,
  resetSinglestudent,
  resetFetchCustom,
  resetFetchCustomStudent,
} = StudentSlices.actions;
export default StudentSlices.reducer;

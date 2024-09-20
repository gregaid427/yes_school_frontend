import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export const CreatesGradeGroupAction = createAsyncThunk(
  'create/GradeGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/gradegroup`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('Created Successfully');
      }

      if (data?.success == undefined && data?.data== undefined) {
        toast.error(data?.message);

       // toast.error(data.message);
      }
      if (data?.success == 0 && data?.data == null) {
        toast.error(data?.message);

       // toast.error(data.message);
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

export const CreateExamGroupAction = createAsyncThunk(
  'create/ExamGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/examgroup`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('Created Successfully');
      }

      if (data?.success == 0 ) {
        toast.error(data?.message);

       // toast.error(data.message);
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
export const FetchExamGroupAction = createAsyncThunk(
  'get/ExamGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/examgroup`,
        payload,
      );
     

      if (data?.success == 0 ) {
        toast.error(data?.message);

       // toast.error(data.message);
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

export const FetchAllGradeGroupAction = createAsyncThunk(
  'get/AllGradeGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/detailgradegroup`,
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

export const FetchGradeGroupAction = createAsyncThunk(
  'get/GradeGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/gradegroup`,
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
export const FetchExamListAction = createAsyncThunk(
  'get/ExamList',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/examlist`,
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
export const CreateExamAction = createAsyncThunk(
  'create/Exam',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/newexam`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('Created Successfully');
      }

      if (data?.success == 0 && data?.data == null) {
        toast.error(data?.message);

       // toast.error(data.message);
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

export const FetchExamCustomAction = createAsyncThunk(
  'get/customsearch',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/searchcustom`,
        payload,
      );
      if (data?.success == 1 && data?.data.length == 0) {
        toast.success('No Search Results');
      }

      if (data?.success == 0) {
        toast.error(data?.message);

       // toast.error(data.message);
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

const ExamSlices = createSlice({
  name: 'Exam',
  initialState: {},
  reducers: {
    resetcreateGradeGroup(state) {
      state.Gradegroup = null;
    },
    resetcreategroup(state) {
      state.createxamgroup = null;
    },
    resetcreateexam(state) {
      state.createexam = null;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(CreatesGradeGroupAction.pending, (state, action) => {
      state.Gradegrouploading = true;
      state.Gradegroup = false;

    });
    builder.addCase(CreatesGradeGroupAction.fulfilled, (state, action) => {
      state.Gradegroup = action?.payload;
      state.Gradegrouploading = false;
      state.Gradegrouperror = undefined;
    });
    builder.addCase(CreatesGradeGroupAction.rejected, (state, action) => {
      state.Gradegrouploading = false;
      state.Gradegrouperror = action.payload;
      state.Gradegroup = undefined;
    });


    builder.addCase(FetchGradeGroupAction.pending, (state, action) => {
      state.fetchGradegrouploading = true;
      state.fetchGradegroup = false;

    });
    builder.addCase(FetchGradeGroupAction.fulfilled, (state, action) => {
      state.fetchGradegroup = action?.payload;
      state.fetchGradegrouploading = false;
      state.fetchGradegrouperror = undefined;
    });
    builder.addCase(FetchGradeGroupAction.rejected, (state, action) => {
      state.fetchGradegrouploading = false;
      state.fetchGradegrouperror = action.payload;
      state.fetchGradegroup = undefined;
    });

    builder.addCase(FetchExamCustomAction.pending, (state, action) => {
      state.FetchExamCustomloading = true;
      state.FetchExamCustom = false;

    });
    builder.addCase(FetchExamCustomAction.fulfilled, (state, action) => {
      state.FetchExamCustom = action?.payload;
      state.FetchExamCustomloading = false;
      state.FetchExamCustomerror = undefined;
    });
    builder.addCase(FetchExamCustomAction.rejected, (state, action) => {
      state.FetchExamCustomloading = false;
      state.FetchExamCustomerror = action.payload;
      state.FetchExamCustom = undefined;
    });

    builder.addCase(FetchAllGradeGroupAction.pending, (state, action) => {
      state.fetchGradegrouploading = true;
      state.fetchGradegroup = false;

    });
    builder.addCase(FetchAllGradeGroupAction.fulfilled, (state, action) => {
      state.fetchGradegroup = action?.payload;
      state.fetchGradegrouploading = false;
      state.fetchGradegrouperror = undefined;
    });
    builder.addCase(FetchAllGradeGroupAction.rejected, (state, action) => {
      state.fetchGradegrouploading = false;
      state.fetchGradegrouperror = action.payload;
      state.fetchGradegroup = undefined;
    });
    

    builder.addCase(CreateExamGroupAction.pending, (state, action) => {
      state.createexamgrouploading = true;
      state.createxamgroup = false;

    });
    builder.addCase(CreateExamGroupAction.fulfilled, (state, action) => {
      state.createxamgroup = action?.payload;
      state.createexamgrouploading = false;
      state.createxamgrouperror = undefined;
    });
    builder.addCase(CreateExamGroupAction.rejected, (state, action) => {
      state.createexamgrouploading = false;
      state.createxamgrouperror = action.payload;
      state.createxamgroup = undefined;
    });
    

    builder.addCase(FetchExamGroupAction.pending, (state, action) => {
      state.examgrouploading = true;
      state.examgroup = false;

    });
    builder.addCase(FetchExamGroupAction.fulfilled, (state, action) => {
      state.examgroup = action?.payload;
      state.examgrouploading = false;
      state.examgrouperror = undefined;
    });
    builder.addCase(FetchExamGroupAction.rejected, (state, action) => {
      state.examgrouploading = false;
      state.examgrouperror = action.payload;
      state.examgroup = undefined;
    });

    builder.addCase(CreateExamAction.pending, (state, action) => {
      state.createexamloading = true;
      state.createexam = false;
      state.FetchExamList = false;

      

    });
    builder.addCase(CreateExamAction.fulfilled, (state, action) => {
      state.createexam = action?.payload;
      state.createexamloading = false;
      state.createexamerror = undefined;
      state.FetchExamList = action?.payload;

    });
    builder.addCase(CreateExamAction.rejected, (state, action) => {
      state.createexamloading = false;
      state.createexamerror = action.payload;
      state.createexam = undefined;

    });

    builder.addCase(FetchExamListAction.pending, (state, action) => {
      state.FetchExamListloading = true;
      state.FetchExamList = false;

    });
    builder.addCase(FetchExamListAction.fulfilled, (state, action) => {
      state.FetchExamList = action?.payload;
      state.FetchExamListloading = false;
      state.FetchExamListerror = undefined;
    });
    builder.addCase(FetchExamListAction.rejected, (state, action) => {
      state.FetchExamListloading = false;
      state.FetchExamListerror = action.payload;
      state.FetchExamList = undefined;
    });
    
   
  },
});

export const {
  resetcreateGradeGroup,
  resetcreategroup,
  resetcreateexam
} = ExamSlices.actions;

export default ExamSlices.reducer;

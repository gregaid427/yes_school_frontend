import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

import ErrorToast from '../../components/Toasts/Error';
import SuccessToast from '../../components/Toasts/Success';
import WarnToast from '../../components/Toasts/Warning';
import ErrorAltToast from '../../components/Toasts/ErrorAlt';
import axiosFile from '../../components/axiosFile';

export const CreatesGradeGroupAction = createAsyncThunk(
  'create/GradeGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/gradegroup`,
        payload,axiosFile
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Created Successfully');
      }

      if (data?.success == undefined && data?.data == undefined) {
        toast.error(data?.message);

        // toast.error(data.message);
      }
      if (data?.success == 0 && data?.data == null) {
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

export const UpdateGradeGroupAction = createAsyncThunk(
  'create/UpdateGradeGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/updategradegroup`,
        payload,axiosFile
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Updated Successfully');
      }

      if (data?.success == undefined && data?.data == undefined) {
        toast.error(data?.message);

        // toast.error(data.message);
      }
      if (data?.success == 0 && data?.data == null) {
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

export const DeleteCartecoryAction = createAsyncThunk(
  'delete/ExamGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/deleteGroup`,
        payload,axiosFile
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Deleted Successfully');
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
export const CreateExamGroupAction = createAsyncThunk(
  'create/ExamGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/examgroup`,
        payload,axiosFile
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Created Successfully');
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
export const CreateExamRemarksAction = createAsyncThunk(
  'create/ExamRemarksGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/examremarksgroup`,
        payload,axiosFile
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Created Successfully');
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
export const UpdateExamRemarksAction = createAsyncThunk(
  'create/updateRemarksGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/examremarksgroup`,
        payload,axiosFile
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Updated Successfully');
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
export const GetExamRemarksAction = createAsyncThunk(
  'create/getRemarksGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/examremarksgroup`,
        payload,axiosFile
      );
   

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
export const FetchExamGroupAction = createAsyncThunk(
  'get/ExamGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/examgroup`,
        axiosFile,payload,
      );

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
      ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const SubmitUpdatedResultAction = createAsyncThunk(
  'create/UpdateExamResult',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/Updateexamresult`,
        payload,axiosFile
      );

    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Result Submitted Successfully');

        // toast.error(data.message);
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
export const SubmitResultAction = createAsyncThunk(
  'create/ExamResult',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/examresult`,
        payload,axiosFile
      );

    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Result Submitted Successfully');

        // toast.error(data.message);
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


export const FetchExamByIdAction = createAsyncThunk(
  'get/ExamById',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/exambyid`,
        axiosFile,payload,
      );

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
      ErrorAltToast('⚠️ Error', error);
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
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/detailgradegroup`,
        axiosFile,payload,
      );

          if (data) {
        toast.dismiss(toastId);
   
      }
      return data;
    } catch (error) {
      console.log(error)
      ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const FetchSingleGradeGroupAction = createAsyncThunk(
  'get/singleGradeGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/singlegrade`,
        payload,axiosFile
      );

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
export const FetchGradeGroupAction = createAsyncThunk(
  'get/GradeGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/gradegroup`,
        axiosFile,payload,
      );

          if (data) {
        toast.dismiss(toastId);
   
      }
      return data;
    } catch (error) {
      console.log(error)
      ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
export const DeleteGradeGroupAction = createAsyncThunk(
  'delete/GradeGroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/deletexamgrade`,
        payload,axiosFile
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Deleted Successfully');
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
export const FetchExamListAction = createAsyncThunk(
  'get/ExamList',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/examlist`,
        axiosFile,payload,
      );

          if (data) {
        toast.dismiss(toastId);
   
      }
      return data;
    } catch (error) {
      console.log(error)
      ErrorAltToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const FetchExamResultByIdAction = createAsyncThunk(
  'get/Exambyid',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/getexamresult`,
        payload,axiosFile
      );

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
export const CreateExamAction = createAsyncThunk(
  'create/Exam',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/newexam`,
        payload,axiosFile
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Created Successfully');
      }

      if (data?.success == 0 && data?.data == null) {
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

export const FetchStdtPerformanceAction = createAsyncThunk(
  'get/stdperformance',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/stdperformance`,
        payload,axiosFile
      );
      // if (data?.success == 1 && data?.data.length == 0) {
      //   toast.success('No Search Results');
      // }

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
export const FetchexamSubjectAction = createAsyncThunk(
  'get/examsubject',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/examsubject`,
        payload,axiosFile
      );
      // if (data?.success == 1 && data?.data.length == 0) {
      //   toast.success('No Search Results');
      // }

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
export const FetchExamCustomAction = createAsyncThunk(
  'get/customsearch',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/searchcustom`,
        payload,axiosFile
      );
      if (data?.success == 1 && data?.data.length == 0) {
        toast.success('No Search Results');
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
export const DeleteExamAction = createAsyncThunk(
  'delete/deleteexam',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/deleteexam`,
        payload,axiosFile
      );
     

      if (data?.success == 0) {
        toast.error(data?.message);

        // toast.error(data.message);
      }
      if (data?.success == 1) {
        toast.success('Deleted Successfully');

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

export const FetchClassReportAction1 = createAsyncThunk(
  'get/getclassreport',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/getclassreport`,
        payload,axiosFile
      );
      if (data?.success == 1 && data?.data.length == 0) {
        toast.success('No Class Peports Available');
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
export const FetchClassReportAction = createAsyncThunk(
  'get/classreport',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/genrateclassreport`,
        payload,axiosFile
      );
    
      if (data?.success == 1 ) {
        toast.success('Report Generated Successfully');
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
export const GenerateAllReportAction = createAsyncThunk(
  'get/Allreport',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/genrateallreport`,
        payload,axiosFile
      );
      
      if (data?.success == 1 ) {
        toast.success('Report Generated Successfully');
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
export const TeacherRemarkAction = createAsyncThunk(
  'get/teacheremark',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/setremark`,
        payload,axiosFile
      );
      if (data?.success == 1 ) {
        toast.success('Remark Recorded Successfully');
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
export const fetchExamByCodeAction = createAsyncThunk(
  'fetch/ClassExam',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/exambycode`,
        payload,axiosFile

      );

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
export const FetchSingleReportAction = createAsyncThunk(
  'get/singlereport',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/singlereport`,
        payload,axiosFile
      );
      if (data?.success == 1 && data?.data.length == 0) {
        toast.success('No Search Results');
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

export const FetchAllReportAction = createAsyncThunk(
  'get/allreport',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/genrateallreport`,
        payload,axiosFile
      );

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
export const GetgradegroupAction = createAsyncThunk(
  'get/gradegroupid',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/gradegroupbyid`,
        payload,axiosFile
      );

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
export const UpdateExamCartegoryAction = createAsyncThunk(
  'update/examCartegory',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/exam/updateexamcartegory`,
        payload,axiosFile
      );
      if (data?.success == 1 ) {
        toast.success('Updated Successfully');
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


const ExamSlices = createSlice({
  name: 'Exam',
  initialState: {
    ExamResultArray: [],
    ExamGradeResult : []
  },
  reducers: {
    ResetTeacherRemark(state, data) {
      state.TeacherRemark = null;
    },
    resetsinglereport(state, data) {
      state.SingleReport = null;
    },
    resetclassreport(state) {
      state.ClassReport = null;
    },
    setExamResult(state, data) {
      state.ExamResultArray = data;
      console.log(state.ExamResultArray)
    },
    resetcreateGradeGroup(state) {
      state.Gradegroup = null;
    },
    resetcreategroup(state) {
      state.createxamgroup = null;
    },
    resetcreateexam(state) {
      state.createexam = null;
    },
    resetsubmitresult(state) {
      state.submitResult = null;
    },
    resetexamremarksgroup(state) {
      state.GetExamRemark = null;
    },
    resetExamCart(state) {
      state.UpdateExamCartegory = null;
    },
    resetcreateGetGradeGroup(state) {
      state.Getgradegroup = null;
      state.UpdateGradeGroup = null;

    },
    ExamResultGrade(state,data) {
      state.ExamGradeResult = data;

    },
    ResetClassReport1(state,data) {
      state.ClassReport1 = null;

    },
    ResetGenerateAllReport(state,data) {
      state.GenerateAllReport = null;
    },
    resetClassReport1(state,data) {
      state.ClassReport1 = null;

    },
    ResetClassReport(state,data) {
      state.ClassReport = null;

    },
    resetFetchStdtPerformance(state,data) {
      state.FetchStdtPerformance = null;

    },
    resetfetchExambyCode(state,data) {
      state.fetchExamByCode = null;

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


    builder.addCase(DeleteCartecoryAction.pending, (state, action) => {
      state.DeleteCartecoryloading = true;
      state.DeleteCartecory = false;
      state.createxamgroup = false;
    });
    builder.addCase(DeleteCartecoryAction.fulfilled, (state, action) => {
      state.DeleteCartecory = action?.payload;
      state.DeleteCartecoryloading = false;
      state.DeleteCartecoryerror = undefined;
      state.createxamgroup = action?.payload;
    });
    builder.addCase(DeleteCartecoryAction.rejected, (state, action) => {
      state.DeleteCartecoryloading = false;
      state.DeleteCartecoryerror = action.payload;
      state.DeleteCartecory = undefined;
      state.createxamgroup = undefined;
    });
    
    

    builder.addCase(GenerateAllReportAction.pending, (state, action) => {
      state.GenerateAllReportloading = true;
      state.GenerateAllReport = false;
      
    });
    builder.addCase(GenerateAllReportAction.fulfilled, (state, action) => {
      state.GenerateAllReport = action?.payload;
      state.GenerateAllReportloading = false;
      state.GenerateAllReporterror = undefined;
    });
    builder.addCase(GenerateAllReportAction.rejected, (state, action) => {
      state.GenerateAllReporterror = action.payload;
      state.GenerateAllReportloading = undefined;
      state.GenerateAllReport = undefined;

    });

    builder.addCase(UpdateGradeGroupAction.pending, (state, action) => {
      state.UpdateGradeGrouploading = true;
      state.UpdateGradeGroup = false;
      state.GradeGroup = false;
      
    });
    builder.addCase(UpdateGradeGroupAction.fulfilled, (state, action) => {
      state.UpdateGradeGroup = action?.payload;
      state.UpdateGradeGrouploading = false;
      state.UpdateGradeGrouperror = undefined;
      state.Gradegroup = action?.payload;
    });
    builder.addCase(UpdateGradeGroupAction.rejected, (state, action) => {
      state.UpdateGradeGrouploading = false;
      state.UpdateGradeGrouperror = action.payload;
      state.UpdateGradeGroup = undefined;
      state.GradeGroup = undefined;

    });

    
    builder.addCase(GetgradegroupAction.pending, (state, action) => {
      state.Getgradegrouploading = true;
      state.Getgradegroup = false;
    });
    builder.addCase(GetgradegroupAction.fulfilled, (state, action) => {
      state.Getgradegroup = action?.payload;
      state.Getgradegrouploading = false;
      state.Getgradegrouperror = undefined;
    });
    builder.addCase(GetgradegroupAction.rejected, (state, action) => {
      state.Getgradegrouploading = false;
      state.Getgradegrouperror = action.payload;
      state.Getgradegroup = undefined;
    });

    
      builder.addCase(UpdateExamCartegoryAction.pending, (state, action) => {
        state.UpdateExamCartegoryloading = true;
        state.UpdateExamCartegory = false;
      });
      
      builder.addCase(UpdateExamCartegoryAction.fulfilled, (state, action) => {
        state.UpdateExamCartegory = action?.payload;
        state.createxamgroup = action?.payload;

        state.UpdateExamCartegoryloading = false;
        state.UpdateExamCartegoryerror = undefined;
      });
      builder.addCase(UpdateExamCartegoryAction.rejected, (state, action) => {
        state.UpdateExamCartegoryloading = false;
        state.UpdateExamCartegoryerror = action.payload;
        state.UpdateExamCartegory = undefined;
        state.createxamgroup = undefined;

      });

      builder.addCase(TeacherRemarkAction.pending, (state, action) => {
        state.TeacherRemarkloading = true;
        state.TeacherRemark = false;
      });
      builder.addCase(TeacherRemarkAction.fulfilled, (state, action) => {
        state.TeacherRemark = action?.payload;
        state.TeacherRemarkloading = false;
        state.TeacherRemarkerror = undefined;
      });
      builder.addCase(TeacherRemarkAction.rejected, (state, action) => {
        state.TeacherRemarkloading = false;
        state.TeacherRemarkerror = action.payload;
        state.TeacherRemark = undefined;
      });

      
    builder.addCase(FetchClassReportAction1.pending, (state, action) => {
      state.ClassReportloading1 = true;
      state.ClassReport1 = false;
    });
    builder.addCase(FetchClassReportAction1.fulfilled, (state, action) => {
      state.ClassReport1 = action?.payload;
      state.ClassReportloading1 = false;
      state.ClassReporterror1 = undefined;
    });
    builder.addCase(FetchClassReportAction1.rejected, (state, action) => {
      state.ClassReportloading1 = false;
      state.ClassReporterror1 = action.payload;
      state.ClassReport1 = undefined;
    });

    builder.addCase(FetchClassReportAction.pending, (state, action) => {
      state.ClassReportloading = true;
      state.ClassReport = false;
    });
    builder.addCase(FetchClassReportAction.fulfilled, (state, action) => {
      state.ClassReport = action?.payload;
      state.ClassReportloading = false;
      state.ClassReporterror = undefined;
    });
    builder.addCase(FetchClassReportAction.rejected, (state, action) => {
      state.ClassReportloading = false;
      state.ClassReporterror = action.payload;
      state.ClassReport = undefined;
    });

    builder.addCase(fetchExamByCodeAction.pending, (state, action) => {
      state.fetchExamByCodeloading = true;
      state.fetchExamByCode = false;
    });
    builder.addCase(fetchExamByCodeAction.fulfilled, (state, action) => {
      state.fetchExamByCode = action?.payload;
      state.fetchExamByCodeloading = false;
      state.fetchExamByCodeerror = undefined;
    });
    builder.addCase(fetchExamByCodeAction.rejected, (state, action) => {
      state.fetchExamByCodeloading = false;
      state.fetchExamByCodeerror = action.payload;
      state.fetchExamByCode = undefined;
    });
    builder.addCase(FetchSingleReportAction.pending, (state, action) => {
      state.SingleReportloading = true;
      state.SingleReport = false;
    });
    builder.addCase(FetchSingleReportAction.fulfilled, (state, action) => {
      state.SingleReport = action?.payload;
      state.SingleReportloading = false;
      state.SingleReporterror = undefined;
    });
    builder.addCase(FetchAllReportAction.rejected, (state, action) => {
      state.FetchAllReporloading = false;
      state.FetchAllReporerror = action.payload;
      state.FetchAllRepor = undefined;
    });
    builder.addCase(FetchAllReportAction.pending, (state, action) => {
      state.FetchAllReporloading = true;
      state.FetchAllRepor = false;
    });
    builder.addCase(FetchAllReportAction.fulfilled, (state, action) => {
      state.FetchAllRepor = action?.payload;
      state.FetchAllReportloading = false;
      state.FetchAllReporerror = undefined;
    });
    builder.addCase(FetchSingleReportAction.rejected, (state, action) => {
      state.FetchAllReporloading = false;
      state.FetchAllReporerror = action.payload;
      state.FetchAllRepor = undefined;
    });
    builder.addCase(FetchStdtPerformanceAction.pending, (state, action) => {
      state.FetchStdtPerformanceloading = true;
      state.FetchStdtPerformance = false;
    });
    builder.addCase(FetchStdtPerformanceAction.fulfilled, (state, action) => {
      state.FetchStdtPerformance = action?.payload;
      state.FetchStdtPerformanceloading = false;
      state.FetchStdtPerformanceerror = undefined;
    });
    builder.addCase(FetchStdtPerformanceAction.rejected, (state, action) => {
      state.FetchStdtPerformanceloading = false;
      state.FetchStdtPerformanceerror = action.payload;
      state.FetchStdtPerformance = undefined;
    });

    builder.addCase(FetchexamSubjectAction.pending, (state, action) => {
      state.FetchexamSubjectloading = true;
      state.FetchexamSubject = false;
    });
    builder.addCase(FetchexamSubjectAction.fulfilled, (state, action) => {
      state.FetchexamSubject = action?.payload;
      state.FetchexamSubjectloading = false;
      state.FetchexamSubjecterror = undefined;
    });
    builder.addCase(FetchexamSubjectAction.rejected, (state, action) => {
      state.FetchexamSubjectloading = false;
      state.FetchexamSubjecterror = action.payload;
      state.FetchexamSubject = undefined;
    });
    builder.addCase(SubmitResultAction.pending, (state, action) => {
      state.submitResultloading = true;
      state.submitResult = false;
    });
    builder.addCase(SubmitResultAction.fulfilled, (state, action) => {
      state.submitResult = action?.payload;
      state.submitResultloading = false;
      state.submitResulterror = undefined;
    });
    builder.addCase(SubmitResultAction.rejected, (state, action) => {
      state.submitResultloading = false;
      state.submitResultperror = action.payload;
      state.submitResult = undefined;
    });
    builder.addCase(SubmitUpdatedResultAction.pending, (state, action) => {
      state.submitResultloading = true;
      state.submitResult = false;
    });
    builder.addCase(SubmitUpdatedResultAction.fulfilled, (state, action) => {
      state.submitResult = action?.payload;
      state.submitResultloading = false;
      state.submitResulterror = undefined;
    });
    builder.addCase(SubmitUpdatedResultAction.rejected, (state, action) => {
      state.submitResultloading = false;
      state.submitResultperror = action.payload;
      state.submitResult = undefined;
    });

    builder.addCase(FetchExamResultByIdAction.pending, (state, action) => {
      state.FetchExamResultloading = true;
      state.FetchExamResult = false;
    });
    builder.addCase(FetchExamResultByIdAction.fulfilled, (state, action) => {
      state.FetchExamResult = action?.payload;
      state.FetchExamResultloading = false;
      state.FetchExamResulterror = undefined;
    });
    builder.addCase(FetchExamResultByIdAction.rejected, (state, action) => {
      state.FetchExamResultloading = false;
      state.FetchExamResulterror = action.payload;
      state.FetchExamResult = undefined;
    });

    builder.addCase(FetchSingleGradeGroupAction.pending, (state, action) => {
      state.SingleGradegrouploading = true;
      state.SingleGradegroup = false;
    });
    builder.addCase(FetchSingleGradeGroupAction.fulfilled, (state, action) => {
      state.SingleGradegroup = action?.payload;
      state.SingleGradegrouploading = false;
      state.SingleGradegroupperror = undefined;
    });
    builder.addCase(FetchSingleGradeGroupAction.rejected, (state, action) => {
      state.SingleGradegrouploading = false;
      state.SingleGradegrouperror = action.payload;
      state.SingleGradegroup = undefined;
      
    });
    
    builder.addCase(DeleteGradeGroupAction.pending, (state, action) => {
      state.DeleteGradeGrouploading = true;
      state.DeleteGradeGroup = false;
      state.fetchGradegroup = false;

    });
    builder.addCase(DeleteGradeGroupAction.fulfilled, (state, action) => {
      state.DeleteGradeGroup = action?.payload;
      state.DeleteGradeGrouploading = false;
      state.DeleteGradeGrouperror = undefined;
      state.fetchGradegroup = action?.payload;

    });
    builder.addCase(DeleteGradeGroupAction.rejected, (state, action) => {
      state.DeleteGradeGrouploading = false;
      state.DeleteGradeGrouperror = action.payload;
      state.DeleteGradeGroup = undefined;
      state.fetchGradegroup = undefined;

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
    
    builder.addCase(DeleteExamAction.pending, (state, action) => {
      state.DeleteExamloading = true;
      state.DeleteExam = false;
    });
    builder.addCase(DeleteExamAction.fulfilled, (state, action) => {
      state.DeleteExam = action?.payload;
      state.DeleteExamloading = false;
      state.DeleteExamerror = undefined;
    });
    builder.addCase(DeleteExamAction.rejected, (state, action) => {
      state.DeleteExaloading = false;
      state.DeleteExaerror = action.payload;
      state.DeleteExa = undefined;
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

    builder.addCase(CreateExamRemarksAction.pending, (state, action) => {
      state.GetExamRemarkloading = true;
      state.GetExamRemark = false;
    });
    builder.addCase(CreateExamRemarksAction.fulfilled, (state, action) => {
      state.GetExamRemark = action?.payload;
      state.GetExamRemarkloading = false;
      state.GetExamRemarkerror = undefined;
    });
    builder.addCase(CreateExamRemarksAction.rejected, (state, action) => {
      state.GetExamRemarkloading = false;
      state.GetExamRemarkperror = action.payload;
      state.GetExamRemark = undefined;
    });

   builder.addCase(UpdateExamRemarksAction.pending, (state, action) => {
      state.GetExamRemarkloading = true;
      state.GetExamRemark = false;
    });
    builder.addCase(UpdateExamRemarksAction.fulfilled, (state, action) => {
      state.GetExamRemark = action?.payload;
      state.GetExamRemarkloading = false;
      state.GetExamRemarkerror = undefined;
    });
    builder.addCase(UpdateExamRemarksAction.rejected, (state, action) => {
      state.GetExamRemarkloading = false;
      state.GetExamRemarkperror = action.payload;
      state.GetExamRemark = undefined;
    });
    builder.addCase(GetExamRemarksAction.pending, (state, action) => {
      state.GetExamRemarkloading = true;
      state.GetExamRemark = false;
    });
    builder.addCase(GetExamRemarksAction.fulfilled, (state, action) => {
      state.GetExamRemark = action?.payload;
      state.GetExamRemarkloading = false;
      state.GetExamRemarkerror = undefined;
    });
    builder.addCase(GetExamRemarksAction.rejected, (state, action) => {
      state.GetExamRemarkloading = false;
      state.GetExamRemarkperror = action.payload;
      state.GetExamRemark = undefined;
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

    builder.addCase(FetchExamByIdAction.pending, (state, action) => {
      state.FetchExamByIdLoading = true;
      state.FetchExamById = false;
    });
    builder.addCase(FetchExamByIdAction.fulfilled, (state, action) => {
      state.FetchExamById = action?.payload;
      state.FetchExamByIdLoading = false;
      state.FetchExamByIdError = undefined;
    });
    builder.addCase(FetchExamByIdAction.rejected, (state, action) => {
      state.FetchExamByIdloading = false;
      state.FetchExamById = action.payload;
      state.FetchExamByIdError = undefined;
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
  resetcreategroup,resetsinglereport,resetclassreport,
  resetcreateexam,
  setExamResult,
  resetsubmitresult,
  ResetTeacherRemark,
  resetFetchStdtPerformance,
  resetExamCart,
  resetcreateGetGradeGroup,
  ExamResultGrade,
  resetexamremarksgroup,
  ResetClassReport,ResetGenerateAllReport,ResetClassReport1,
  resetfetchExambyCode,
  resetClassReport1
} = ExamSlices.actions;

export default ExamSlices.reducer;

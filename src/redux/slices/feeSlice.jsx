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

export const CreatesfeeAction = createAsyncThunk(
  'new/Newfee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/`,
        payload,
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

export const PayFeeAction = createAsyncThunk(
  'new/payfee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/payfee`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Payment Added Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Paying Fee');
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
export const CustomBalUpdate = createAsyncThunk(
  'new/balanceUpdate',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/updatebal`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Balance Updated  Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Updating Balance');
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
export const ReverseFee = createAsyncThunk(
  'new/reverse',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/reversefee`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Paymet Reversed Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Reversing Balance');
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
export const FetchPaymentsAction = createAsyncThunk(
  'new/fetchpayment',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/paymentrecords`,
        payload,
      );
      if (data?.success == 1 && data?.data == []) {
        toast.success('No Transaction Records');
      }
      if (data?.success == 0) {
        toast.error('Error Fetching Records');
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

export const GenerateFeeAction = createAsyncThunk(
  'new/generatefee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/generatefee`,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Fee Generated Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Generating Fee');
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
export const ResetAllAccountBalanceAction = createAsyncThunk(
  'new/resetAccount',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/resetallaccount`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('All Accounts Updated Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Updating All Account');
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
export const ResetAllAccountBalanceByClassAction = createAsyncThunk(
  'new/resetAccountbyclass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/resetclassaccount`,
        payload,
      );
      if (data?.success == 2) {
        toast.success('Class Has No Students');
      }
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Accounts Updated Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Updating All Account');
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

export const GenerateFeeClassAction = createAsyncThunk(
  'new/generatefeeclass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/generatefeebyclass`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Fee Generated Successfully');
      }
      if (data?.success == 2 ) {   toast.dismiss(toastId);
        toast.error('No Student In Selected Class');
      }
      if (data?.success == 3 ) {   toast.dismiss(toastId);
        toast.error('No Fees Assigned For Chosen Class(es)');
      }
      if (data?.success == 0) {
        toast.error('Error Generating Fee');
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

export const GenerateFeeStudentAction = createAsyncThunk(
  'new/generatefeestudent',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/generatefeebystudent`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Fee Generated Successfully');
      }
          if (data?.success == 3 ) {   toast.dismiss(toastId);
        toast.error('No Fees Assigned For Student Class');
      }
      if (data?.success == 0) {
        toast.error('Error Generating Fee');
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

export const PreferencesAction = createAsyncThunk(
  'Post/Preferences',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/preferences`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Preferences Set Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Setting Preferences');
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

export const CreatesfeeCartegoryAction = createAsyncThunk(
  'new/Newfeecart',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/cart`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Fee Cartegory Added Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Adding Fee Cartegory');
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

export const CreatesScholarshipAction = createAsyncThunk(
  'new/Scholarship',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/scholarship`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Scholarship Added Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Adding Scholarship');
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

export const UpdateScholarshipAction = createAsyncThunk(
  'update/Scholarship',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/updatescholarship`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Updated Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Updating Scholarship');
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

export const fetchAllfeeAction = createAsyncThunk(
  'fetch/Allfee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/`,
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
export const fetchfeeStockAction = createAsyncThunk(
  'fetch/feestock',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/getstock`,
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

export const EnrollScholarshipAction = createAsyncThunk(
  'fetch/enrollscholarship',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/enrollscholarship`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Student Enrolled Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Enrolling Scholarship');
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

export const GetEnrolledStudentAction = createAsyncThunk(
  'fetch/enrolledstudent',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/listscholarship`,
        payload,
      );
      // if (data?.success == '1' && data?.data[0] == null) {
      //   toast.success('Empty Class List');
      // }
      if (
      
        data?.data[0] == null 
       
      ) {
        toast.success('Empty Class List');
      }

      if (data == null) {
        toast.error('Error loading Enrolled Student');
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
export const RevokeScholarshipAction = createAsyncThunk(
  'fetch/revokescholarship',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/revokescholarship`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Scholarship Revoked Successfully');
      }

      if (data.success == 0) {
        toast.error('Error Revoking Scholarship');
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

export const fetchSinglefeeAction = createAsyncThunk(
  'fetch/singlefee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/single/`,
        payload,
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
export const fetchfeeCartegoryAction = createAsyncThunk(
  'fetch/feecart',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/cart`,
        payload,
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

export const fetchAllfeeAssignRecordAction = createAsyncThunk(
  'fetch/feeAllassignrecord',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/getallassignedfeerecord`,
        payload,
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
export const fetchfeeAssignRecordAction = createAsyncThunk(
  'fetch/feeassignrecord',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/feerecord`,
        payload,
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
export const fetchfeeAssignGroupRecordAction = createAsyncThunk(
  'fetch/feeassignrecordgroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/feerecordgroup`,
        payload,
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

export const fetchfeeAssignbycartAction = createAsyncThunk(
  'fetch/feeassignbyclass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/assignfeerecord`,
        payload,
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

export const fetchfeeAssignbycustomAction = createAsyncThunk(
  'fetch/feeassignbycustom',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/assigncustom`,
        payload,
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

export const fetchScholarshipAction = createAsyncThunk(
  'fetch/scholarship',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/scholarship`,
        payload,
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

export const updatefeeAction = createAsyncThunk(
  'update/fee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/`,
        payload,
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

export const UpdateFeeCartAction = createAsyncThunk(
  'update/updatefeecart',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/feecart`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Cartegory Updated Successfully');
      }

      if (data.success == 0) {
        toast.error('Error Updating Cartegory');
      }
      console.log(data);
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
export const updatefeeItemAction = createAsyncThunk(
  'update/feeitem',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/item`,
        payload,
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

export const updateCartegoryAction = createAsyncThunk(
  'cartegory/Update',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/editcartegory`,
        payload,
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

export const deleteScholarshipAction = createAsyncThunk(
  'fee/deleteScholar',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/scholarship/${payload}`,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Deleted Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Deleting Scholarship');
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

export const DeleteAllAssignedFeeAction = createAsyncThunk(
  'fee/DeleteAllAssignedFee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/deleteallasigned`,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Records Deleted Successfully');
      }

      if (data == null) {
        toast.error('Error Deleting Records');
      }
      if (data?.success == 0) {
        toast.error(data.message);
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
export const deleteAllfeeAction = createAsyncThunk(
  'fee/deleteAllfee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/`,
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
export const deleteSinglefeeAction = createAsyncThunk(
  'fee/deleteASinglefee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/${payload}`,
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

export const deleteSingleFeeCartAction = createAsyncThunk(
  'delete/deletefeeCart',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/cartegorydel`,
        payload,
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

export const AssignFeesAction = createAsyncThunk(
  'create/assignfee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/assignfee`,
        payload,
      );
    if (data?.success == 1) {   toast.dismiss(toastId);
        toast.success('Assigned Successfully');
      }

      if (data == null) {
        toast.error('Error Assigning Fee');
      }
      if (data?.success == 0) {
        toast.error(data.message);
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

export const GetFeeRecordAction = createAsyncThunk(
  'get/getrecord',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });


      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/getstudentrecord`,
        payload,
      );
 
      if (data == []) {
        toast.error('No Records Found');
      }
      if (data == null) {
        toast.error('Error Getting Record');
      }
      if (data?.success == 0) {
        toast.error(data.message);
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

export const deleteSinglefeeStockAction = createAsyncThunk(
  'fee/deleteASinglefeestock',
  async (payload, { rejectWithValue, getState, dispatch }) => {
     try {
      
       toast.dismiss();

      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',     
      });

      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/stock/${payload}`,
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

const FeeSlices = createSlice({
  name: 'Fee',
  initialState: {},
  reducers: {
    resetcreatefee(state) {
      state.Createfee = null;
    },
    resetUpdateFeeCart(state) {
      state.UpdateFeeCart = null;
    },
    resetpreference(state) {
      state.Preferences = null;
    },
    resetcreatecart(state) {
      state.Createfeecart = null;
    },
    resetpayfee(state) {
      state.payfee = null;
    },
    resetUpdatefeeItem(state) {
      state.updatefeeItem = null;
    },
    resetUpdatefee(state) {
      state.updateCartegory = null;
    },
    resetdeletefee(state) {
      state.deleteSinglefee = null;
    },
    resetdeleteassignedfee(state) {
      state.deleteAllAssigned = null;
    },
    resetGeneratefee(state) {
      state.Generatefee = null;
    },
    resetRevoke(state) {
      state.Revoke = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreatesfeeAction.pending, (state, action) => {
      state.Createfeeloading = true;
      state.Createfee = false;
      state.fetchAllfee = false;
    });
    builder.addCase(CreatesfeeAction.fulfilled, (state, action) => {
      state.Createfee = action?.payload;
      state.Createfeeloading = false;
      state.error = undefined;
      state.fetchAllfee = action?.payload;
    });
    builder.addCase(CreatesfeeAction.rejected, (state, action) => {
      state.Createfeeloading = false;
      state.error = action.payload;
      state.Createfee = undefined;
      state.fetchAllfee = undefined;
    });

    builder.addCase(UpdateFeeCartAction.pending, (state, action) => {
      state.UpdateFeeCartloading = true;
      state.UpdateFeeCart = false;
      state.cartegory = false;
    });
    builder.addCase(UpdateFeeCartAction.fulfilled, (state, action) => {
      state.UpdateFeeCart = action?.payload;
      state.cartegory = action?.payload;

      state.UpdateFeeCartloading = false;
      state.UpdateFeeCarterror = undefined;
    });
    builder.addCase(UpdateFeeCartAction.rejected, (state, action) => {
      state.UpdateFeeCartloading = false;
      state.UpdateFeeCarterror = action.payload;
      state.UpdateFeeCart = undefined;
      state.cartegory = undefined;
    });

    builder.addCase(FetchPaymentsAction.pending, (state, action) => {
      state.FetchPaymentloading = true;
      state.FetchPayment = false;
    });
    builder.addCase(FetchPaymentsAction.fulfilled, (state, action) => {
      state.FetchPayment = action?.payload;
      state.FetchPaymentloading = false;
      state.error = undefined;
    });
    builder.addCase(FetchPaymentsAction.rejected, (state, action) => {
      state.FetchPaymentloading = false;
      state.error = action.payload;
      state.FetchPayment = undefined;
    });

    builder.addCase(AssignFeesAction.pending, (state, action) => {
      state.AssignFeesloading = true;
      state.Assignfee = false;
      state.AssignfeeGroup = false;
      
    });
    builder.addCase(AssignFeesAction.fulfilled, (state, action) => {
      state.Assignfee = action?.payload;
      state.AssignFeesloading = false;
      state.error = undefined;
      state.AssignfeeGroup = action?.payload;
    });
    builder.addCase(AssignFeesAction.rejected, (state, action) => {
      state.AssignFeesloading = false;
      state.error = action.payload;
      state.Assignfee = undefined;
      state.AssignfeeGroup = undefined;
    });

    builder.addCase(EnrollScholarshipAction.pending, (state, action) => {
      state.Enrollloading = true;
      state.Enroll = false;
      // state.fetchAllfee = false;
    });
    builder.addCase(EnrollScholarshipAction.fulfilled, (state, action) => {
      state.Enroll = action?.payload;
      state.Enrollloading = false;
      state.error = undefined;
      //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(EnrollScholarshipAction.rejected, (state, action) => {
      state.Enrollloading = false;
      state.error = action.payload;
      state.Enroll = undefined;
      //   state.fetchAllfee = undefined;
    });
    
    builder.addCase(GetFeeRecordAction.pending, (state, action) => {
      state.GetFeeRecordloading = true;
      state.GetFeeRecord = false;
      // state.fetchAllfee = false;
    });
    builder.addCase(GetFeeRecordAction.fulfilled, (state, action) => {
      state.GetFeeRecord = action?.payload;
      state.GetFeeRecordloading = false;
      state.GetFeeRecorderror = undefined;
      //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(GetFeeRecordAction.rejected, (state, action) => {
      state.GetFeeRecordloading = false;
      state.GetFeeRecorderror = action.payload;
      state.GetFeeRecord = undefined;
      //   state.fetchAllfee = undefined;
    });
    
    builder.addCase(RevokeScholarshipAction.pending, (state, action) => {
      state.Revokeloading = true;
      state.Revoke = false;
      // state.fetchAllfee = false;
    });
    builder.addCase(RevokeScholarshipAction.fulfilled, (state, action) => {
      state.Revoke = action?.payload;
      state.Revokeloading = false;
      state.Revokeerror = undefined;
      //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(RevokeScholarshipAction.rejected, (state, action) => {
      state.Revokeloading = false;
      state.Revokeerror = action.payload;
      state.Revoke = undefined;
      //   state.fetchAllfee = undefined;
    });
    builder.addCase(GetEnrolledStudentAction.pending, (state, action) => {
      state.Enrolllistloading = true;
      state.Enrolllist = false;
       state.fetchcustom = false;
    });
    builder.addCase(GetEnrolledStudentAction.fulfilled, (state, action) => {
      state.Enrolllist = action?.payload;
      state.Enrolllistloading = false;
      state.Enrolllisterror = undefined;
      
      state.fetchcustom = action?.payload;
      //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(GetEnrolledStudentAction.rejected, (state, action) => {
      state.Enrolllistloading = false;
      state.Enrolllisterror = action.payload;
      state.Enrolllist = undefined;
      //   state.fetchAllfee = undefined;
    });

    builder.addCase(GenerateFeeAction.pending, (state, action) => {
      state.Generatefeeloading = true;
      state.Generatefee = false;
      // state.fetchAllfee = false;
    });
    builder.addCase(GenerateFeeAction.fulfilled, (state, action) => {
      state.Generatefee = action?.payload;
      state.Generatefeeloading = false;
      state.Generatefeerror = undefined;
      //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(GenerateFeeAction.rejected, (state, action) => {
      state.Generatefeeloading = false;
      state.Generatefeerror = action.payload;
      state.Generatefee = undefined;
      //   state.fetchAllfee = undefined;
    });

    builder.addCase(
      ResetAllAccountBalanceByClassAction.pending,
      (state, action) => {
        state.Generatefeeloading = true;
        state.Generatefee = false;
        // state.fetchAllfee = false;
      },
    );
    builder.addCase(
      ResetAllAccountBalanceByClassAction.fulfilled,
      (state, action) => {
        state.Generatefee = action?.payload;
        state.Generatefeeloading = false;
        state.Generatefeerror = undefined;
        //  state.fetchAllfee = action?.payload;
      },
    );
    builder.addCase(
      ResetAllAccountBalanceByClassAction.rejected,
      (state, action) => {
        state.Generatefeeloading = false;
        state.Generatefeerror = action.payload;
        state.Generatefee = undefined;
        //   state.fetchAllfee = undefined;
      },
    );

    builder.addCase(ResetAllAccountBalanceAction.pending, (state, action) => {
      state.Generatefeeloading = true;
      state.Generatefee = false;
      // state.fetchAllfee = false;
    });
    builder.addCase(ResetAllAccountBalanceAction.fulfilled, (state, action) => {
      state.Generatefee = action?.payload;
      state.Generatefeeloading = false;
      state.Generatefeerror = undefined;
      //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(ResetAllAccountBalanceAction.rejected, (state, action) => {
      state.Generatefeeloading = false;
      state.Generatefeerror = action.payload;
      state.Generatefee = undefined;
      //   state.fetchAllfee = undefined;
    });

    builder.addCase(GenerateFeeClassAction.pending, (state, action) => {
      state.Generatefeeloading = true;
      state.Generatefee = false;
      // state.fetchAllfee = false;
    });
    builder.addCase(GenerateFeeClassAction.fulfilled, (state, action) => {
      state.Generatefee = action?.payload;
      state.Generatefeeloading = false;
      state.Generatefeerror = undefined;
      //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(GenerateFeeClassAction.rejected, (state, action) => {
      state.Generatefeeloading = false;
      state.Generatefeerror = action.payload;
      state.Generatefee = undefined;
      //   state.fetchAllfee = undefined;
    });
    builder.addCase(GenerateFeeStudentAction.pending, (state, action) => {
      state.Generatefeeloading = true;
      state.Generatefee = false;
      // state.fetchAllfee = false;
    });
    builder.addCase(GenerateFeeStudentAction.fulfilled, (state, action) => {
      state.Generatefee = action?.payload;
      state.Generatefeeloading = false;
      state.Generatefeerror = undefined;
      //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(GenerateFeeStudentAction.rejected, (state, action) => {
      state.Generatefeeloading = false;
      state.Generatefeerror = action.payload;
      state.Generatefee = undefined;
      //   state.fetchAllfee = undefined;
    });

    builder.addCase(PreferencesAction.pending, (state, action) => {
      state.Preferencesloading = true;
      state.Preferences = false;
      state.fetchcustomPref = false;
    });
    builder.addCase(PreferencesAction.fulfilled, (state, action) => {
      state.Preferences = action?.payload;
      state.Preferencesloading = false;
      state.Preferenceserror = undefined;
      state.fetchcustomPref = action?.payload;
    });
    builder.addCase(PreferencesAction.rejected, (state, action) => {
      state.Preferencesloading = false;
      state.Preferenceserror = action.payload;
      state.Preferences = undefined;
      state.fetchcustomPref = undefined;
    });

    builder.addCase(fetchfeeAssignbycartAction.pending, (state, action) => {
      state.Assignbyclassloading = true;
      state.Assignbyclass = false;
    });
    builder.addCase(fetchfeeAssignbycartAction.fulfilled, (state, action) => {
      state.Assignbyclass = action?.payload;
      state.Assignbyclassloading = false;
      state.Assignbyclasserror = undefined;
    });
    builder.addCase(fetchfeeAssignbycartAction.rejected, (state, action) => {
      state.Assignbyclassloading = false;
      state.Assignbyclasserror = action.payload;
      state.Assignbyclass = undefined;
    });

    builder.addCase(fetchfeeAssignbycustomAction.pending, (state, action) => {
      state.Assignbycustomloading = true;
      state.Assignbycustom = false;
    });
    builder.addCase(fetchfeeAssignbycustomAction.fulfilled, (state, action) => {
      state.Assignbycustom = action?.payload;
      state.Assignbycustomsloading = false;
      state.Assignbycustomerror = undefined;
    });
    builder.addCase(fetchfeeAssignbycustomAction.rejected, (state, action) => {
      state.Assignbycustomloading = false;
      state.Assignbycustomerror = action.payload;
      state.Assignbycustom = undefined;
    });

    builder.addCase(CreatesfeeCartegoryAction.pending, (state, action) => {
      state.Createfeecartloading = true;
      state.Createfeecart = false;
    });
    builder.addCase(CreatesfeeCartegoryAction.fulfilled, (state, action) => {
      state.Createfeecart = action?.payload;
      state.Createfeecartloading = false;
      state.error = undefined;
    });
    builder.addCase(CreatesfeeCartegoryAction.rejected, (state, action) => {
      state.Createfeecartloading = false;
      state.error = action.payload;
      state.Createfeecart = undefined;
    });

    builder.addCase(
      fetchfeeAssignGroupRecordAction.pending,
      (state, action) => {
        state.AssignfeeGrouploading = true;
        state.AssignfeeGroup = false;
      },
    );
    builder.addCase(
      fetchfeeAssignGroupRecordAction.fulfilled,
      (state, action) => {
        state.AssignfeeGroup = action?.payload;
        state.AssignfeeGrouploading = false;
        state.error = undefined;
      },
    );
    builder.addCase(
      fetchfeeAssignGroupRecordAction.rejected,
      (state, action) => {
        state.AssignfeeGrouploading = false;
        state.AssignfeeGrouperror = action.payload;
        state.AssignfeeGroup = undefined;
      },
    );

    builder.addCase(fetchAllfeeAssignRecordAction.pending, (state, action) => {
      state.AllAssignfeeloading = true;
      state.AllAssignfee = false;
    });
    builder.addCase(
      fetchAllfeeAssignRecordAction.fulfilled,
      (state, action) => {
        state.AllAssignfee = action?.payload;
        state.AllAssignfeeloading = false;
        state.error = undefined;
      },
    );
    builder.addCase(fetchAllfeeAssignRecordAction.rejected, (state, action) => {
      state.AllAssignfeeloading = false;
      state.error = action.payload;
      state.AllAssignfee = undefined;
    });

    builder.addCase(fetchfeeAssignRecordAction.pending, (state, action) => {
      state.Assignfeeloading = true;
      state.Assignfee = false;
    });
    builder.addCase(fetchfeeAssignRecordAction.fulfilled, (state, action) => {
      state.Assignfee = action?.payload;
      state.Assignfeeloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchfeeAssignRecordAction.rejected, (state, action) => {
      state.Assignfeeloading = false;
      state.error = action.payload;
      state.Assignfee = undefined;
    });

    builder.addCase(UpdateScholarshipAction.pending, (state, action) => {
      state.CreateScholarloading = true;
      state.CreateScholar = false;
      state.UpdateScholar = false;
    });

    builder.addCase(UpdateScholarshipAction.fulfilled, (state, action) => {
      state.CreateScholar = action?.payload;
      state.UpdateScholar = action?.payload;
      state.CreateScholarloading = false;
      state.scholarerror = undefined;
    });
    builder.addCase(UpdateScholarshipAction.rejected, (state, action) => {
      state.CreateScholarloading = false;
      state.scholarerror = action.payload;
      state.CreateScholar = undefined;
      state.UpdateScholar = undefined;
    });

    builder.addCase(CreatesScholarshipAction.pending, (state, action) => {
      state.CreateScholarloading = true;
      state.CreateScholar = false;
    });
    builder.addCase(CreatesScholarshipAction.fulfilled, (state, action) => {
      state.CreateScholar = action?.payload;
      state.CreateScholarloading = false;
      state.scholarerror = undefined;
    });
    builder.addCase(CreatesScholarshipAction.rejected, (state, action) => {
      state.CreateScholarloading = false;
      state.scholarerror = action.payload;
      state.CreateScholar = undefined;
    });

    builder.addCase(updateCartegoryAction.pending, (state, action) => {
      state.updateCartegoryloading = true;
      state.updateCartegory = false;
    });
    builder.addCase(updateCartegoryAction.fulfilled, (state, action) => {
      state.updateCartegory = action?.payload;
      state.updateCartegoryloading = false;
      state.error = undefined;
    });
    builder.addCase(updateCartegoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updateCartegory = undefined;
      state.updateCartegorynloading = undefined;
    });

    builder.addCase(updatefeeItemAction.pending, (state, action) => {
      state.updatefeeItemloading = true;
      state.updatefeeItem = false;
    });
    builder.addCase(updatefeeItemAction.fulfilled, (state, action) => {
      state.updatefeeItem = action?.payload;
      state.updatefeeItemloading = false;
      state.error = undefined;
    });
    builder.addCase(updatefeeItemAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updatefeeItem = undefined;
      state.updatefeeItemloading = undefined;
    });

    builder.addCase(fetchfeeStockAction.pending, (state, action) => {
      state.fetchfeeStockloading = true;
      state.fetchfeeStock = false;
    });
    builder.addCase(fetchfeeStockAction.fulfilled, (state, action) => {
      state.fetchfeeStock = action?.payload;
      state.fetchfeeStockloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchfeeStockAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchfeeStock = undefined;
      state.fetchfeeStockloading = undefined;
    });

    builder.addCase(fetchAllfeeAction.pending, (state, action) => {
      state.fetchAllfeeloading = true;
      state.fetchAllfee = false;
    });
    builder.addCase(fetchAllfeeAction.fulfilled, (state, action) => {
      state.fetchAllfee = action?.payload;
      state.fetchAllfeeloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchAllfeeAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchAllfee = undefined;
      state.fetchAllfeeloading = undefined;
    });

    builder.addCase(fetchfeeCartegoryAction.pending, (state, action) => {
      state.cartegoryloading = true;
      state.cartegory = false;
    });
    builder.addCase(fetchfeeCartegoryAction.fulfilled, (state, action) => {
      state.cartegory = action?.payload;
      state.cartegoryloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchfeeCartegoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.cartegoryloading = undefined;
      state.cartegory = undefined;
    });

    builder.addCase(fetchScholarshipAction.pending, (state, action) => {
      state.CreateScholarloading = true;
      state.CreateScholar = false;
    });
    builder.addCase(fetchScholarshipAction.fulfilled, (state, action) => {
      state.CreateScholar = action?.payload;
      state.CreateScholarloading = false;
      state.CreateScholarloadingerror = undefined;
    });
    builder.addCase(fetchScholarshipAction.rejected, (state, action) => {
      state.CreateScholarloadingerror = action.payload;
      state.CreateScholarloading = undefined;
      state.CreateScholar = undefined;
    });
    builder.addCase(deleteSinglefeeAction.pending, (state, action) => {
      state.deleteSinglefeeloading = true;
      state.deleteSinglefee = false;
      state.fetchAllfee = false;
    });

    builder.addCase(deleteSinglefeeAction.fulfilled, (state, action) => {
      state.deleteSinglefee = action?.payload;
      state.deleteSinglefeeloading = false;
      state.error = undefined;
      state.fetchAllfee = action?.payload;
    });
    builder.addCase(deleteSinglefeeAction.rejected, (state, action) => {
      state.error = action.payload;
      state.deleteSinglefee = undefined;
      state.deleteSinglefeeloading = undefined;
      state.fetchAllfee = undefined;
    });

    builder.addCase(deleteSingleFeeCartAction.pending, (state, action) => {
      state.deleteSingleCartloading = true;
      state.deleteSinglefee = false;
      state.cartegory = false;
    });

    builder.addCase(deleteSingleFeeCartAction.fulfilled, (state, action) => {
      state.deleteSinglefee = action?.payload;
      state.deleteSingleCartloading = false;
      state.error = undefined;
      state.cartegory = action?.payload;
    });
    builder.addCase(deleteSingleFeeCartAction.rejected, (state, action) => {
      state.error = action.payload;
      state.deleteSinglefee = undefined;
      state.deleteSingleCartloading = undefined;
      state.cartegory = undefined;
    });

    builder.addCase(PayFeeAction.pending, (state, action) => {
      state.payfeeloading = true;
      state.payfee = false;
    });

    builder.addCase(PayFeeAction.fulfilled, (state, action) => {
      state.payfee = action?.payload;
      state.payfeeloading = false;
      state.payfeeerror = undefined;
      //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(PayFeeAction.rejected, (state, action) => {
      state.payfeeerror = action.payload;
      state.payfeeloading = undefined;
      state.payfee = undefined;
    });

    builder.addCase(CustomBalUpdate.pending, (state, action) => {
      state.customloading = true;
      state.custom = false;
    });

    builder.addCase(CustomBalUpdate.fulfilled, (state, action) => {
      state.custom = action?.payload;
      state.customloading = false;
      state.customerror = undefined;
      //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(CustomBalUpdate.rejected, (state, action) => {
      state.customerror = action.payload;
      state.customloading = undefined;
      state.custom = undefined;
    });

    builder.addCase(ReverseFee.pending, (state, action) => {
      state.reverseloading = true;
      state.reverse = false;
    });

    builder.addCase(ReverseFee.fulfilled, (state, action) => {
      state.reverse = action?.payload;
      state.reverseloading = false;
      state.reverserror = undefined;
      //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(ReverseFee.rejected, (state, action) => {
      state.reverserror = action.payload;
      state.reverseloading = undefined;
      state.reverse = undefined;
    });

    builder.addCase(fetchSinglefeeAction.pending, (state, action) => {
      state.singlefeeloading = true;
      state.singlefee = false;
    });
    builder.addCase(fetchSinglefeeAction.fulfilled, (state, action) => {
      state.singlefee = action?.payload;
      state.singlefeeloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchSinglefeeAction.rejected, (state, action) => {
      state.error = action.payload;
      state.singlefee = undefined;
      state.singlefeeloading = undefined;
    });

    builder.addCase(updatefeeAction.pending, (state, action) => {
      state.updatesinglefeeloading = false;
      state.updatefee = false;
    });
    builder.addCase(updatefeeAction.fulfilled, (state, action) => {
      state.updatesinglefee = action?.payload;
      state.updatesinglefeeloading = false;
      state.error = undefined;
      state.updatefee = true;
    });
    builder.addCase(updatefeeAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updatesinglefee = undefined;
      state.updatesinglefeeloading = undefined;
    });

    builder.addCase(deleteScholarshipAction.pending, (state, action) => {
      state.deleteScholarloading = true;
      state.CreateScholar = true;
    });
    builder.addCase(deleteScholarshipAction.fulfilled, (state, action) => {
      state.deleteScholar = action?.payload;
      state.CreateScholar = action?.payload;

      state.deleteScholarloading = false;
      state.deleteScholarerror = undefined;
    });
    builder.addCase(deleteScholarshipAction.rejected, (state, action) => {
      state.deleteScholarloading = false;
      state.deleteScholarerror = action.payload;
      state.deleteScholar = undefined;
      state.CreateScholar = undefined;
    });

    builder.addCase(DeleteAllAssignedFeeAction.pending, (state, action) => {
      state.deleteAllAssignedloading = true;
      state.deleteAllAssigned = false;
    });
    builder.addCase(DeleteAllAssignedFeeAction.fulfilled, (state, action) => {
      state.deleteAllAssigned = action?.payload;
      state.deleteAllAssignedloading = false;
      state.deleteAllAssignederror = undefined;
    });
    builder.addCase(DeleteAllAssignedFeeAction.rejected, (state, action) => {
      state.deleteAllAssignedloading = false;
      state.deleteAllAssignederror = action.payload;
      state.deleteAllAssigned = undefined;
    });

    builder.addCase(deleteAllfeeAction.pending, (state, action) => {
      state.deleteAllfeeesloading = true;
    });
    builder.addCase(deleteAllfeeAction.fulfilled, (state, action) => {
      state.deleteAllfeees = action?.payload;
      state.deletefeeloading = false;
      state.error = undefined;
    });
    builder.addCase(deleteAllfeeAction.rejected, (state, action) => {
      state.deleteAllfeeesloading = false;
      state.error = action.payload;
      state.deleteAllfeees = undefined;
    });
  },
});

export const {
  resetpayfee,
  resetUpdateFeeCart,
  resetUpdatefeeItem,
  resetcreatefee,
  resetUpdatefee,
  resetdeletefee,
  resetpreference,
  resetcreatecart,
  resetGeneratefee,
  resetdeleteassignedfee,
  resetRevoke,
} = FeeSlices.actions;

export default FeeSlices.reducer;


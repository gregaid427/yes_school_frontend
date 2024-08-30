import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export const CreatesfeeAction = createAsyncThunk(
  'new/Newfee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/`,
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

export const PayFeeAction = createAsyncThunk(
  'new/payfee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/payfee`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('Payment Added Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Paying Fee');

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
export const FetchPaymentsAction = createAsyncThunk(
  'new/fetchpayment',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
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
      return data;
    } catch (error) {
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/generatefee`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('Fee Generated Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Generating Fee');

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

export const PrefencesAction = createAsyncThunk(
  'Post/Preferences',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/preferences`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('Prefences Set Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Setting Preferences');

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

export const CreatesfeeCartegoryAction = createAsyncThunk(
  'new/Newfeecart',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/cart`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('Fee Cartegory Added Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Adding Fee Cartegory');

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

export const CreatesScholarshipAction = createAsyncThunk(
  'new/Scholarship',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/scholarship`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('Scholarship Added Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Adding Scholarship');

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

export const fetchAllfeeAction = createAsyncThunk(
  'fetch/Allfee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fee/`);

      return data;
    } catch (error) {
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
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/getstock`,
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

export const EnrollScholarshipAction = createAsyncThunk(
  'fetch/enrollscholarship',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/enrollscholarship`,payload
      );
      if (data?.success == 1) {
        toast.success('Student Enrolled Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Enrolling Scholarship');

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



export const GetEnrolledStudentAction = createAsyncThunk(
  'fetch/enrolledstudent',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/listscholarship`,
        payload,
      );
      if (data?.success == '1' && data?.data[0] == null) { 
        toast.success('Empty Class List');
      }

      if (data == null) {
        toast.error('Error loading Enrolled Student');
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

export const fetchSinglefeeAction = createAsyncThunk(
  'fetch/singlefee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/single/`,
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
export const fetchfeeCartegoryAction = createAsyncThunk(
  'fetch/feecart',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/cart`,
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

export const fetchfeeAssignRecordAction = createAsyncThunk(
  'fetch/feeassignrecord',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/feerecord`,
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

export const fetchfeeAssignbycartAction = createAsyncThunk(
  'fetch/feeassignbyclass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/assignfeerecord`,
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

export const fetchScholarshipAction = createAsyncThunk(
  'fetch/scholarship',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/scholarship`,
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

export const updatefeeAction = createAsyncThunk(
  'update/fee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/`,
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

export const updatefeeItemAction = createAsyncThunk(
  'update/feeitem',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/item`,
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

export const updateCartegoryAction = createAsyncThunk(
  'cartegory/Update',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/editcartegory`,
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

export const deleteScholarshipAction = createAsyncThunk(
  'fee/deleteScholar',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/scholarship/${payload}`,
      );
      if (data?.success == 1) {
        toast.success('Scholarship Deleted Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Deleting Scholarship');

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
export const deleteAllfeeAction = createAsyncThunk(
  'fee/deleteAllfee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/`,
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
export const deleteSinglefeeAction = createAsyncThunk(
  'fee/deleteASinglefee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/${payload}`,
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


export const deleteSingleFeeCartAction = createAsyncThunk(
  'delete/deletefeeCart',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/cartegorydel`, payload
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

export const AssignFeesAction = createAsyncThunk(
  'delete/assignfee',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/assignfee`, payload
      );
      if (data?.success == 1) {
        toast.success('Assigned Successfully');
      }

      if (data == null) {
        toast.error('Error Assigning Fee');
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

export const deleteSinglefeeStockAction = createAsyncThunk(
  'fee/deleteASinglefeestock',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/fee/stock/${payload}`,
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

const FeeSlices = createSlice({
  name: 'Fee',
  initialState: {},
  reducers: {
    resetcreatefee(state) {
      state.Createfee = null;
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
     // state.fetchAllfee = false;
    });
    builder.addCase(AssignFeesAction.fulfilled, (state, action) => {
      state.Assignfee = action?.payload;
      state.AssignFeesloading = false;
      state.error = undefined;
    //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(AssignFeesAction.rejected, (state, action) => {
      state.AssignFeesloading = false;
      state.error = action.payload;
      state.Assignfee = undefined;
   //   state.fetchAllfee = undefined;
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

    builder.addCase(GetEnrolledStudentAction.pending, (state, action) => {
      state.Enrolllistloading = true;
      state.Enrolllist = false;
     // state.fetchAllfee = false;
    });
    builder.addCase(GetEnrolledStudentAction.fulfilled, (state, action) => {
      state.Enrolllist = action?.payload;
      state.Enrolllistloading = false;
      state.Enrolllisterror = undefined;
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

    builder.addCase(PrefencesAction.pending, (state, action) => {
      state.Prefencesloading = true;
      state.Prefences = false;
     // state.fetchAllfee = false;
    });
    builder.addCase(PrefencesAction.fulfilled, (state, action) => {
      state.Prefences = action?.payload;
      state.Prefencesloading = false;
      state.Prefenceserror = undefined;
    //  state.fetchAllfee = action?.payload;
    });
    builder.addCase(PrefencesAction.rejected, (state, action) => {
      state.Prefencesloading = false;
      state.Prefenceserror = action.payload;
      state.Prefences = undefined;
   //   state.fetchAllfee = undefined;
    });


    

    builder.addCase(
      fetchfeeAssignbycartAction.pending,
      (state, action) => {
        state.Assignbyclassloading = true;
        state.Assignbyclass = false;
      },
    );
    builder.addCase(
      fetchfeeAssignbycartAction.fulfilled,
      (state, action) => {
        state.Assignbyclass = action?.payload;
        state.Assignbyclassloading = false;
        state.Assignbyclasserror = undefined;
      },
    );
    builder.addCase(
      fetchfeeAssignbycartAction.rejected,
      (state, action) => {
        state.Assignbyclassloading = false;
        state.Assignbyclasserror = action.payload;
        state.Assignbyclass = undefined;
      },
    );

    builder.addCase(
      CreatesfeeCartegoryAction.pending,
      (state, action) => {
        state.Createfeecartloading = true;
        state.Createfeecart = false;
      },
    );
    builder.addCase(
      CreatesfeeCartegoryAction.fulfilled,
      (state, action) => {
        state.Createfeecart = action?.payload;
        state.Createfeecartloading = false;
        state.error = undefined;
      },
    );
    builder.addCase(
      CreatesfeeCartegoryAction.rejected,
      (state, action) => {
        state.Createfeecartloading = false;
        state.error = action.payload;
        state.Createfeecart = undefined;
      },
    );


    
    builder.addCase(
      fetchfeeAssignRecordAction.pending,
      (state, action) => {
        state.Assignfeeloading = true;
        state.Assignfee = false;
      },
    );
    builder.addCase(
      fetchfeeAssignRecordAction.fulfilled,
      (state, action) => {
        state.Assignfee = action?.payload;
        state.Assignfeeloading = false;
        state.error = undefined;
      },
    );
    builder.addCase(
      fetchfeeAssignRecordAction.rejected,
      (state, action) => {
        state.Assignfeeloading = false;
        state.error = action.payload;
        state.Assignfee = undefined;
      },
    );

    builder.addCase(
      CreatesScholarshipAction.pending,
      (state, action) => {
        state.CreateScholarloading = true;
        state.CreateScholar = false;
      },
    );
    builder.addCase(
      CreatesScholarshipAction.fulfilled,
      (state, action) => {
        state.CreateScholar = action?.payload;
        state.CreateScholarloading = false;
        state.scholarerror = undefined;
      },
    );
    builder.addCase(
      CreatesScholarshipAction.rejected,
      (state, action) => {
        state.CreateScholarloading = false;
        state.scholarerror = action.payload;
        state.CreateScholar = undefined;
      },
    );


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
  resetUpdatefeeItem,
  resetcreatefee,
  resetUpdatefee,
  resetdeletefee,
  resetcreatecart,
} = FeeSlices.actions;

export default FeeSlices.reducer;

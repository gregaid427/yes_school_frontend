import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}` ,   'Content-Type': 'application/json'  }

export const CreatesSubjectAction = createAsyncThunk(
  "new/NewSubject",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/subject/`,payload
        
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

export const fetchSubjectAction = createAsyncThunk(
  "fetch/allsubject",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/subject/`
        
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
export const UpdateSubjectAction = createAsyncThunk(
  "subject/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/subject/`,payload
        
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

export const DeleteSingleSubjectAction = createAsyncThunk(
  "delete/subject",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/subject/${payload}`,
        
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



const SubjectSlices = createSlice({
  name: "Subject",
  initialState: {},
  reducers: {
  
    resetcreatesubject(state) {
      state.CreateSubject = null
    },
 
    resetUdateSubject(state) {
      state.updateSubject = null
    } ,
    resetdeleteSubject(state) {
      //state.deletesectionbyclass = null
    } ,
  },
  extraReducers: builder => {
    builder.addCase(CreatesSubjectAction.pending, (state, action) => {
      state.CreateSubjectloading = true;
      state.CreateSubject = false;
      state.fetchAllSubject = false;


    });
    builder.addCase(CreatesSubjectAction.fulfilled, (state, action) => {
      state.CreateSubject = action?.payload;
      state.fetchAllSubject = action?.payload;
      state.CreateSubjectloading = false;
      state.error = undefined;
    });
    builder.addCase(CreatesSubjectAction.rejected, (state, action) => {
      state.CreateSubjectloading = false;
      state.error = action.payload;
      state.CreateSubject = undefined;
      state.fetchAllSubject = undefined;

    });



    builder.addCase(fetchSubjectAction.pending, (state, action) => {
      state.fetchAllSubjectloading = true;
      state.fetchAllSubject = false;
      
    });
    builder.addCase(fetchSubjectAction.fulfilled, (state, action) => {
      state.fetchAllSubject = action?.payload;
      state.fetchAllSubjectloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchSubjectAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchAllSubject = undefined;
      state.fetchAllSubjectloading = undefined;

    });


    builder.addCase(UpdateSubjectAction.pending, (state, action) => {
      state.updateSubjectloading = true;
      state.updateSubject = null;
      state.fetchAllSubject = false;

      
    });
    builder.addCase(UpdateSubjectAction.fulfilled, (state, action) => {
      state.updateSubject = action?.payload;
      state.fetchAllSubject = action?.payload;

      state.updateSubjectnloading = false;
      state.error = undefined;
    });
    builder.addCase(UpdateSubjectAction.rejected, (state, action) => {
      state.updateSubjectError = action.payload;
      state.updateSubject = false;
      state.updateSubjectloading = undefined;
      state.fetchAllSubject = undefined;


    });




    builder.addCase(DeleteSingleSubjectAction.pending, (state, action) => {
      state.deleteSubjectloading = true;
      state.deleteSubject = null;
      state.fetchAllSubject = false;

      
    });
    builder.addCase(DeleteSingleSubjectAction.fulfilled, (state, action) => {
      state.deleteSubject = action?.payload;
      state.fetchAllSubject = action?.payload;

      state.deleteSubjectloading = false;
      state.deletesubjecterror = undefined;
    });
    builder.addCase(DeleteSingleSubjectAction.rejected, (state, action) => {
      state.deletesubjecterror = action.payload;
      state.deleteSubject = false;
      state.deleteSubjectloading = undefined;
      state.fetchAllSubject = undefined;


    });


    








  },
});


export const { resetcreatesubject,resetUdateSubject,resetdeleteSection  } = SubjectSlices.actions

export default SubjectSlices.reducer;



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}` ,   'Content-Type': 'application/json'  }

export const CreatesSubjectAction = createAsyncThunk(
  "new/NewSubject",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/subject/`,payload
        
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
        `http://localhost:5000/api/subject/`
        
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
        `http://localhost:5000/api/subject/`,payload
        
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
export const fetchAllSectionAction = createAsyncThunk(
  "fetch/AllSection",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/class/groupsection`
        
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

export const deleteSectionByClass = createAsyncThunk(
  "fetch/sectiondelete",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/class/single/sectiondelete`, payload
        
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
export const fetchSingleClassAction = createAsyncThunk(
  "fetch/singleclass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/class/single/`, payload
        
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
export const fetchSectionbyclassAction = createAsyncThunk(
  "fetch/sectionclass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/class/sectionclass/`, payload
        
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
export const updateClassAction = createAsyncThunk(
  "class/Update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/class/`, payload
        
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
export const  createSectionAction = createAsyncThunk(
  "password/reset",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/class/section`, payload
        
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

export const  deleteAllClassAction = createAsyncThunk(
  "class/deleteAllClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/class/`, 
        
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

export const  deleteSingleClassAction = createAsyncThunk(
  "class/deleteASingleClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/class/`, payload
        
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
      state.deletesectionbyclass = null
    } ,
  },
  extraReducers: builder => {
    builder.addCase(CreatesSubjectAction.pending, (state, action) => {
      state.CreateSubjectloading = true;
      state.CreateSubject = false;

    });
    builder.addCase(CreatesSubjectAction.fulfilled, (state, action) => {
      state.CreateSubject = action?.payload;
      state.CreateSubjectloading = false;
      state.error = undefined;
    });
    builder.addCase(CreatesSubjectAction.rejected, (state, action) => {
      state.CreateSubjectloading = false;
      state.error = action.payload;
      state.CreateSubject = undefined;
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
      
    });
    builder.addCase(UpdateSubjectAction.fulfilled, (state, action) => {
      state.updateSubject = action?.payload;
      state.updateSubjectnloading = false;
      state.error = undefined;
    });
    builder.addCase(UpdateSubjectAction.rejected, (state, action) => {
      state.updateSubjectError = action.payload;
      state.updateSubject = false;
      state.updateSubjectloading = undefined;

    });




    builder.addCase(deleteSectionByClass.pending, (state, action) => {
      state.deletesectionbyclassloading = true;
      state.deletesectionbyclass = false;
      
    });
    builder.addCase(deleteSectionByClass.fulfilled, (state, action) => {
      state.deletesectionbyclass = action?.payload;
      state.deletesectionbyclassloading = false;
      state.error = undefined;
      state.deleteclasssection= false
    });
    builder.addCase(deleteSectionByClass.rejected, (state, action) => {
      state.error = action.payload;
      state.deletesectionbyclass = undefined;
      state.deletesectionbyclassloading = undefined;
      state.deleteclasssection= true


    });
    builder.addCase(fetchSingleClassAction.pending, (state, action) => {
      state.singleclassloading = true;
      state.singleclass = false;
      
    });
    builder.addCase(fetchSingleClassAction.fulfilled, (state, action) => {
      state.singleclass = action?.payload;
      state.singleclassloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchSingleClassAction.rejected, (state, action) => {
      state.error = action.payload;
      state.singleclass = undefined;
      state.singleclassloading = undefined;

    });


    
    builder.addCase(fetchAllSectionAction.pending, (state, action) => {
      state.sectionloading = true;
      state.fetchSection = false;
      
    });
    builder.addCase(fetchAllSectionAction.fulfilled, (state, action) => {
      state.fetchSection = action?.payload;
      state.sectionloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchAllSectionAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchSection = undefined;
      state.sectionloading = undefined;

    });




    builder.addCase(updateClassAction.pending, (state, action) => {
      state.updatesingleclassloading = false;
      state.updateClass = false
      
    });
    builder.addCase(updateClassAction.fulfilled, (state, action) => {
      state.updatesingleclass = action?.payload;
      state.updatesingleclassloading = false;
      state.error = undefined;
      state.updateClass = true

    });
    builder.addCase(updateClassAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updatesingleclass = undefined;
      state.updatesingleclassloading = undefined;

    });




    builder.addCase(createSectionAction.pending, (state, action) => {
      state.loading = true;
      state.createClassSection = undefined;
    });
    builder.addCase(createSectionAction.fulfilled, (state, action) => {
      state.createClassSection = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(createSectionAction.rejected, (state, action) => {
      state.createSectionloading = false;
      state.error = action.payload;
      state.createClassSection = undefined;
    });
    

    builder.addCase(deleteAllClassAction.pending, (state, action) => {
      state.deleteAllClassesloading = true;
    });
    builder.addCase(deleteAllClassAction.fulfilled, (state, action) => {
      state.deleteAllClasses = action?.payload;
      state.deleteClassloading = false;
      state.error = undefined;
    });
    builder.addCase(deleteAllClassAction.rejected, (state, action) => {
      state.deleteAllClassesloading = false;
      state.error = action.payload;
      state.deleteAllClasses = undefined;
    });


    builder.addCase(deleteSingleClassAction.pending, (state, action) => {
      state.deleteClassloading = true;
    });
    builder.addCase(deleteSingleClassAction.fulfilled, (state, action) => {
      state.deleteClasses = action?.payload;
      state.deleteClassloading = false;
      state.error = undefined;
    });
    builder.addCase(deleteSingleClassAction.rejected, (state, action) => {
      state.deleteClassloading = false;
      state.error = action.payload;
      state.deleteClasses = undefined;
    });




  },
});


export const { resetcreatesubject,resetUdateSubject,resetdeleteSection  } = SubjectSlices.actions

export default SubjectSlices.reducer;



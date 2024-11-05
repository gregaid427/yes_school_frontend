import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export const CreatesClassAction = createAsyncThunk(
  'new/NewClass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/class/`,
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
export const CreatesBulkClassAction = createAsyncThunk(
  'new/NewBulkClass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/student/bulkAdmission`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('Created Successfully');
      }

      if (data == null) {
        toast.error('Error Creating Class Data');
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

export const fetchBulkStudentAction = createAsyncThunk(
  'fetch/allstudent',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/student/`,
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
export const fetchAllClassAction = createAsyncThunk(
  'fetch/AllClass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/class/all`,
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
export const fetchAllClassNoAction = createAsyncThunk(
  'fetch/AllClassNo',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/class/allno`,
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
export const fetchAllClassExamAction = createAsyncThunk(
  'fetch/AllClassExam',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/class/allclassexam`,
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

export const fetchAllSectionAction = createAsyncThunk(
  'fetch/AllSection',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/class/groupsection`,
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

export const deleteSectionByClass = createAsyncThunk(
  'delete/sectionbyclass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/class/single/sectiondelete`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('Record Deleted Successfully');
      }

      if (data == null) {
        toast.error('Error Deleting Record');
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

export const FetchClassWithSectionAction = createAsyncThunk(
  'fetch/singleclassSection',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/class/getclasswithsection`,
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
export const fetchSingleClassAction = createAsyncThunk(
  'fetch/singleclass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/class/single/`,
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
export const fetchSectionbyclassAction = createAsyncThunk(
  'fetch/sectionclass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/class/sectionclass/`,
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
export const updateClassAction = createAsyncThunk(
  'class/Update',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/class/`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('Record Updated Successfully');
      }

      if (data?.success == 0) {
        toast.error('Error Updating Data');

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
export const updateSectionAction = createAsyncThunk(
  'section/Update',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/class/section`,
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
export const createSectionAction = createAsyncThunk(
  'create/sectiongroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/class/section`,
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

export const deleteAllClassAction = createAsyncThunk(
  'class/deleteAllClass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/class/`,
      );
      if (data?.success == 1) {
        toast.success('Record Deleted Successfully');
      }

      if (data == null) {
        toast.error('Error Deleting Record');
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

export const deleteSingleClassAction = createAsyncThunk(
  'class/deleteSingleClass',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/class/single/${payload}`,
      );
      if (data?.success == 1) {
        toast.success('Record Deleted Successfully');
      }

      if (data == null) {
        toast.error('Error Deleting Record');
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

export const deleteSectiongroupAction = createAsyncThunk(
  'delete/deleteSinglegroup',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/class/sectiongroup/${payload}`,
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
  async ({ rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/student/truncate`,
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

const ClassSlices = createSlice({
  name: 'Class',
  initialState: {},
  reducers: {
    resetcreateClass(state) {
      state.CreateClasses = null;
    },
    resetcreatesection(state) {
      state.createClassSection = null;
    },
    resetUdateClass(state) {
      state.updatesingleclass = false;
    },
    resetUpdateSection(state) {
      state.updateSection = false;
    },
    resetgetclass(state) {
      state.ClassWithSection = null;
    },
    resetdeleteclass(state) {
      state.deletesectionbyclass = null;
    },
    resetfetchAllClassExam(state) {
      state.fetchAllClassExam = null;
    },
  },
  extraReducers: (builder) => {

    builder.addCase(FetchClassWithSectionAction.pending, (state, action) => {
      state.ClassWithSectionloading = true;
      state.ClassWithSection = false;
    });
    builder.addCase(FetchClassWithSectionAction.fulfilled, (state, action) => {
      state.ClassWithSection = action?.payload;

      state.ClassWithSectionloading = false;
      state.ClassWithSectionerror = undefined;
    });
    builder.addCase(FetchClassWithSectionAction.rejected, (state, action) => {
      state.ClassWithSectionloading = false;
      state.ClassWithSectionerror = action.payload;
      state.ClassWithSection = undefined;
    });



    builder.addCase(CreatesClassAction.pending, (state, action) => {
      state.CreateClassesloading = true;
      state.CreateClasses = false;
      state.fetchAllClass = null;
    });
    builder.addCase(CreatesClassAction.fulfilled, (state, action) => {
      state.CreateClasses = action?.payload;
      state.fetchAllClass = action?.payload;
      state.CreateClassesloading = false;
      state.error = undefined;
    });
    builder.addCase(CreatesClassAction.rejected, (state, action) => {
      state.CreateClassesloading = false;
      state.error = action.payload;
      state.CreateClasses = undefined;
    });

    builder.addCase(CreatesBulkClassAction.pending, (state, action) => {
      state.CreateClassesloading = true;
      state.CreateClasses = false;
      state.fetchAllClass = null;
    });
    builder.addCase(CreatesBulkClassAction.fulfilled, (state, action) => {
      state.CreateClasses = action?.payload;
      state.fetchAllClass = action?.payload;
      state.CreateClassesloading = false;
      state.error = undefined;
    });
    builder.addCase(CreatesBulkClassAction.rejected, (state, action) => {
      state.CreateClassesloading = false;
      state.error = action.payload;
      state.CreateClasses = undefined;
    });

    builder.addCase(updateSectionAction.pending, (state, action) => {
      state.updateSectionloading = true;
      state.updateSection = false;
    });
    builder.addCase(updateSectionAction.fulfilled, (state, action) => {
      state.updateSection = action?.payload;
      state.updateSectionloading = false;
      state.error = undefined;
    });
    builder.addCase(updateSectionAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updateSection = undefined;
      state.updateSectionloading = undefined;
    });

    builder.addCase(fetchAllClassAction.pending, (state, action) => {
      state.fetchAllClassloading = true;
      state.fetchAllClass = false;
    });
    builder.addCase(fetchAllClassAction.fulfilled, (state, action) => {
      state.fetchAllClass = action?.payload;

      state.fetchAllClassloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchAllClassAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchAllClass = undefined;
      state.fetchAllClassloading = undefined;
    });

    builder.addCase(fetchAllClassExamAction.pending, (state, action) => {
      state.fetchAllClassExamloading = true;
      state.fetchAllClassExam = false;
    });
    builder.addCase(fetchAllClassExamAction.fulfilled, (state, action) => {
      state.fetchAllClassExam = action?.payload;
      state.fetchAllClassExamloading = false;
      state.fetchAllClassExamerror = undefined;
    });
    builder.addCase(fetchAllClassExamAction.rejected, (state, action) => {
      state.fetchAllClassExamerror = action.payload;
      state.fetchAllClassExam = undefined;
      state.fetchAllClassExamloading = undefined;
    });

    builder.addCase(fetchAllClassNoAction.pending, (state, action) => {
      state.fetchAllClassExamloading = true;
      state.fetchAllClassNo = false;
    });
    builder.addCase(fetchAllClassNoAction.fulfilled, (state, action) => {
      state.fetchAllClassNo = action?.payload;
      state.fetchAllClassloadingNo = false;
      state.errorNo = undefined;
    });
    builder.addCase(fetchAllClassNoAction.rejected, (state, action) => {
      state.errorNo = action.payload;
      state.fetchAllClassNo = undefined;
      state.fetchAllClassloadingNo = undefined;
    });

    builder.addCase(fetchSectionbyclassAction.pending, (state, action) => {
      state.sectionbyclassloading = true;
      state.sectionbyclass = false;
    });
    builder.addCase(fetchSectionbyclassAction.fulfilled, (state, action) => {
      state.sectionbyclass = action?.payload;
      state.sectionbyclassloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchSectionbyclassAction.rejected, (state, action) => {
      state.error = action.payload;
      state.sectionbyclass = undefined;
      state.sectionbyclass = undefined;
    });

    builder.addCase(deleteSectionByClass.pending, (state, action) => {
      state.deletesectionbyclassloading = true;
      state.deletesectionbyclass = false;
    });
    builder.addCase(deleteSectionByClass.fulfilled, (state, action) => {
      state.deletesectionbyclass = action?.payload;
      state.deletesectionbyclassloading = false;
      state.error = undefined;
      state.deleteclasssection = false;
    });
    builder.addCase(deleteSectionByClass.rejected, (state, action) => {
      state.error = action.payload;
      state.deletesectionbyclass = undefined;
      state.deletesectionbyclassloading = undefined;
      state.deleteclasssection = true;
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
      state.updateClass = false;
    });
    builder.addCase(updateClassAction.fulfilled, (state, action) => {
      state.updatesingleclass = action?.payload;
      state.updatesingleclassloading = false;
      state.error = undefined;
      state.updateClass = true;
    });
    builder.addCase(updateClassAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updatesingleclass = undefined;
      state.updatesingleclassloading = undefined;
    });

    builder.addCase(createSectionAction.pending, (state, action) => {
      state.loading = true;
      state.createClassSection = undefined;
      state.fetchSection = false;
    });
    builder.addCase(createSectionAction.fulfilled, (state, action) => {
      state.createClassSection = action?.payload;
      state.loading = false;
      state.error = undefined;
      state.fetchSection = action?.payload;
    });
    builder.addCase(createSectionAction.rejected, (state, action) => {
      state.createSectionloading = false;
      state.error = action.payload;
      state.createClassSection = undefined;
      state.fetchSection = undefined;
    });

    builder.addCase(deleteSectiongroupAction.pending, (state, action) => {
      state.deletesectiongrouploading = true;
      state.deletesectiongroup = undefined;
      state.fetchSection = false;
    });
    builder.addCase(deleteSectiongroupAction.fulfilled, (state, action) => {
      state.deletesectiongroup = action?.payload;
      state.deletesectiongrouploading = false;
      state.deletesectiongrouperror = undefined;
      state.fetchSection = action?.payload;
    });
    builder.addCase(deleteSectiongroupAction.rejected, (state, action) => {
      state.deletesectiongrouploading = false;
      state.deletesectiongrouperror = action.payload;
      state.deletesectiongroup = undefined;
      state.fetchSection = undefined;
    });

    builder.addCase(deleteAllClassAction.pending, (state, action) => {
      state.deleteAllClassesloading = true;
      state.fetchAllClassNo = null;
      state.fetchAllClass = null;
    });
    builder.addCase(deleteAllClassAction.fulfilled, (state, action) => {
      state.deleteAllClasses = action?.payload;
      state.fetchAllClass = action?.payload;
      state.deleteClassloading = false;
      state.error = undefined;
    });
    builder.addCase(deleteAllClassAction.rejected, (state, action) => {
      state.deleteAllClassesloading = false;
      state.error = action.payload;
      state.deleteAllClasses = undefined;
      state.fetchAllClass = undefined;
    });

    builder.addCase(deleteSingleClassAction.pending, (state, action) => {
      state.deleteSingleClassloading = true;
      state.deleteSingleClass = false;
      state.fetchAllClass = null;
    });
    builder.addCase(deleteSingleClassAction.fulfilled, (state, action) => {
      state.deleteSingleClass = action?.payload;
      state.deleteSingleClassloading = false;
      state.deleteSingleClasserror = undefined;
      state.fetchAllClass = action?.payload;
    });
    builder.addCase(deleteSingleClassAction.rejected, (state, action) => {
      state.deleteSingleClasserror = action.payload;
      state.deleteSingleClass = undefined;
      state.deleteSingleClassloading = undefined;
      state.fetchAllClass = undefined;
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
  resetUpdateSection,
  resetcreateClass,
  resetUdateClass,
  resetdeleteclass,
  resetcreatesection,
  resetfetchAllClassExam,
  resetgetclass
} = ClassSlices.actions;

export default ClassSlices.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}` ,   'Content-Type': 'application/json'  }

export const CreatesInventoryAction = createAsyncThunk(
  "new/NewInventory",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/inventory/`,payload
        
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

export const CreatesInventoryStockAction = createAsyncThunk(
  "new/NewInventorystock",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/inventory/addstock`,payload
        
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



export const CreatesInventoryCartegoryAction = createAsyncThunk(
  "new/NewInventorycart",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/inventory/cart`,payload
        
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

export const fetchBulkStudentAction = createAsyncThunk(
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
export const fetchAllInventoryAction = createAsyncThunk(
  "fetch/AllInventory",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/inventory/`
        
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
export const fetchInventoryStockAction = createAsyncThunk(
  "fetch/Inventorystock",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/inventory/getstock`
        
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
        `http://localhost:5000/api/inventory/groupsection`
        
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

export const deleteSectionByInventory = createAsyncThunk(
  "fetch/sectiondelete",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/inventory/single/sectiondelete`, payload
        
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
export const fetchSingleInventoryAction = createAsyncThunk(
  "fetch/singleInventory",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/inventory/single/`, payload
        
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
export const fetchInventCartegoryAction = createAsyncThunk(
  "fetch/sectionInventorycart",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/inventory/cart`, payload
        
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

export const updateInventoryAction = createAsyncThunk(
  "Inventory/Update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/inventory/`, payload
        
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

export const updateInventoryItemAction = createAsyncThunk(
  "InventoryItem/Update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/inventory/item`, payload
        
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


export const updateCartegoryAction = createAsyncThunk(
  "cartegory/Update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/inventory/editcartegory`, payload
        
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
        `http://localhost:5000/api/inventory/section`, payload
        
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

export const  deleteAllInventoryAction = createAsyncThunk(
  "Inventory/deleteAllInventory",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/inventory/`, 
        
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

export const  deleteSingleInventoryAction = createAsyncThunk(
  "Inventory/deleteASingleInventory",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/Inventory/`, payload
        
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




const InventorySlices = createSlice({
  name: "Inventory",
  initialState: {},
  reducers: {
  
    resetcreateInventory(state) {
      state.CreateInventory = null
    },
    resetcreatecart(state) {
      state.CreateInventorycart = null
    },
    resetcreatestock(state) {
      state.CreateInventorystock = null
    }
,   
    resetUpdateInventoryItem(state) {
      state.updateInventoryItem = null
    } ,
    resetUpdateInventory(state) {
      state.updateCartegory = null
    } ,
    resetdeleteInventory(state) {
      state.deletesectionbyInventory = null
    } ,
  },
  extraReducers: builder => {
    builder.addCase(CreatesInventoryAction.pending, (state, action) => {
      state.CreateInventoryloading = true;
      state.CreateInventory = false;

    });
    builder.addCase(CreatesInventoryAction.fulfilled, (state, action) => {
      state.CreateInventory = action?.payload;
      state.CreateInventoryloading = false;
      state.error = undefined;
    });
    builder.addCase(CreatesInventoryAction.rejected, (state, action) => {
      state.CreateInventoryloading = false;
      state.error = action.payload;
      state.CreateInventory = undefined;
    });

    

    builder.addCase(CreatesInventoryCartegoryAction.pending, (state, action) => {
      state.CreateInventorycartloading = true;
      state.CreateInventorycart = false;

    });
    builder.addCase(CreatesInventoryCartegoryAction.fulfilled, (state, action) => {
      state.CreateInventorycart = action?.payload;
      state.CreateInventorycartloading = false;
      state.error = undefined;
    });
    builder.addCase(CreatesInventoryCartegoryAction.rejected, (state, action) => {
      state.CreateInventorycartloading = false;
      state.error = action.payload;
      state.CreateInventorycart = undefined;
    });

    builder.addCase(CreatesInventoryStockAction.pending, (state, action) => {
      state.CreateInventorystockloading = true;
      state.CreateInventorystock = false;

    });
    builder.addCase(CreatesInventoryStockAction.fulfilled, (state, action) => {
      state.CreateInventorystock = action?.payload;
      state.CreateInventorystockloading = false;
      state.error = undefined;
    });
    builder.addCase(CreatesInventoryStockAction.rejected, (state, action) => {
      state.CreateInventorystockloading = false;
      state.error = action.payload;
      state.CreateInventorystock = undefined;
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




    builder.addCase(updateInventoryItemAction.pending, (state, action) => {
      state.updateInventoryItemloading = true;
      state.updateInventoryItem = false;
      
    });
    builder.addCase(updateInventoryItemAction.fulfilled, (state, action) => {
      state.updateInventoryItem = action?.payload;
      state.updateInventoryItemloading = false;
      state.error = undefined;
    });
    builder.addCase(updateInventoryItemAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updateInventoryItem = undefined;
      state.updateInventoryItemloading = undefined;

    });

    

    builder.addCase(fetchInventoryStockAction.pending, (state, action) => {
      state.fetchInventoryStockloading = true;
      state.fetchInventoryStock = false;
      
    });
    builder.addCase(fetchInventoryStockAction.fulfilled, (state, action) => {
      state.fetchInventoryStock = action?.payload;
      state.fetchInventoryStockloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchInventoryStockAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchInventoryStock = undefined;
      state.fetchInventoryStockloading = undefined;

    });

    builder.addCase(fetchAllInventoryAction.pending, (state, action) => {
      state.fetchAllInventoryloading = true;
      state.fetchAllInventory = false;
      
    });
    builder.addCase(fetchAllInventoryAction.fulfilled, (state, action) => {
      state.fetchAllInventory = action?.payload;
      state.fetchAllInventoryloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchAllInventoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchAllInventory = undefined;
      state.fetchAllInventoryloading = undefined;

    });


    builder.addCase(fetchInventCartegoryAction.pending, (state, action) => {
      state.cartegoryloading = true;
      state.cartegory = false;
      
    });
    builder.addCase(fetchInventCartegoryAction.fulfilled, (state, action) => {
      state.cartegory = action?.payload;
      state.cartegoryloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchInventCartegoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.cartegoryloading = undefined;
      state.cartegory = undefined;

    });




    builder.addCase(deleteSectionByInventory.pending, (state, action) => {
      state.deletesectionbyInventoryloading = true;
      state.deletesectionbyInventory = false;
      
    });
    builder.addCase(deleteSectionByInventory.fulfilled, (state, action) => {
      state.deletesectionbyInventory = action?.payload;
      state.deletesectionbyInventoryloading = false;
      state.error = undefined;
      state.deleteInventorysection= false
    });
    builder.addCase(deleteSectionByInventory.rejected, (state, action) => {
      state.error = action.payload;
      state.deletesectionbyInventory = undefined;
      state.deletesectionbyInventoryloading = undefined;
      state.deleteInventorysection= true


    });
    builder.addCase(fetchSingleInventoryAction.pending, (state, action) => {
      state.singleInventoryloading = true;
      state.singleInventory = false;
      
    });
    builder.addCase(fetchSingleInventoryAction.fulfilled, (state, action) => {
      state.singleInventory = action?.payload;
      state.singleInventoryloading = false;
      state.error = undefined;
    });
    builder.addCase(fetchSingleInventoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.singleInventory = undefined;
      state.singleInventoryloading = undefined;

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




    builder.addCase(updateInventoryAction.pending, (state, action) => {
      state.updatesingleInventoryloading = false;
      state.updateInventory = false
      
    });
    builder.addCase(updateInventoryAction.fulfilled, (state, action) => {
      state.updatesingleInventory = action?.payload;
      state.updatesingleInventoryloading = false;
      state.error = undefined;
      state.updateInventory = true

    });
    builder.addCase(updateInventoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updatesingleInventory = undefined;
      state.updatesingleInventoryloading = undefined;

    });




    builder.addCase(createSectionAction.pending, (state, action) => {
      state.loading = true;
      state.createInventorySection = undefined;
    });
    builder.addCase(createSectionAction.fulfilled, (state, action) => {
      state.createInventorySection = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(createSectionAction.rejected, (state, action) => {
      state.createSectionloading = false;
      state.error = action.payload;
      state.createInventorySection = undefined;
    });
    

    builder.addCase(deleteAllInventoryAction.pending, (state, action) => {
      state.deleteAllInventoryesloading = true;
    });
    builder.addCase(deleteAllInventoryAction.fulfilled, (state, action) => {
      state.deleteAllInventoryes = action?.payload;
      state.deleteInventoryloading = false;
      state.error = undefined;
    });
    builder.addCase(deleteAllInventoryAction.rejected, (state, action) => {
      state.deleteAllInventoryesloading = false;
      state.error = action.payload;
      state.deleteAllInventoryes = undefined;
    });


    builder.addCase(deleteSingleInventoryAction.pending, (state, action) => {
      state.deleteInventoryloading = true;
    });
    builder.addCase(deleteSingleInventoryAction.fulfilled, (state, action) => {
      state.deleteInventoryes = action?.payload;
      state.deleteInventoryloading = false;
      state.error = undefined;
    });
    builder.addCase(deleteSingleInventoryAction.rejected, (state, action) => {
      state.deleteInventoryloading = false;
      state.error = action.payload;
      state.deleteInventoryes = undefined;
    });




  },
});


export const {resetcreatestock, resetUpdateInventoryItem,resetcreateInventory,resetUpdateInventory,resetdeleteinventory ,resetcreatecart } = InventorySlices.actions

export default InventorySlices.reducer;



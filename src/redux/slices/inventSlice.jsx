import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import ErrorToast from '../../components/Toasts/Error';
import SuccessToast from '../../components/Toasts/Success';
import WarnToast from '../../components/Toasts/Warning';
import ErrorAltToast from '../../components/Toasts/ErrorAlt';
import toast from 'react-hot-toast';

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export const CreatesInventoryAction = createAsyncThunk(
  'new/NewInventory',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/inventory/`,
        payload,
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
      ErrorToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const CreatesInventoryStockAction = createAsyncThunk(
  'new/NewInventorystock',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/inventory/addstock`,
        payload,
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
      ErrorToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const CreatesInventoryCartegoryAction = createAsyncThunk(
  'new/NewInventorycart',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/inventory/cart`,
        payload,
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
      ErrorToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAllInventoryAction = createAsyncThunk(
  'fetch/AllInventory',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/inventory/`,
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
export const fetchInventoryStockAction = createAsyncThunk(
  'fetch/Inventorystock',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/inventory/getstock`,
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

export const fetchSingleInventoryAction = createAsyncThunk(
  'fetch/singleInventory',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/inventory/single/`,
        payload,
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
      ErrorToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
export const fetchInventCartegoryAction = createAsyncThunk(
  'fetch/Inventorycart',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/inventory/cart`,
        payload,
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

export const updateInventoryAction = createAsyncThunk(
  'update/inventory',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/inventory/`,
        payload,
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
      ErrorToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateInventoryItemAction = createAsyncThunk(
  'update/inventoryitem',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/inventory/item`,
        payload,
      );
      if (data?.success == 1) {
        toast.success('Item Updated Successfully');
      }
      if (data?.success == 0) {
        toast.error('Error Updating Cartegory ');
      }
      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
      ErrorToast('⚠️ Error', error);
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
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/inventory/editcartegory`,
        payload,
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
      ErrorToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteAllInventoryAction = createAsyncThunk(
  'Inventory/deleteAllInventory',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/inventory/`,
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
      ErrorToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteSingleInventoryAction = createAsyncThunk(
  'Inventory/deleteASingleInventory',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/Inventory/${payload}`,
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
      ErrorToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteSingleCartAction = createAsyncThunk(
  'delete/deleteASingleCart',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/Inventory/cartegory/${payload}`,
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
      ErrorToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteSingleInventoryStockAction = createAsyncThunk(
  'Inventory/deleteASingleInventorystock',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const toastId = toast.loading('Loading...', {
        position: 'bottom-right',
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/inventory/stock/delete`,
        payload,
      );

      if (data) {
        toast.dismiss(toastId);
      }
      return data;
    } catch (error) {
      console.log(error);
      ErrorToast('⚠️ Error', error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const InventorySlices = createSlice({
  name: 'Inventory',
  initialState: {},
  reducers: {
    resetcreateInventory(state) {
      state.CreateInventory = null;
    },
    resetcreatecart(state) {
      state.CreateInventorycart = null;
    },
    resetcreatestock(state) {
      state.CreateInventorystock = null;
    },
    resetUpdateInventoryItem(state) {
      state.updateInventoryItem = null;
    },
    resetUpdateInventory(state) {
      state.updateCartegory = null;
    },
    resetdeleteInventory(state) {
      state.deleteSingleInventory = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreatesInventoryAction.pending, (state, action) => {
      state.CreateInventoryloading = true;
      state.CreateInventory = false;
      state.fetchAllInventory = false;
    });
    builder.addCase(CreatesInventoryAction.fulfilled, (state, action) => {
      state.CreateInventory = action?.payload;
      state.CreateInventoryloading = false;
      state.error = undefined;
      state.fetchAllInventory = action?.payload;
    });
    builder.addCase(CreatesInventoryAction.rejected, (state, action) => {
      state.CreateInventoryloading = false;
      state.error = action.payload;
      state.CreateInventory = undefined;
      state.fetchAllInventory = undefined;
    });

    builder.addCase(
      CreatesInventoryCartegoryAction.pending,
      (state, action) => {
        state.CreateInventorycartloading = true;
        state.CreateInventorycart = false;
      },
    );
    builder.addCase(
      CreatesInventoryCartegoryAction.fulfilled,
      (state, action) => {
        state.CreateInventorycart = action?.payload;
        state.CreateInventorycartloading = false;
        state.error = undefined;
      },
    );
    builder.addCase(
      CreatesInventoryCartegoryAction.rejected,
      (state, action) => {
        state.CreateInventorycartloading = false;
        state.error = action.payload;
        state.CreateInventorycart = undefined;
      },
    );

    builder.addCase(CreatesInventoryStockAction.pending, (state, action) => {
      state.CreateInventorystockloading = true;
      state.CreateInventorystock = false;
      state.fetchInventoryStock = false;
    });
    builder.addCase(CreatesInventoryStockAction.fulfilled, (state, action) => {
      state.CreateInventorystock = action?.payload;
      state.CreateInventorystockloading = false;
      state.error = undefined;
      state.fetchInventoryStock = action?.payload;
    });
    builder.addCase(CreatesInventoryStockAction.rejected, (state, action) => {
      state.CreateInventorystockloading = false;
      state.error = action.payload;
      state.CreateInventorystock = undefined;
      state.fetchInventoryStock = undefined;
    });

    builder.addCase(updateCartegoryAction.pending, (state, action) => {
      state.updateCartegoryloading = true;
      state.updateCartegory = false;
      state.CreateInventorycart = false;
    });
    builder.addCase(updateCartegoryAction.fulfilled, (state, action) => {
      state.updateCartegory = action?.payload;
      state.CreateInventorycart = action?.payload;
      state.updateCartegoryloading = false;
      state.error = undefined;
    });
    builder.addCase(updateCartegoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updateCartegory = undefined;
      state.updateCartegorynloading = undefined;
      state.CreateInventorycart = undefined;
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

    builder.addCase(deleteSingleInventoryAction.pending, (state, action) => {
      state.deleteSingleInventoryloading = true;
      state.deleteSingleInventory = false;
      state.fetchAllInventory = false;
    });

    builder.addCase(deleteSingleInventoryAction.fulfilled, (state, action) => {
      state.deleteSingleInventory = action?.payload;
      state.deleteSingleInventoryloading = false;
      state.error = undefined;
      state.fetchAllInventory = action?.payload;
    });
    builder.addCase(deleteSingleInventoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.deleteSingleInventory = undefined;
      state.deleteSingleInventoryloading = undefined;
      state.fetchAllInventory = undefined;
    });

    builder.addCase(deleteSingleCartAction.pending, (state, action) => {
      state.deleteSingleCartloading = true;
      state.deleteSingleInventory = false;
      state.cartegory = false;
    });

    builder.addCase(deleteSingleCartAction.fulfilled, (state, action) => {
      state.deleteSingleInventory = action?.payload;
      state.deleteSingleCartloading = false;
      state.error = undefined;
      state.cartegory = action?.payload;
    });
    builder.addCase(deleteSingleCartAction.rejected, (state, action) => {
      state.error = action.payload;
      state.deleteSingleInventory = undefined;
      state.deleteSingleCartloading = undefined;
      state.cartegory = undefined;
    });

    builder.addCase(
      deleteSingleInventoryStockAction.pending,
      (state, action) => {
        state.deleteSingleInventorystockloading = true;
        state.deleteSingleInventorystock = false;
        state.fetchInventoryStock = false;
      },
    );

    builder.addCase(
      deleteSingleInventoryStockAction.fulfilled,
      (state, action) => {
        state.deleteSingleInventorystock = action?.payload;
        state.deleteSingleInventorystockloading = false;
        state.error = undefined;
        state.fetchInventoryStock = action?.payload;
      },
    );
    builder.addCase(
      deleteSingleInventoryStockAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.deleteSingleInventorystock = undefined;
        state.deleteSingleInventorystockloading = undefined;
        state.fetchInventoryStock = undefined;
      },
    );

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

    builder.addCase(updateInventoryAction.pending, (state, action) => {
      state.updatesingleInventoryloading = false;
      state.updateInventory = false;
    });
    builder.addCase(updateInventoryAction.fulfilled, (state, action) => {
      state.updatesingleInventory = action?.payload;
      state.updatesingleInventoryloading = false;
      state.error = undefined;
      state.updateInventory = true;
    });
    builder.addCase(updateInventoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.updatesingleInventory = undefined;
      state.updatesingleInventoryloading = undefined;
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
  },
});

export const {
  resetcreatestock,
  resetUpdateInventoryItem,
  resetcreateInventory,
  resetUpdateInventory,
  resetdeleteinventory,
  resetcreatecart,
} = InventorySlices.actions;

export default InventorySlices.reducer;

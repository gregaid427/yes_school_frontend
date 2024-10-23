import DefaultLayout from '../layout/DefaultLayout';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import {
  deleteSectionByClass,
  fetchAllClassAction,
  fetchSectionbyclassAction,
  resetUdateClass,
  resetdeleteclass,
  updateClassAction,
} from '../redux/slices/classSlice';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../common/Loader';
import {
  fetchAllInventoryAction,
  updateCartegoryAction,
  resetUpdateInventory,
  resetUpdateInventoryItem,
  updateInventoryItemAction,
} from '../redux/slices/inventSlice';
import InvencartegorySelect from '../components/InvencartegorySelect';

const EditInventoryitem = () => {
  const [PageAction, setPageAction] = useState();

  const location = useLocation();
  const { action, info } = location?.state;

  const dispatch = useDispatch();

  const sub = useSelector((state) => state?.inventory);

  const { updateCartegory } = sub;

  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [item, setItem] = useState(info.itemName);
  const [quantity, setQuantity] = useState(info.quantity);
  const [supName, setSupName] = useState(info.supplier);
  const [supContact1, setSupContact1] = useState(info.supplierContact1);
  const [supContact2, setSupContact2] = useState(info.supplierContact2);
  const [supInfo, setSupInfo] = useState(info.SupplierInfo);
  const [desc, setDesc] = useState(info.description);

  const [cart, setcart] = useState(info.cartegory);

  const inventory = useSelector((state) => state?.inventory);
  const {
    updateInventoryItem,
    CreateInventory,
    fetchAllInventory,
    updateInventory,
  } = inventory;

  useEffect(() => {
    console.log(info);
    setTimeout(() => setLoader(false), 1000);

    if (info == null) {
      toast.error('Error - Loading Cartegry Data');
      navigate('/inventory/additem');
    }
    //   // setTimeout(() => toast.success('New Student Added Successfully'), 900);
    //  if(singleStudent?.data == undefined )
    //  navigate("/student/info")
  }, []);

  useEffect(() => {
    if (updateInventoryItem?.success == 1) {
      toast.success('Inventory Item Updated Successfully');
      dispatch(fetchAllInventoryAction());

      dispatch(resetUpdateInventoryItem());
      /// navigate('/inventory/additem');
    }
    if (updateInventoryItem?.success == 0) {
      toast.error('Error Updating Inventory Data');
      dispatch(resetUpdateInventoryItem());
    }
    //  navigate("/student/info")
  }, [updateInventoryItem]);

  const subdata = {
    id: info.id,
    itemName: item,
    cartegory: cart,
    quantity: quantity,
    supplier: supName,
    CreatedBy: 'Asante',
    supplierContact1: supContact1,
    supplierContact2: supContact2,
    SupplierInfo: supInfo,
    description: desc,
  };
  const handleSubmit = (e) => {
    if (item == '') {
      toast.error('Error - Item Cannot Be Empty');
    } else {
      dispatch(updateInventoryItemAction(subdata));
    }
  };

  const handlesectionDelete = (position, value) => {
    dispatch(deleteSectionByClass(value));
  };

  function handleBackButton() {
    navigate('/inventory/additem');
  }

  return loader ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div className="mx-auto w-full">
        <div className="flex flex-row w-full  gap-0" style={{}}>
          <div className="w-2/4  ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Edit Inventory Item Information
                </h3>
              </div>
              <div className="p-7">
                <form>
                  <div className="w-full mb-2 sm:w-2/2">
                    <label
                      className="mb-1 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Item
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={info.itemName}
                      onChange={(e) => setItem(e.target.value)}
                    />
                  </div>

                  <div className="w-full mb-2 sm:w-2/2">
                    <div className="flex justify-between align-middle">
                      <label
                        className="mb-1 block align-middle  text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Item Cartegory{' '}
                        {/* <span className="small-font">(optional)</span> */}
                      </label>
                      {/* <button
                          className="flex align-middle justify-center rounded-full  bg-[#3c4fe08f] py-0 mb-1 px-2 my-auto text-sm text-white hover:bg-opacity-90"
                          type=""
                          onClick={(e) => {
                            e.preventDefault();
                            show('top-right');
                          }}
                        >
                          Add New Cartegory
                        </button> */}
                    </div>

                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <InvencartegorySelect
                        setsectionprop={setcart}
                        default={info.cartegory}
                      />
                    </div>
                  </div>
                  <div className="w-full mb-2 sm:w-2/2">
                    <label
                      className="mb-1 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Quantity{' '}
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={info.quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="w-full mb-2 sm:w-2/2">
                    <label
                      className="mb-1 block text-sm font-medium text-black dark:text-white"
                      htmlFor=""
                    >
                      Supplier Name{' '}
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      defaultValue={info.supplier}
                      onChange={(e) => setSupName(e.target.value)}
                    />
                  </div>
                  <div className="w-full flex gap-1">
                    <div className="w-full mb-2 sm:w-1/2">
                      <label
                        className="mb-1 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Supplier Contact 1{' '}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={info.supplierContact1}
                        onChange={(e) => setSupContact1(e.target.value)}
                      />
                    </div>
                    <div className="w-full mb-2 sm:w-1/2">
                      <label
                        className="mb-1 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Supplier Contact 2{' '}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={info.supplierContact2}
                        onChange={(e) => setSupContact2(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label
                      className="mb-1 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Supplier Info
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        rows={2}
                        defaultValue={info.SupplierInfo}
                        onChange={(e) => setSupInfo(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-2">
                    <label
                      className="mb-1 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Description/Notes
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        rows={2}
                        defaultValue={info.description}
                        onChange={(e) => setDesc(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className={action == 1 ? 'block' : 'hidden'}>
                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex w-6/12 justify-center rounded bg-primary py-2 px-2 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit(e);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type=""
                        onClick={(e) => {
                          e.preventDefault();
                          handleBackButton(e);
                        }}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Fees Management info */}
      </div>
    </DefaultLayout>
  );
};

export default EditInventoryitem;

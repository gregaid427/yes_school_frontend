import React, { useEffect, useRef, useState } from 'react'
import { CreatesInventoryCartegoryAction,fetchInventCartegoryAction,resetcreatecart } from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';



const InventNewCartegory1 = (props) => {
    const dispatch = useDispatch();
    const inventory = useSelector((state) => state?.inventory);

    const {CreateInventorycart } =
    inventory;
    useEffect(() => {
        if (CreateInventorycart?.success == 0) {
          toast.error("Error - Adding Item Cartegory ");
       //    dispatch(resetcreatecart())
          // dispatch(fetchAllClassAction())
    
    
          }
        if (CreateInventorycart?.success == 1) {
          toast.success('New Item Cartegory Added Successfully');
          dispatch(fetchInventCartegoryAction());
          resetFormStates()
           dispatch(resetcreatecart())    
           props.close((false))

    
          }
        
    
        // if (fetchAllClass?.success == 1) {
        //   let i = 0;
        //   let arr = [];
        //   while (i < clad?.fetchAllClass?.data.length) {
        //     arr.push(clad?.fetchAllClass?.data[i].title);
        //     i++;
        //   }
    
        //   setClasss(arr);
        // }
      }, [CreateInventorycart]);


    const [cartegoryName, setcartegoryName] = useState();
    const [note, setNote] = useState();
   
   
    const formRef1 = useRef();

    
    function resetFormStates() {
        // formRef.current.reset();
        formRef1.current.reset();
      }

let data = {
    
    'cartegoryname' : cartegoryName,
    'createdby' : 'asante',
    'notes' : note
}
const handleSubmit=(e)=>{
    if (cartegoryName == '') {
        toast.error('Error - Name Cannot Be Empty');
      } else {
        dispatch(CreatesInventoryCartegoryAction(data));
      }
}

  return (
    <div className="w-full">
 
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Add Item Cartegory
                  </h3>
                </div>
                <div className="py-7 px-4">
                <form ref={formRef1}>                   
                 <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Cartegory Name
                        
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue=""
                        onChange={(e) => setcartegoryName(e.target.value.toUpperCase())}

                      />
                    </div>

                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Description/Notes <span className="small-font">(optional)</span>
                 

                      </label>
                      <div className="relative">
                        <textarea
                          className="w-full rounded border border-stroke bg-gray py-1  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="bio"
                          id="bio"
                          rows={2}
                          placeholder=""
                          defaultValue=""
                          onChange={(e) => setNote(e.target.value)}

                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type=""
                        onClick={(e)=>{
                            e.preventDefault()
                            handleSubmit()
                         }
                         }
                      
                      >
                        Save
                      </button>
                      <button
                        className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type=""
                        onClick={(e)=>{e.preventDefault()
                           props.close((false))
                        }
                        }
                      >
                        close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
       
  )
}

export default InventNewCartegory1

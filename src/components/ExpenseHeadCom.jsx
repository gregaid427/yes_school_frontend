import React, { useEffect, useRef, useState } from 'react'
import { CreatesInventoryCartegoryAction,fetchInventCartegoryAction,resetcreatecart } from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { CreatesExpenseHeadAction, FetchExpenseHeadAction,resetcreateExpenseHead } from '../redux/slices/expenseSlice';



const ExpenseHeadCom = (props) => {
    const dispatch = useDispatch();
    const expense = useSelector((state) => state?.expense);

    const {CreateExpenseHead } =
    expense;
    useEffect(() => {
        if (CreateExpenseHead?.success == 0) {
       //    dispatch(resetcreatecart())
          // dispatch(fetchAllClassAction())
    
    
          }
        if (CreateExpenseHead?.success == 1) {
          dispatch(FetchExpenseHeadAction());
          setNote('')
          setcartegoryName('')
          resetFormStates()
           dispatch(resetcreateExpenseHead())    
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
      }, [CreateExpenseHead]);


    const [cartegoryName, setcartegoryName] = useState('');
    const [note, setNote] = useState('');
   
   
    const formRef1 = useRef();

    
    function resetFormStates() {
        // formRef.current.reset();
        formRef1.current.reset();
      }
      const user = useSelector((state) => state?.user);
      const { username, userMail} = user;
      
let data = {
    
    'expensehead' : cartegoryName,
    'createdby' : username?.payload,
    'notes' : note
}
const handleSubmit=(e)=>{
    if (cartegoryName == '') {
        toast.error('Error - Name Cannot Be Empty');
      } else {
        dispatch(CreatesExpenseHeadAction(data));
      }
}

  return (
    <div className="w-full">
      
              <div className="rounded-sm border border-stroke bg-white shadow-default  dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Add Expense Head
                  </h3>
                </div>
                <div className="p-7">
                <form ref={formRef1}>                   
                 <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                         Name
                        
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue=""
                        onChange={(e) => setcartegoryName(e.target.value.trim().toUpperCase())}

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
                          className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="bio"
                          id="bio"
                          rows={2}
                          placeholder=""
                          defaultValue=""
                          onChange={(e) => setNote(e.target.value.trim())}

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

export default ExpenseHeadCom

import React, { useEffect, useRef, useState } from 'react'
import { CreatesInventoryCartegoryAction,fetchInventCartegoryAction,resetcreatecart } from '../redux/slices/inventSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ExpenseHeadSelect from './ExpenseHeadSelect';
import { CreatesExpenseAction, UpdateExpenseAction } from '../redux/slices/expenseSlice';



const ExpenseFormModalEdit = (props) => {
    const dispatch = useDispatch();

    const [selectedInfo, setSelectedInfo] = useState();

    const [amount, setAmount] = useState(props?.info?.amount);

    const [loader, setLoader] = useState(true);
  
    const [expensename, setName] = useState(props?.info?.name);
    const [date, setDate] = useState(props?.info?.date);
    const [desc, setDesc] = useState(props?.info?.description);
    const [invoice, setInvoice] = useState(props?.info?.invoice);
    const [expensehead, SetExpenseHead] = useState(props?.info?.expensehead);
    const [file, setFile] = useState(null);
  
    const [filename, setFileName] = useState(props?.info?.filename);
    function hashgenerator() {
      return Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000;
    }
    let customfile = hashgenerator()+filename ;
    const user = useSelector((state) => state?.user);
    const { username, userMail} = user;
    
    const classdata = JSON.stringify({
      expensename: expensename,
      createdby: username?.payload,
      amount: amount,
      invoice: invoice,
      description: desc,
      expensehead: expensehead,
      date: date,
      filename: filename, 
      id: props.info.id
    });
  console.log(props)
    const handleSubmit = () => {
      const data = new FormData();
      data.append(customfile, file);
      data.append('data', classdata);
  
  
  
      if (expensename == '') {
  
       return toast.error('Error - Name Cannot Be Empty');
       
      }
      if (date == '') {
       return toast.error('Error - Date Cannot Be Empty');
      } 
      if (amount == '') {
      return  toast.error('Error - Amount Cannot Be Empty');
      }  else {
        console.log(classdata)
        dispatch(UpdateExpenseAction(data));
      }
    };
    
  return (
    <div className="w-full">
             <div className="w-full ">
          <div className="grid  gap-8">
            <div className="col-span-12">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
            <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Add Expense
                  </h3>
                </div>
                <div className="p-8">
                  <form>
                    <div className='flex gap-2'>
                    <div className="w-full mb-4 sm:w-2/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Expense Head
                      </label>
                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <ExpenseHeadSelect setsectionprop={SetExpenseHead} selectinfo={setSelectedInfo}/>
                      </div>
                    </div>
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
                        defaultValue={props?.info.name}
                        onChange={(e) => setName(e.target.value.trim())}
                      />
                    </div>
                    </div>
                    <div className='flex gap-2'>

                    <div className="w-full mb-3 sm:w-2/2">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor=""
                      >
                        Invoice Number{' '}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={props?.info.invoice}
                        onChange={(e) => setInvoice(e.target.value.trim())}
                      />
                    </div>
                    <div className="w-full mb-3 sm:w-2/2">
                   
                       <label
                          className="mb-2 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Attach Document{' '}
                        </label>
                        <input
                          onChange={(event) => {
                            setFile(event.target.files[0]);
                            setFileName(event.target.files[0].name);
                          }}
                          type="file"
                          // accept="image/*"
                          className="w-full rounded-md border border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                        />
                     
                     </div>
                     </div>
                     <div className="w-full flex gap-1">
                      <div className="w-full mb-3 sm:w-1/2">
                        <label
                          className="mb-2 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Amount*{' '}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name=""
                          id=""
                          placeholder=""
                          defaultValue={props?.info.amount}
                          onChange={(e) => setAmount(e.target.value.trim())}
                        />
                      </div>
                      <div className="w-full mb-3 sm:w-1/2">
                        <label
                          className="mb-2 block text-sm font-medium text-black dark:text-white"
                          htmlFor=""
                        >
                          Date*{' '}
                        </label>
                        <input
                        className="w-full rounded border border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="date"
                        name=""
                        id=""
                        placeholder=""
                        defaultValue={props?.info.date}
                        onChange={(e) => setDate(e.target.value.trim())}
                      />
                      </div>
                    </div>

                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Description/Notes
                      </label>
                      <div className="relative">
                        <textarea
                          className="w-full rounded border border-stroke bg-gray py-2  px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="bio"
                          id="bio"
                          rows={2}
                          placeholder={props?.info.description}
                          onChange={(e) => setDesc(e.target.value.trim())}
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
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
                        type="reset"
                        onClick={()=> props.close((false))
                        }
                      >
                        
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> 
        </div>
  )
}

export default ExpenseFormModalEdit

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateExamRemarksAction, GetExamRemarksAction, resetExamCart, UpdateExamCartegoryAction, UpdateExamRemarksAction } from '../redux/slices/examSlice';

const EditremarksModal = (props) => {
  const dispatch = useDispatch();

  const [name, setname] = useState(null);
  const exam = useSelector((state) => state?.exam);
  const { UpdateExamCartegory } = exam;
    const user = useSelector((state) => state?.user);
  const { username, userMail } = user;
  function handleSubmit() {
    const data = {
      id: props?.val?.id,
      text: name,
         createdby: username?.payload,


    };
 if (name == '') {
      toast.error('Error - Text Cannot Be Empty');
    } else {
    dispatch(UpdateExamRemarksAction(data));

    }
  }
 
  useEffect(() => {
    setname(props?.val?.text)
  }, [props]);
console.log(name)
console.log(props)

  return (
    <div className=" w-full  gap-8">
      <div className="col-span-12">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Edit Remarks
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="w-full mb-10 ">
                    <label
                      className="mb-1 block text-sm font-small text-black dark:text-white"
                      htmlFor=""
                    >
                      Remarks Text
                    </label>
                    <textarea
                      className="w-full  rounded border  border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name=""
                      rows={3}
                      id=""
                      placeholder=""
                      defaultValue={props?.val?.text}
                      onChange={(e) => setname(e.target.value.trim())}
                    />
                  </div>
                  {/* <div className="w-full mb-4 sm:w-2/2">
        <div className=" flex gap-2 ">
          <div className="w-full mb-1 sm:w-full">
            <label
              className="mb-1 block text-sm font-medium text-black dark:text-white"
              htmlFor="fullName"
            >
              Session
            </label>

            <div className="relative z-20 bg-white dark:bg-form-input">
              <SessionSelect setsectionprop={setSessionoption} />
            </div>
          </div>
    
          
        </div>
      </div> */}

                  <div className="flex justify-end  gap-4.5">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
                       onClick={(e) => {
                        e.preventDefault();
                        props.close(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
      </div>
    </div>
  );
};

export default EditremarksModal;

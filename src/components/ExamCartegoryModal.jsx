import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetExamCart, UpdateExamCartegoryAction } from '../redux/slices/examSlice';

const ExamCartegoryModal = (props) => {
  const dispatch = useDispatch();

  const [name, setname] = useState(null);
  const exam = useSelector((state) => state?.exam);
  const { UpdateExamCartegory } = exam;
  function handleSubmit() {
    const data = {
      id: props?.val?.id,
      title: name,
    };

    dispatch(UpdateExamCartegoryAction(data));
  }
 
  useEffect(() => {
    setname(props?.item?.grouptitle)
  }, [props]);
console.log(name)
console.log(props)

  return (
    <div className=" w-full  gap-8">
      <div className="col-span-12">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-3 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add New Cartegory
            </h3>
          </div>
          <div className="p-7">
            <form action="#">
              <div className="w-full mb-10 ">
                <label
                  className="mb-1 block text-sm font-small text-black dark:text-white"
                  htmlFor=""
                >
                  Cartegory Title
                </label>
                <input
                  className="w-full uppercase rounded border  border-stroke bg-gray py-2 px-2.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name=""
                  id=""
                  // placeholder="END OF TERM EXamination"
                  defaultValue={props?.val.grouptitle}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

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
                  onClick={(e) => {
                    e.preventDefault();

                    props.close(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCartegoryModal;

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AssignFeesAction,
  CloseSessionAcountAction,
  GenerateFeeAction,
} from '../redux/slices/feeSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SessionSelect from './SessionSelect';
import SessionSelect1 from './SessionSelect1';
import SectionSelect1 from './SectionsSelect1';
import ClassSelect from './ClassSelect';
import { MoveStudentAction } from '../redux/slices/studentSlice';
import SectionSelect3 from './SectionsSelect3';
import SectionSelect2 from './SectionsSelect2';
import ClassSelect4 from './ClassSelect4';


const ChangeSectionModal = (props) => {
  const dispatch = useDispatch();
  const [selectedInfo, setSelectedInfo] = useState();
  const [selectedInfo1, setSelectedInfo1] = useState();
  const session = useSelector((state) => state?.session);

  const { fetchsession, fetchsessionactive } = session;
  const [display, setDisplay] = useState(false);
  const [sessionoption, setSessionoption] = useState('None');
  const [sessionoption1, setSessionoption1] = useState('');

  const [clazz, setclazz] = useState([]);
  const [isChecked1, setIsChecked1] = useState();
  const [selectedArr, setselectedArr] = useState([]);

  const [desc, setDesc] = useState('');
  const clad = useSelector((state) => state?.classes);
  const [sectionzz, setsectionzz] = useState('NONE');

  const { fetchAllClassloading, fetchAllClass } = clad;
  const fee = useSelector((state) => state?.fees);
  const { cartegory } = fee;
  let navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const { username, userMail } = user;
  const [classinfo1, setclassinfo1] = useState([]);
  const [classinfo2, setclassinfo2] = useState();
  const data = {
    id: props.data?.student_id,
    clazz: clazz,
    section: sectionzz,
    clazzid: classinfo1[0] == undefined ? 0 : classinfo1[0].classId,
    prevclass: props?.data?.class
  };
  console.log(clazz);
  console.log(sectionzz);
  console.log(classinfo1);
  console.log(selectedInfo);

  const handleSubmit = () => {
    if (clazz.length == 0) {
      // setDisplay(newsession);
      return toast.error('Select Class');
    }
    if (sectionzz == "All Sections") {
      return toast.error('Select Section');
    } else {
      dispatch(MoveStudentAction(data));
    }
  };

  

  useEffect(() => {}, [sessionoption1]);

  useEffect(() => {}, []);

  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="grid  gap-8">
          <div className="col-span-12">
            <div className="rounded-sm border py-3 px-7 border-stroke bg-white shadow-default dark:border-strokedark dark:dark:bg-form-input">
              <div className="border-b border-stroke  dark:border-strokedark">
                <h3 className="font-medium mb-5  text-black dark:text-white">
                  Change Class And Section
                </h3>
              </div>
              <h3 className="font-small mb-1 text-sm text-black dark:text-white">
                Name :
                <span className="font-medium">
                  {' '}
                  {props?.data?.firstName +
                    ' ' +
                    props?.data?.otherName +
                    ' ' +
                    props?.data?.lastName}
                </span>
              </h3>
              <h3 className="font-small mb-1 text-sm text-black dark:text-white">
                Current Class :{' '}
                <span className="font-medium">{props?.data?.class} </span>
              </h3>
              <h3 className="font-small mb-1 text-sm text-black dark:text-white">
                Current Section :
                <span className="font-medium"> {props?.data?.section} </span>
              </h3>
              {/* <h4 className="text-sm  text-black  dark:text-white">
                  {' '}
                  Select Previous / Outgoing Session{' '}
                </h4>

                <div className="relative  z-20 bg-white dark:bg-form-input">
                  <SessionSelect setsectionprop={setSessionoption} />
                </div> */}

              <div className="flex justify-between">
                <label
                  className="mb-1 w-2/2 block py-3 text-sm font-medium text-black dark:text-white"
                  htmlFor=" "
                >
                  Select New Class{' '}
                </label>
              </div>

              <div className="relative z-20 bg-white dark:bg-form-input">
                <ClassSelect4
                  setsectionprop={setclazz}
                  clazz={clazz}
                  selectinfo={setclassinfo1}
                />{' '}
              </div>

              <div className="flex justify-between">
                <label
                  className="mb-1 w-2/2 block py-3 text-sm font-medium text-black dark:text-white"
                  htmlFor=" "
                >
                  Choose New Section{' '}
                </label>
              </div>

              <div className="relative z-20 bg-white dark:bg-form-input">
                <SectionSelect2 setsectionprop={setsectionzz} selectinfo={setSelectedInfo} />
              </div>
              <div className="py-8 flex gap-2">
                <button
                  className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type=""
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                   // props.close(false);
                  }}
                >
                  Proceed
                </button>
                <button
                  className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    props.close(false);
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
            {/* <div className={clazz[0] ? '' : 'hidden'}>
                <h3 className="font-medium  mb-2 text-black text-center dark:text-white">
                  You Will Be Required To Assign Fee To All Classes Inorder To
                  Generate Fee
                </h3>
                <h4 className="text-sm  text-black text-center dark:text-white">
                  {' '}
                  The Following Classes Are Not Assigned yet :{' '}
                </h4>
                <h4 className="text-sm  text-black text-center dark:text-white">
                  {' '}
                  {clazz.toString()}
                </h4>
                <div className="flex gap-4.5 my-4">
                    <button
                      className="flex w-6/12 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type=""
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/fees/Assignfees')
                      }}
                    >
                      Assign Fee
                    </button>
                    <button
                      className="flex w-6/12 justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      onClick={(e) => {  e.preventDefault();
                        props.close(false);}}
                    >
                      Cancel
                    </button>
                  </div>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeSectionModal;

import { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import React from 'react';

import Loader from '../common/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const AdmissionCapture = () => {

  const location = useLocation();
  const { value } = location?.state
  const navigate = useNavigate()


  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [files, setFile] = React.useState(null);


  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    async function base64ToFile(base64) {
      const res = await fetch(base64);
      const buf = await res.arrayBuffer();
      const file = new File([buf], 'student.png', {
        type: 'image/png',
      });
      return file;
    }
    let file = await base64ToFile(await imageSrc);

    // props.setPicture(file);
    // props.setPicturename(file.name);
    // props.preview(imgSrc)
setFile(file)
 //   console.log(file);
  }, [webcamRef, setImgSrc])
  return (
    <DefaultLayout>
      <div className={'flex gap-1  w-full'}>
        <div className="w-12/12 flex-col">
          <div
            className={
              'rounded-sm border max-w-full border-stroke bg-white px-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 '
            }
          >
            <div className="max-w-full overflow-x-auto">
              <div className="w-full text-center   flex justify-around  ">
                <h3 className="font-medium  text-black py-3 dark:text-white">
                  Camera Capture
                </h3>
              </div>
            </div>
            











            <div className='flex gap-7 py-6'>
        <div> <Webcam

        audio={false}
        ref={webcamRef}
        height={380}
        width={380}
        // screenshotFormat="image/png"
      /> <button
                    className="flex w-full mt-4 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) => capture()}
                  >
                    {!imgSrc ? 'Capture' : 'Recapture'}
                  </button></div>
     
            {imgSrc && <div className=''>   <img src={imgSrc} /> <button
                    className="flex w-full mt-4 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type=""
                    onClick={(e) =>{ 
                      
                      navigate('/student/studentcredential',{state:{pic:imgSrc,file:files,value:value}})}}
                  >
                    Done
                  </button></div>  }

    </div>
            {/* preview={setPreview} setPicture={setPicture} setPicturename={setPicturename} */}
          </div>
        </div>
      </div>{' '}
    </DefaultLayout>
  );
};

export default AdmissionCapture;

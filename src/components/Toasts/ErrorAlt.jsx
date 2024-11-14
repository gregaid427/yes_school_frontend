import React from 'react';
import toast from 'react-hot-toast';

const ErrorAltToast = (text, error) => {
  toast.dismiss();
  console.log(error?.response?.message);
  // toast.error(text, {
  //   position: 'top-center',
  //   style: {
  //     border: '1px solid #E03C3C',
  //     padding: '14px',
  //     color: '#000000',
  //     fontWeight: 'normal',
  //   },
  //   //   iconTheme: {
  //   //     primary: '#713200',
  //   //     secondary: '#FFFAEE',
  //   //   },
  // });

  if(error?.code == 'ERR_NETWORK') return toast('Check Internet Connectivity', {
    icon: '⚠️',
    position: 'bottom-right',
  });
  if(error?.code == 'ECONNABORTED') return toast('Request Timeout', {
    icon: '⚠️',
    position: 'bottom-right',
  });

};
export default ErrorAltToast;

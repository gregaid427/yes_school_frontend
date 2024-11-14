import React from 'react'
import toast from 'react-hot-toast'

const SuccessToast = (text,id) => {

toast.success(text, {   id: id,
    position: 'top-center',
   // duration: 4000,

  style: {
    border: '1px solid #61D345',
    padding: '14px',
    color: '#000000',
    fontWeight: 'normal',
  },
//   iconTheme: {
//     primary: '#713200',
//     secondary: '#FFFAEE',
//   },
})   

}
export default SuccessToast

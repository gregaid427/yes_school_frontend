import React from 'react'
import toast from 'react-hot-toast'

const WarnToast = (text,id) => {

toast.success(text, {   id: id,
    position: 'top-center',
 //   duration: 4000,

  style: {
    border: '1px solid #F77E13',
    padding: '14px',
    color: '#F77E13',
    fontWeight: 'normal',
  },
//   iconTheme: {
//     primary: '#713200',
//     secondary: '#FFFAEE',
//   },
})   

}
export default WarnToast

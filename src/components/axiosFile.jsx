import React from 'react'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';


let myArray = Cookies.get('VyQHVzZXIuY29tIiwia');
console.log(myArray)
myArray = myArray == undefined ? 0 :  myArray.split('{|-')
//let tokenArray = myArray.split('{|-');

const axiosFile ={ headers: {
  'Authorization': `Bearer ${myArray[0]}`,
  // 'Content-Type': 'application/json',
  'Accept': 'application/json',
}};
export default axiosFile

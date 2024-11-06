import React, { useEffect, useState } from 'react';

function PreferenceRadio(props) {
  const [selectedValue, setSelectedValue] = useState('option1');


useEffect(() => {
  console.log(props.stdId)
  console.log(props.myarr)
  props.setRepeated(props.myarr)

if(props.myarr.includes(props.stdId)) { 
  console.log('trueeeeee')
  setSelectedValue('option2'); }
  console.log(props.repeat)

}, [props.reset]); 
console.log(props.repeat)

const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  const styles = {
    radioButton: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap:'1px',
    },
  
  };

  return (
    <div className='flex row gap-5 '>
      <div  style={styles.radioButton}>
        <input
          type="radio"
          id="option1"
          value="option1"
          checked={selectedValue === 'option1'}
          onChange={() => { 
            props.setRepeated(props.repeat.filter((element)=>element !== props.stdId))

            handleRadioChange('option1')}}
        />
        <label htmlFor="option1" >
        Allow 

        </label>
      </div>

      <div style={styles.radioButton}>
        <input
          type="radio"
          id="option2"
          value="option2"
          checked={selectedValue === 'option2'}
          onChange={() =>{  
            props.setRepeated([props.stdId,...props.repeat])
            handleRadioChange('option2')}}
        />
        <label htmlFor="option2" >
          Exempt 

        </label>
      </div>

      {/* <div style={styles.radioButton}>
        <input
          type="radio"
          id="option3"
          value="option3"
          checked={selectedValue === 'option3'}
          onChange={() =>{ props.handleAction()
            handleRadioChange('option3')}}
        />
        <label htmlFor="option3" >
          Leave
        </label>
      </div> */}
    </div>
  );
}

export default PreferenceRadio;

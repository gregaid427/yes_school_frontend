import React, { useState } from 'react';

function PromotionRadio(props) {
  const [selectedValue, setSelectedValue] = useState('option1');

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  const styles = {
    radioButton: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap:'4px',
    },
  
  };

  return (
    <div className='flex row gap-5 py-2'>
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
          Promote
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
          Repeat
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

export default PromotionRadio;

import React, { useEffect, useState } from 'react';

function FeeRadio(props) {
  const [selectedValue, setSelectedValue] = useState('option1');

  useEffect(() => {
    setSelectedValue('option1');
  }, [props.reset]);

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  const styles = {
    radioButton: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '4px',
    },
  };

  return (
    <div className="flex row gap-2 w-full ">
      <div style={styles.radioButton}>
        <input
          type="radio"
          id="option1"
          value="option1"
          checked={selectedValue === 'option1'}
          onChange={() => {
            handleRadioChange('option1');
            props.setmode('cash')
          }}
        />
        <label htmlFor="option1">Cash</label>
      </div>

      <div style={styles.radioButton}>
        <input
          type="radio"
          id="option2"
          value="option2"
          checked={selectedValue === 'option2'}
          onChange={() => {
            handleRadioChange('option2');
            props.setmode('cheque')

          }}
        />
        <label htmlFor="option2">Cheque</label>
      </div>
      <div style={styles.radioButton}>
        <input
          type="radio"
          id="option3"
          value="option3"
          checked={selectedValue === 'option3'}
          onChange={() => {
            handleRadioChange('option3');
            props.setmode('Mobile Wallet')

          }}
        />
        <label htmlFor="option3">Mobile Wallet</label>
      </div>

      <div style={styles.radioButton}>
        <input
          type="radio"
          id="option4"
          value="option4"
          checked={selectedValue === 'option4'}
          onChange={() => {
            handleRadioChange('option4');
            props.setmode('Other')

          }}
        />
        <label htmlFor="option4">Other</label>
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

export default FeeRadio;

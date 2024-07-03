import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectGroupTwo from './Forms/SelectGroup/SelectGroupTwo';

const InventItemSelect = (props) => {
  const [cart, setcart] = useState([]);
  const [cartzz, setcartzz] = useState();

  const inventory = useSelector((state) => state?.inventory);

  const { cartegory ,CreateInventorycart,fetchAllInventory} =
  inventory;

    useEffect(() => {
        props.setsectionprop(cartzz)
    }, [cartzz]);


  useEffect(() => {
    if (fetchAllInventory?.success == 1) {
      let arrr = [];
      let i = 0;
      while (i < inventory?.fetchAllInventory?.data.length) {
        arrr.push(inventory?.fetchAllInventory?.data[i]?.itemName);
        i++;
      }

      setcart(arrr);
      setcartzz(arrr[0]);
    }
  }, [fetchAllInventory]);

  return (
    <>
      <SelectGroupTwo
        values={cart}
        setSelectedOption={setcartzz}
        selectedOption={cartzz}
      />
    </>
  );
};

export default InventItemSelect;

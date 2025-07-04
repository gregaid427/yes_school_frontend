import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DBDeleteModal from '../../components/DBDeleteModal';
import DBEmptyModal from '../../components/DBEmptyModal';
import DBbackupModal from '../../components/DBbackupModal';
import DBCreateModal from '../../components/DBCreateModal';
import DBUploadModal from '../../components/DBUploadModal';
import { DBStatusAction } from '../../redux/slices/usersSlice';

const Systemdb = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [status, setStatus] = useState('Loading...');

  const [key, setkey] = useState('1');
  const users = useSelector((state) => state?.user);
  const { DBStatus, createDB, deleteDB } = users;
  useEffect(() => {
    dispatch(DBStatusAction());
  }, []);
  useEffect(() => {
    dispatch(DBStatusAction());
    if (deleteDB?.success == 1) {
      dispatch(DBStatusAction());
    }
    if (createDB?.success == 1) {
      dispatch(DBStatusAction());
    }
  }, [deleteDB, createDB]);
  useEffect(() => {
    console.log(DBStatus);
    if (DBStatus?.success == 1) {
      let data = DBStatus?.status[0]?.SCHEMA_NAME;

      if (data) {
        setStatus('✅ Online');
      }
    } else {
      setStatus('⚠️ No Db or Server offline');
    }
  }, [DBStatus]);

  console.log(DBStatus);

  return (
    <>
      <Dialog
        visible={visible}
        position={'top'}
        style={{ height: 'auto', width: '30%', margin: '5px 0 0 0' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DBDeleteModal
          keyvalue={key}
          response={'response'}
          close={setVisible}
        />
      </Dialog>
      <Dialog
        visible={visible4}
        position={'top'}
        style={{ height: 'auto', width: '30%', margin: '5px 0 0 0' }}
        onHide={() => {
          if (!visible4) return;
          setVisible4(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DBUploadModal
          keyvalue={key}
          response={'response'}
          close={setVisible4}
        />
      </Dialog>

      <Dialog
        visible={visible1}
        position={'top'}
        style={{ height: 'auto', width: '30%', margin: '5px 0 0 0' }}
        onHide={() => {
          if (!visible1) return;
          setVisible1(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DBEmptyModal
          keyvalue={key}
          response={'response'}
          close={setVisible1}
        />
      </Dialog>
      <Dialog
        visible={visible2}
        position={'top'}
        style={{ height: 'auto', width: '30%', margin: '5px 0 0 0' }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DBbackupModal
          keyvalue={key}
          response={'response'}
          close={setVisible2}
        />
      </Dialog>
      <Dialog
        visible={visible3}
        position={'top'}
        style={{ height: 'auto', width: '30%', margin: '5px 0 0 0' }}
        onHide={() => {
          if (!visible3) return;
          setVisible3(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DBCreateModal
          keyvalue={key}
          response={'response'}
          close={setVisible3}
        />
      </Dialog>
      <Dialog
        visible={visible3}
        position={'top'}
        style={{ height: 'auto', width: '30%', margin: '5px 0 0 0' }}
        onHide={() => {
          if (!visible3) return;
          setVisible3(false);
        }}
        draggable={false}
        resizable={false}
      >
        <DBCreateModal
          keyvalue={key}
          response={'response'}
          close={setVisible3}
        />
      </Dialog>

      <div className="bg-[#EEEFF7] flex py-20 px-50 h-screen flex-col">
        <h2 className="text-3xl mb-2 underline font-extrabold">
          Yes SMS Database Management
        </h2>
        <h2 className="text-xl mb-2  font-bold">Database Status : {status}</h2>

        <p>Choose Option Below :</p>

        <div className="flex my-3 justify-between w-100">
          <p className="font-bold py-2 ">- Install a new database</p>{' '}
          <button
            className="flex w- gap-1 justify-center rounded bg-primary py-2 px-5 font-medium text-gray hover:bg-opacity-90"
            type=""
            onClick={(e) => {
              e.preventDefault();
              //  handleSubmitResult();
              setVisible3(true);
            }}
          >
            Select
          </button>{' '}
        </div>

        <div className="flex my-3 justify-between w-100">
          <p className="font-bold py-2 ">- Upload Backup File</p>{' '}
          <button
            className="flex w- gap-1 justify-center rounded bg-primary py-2 px-5 font-medium text-gray hover:bg-opacity-90"
            type=""
            onClick={(e) => {
              e.preventDefault();
              //  handleSubmitResult();
              setVisible4(true);
            }}
          >
            Select
          </button>{' '}
        </div>

        <div className="flex my-3 justify-between w-100">
          <p className="font-bold py-2 ">- Empty current database</p>{' '}
          <button
            className="flex w- gap-1 justify-center rounded bg-primary py-2 px-5 font-medium text-gray hover:bg-opacity-90"
            type=""
            onClick={(e) => {
              e.preventDefault();
              setVisible1(true);
              //  handleSubmitResult();
            }}
          >
            Select
          </button>{' '}
        </div>

        <div className="flex my-3 justify-between w-100">
          <p className="font-bold py-2 ">- Backup current database</p>{' '}
          <button
            className="flex w- gap-1 justify-center rounded bg-primary py-2 px-5 font-medium text-gray hover:bg-opacity-90"
            type=""
            onClick={(e) => {
              e.preventDefault();
              //  handleSubmitResult();
              setVisible2(true);
            }}
          >
            Select
          </button>{' '}
        </div>

        <div className="flex my-3 justify-between w-100">
          <p className="font-bold py-2 ">- Delete current database</p>{' '}
          <button
            className="flex w- gap-1 justify-center rounded bg-primary py-2 px-5 font-medium text-gray hover:bg-opacity-90"
            type=""
            onClick={(e) => {
              e.preventDefault();
              //  handleSubmitResult();
              setVisible(true);
            }}
          >
            Select
          </button>{' '}
        </div>
      </div>
    </>
  );
};

export default Systemdb;

import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <DefaultLayout>
      <div className="p-30  flex flex-col my-auto justify-center mx-auto py-auto">
        <div>
          <label
            className=" block text-xl  font-large  font-extrabold text-black dark:text-white"
            htmlFor="fullName"
          >
            Unauthorized Page
          </label>
     
          <br />
          <p>You do not have access to the requested page.</p>
          <div className="flexGrow">
            <button
              className="flex mt-4 justify-center rounded bg-primary  border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type=""
              onClick={(e) => {
                goBack();
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Unauthorized;

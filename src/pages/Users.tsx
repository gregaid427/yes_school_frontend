import { Link } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';

const Users = () => {
  return (
    <DefaultLayout>
      <div className="rounded-sm border w-8/12 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-2 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Users' Cartegory
                </th>

                <th className="py-2 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-[#eee] py-1 px-2 pl-3 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {'Students'}
                  </h5>
                </td>

                <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link to="/students">
                      <button
                        className="btn float-right flex justify-center rounded bg-primary py-1 px-3 font-small text-gray hover:shadow-1"
                        type="submit"
                      >
                        Edit
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border-b border-[#eee] py-1 px-2 pl-3 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {'Parents'}
                  </h5>
                </td>

                <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link to="/parent">
                      <button
                        className="btn float-right flex justify-center rounded bg-primary py-1 px-3 font-small text-gray hover:shadow-1"
                        type="submit"
                      >
                        Edit
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border-b border-[#eee] py-1 px-2 pl-3 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {'Teachers'}
                  </h5>
                </td>

                <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link to="/teachers">
                      <button
                        className="btn float-right flex justify-center rounded bg-primary py-1 px-3 font-small text-gray hover:shadow-1"
                        type="submit"
                      >
                        Edit{' '}
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border-b border-[#eee] py-1 px-2 pl-3 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {'Staff'}
                  </h5>
                </td>

                <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link to="/staff">
                      <button
                        className="btn float-right flex justify-center rounded bg-primary py-1 px-3 font-small text-gray hover:shadow-1"
                        type="submit"
                      >
                        Edit
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Users;

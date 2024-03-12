import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Grade 1',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 40,
  },
  {
    logo: BrandTwo,
    name: 'Grade 1',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 40,
  },
  {
    logo: BrandThree,
    name: 'Grade 1',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 30,
  },
  {
    logo: BrandFour,
    name: 'Grade 1',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 20,
  },
  {
    logo: BrandFive,
    name: 'Grade 1',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 40,
  },
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
Class Statistics      </h4>

      <div className="flex flex-col">
        <div className="flex justify-between rounded-sm bg-gray-2 dark:bg-meta-4 ">
          <div className="p-2 ">
            <h5 className="text-sm font-medium  xsm:text-base">
              Class
            </h5>
          </div>
          <div className="p-2 ">
            <h5 className="text-sm font-medium  xsm:text-base">
              No. of Students
            </h5>
          </div>
   
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`flex justify-between ${
              key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
       


            <div className="hidden justify-center p-1 sm:flex xl:p-1">
              <p className="text-black dark:text-white">{brand.name}</p>
            </div>

            <div className="hidden  justify-center p-2 sm:flex xl:p-2">
              <p className="text-meta-5">{brand.conversion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;

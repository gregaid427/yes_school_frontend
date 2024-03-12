/* eslint-disable jsx-a11y/accessible-emoji */

export const Pagination = ({
  activePage,
  count,
  rowsPerPage,
  totalPages,
  setActivePage,
}) => {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  return (
    <>
      <div className="m-1  flex justify-between  mt-3 p-1 w-8/12 ">
        <button
          onClick={() => setActivePage(activePage - 1)}
          class="inline-flex items-center justify-center rounded-full bg-black px-1 py-1 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Prev
        </button>
        <p>
         {beginning === end ? end : `${beginning} - ${end}`} of {count}
        </p>
        <button
          onClick={() => setActivePage(activePage + 1)}
          class="inline-flex items-center justify-center rounded-full bg-black px-1 py-1 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Next
        </button>
      </div>
    </>
  );
};

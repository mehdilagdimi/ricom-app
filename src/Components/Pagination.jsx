// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";


const Pagination = ({ fetchRecords, pageCount }) => {
const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const refreshRecords = async (currentPage) => {
        await fetchRecords(currentPage);
    }
    // (async () => {await refreshRecords(currentPage)});
    refreshRecords(currentPage);
  }, [currentPage]);

  const onPageClick = (data) => {
    console.log(pageCount);
    setCurrentPage(data.selected)
  }

  return (
    <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
        onPageChange={onPageClick}
        containerClassName={"flex w-full justify-center items-center relative bottom-0 mt-3 mb-10 mx-auto"}
        pageClassName={"bg-navGray m-2 text-lg font-bold leading-tight shadow-md transition duration-150 ease-in-out hover:bg-appPink hover:text-white hover:shadow-lg"}
        pageLinkClassName={"flex justify-center items-center rounded-lg w-10 h-10"}
        previousClassName={"bg-navGray m-2 text-lg leading-tight shadow-md transition duration-150 ease-in-out hover:bg-appPink hover:text-white hover:shadow-lg"}
        previousLinkClassName={"flex justify-center items-center rounded-lg w-10 h-10"}
        nextClassName={"bg-navGray m-2 text-lg leading-tight shadow-md transition duration-150 ease-in-out hover:bg-appPink hover:text-white hover:shadow-lg"}
        nextLinkClassName={"flex justify-center items-center rounded-lg w-10 h-10"}
        breakClassName={"bg-navGray m-2 text-lg font-bold leading-tight shadow-md transition duration-150 ease-in-out hover:bg-appPink hover:text-white hover:shadow-lg"}
        breakLinkClassName={"flex justify-center items-center rounded-lg w-10 h-10"}
        activeClassName={"bg-appPink text-white shadow-lg"}
      />
    // <div className="flex w-full justify-center items-center relative bottom-0 mt-3 mb-10 mx-auto">
    //   <nav>
    //     <ul className="flex">
    //       <li className="bg-navGray m-2 text-lg font-bold leading-tight shadow-md transition duration-150 ease-in-out hover:bg-appPink hover:text-white hover:shadow-lg focus:bg-appPink focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-appPink active:text-white active:shadow-lg">
    //         <Link to="/">
    //           <div className="flex justify-center items-center rounded-lg w-10 h-10">&#60;</div>
    //         </Link>
    //       </li>
    //       <li className="bg-navGray  m-2 text-md leading-tight shadow-md transition duration-150 ease-in-out hover:bg-appPink hover:text-white hover:shadow-lg focus:bg-appPink focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-appPink active:text-white active:shadow-lg">
    //         <Link to="/">
    //           <div className=" flex justify-center items-center rounded-lg w-10 h-10">1</div>
    //         </Link>
    //       </li>
    //       <li className="bg-navGray m-2 ext-md leading-tight shadow-md transition duration-150 ease-in-out hover:bg-appPink hover:text-white hover:shadow-lg focus:bg-appPink focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-appPink active:text-white active:shadow-lg">
    //         <Link to="/">
    //           <div className=" flex justify-center items-center rounded-lg w-10 h-10">2</div>
    //         </Link>
    //       </li>
    //       <li className="bg-navGray m-2 ext-md leading-tight shadow-md transition duration-150 ease-in-out hover:bg-appPink hover:text-white hover:shadow-lg focus:bg-appPink focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-appPink active:text-white active:shadow-lg">
    //         <Link to="/">
    //           <div className=" flex justify-center items-center rounded-lg w-10 h-10">&#62;</div>
    //         </Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
  );
};

export default Pagination;

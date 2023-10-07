import React, { useEffect, useState } from "react";
import DateRangePicker from "../../components/dataPicker";
import { ArrowBigLeftDash, ArrowDownToLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination";
import { getReport } from "../../server/app";

export const Report = () => {
  const navigate = useNavigate();

  const [total, settotal] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const [data, setdata] = useState([]);

  console.log(data)

  useEffect(() => {
    getReport(`reports/?page=1maxResult=8`, setdata, settotal);
  }, []);

  const handlePageChange = (pageNumber) => {
    setcurrentPage(pageNumber);
    getApi(
      `product/getProducts?maxResult=8&page=${pageNumber}`,
      setdata,
      settotal
    );
  };

  return (
    <div className=" w-full h-full  pt-5 px-5">
      <div className=" flex justify-between">
        <button
          className="flex items-center cursor-pointer p-2 border-2 gap-2 rounded-md bg-white border-gray-300 hover:border-blue-500"
          onClick={() => navigate("/")}
        >
          <p>
            <ArrowBigLeftDash />
          </p>
          Back
        </button>
        <div className=" flex space-x-3">
          <div>
            <input
              type="search"
              className="w-full h-12 rounded border-2 pl-3"
              placeholder="Search The report"
              // value={searchProduct}
              // onChange={(e) => handleSearh(e.target.value)}
            />
          </div>
          <DateRangePicker />
          <button
            className="flex items-center gap-x-2 rounded text-white bg-[#2b83fd] hover:bg-[#4a83d3] px-4 py-2"
            onClick={() => navigate("/")}
          >
            <p>
              <ArrowDownToLine />
            </p>
            PDF
          </button>
        </div>
      </div>
      <div className="w-full h-auto bg-white shadow-sm grid grid-cols-9 grid-rows-1 text-center rounded py-3 my-3 font-semibold text-[13px]">
        <p>S.No</p>
        <p>Date</p>
        <p>Inv.No</p>
        <p>Name</p>
        <p>Total Items</p>
        {/* <p>Quantity</p> */}
        <p>Mod</p>
        <p>Dis(-)</p>
        <p>GST</p>
        <p>Total Amt</p>
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-9 space-x-2 w-full h-auto text-center text-[13px] bg-white shadow-sm border-b py-3 hover:bg-zinc-50"
        >
          <p>{index + 1}</p>
          <p>{item.date}</p>
          <p>{item.invoiceNumber}</p>
          <p>{item.name}</p>
          <p>{item.column2}</p>
          <p>{item.paymentMethod}</p>
          {/* Replace 'column3' with the actual property name */}
          <p>{item.discount}</p>{" "}
          {/* Replace 'column4' with the actual property name */}
          <p>{item.gst}</p>{" "}
          {/* Replace 'column5' with the actual property name */}
          <p>{item.column6}</p>{" "}
          {/* Replace 'column6' with the actual property name */}
        </div>
      ))}

      <div className=" fixed bottom-3 right-0">
        <Pagination
          currentPage={currentPage}
          total={total}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

import { BiChevronLeft } from "@react-icons/all-files/bi/BiChevronLeft"
import { BiChevronRight } from "@react-icons/all-files/bi/BiChevronRight"
import React, { useState } from "react"
import OrderHistoryCard from "./OrderHistoryCard"

const OrderHistory = () => {
  let [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(5)
  return (
    <div>
      <OrderHistoryCard
        date={""}
        time={""}
        title={""}
        organizerImg={""}
        ticketStatus={true}
      />
      <OrderHistoryCard
        date={""}
        time={""}
        title={""}
        organizerImg={""}
        ticketStatus={false}
      />
      <div className='flex items-center gap-x-5 justify-end'>
        <button
          type='button'
          title='Previous Page'
          className={`p-2 ${
            currentPage === 1 ? "bg-label" : "bg-white"
          } rounded-md`}
          onClick={() => setCurrentPage(--currentPage)}
          disabled={currentPage > 1 ? false : true}
        >
          <BiChevronLeft size={24} />
        </button>
        <p className='font-semibold'>
          <span className='font-extrabold'>{currentPage}</span> / {totalPage}
        </p>
        <button
          type='button'
          title='Next Page'
          className={`p-2 ${
            currentPage === totalPage ? "bg-label" : "bg-white"
          } rounded-md`}
          onClick={() => setCurrentPage(++currentPage)}
          disabled={currentPage === totalPage ? true : false}
        >
          <BiChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

export default OrderHistory

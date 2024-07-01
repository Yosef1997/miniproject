"use client"
import React, { useContext, useEffect, useState } from "react"
import EventList from "@/utils/MOCK_DATA"
import * as yup from "yup"
import { Field, Form, Formik, FormikProps } from "formik"
import TickitzContext from "@/context/TickitzContext"
import Link from "next/link"
import moment from "moment"

type Props = {
  params: {
    eventId: number
  }
}

const personalInfoSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),
  phone: yup
    .string()
    .min(11, "Phone number must be 11 numbers at minimum")
    .required("Phone number is required"),
})

interface personalInfoValues {
  fullName: string
  email: string
  phone: string
}

const Order: React.FC<Props> = ({ params }) => {
  const [totalOrder, setTotalOrder] = useState<number>(1)
  let [usePoint, setUsePoint] = useState<number>(0)
  const events = EventList[params.eventId]
  const { event, setEvent } = useContext(TickitzContext)
  const initialValues: personalInfoValues = {
    fullName: "Jonny Doe",
    email: "",
    phone: "",
  }

  useEffect(() => {
    const fetch = () => setEvent(EventList[params.eventId])
    fetch()
  }, [])

  return (
    <div className='bg-background py-8 lg:py-14 px-6 md:px-16 xl:px-32 lg:grid lg:grid-cols-3 lg:gap-x-6'>
      <div className='lg:col-span-2'>
        <h2 className='text-title font-semibold mb-6'>Payment Info</h2>
        <div className='bg-white px-3 lg:p-6 rounded-md'>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <p className='text-label text-sm'>Date & time</p>
            <p className='text-title'>
              {moment(new Date()).format("MMMM, DD - hh:mm A")}
            </p>
          </div>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <p className='text-label text-sm'>Event title</p>
            <p className='text-title line-clamp-2 w-1/2 text-end'>
              {events.title}
            </p>
          </div>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <p className='text-label text-sm'>Location</p>
            <p className='text-title'>{events.location}</p>
          </div>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <p className='text-label text-sm'>Venue</p>
            <p className='text-title w-1/2 text-end'>{events.vanue}</p>
          </div>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <p className='text-label text-sm'>Price</p>
            <p className='text-title'>IDR {events.price}</p>
          </div>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <div className='flex flex-col items-start'>
              <p className='text-label text-sm'>Total order</p>
              <p className='text-label text-sm'>(25 remaining)</p>
            </div>
            <input
              onChange={(e) => setTotalOrder(Number(e.target.value))}
              className='text-sm text-title text-center border border-border-line rounded-md w-[15vw] lg:w-[5vw] py-2 focus:outline-none'
              type='number'
              placeholder={`${totalOrder}`}
            />
          </div>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <div className='flex flex-col items-start'>
              <p className='text-label text-sm'>Use points</p>
              <p className='text-label text-sm'>(10000)</p>
            </div>
            <input
              onChange={(e) => {
                setUsePoint(e.target.checked ? 1000 : 0)
              }}
              type='checkbox'
            />
          </div>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <p className='text-label text-sm'>Use voucher</p>
            <div className='bg-background-v2 p-3 rounded-md w-fit'>
              <select
                name='use voucher'
                id='voucher'
                className='bg-background-v2'
              >
                <option value=''>Select voucher</option>
                <option value='Diskon 10%'>Diskon 10%</option>
                <option value='Diskon 20%'>Diskon 20%</option>
              </select>
            </div>
          </div>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <p className='text-label text-sm'>Payment method</p>
            <div className='bg-background-v2 p-3 rounded-md w-fit'>
              <select
                name='select payment'
                id='payment'
                className='bg-background-v2'
              >
                <option value=''>Select payment</option>
                <option value='Virtual account'>Virtual account</option>
                <option value='Transfer'>Transfer</option>
                <option value='COD'>COD</option>
              </select>
            </div>
          </div>
          <div className='flex justify-between items-center py-3'>
            <p className='text-label text-sm'>Total Payment</p>
            <p className='text-title'>
              IDR {totalOrder * events.price - usePoint}
            </p>
          </div>
        </div>
      </div>
      <div className='mt-12 lg:mt-0'>
        <h2 className='text-title mb-6 font-semibold'>Details Information</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={personalInfoSchema}
          onSubmit={async (values) => {
            console.log(values)
          }}
        >
          {(props: FormikProps<personalInfoValues>) => {
            const { values, errors, touched, handleChange } = props

            return (
              <Form>
                <div className='bg-white px-3 lg:px-6 py-6 mb-6 rounded-md'>
                  <div className='flex flex-col mb-3'>
                    <label htmlFor='fullName' className='text-body'>
                      Full Name
                    </label>
                    <Field
                      className='px-4 py-3 mt-3 text-body rounded-md border border-border-line focus:outline-none'
                      type='text'
                      name='fullName'
                      onChange={handleChange}
                      value={values.fullName}
                      placeholder={values.fullName}
                    />
                    {touched.fullName && errors.fullName ? (
                      <div className='text-error text-sm mt-1'>
                        {errors.fullName}
                      </div>
                    ) : null}
                  </div>
                  <div className='flex flex-col mb-3'>
                    <label htmlFor='email' className='text-body'>
                      Email
                    </label>
                    <Field
                      className='px-4 py-3 mt-3 text-body rounded-md border border-border-line focus:outline-none'
                      type='email'
                      name='email'
                      onChange={handleChange}
                      value={values.email}
                      placeholder={values.email}
                    />
                    {touched.email && errors.email ? (
                      <div className='text-error text-sm mt-1'>
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='phone' className='text-body'>
                      Phone Number
                    </label>
                    <Field
                      className='px-4 py-3 mt-3 text-body rounded-md border border-border-line focus:outline-none'
                      type='text'
                      name='phone'
                      onChange={handleChange}
                      value={values.phone}
                      placeholder={values.phone}
                    />
                    {touched.phone && errors.phone ? (
                      <div className='text-error text-sm mt-1'>
                        {errors.phone}
                      </div>
                    ) : null}
                  </div>
                </div>
                <button
                  className='bg-primary text-white text-sm font-bold w-full py-2 lg:py-4 rounded-md mb-4'
                  type='submit'
                >
                  Pay your order
                </button>
                <Link href={"/ticket"}>next</Link>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default Order

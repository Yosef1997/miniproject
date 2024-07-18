"use client"
import React from "react"
import { Field, Form, Formik, FormikProps } from "formik"
import * as yup from "yup"
import UploadImage from "@/components/UploadImage"
import useCategory from "@/hooks/useCategory"
import { cities } from "@/utils/CityDummy"

const dashboardSchema = yup.object().shape({
  name: yup.string().required("Event name is required"),
  category: yup.string().required("Category is required"),
  date: yup.string().required("Event date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  availableTickets: yup
    .number()
    .min(20, "Available tickets minimal 20")
    .required("Available tickets is required"),
  price: yup.number().required("Price is required"),
  location: yup.string().required("Location is required"),
  venue: yup.string().required("Venue is required"),
  description: yup.string().required("Description is required"),
})

interface dashboardValues {
  name: string
  category: string
  date: string
  startTime: string
  endTime: string
  availableTickets: number
  price: number
  location: string
  venue: string
  description: string
}

const EventForm: React.FC<{ isDetailEvent: boolean }> = ({ isDetailEvent }) => {
  const { response } = useCategory()
  const initialValues: dashboardValues = {
    name: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    availableTickets: 0,
    price: 0,
    location: "",
    venue: "",
    description: "",
  }
  return (
    <div>
      <h2 className='text-title text-2xl font-bold mb-6'>Event Description</h2>
      <div className='bg-white p-3 lg:px-11 lg:py-14 rounded-md'>
        <Formik
          initialValues={initialValues}
          validationSchema={dashboardSchema}
          onSubmit={async (values) => {
            console.log(values)
          }}
        >
          {(props: FormikProps<dashboardValues>) => {
            const { values, errors, touched, handleChange } = props
            return (
              <Form>
                <div className='grid lg:grid-cols-3'>
                  <div className='flex justify-center items-center mb-6 lg:mb-0'>
                    <UploadImage />
                  </div>
                  <div className='lg:col-span-2'>
                    <div className='flex flex-col mb-6'>
                      <label htmlFor='name'>Event name</label>
                      <Field
                        className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                        type='text'
                        name='name'
                        onChange={handleChange}
                        value={values.name}
                        placeholder='Write your event name'
                      />
                      {touched.name && errors.name ? (
                        <div className='text-error text-sm mt-1'>
                          {errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className='flex flex-col mb-6'>
                      <label htmlFor='category'>Category</label>
                      <div className='px-6 py-5 mt-3 rounded-md border bg-white border-border-line'>
                        <Field
                          as='select'
                          className='focus:outline-none w-full'
                          name='category'
                          onChange={handleChange}
                          value={values.category}
                        >
                          <option value=''>Select category</option>
                          {response?.map((e, i) => {
                            return (
                              <option key={i} value={e.categoryName}>
                                {e.categoryName}
                              </option>
                            )
                          })}
                        </Field>
                      </div>

                      {touched.category && errors.category ? (
                        <div className='text-error text-sm mt-1'>
                          {errors.category}
                        </div>
                      ) : null}
                    </div>
                    <div className='grid lg:grid-cols-4 lg:gap-x-6 mb-6'>
                      <div className='flex flex-col lg:col-span-2'>
                        <label htmlFor='date'>Event date</label>
                        <Field
                          className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                          type='date'
                          name='date'
                          onChange={handleChange}
                          value={values.date}
                          placeholder='Write your date'
                        />
                        {touched.date && errors.date ? (
                          <div className='text-error text-sm mt-1'>
                            {errors.date}
                          </div>
                        ) : null}
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor='startTime'>Start time</label>
                        <Field
                          className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                          type='time'
                          name='startTime'
                          onChange={handleChange}
                          value={values.startTime}
                        />
                        {touched.startTime && errors.startTime ? (
                          <div className='text-error text-sm mt-1'>
                            {errors.startTime}
                          </div>
                        ) : null}
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor='endTime'>End time</label>
                        <Field
                          className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                          type='time'
                          name='endTime'
                          onChange={handleChange}
                          value={values.endTime}
                        />
                        {touched.endTime && errors.endTime ? (
                          <div className='text-error text-sm mt-1'>
                            {errors.endTime}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='grid lg:grid-cols-2 lg:gap-x-6 mb-6'>
                  <div className='flex flex-col'>
                    <label htmlFor='availableTickets'>Available tickets</label>
                    <Field
                      className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                      type='number'
                      name='availableTickets'
                      onChange={handleChange}
                      value={values.availableTickets}
                      placeholder='Write your available tickets'
                    />
                    {touched.availableTickets && errors.availableTickets ? (
                      <div className='text-error text-sm mt-1'>
                        {errors.availableTickets}
                      </div>
                    ) : null}
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='price'>price</label>
                    <Field
                      className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                      type='number'
                      name='price'
                      onChange={handleChange}
                      value={values.price}
                      placeholder='Write your available tickets'
                    />
                    {touched.price && errors.price ? (
                      <div className='text-error text-sm mt-1'>
                        {errors.price}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='grid lg:grid-cols-2 lg:gap-x-6 mb-6'>
                  <div className='flex flex-col'>
                    <label htmlFor='location'>Location</label>
                    <div className='px-6 py-5 mt-3 rounded-md border bg-white border-border-line'>
                      <Field
                        as='select'
                        className='focus:outline-none w-full'
                        name='location'
                        onChange={handleChange}
                        value={values.location}
                      >
                        <option value=''>Select location</option>
                        {cities.map((e, i) => {
                          return (
                            <option key={i} value={e.city_name}>
                              {e.city_name}
                            </option>
                          )
                        })}
                      </Field>
                    </div>
                    {touched.location && errors.location ? (
                      <div className='text-error text-sm mt-1'>
                        {errors.location}
                      </div>
                    ) : null}
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='venue'>Venue</label>
                    <Field
                      className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                      type='text'
                      name='venue'
                      onChange={handleChange}
                      value={values.venue}
                      placeholder='Write your venue'
                    />
                    {touched.venue && errors.venue ? (
                      <div className='text-error text-sm mt-1'>
                        {errors.venue}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='flex flex-col mb-6'>
                  <label htmlFor='description'>Description</label>
                  <Field
                    as='textarea'
                    className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                    type='text'
                    name='description'
                    onChange={handleChange}
                    value={values.description}
                    placeholder='Write your event description'
                  />
                  {touched.description && errors.description ? (
                    <div className='text-error text-sm mt-1'>
                      {errors.description}
                    </div>
                  ) : null}
                </div>
                <div className='flex flex-col lg:flex-row gap-6'>
                  <button
                    className='bg-primary text-white font-bold w-full lg:w-1/3 py-6 rounded-md'
                    type='submit'
                  >
                    {isDetailEvent ? "Update Event" : "Save Event"}
                  </button>
                  {isDetailEvent ? (
                    <button
                      className='bg-error text-white font-bold w-full lg:w-1/3 py-6 rounded-md'
                      type='submit'
                    >
                      Delete Event
                    </button>
                  ) : null}
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default EventForm

"use client"
import React, { useEffect, useState } from "react"
import { Field, Form, Formik, FormikProps } from "formik"
import * as yup from "yup"
import UploadImage from "@/components/UploadImage"
import useCategory from "@/hooks/useCategory"
import { cities } from "@/utils/CityDummy"
import { AiFillDelete } from "@react-icons/all-files/ai/AiFillDelete"
import { toast } from "@/components/ui/use-toast"
import useCreateEvent from "@/hooks/useCreateEvent"
import { CreateEventReq } from "@/types/createEvent"
import { useSession } from "next-auth/react"
import { PROFILE_STORAGE, UPLOAD_IMAGE_STORAGE } from "@/constant/constant"
import { parse, formatISO, set } from "date-fns"

const dashboardSchema = yup.object().shape({
  name: yup.string().required("Event name is required"),
  category: yup.string().required("Category is required"),
  date: yup.string().required("Event date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  availableTickets: yup
    .number()
    .min(1, "Available tickets minimal 1")
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
  ticket: string
  promotionName: string
  promotionType: string
  usageLimit: number
  promoDiscount: number
  expiredDate: string
}

interface CreateTicket {
  name: string
  seats: number
  price: number
}

interface CreatePromotion {
  name: string
  type: string
  usageLimit: number
  discount: number
  expiredDate: string
}

const EventForm: React.FC<{ isDetailEvent: boolean }> = ({ isDetailEvent }) => {
  const { response } = useCategory()
  const [tickets, setTickets] = useState<CreateTicket[]>([])
  const [promotions, setPromotions] = useState<CreatePromotion[]>([])
  const [eventImg, setEventImg] = useState<string>("")
  const [isFreeEvent, setIsFreeEvent] = useState(false)
  const { handleCreateEvent, loading, error } = useCreateEvent()
  const [userId, setUserId] = useState<number>(0)

  const initialValues: dashboardValues = {
    name: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    availableTickets: 1,
    price: 0,
    location: "",
    venue: "",
    description: "",
    ticket: "",
    promotionName: "",
    promotionType: "",
    usageLimit: 1,
    promoDiscount: 1,
    expiredDate: "",
  }

  const deleteTicket = (name: string) => {
    setTickets((prevTickets) => prevTickets.filter((t) => t.name !== name))
  }

  const deletePromotion = (name: string) => {
    setPromotions((prevPromotions) =>
      prevPromotions.filter((p) => p.name !== name)
    )
  }

  useEffect(() => {
    const storage = sessionStorage.getItem(UPLOAD_IMAGE_STORAGE)
    if (storage !== null) {
      const data = JSON.parse(storage)
      setEventImg(data.url)
    }
    const profile = localStorage.getItem(PROFILE_STORAGE)
    if (profile !== null) {
      const data = JSON.parse(profile)
      setUserId(data.id)
    }
  }, [])
  console.log(userId)

  return (
    <div>
      <h2 className='text-title text-2xl font-bold mb-6'>Event Description</h2>
      <div className='bg-white p-3 lg:px-11 lg:py-14 rounded-md'>
        <Formik
          initialValues={initialValues}
          validationSchema={dashboardSchema}
          onSubmit={async (values) => {
            const eventDate = parse(values.date, "yyyy-MM-dd", new Date())

            const startDateTime = set(eventDate, {
              hours: parseInt(values.startTime.split(":")[0]),
              minutes: parseInt(values.startTime.split(":")[1]),
              seconds: 0,
              milliseconds: 0,
            })
            const endDateTime = set(eventDate, {
              hours: parseInt(values.endTime.split(":")[0]),
              minutes: parseInt(values.endTime.split(":")[1]),
              seconds: 0,
              milliseconds: 0,
            })

            const req: CreateEventReq = {
              eventName: values.name,
              eventImage: eventImg,
              category: values.category,
              date: formatISO(eventDate),
              startTime: formatISO(startDateTime),
              endTime: formatISO(endDateTime),
              location: values.location,
              venue: values.venue,
              description: values.description,
              userId: userId,
              tickets: tickets,
              promotions: promotions,
            }
            console.log("createEventReq>>>", req)
            await handleCreateEvent(req)
          }}
        >
          {(props: FormikProps<dashboardValues>) => {
            const { values, errors, touched, handleChange, setFieldValue } =
              props

            const addTicket = () => {
              if (isFreeEvent) {
                return toast({
                  variant: "destructive",
                  title: "Add Ticket Failed",
                  description: "Free event only have one ticket type",
                })
              }
              if (
                values.ticket === "" ||
                values.availableTickets === 0 ||
                values.price === 0
              ) {
                return toast({
                  variant: "destructive",
                  title: "Add Ticket Failed",
                  description: "Ticket detail not completed",
                })
              }
              if (tickets.length === 2) {
                setFieldValue("ticket", "")
                setFieldValue("availableTickets", 1)
                setFieldValue("price", 0)
                return toast({
                  variant: "destructive",
                  title: "Add Ticket Failed",
                  description: "Ticket limit achieved",
                })
              }
              const newTicket: CreateTicket = {
                name: values.ticket,
                seats: values.availableTickets,
                price: values.price,
              }

              setTickets([...tickets, newTicket])

              setFieldValue("ticket", "")
              setFieldValue("availableTickets", 1)
              setFieldValue("price", 0)
            }

            const addPromotion = () => {
              if (isFreeEvent) {
                return toast({
                  variant: "destructive",
                  title: "Add Ticket Failed",
                  description: "Promotion for free event not allow",
                })
              }
              if (
                values.promotionName === "" ||
                values.promotionType === "" ||
                values.promoDiscount === 0 ||
                values.usageLimit === 0 ||
                values.expiredDate === ""
              ) {
                return toast({
                  variant: "destructive",
                  title: "Add Promotion Failed",
                  description: "Promotion detail not completed",
                })
              }

              const newPromo: CreatePromotion = {
                name: values.promotionName,
                type: values.promotionType,
                usageLimit: values.usageLimit,
                discount: values.promoDiscount,
                expiredDate: formatISO(
                  parse(values.expiredDate, "yyyy-MM-dd", new Date())
                ),
              }

              setPromotions([...promotions, newPromo])

              setFieldValue("promotionName", "")
              setFieldValue("promotionType", "")
              setFieldValue("promoDiscount", 1)
              setFieldValue("usageLimit", 1)
              setFieldValue("expiredDate", "")
            }

            const setFreeEvent = () => {
              if (isFreeEvent) {
                return toast({
                  variant: "destructive",
                  title: "Add Ticket Failed",
                  description: "Free event only have one ticket type",
                })
              }
              if (tickets.length === 2) {
                setFieldValue("ticket", "")
                setFieldValue("availableTickets", 1)
                setFieldValue("price", 0)
                return toast({
                  variant: "destructive",
                  title: "Add Ticket Failed",
                  description: "Ticket limit achieved",
                })
              }
              const newTicket: CreateTicket = {
                name: values.ticket,
                seats: values.availableTickets,
                price: 0,
              }

              setTickets([...tickets, newTicket])

              setFieldValue("ticket", "")
              setFieldValue("availableTickets", 1)
              setFieldValue("price", 0)
              setIsFreeEvent(true)
            }

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

                <div className='mb-2'>
                  <div className='grid lg:grid-cols-3 lg:gap-x-6 mb-1'>
                    <div className='flex flex-col'>
                      <label htmlFor='ticket'>Ticket type</label>
                      <Field
                        className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                        type='text'
                        name='ticket'
                        onChange={handleChange}
                        value={values.ticket}
                        placeholder='Write your ticket type'
                      />
                      {touched.ticket && errors.ticket ? (
                        <div className='text-error text-sm mt-1'>
                          {errors.ticket}
                        </div>
                      ) : null}
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='availableTickets'>
                        Available tickets
                      </label>
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
                  <div className='flex gap-x-2'>
                    <button
                      className='border border-primary text-primary font-bold w-full lg:w-fit p-2  rounded-md'
                      type='button'
                      onClick={setFreeEvent}
                    >
                      Set Free Event
                    </button>
                    <button
                      className='bg-primary text-white font-bold w-full lg:w-fit p-2  rounded-md'
                      type='button'
                      onClick={addTicket}
                    >
                      Add Ticket
                    </button>
                  </div>
                </div>
                <div className='flex flex-col md:flex-row gap-y-2 md: gap-x-2'>
                  {tickets.map((e, i) => {
                    return (
                      <div
                        key={i}
                        className='flex items-center justify-between border md:w-1/3 p-2 rounded-md border-background'
                      >
                        <div>
                          <p>Ticket type: {e.name}</p>
                          <p>Available seats: {e.seats}</p>
                          <p>Price: {e.price}</p>
                        </div>
                        <AiFillDelete
                          size={25}
                          color='red'
                          onClick={() => deleteTicket(e.name)}
                        />
                      </div>
                    )
                  })}
                </div>

                <div className='mb-2'>
                  <div className='grid lg:grid-cols-5 lg:gap-x-2.5 mb-1'>
                    <div className='flex flex-col'>
                      <label htmlFor='promotionName'>Promotion name</label>
                      <Field
                        className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                        type='text'
                        name='promotionName'
                        onChange={handleChange}
                        value={values.promotionName}
                        placeholder='Write your promotion name'
                      />
                      {touched.promotionName && errors.promotionName ? (
                        <div className='text-error text-sm mt-1'>
                          {errors.promotionName}
                        </div>
                      ) : null}
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='promotionType'>Type</label>
                      <div className='px-6 py-5 mt-3 rounded-md border bg-white border-border-line'>
                        <Field
                          as='select'
                          className='focus:outline-none w-full'
                          name='promotionType'
                          onChange={handleChange}
                          value={values.promotionType}
                        >
                          <option value=''>Select type</option>
                          <option value='REFERRAL'>Referral</option>
                          <option value='DISCOUNT'>Discount</option>
                        </Field>
                      </div>

                      {touched.promotionType && errors.promotionType ? (
                        <div className='text-error text-sm mt-1'>
                          {errors.promotionType}
                        </div>
                      ) : null}
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='usageLimit'>Limit</label>
                      <Field
                        className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                        type='number'
                        name='usageLimit'
                        onChange={handleChange}
                        value={values.usageLimit}
                        placeholder='Write your usage limit'
                      />
                      {touched.usageLimit && errors.usageLimit ? (
                        <div className='text-error text-sm mt-1'>
                          {errors.usageLimit}
                        </div>
                      ) : null}
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='promoDiscount'>Discount</label>
                      <Field
                        className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                        type='number'
                        name='promoDiscount'
                        onChange={handleChange}
                        value={values.promoDiscount}
                        placeholder='Write your promotion discount'
                      />
                      {touched.promoDiscount && errors.promoDiscount ? (
                        <div className='text-error text-sm mt-1'>
                          {errors.promoDiscount}
                        </div>
                      ) : null}
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='expiredDate'>Expired date</label>
                      <Field
                        className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                        type='date'
                        name='expiredDate'
                        onChange={handleChange}
                        value={values.expiredDate}
                      />
                      {touched.expiredDate && errors.expiredDate ? (
                        <div className='text-error text-sm mt-1'>
                          {errors.expiredDate}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <button
                    className='bg-primary text-white font-bold w-full lg:w-fit p-2  rounded-md'
                    type='button'
                    onClick={addPromotion}
                  >
                    Add Promotion
                  </button>
                </div>
                <div className='flex flex-col md:flex-row gap-y-2 md: gap-x-2'>
                  {promotions.map((e, i) => {
                    return (
                      <div
                        key={i}
                        className='flex items-center justify-between border md:w-1/3 p-2 rounded-md border-background'
                      >
                        <div>
                          <p>Promotion name: {e.name}</p>
                          <p>Type: {e.type}</p>
                          <p>Limit: {e.usageLimit}</p>
                          <p>Discount: {e.discount}</p>
                          <p>Expired: {e.expiredDate}</p>
                        </div>
                        <AiFillDelete
                          size={25}
                          color='red'
                          onClick={() => deletePromotion(e.name)}
                        />
                      </div>
                    )
                  })}
                </div>

                <div className='flex flex-col mb-6 mt-3'>
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

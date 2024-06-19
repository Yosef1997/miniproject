"use client"
import Image from "next/image"
import EventCard from "./_components/EventCard"
import Hero from "@/public/hero.webp"
import Link from "next/link"
import * as yup from "yup"
import { Field, Form, Formik, FormikProps } from "formik"

const landingSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),
})

interface landingValues {
  email: string
}

export default function Home() {
  const initialValues: landingValues = {
    email: "",
  }
  return (
    <div className='bg-background'>
      <div className='relative'>
        <Image
          src={Hero}
          alt='hero'
          className='w-full lg:h-[80vh] object-cover'
        />
        <div className='absolute flex flex-col justify-between inset-0 bg-primary bg-opacity-40  p-6 lg:p-20'>
          <h2 className='text-white md:text-7xl font-bold'>
            DISCOVER <br /> POPULAR <br /> EVENTS TODAY
          </h2>
          <button
            type='button'
            title='Explore Events'
            className='bg-primary text-white-btn font-semibold p-2 lg:py-3 lg:px-8 rounded-md w-fit'
          >
            Explore Events
          </button>
        </div>
      </div>
      <div className='pt-12 pb-14'>
        <div className='flex items-center justify-between px-6 pb-8'>
          <h2 className='text-lg font-bold text-primary'>Popular Events</h2>
          <Link href={"/popularevents"} className='font-semibold text-primary'>
            View All
          </Link>
        </div>
        <div className='ml-6'>
          <EventCard
            rating={"4.5"}
            title={"Self Development Workshop"}
            date={"Tuesday, 07 July 2020 - 04:30pm"}
            location={"Grand Convexion Mapura Hotel, Taiwan"}
            price={"50000.00"}
          />
        </div>
      </div>
      <div className='pt-12 pb-14 bg-background-v2'>
        <div className='flex items-center justify-between px-6 pb-8'>
          <h2 className='text-lg font-bold text-primary'>Upcoming Events</h2>
          <Link href={"/popularevents"} className='font-semibold text-primary'>
            View All
          </Link>
        </div>
        <div className='ml-6'>
          <EventCard
            rating={"4.5"}
            title={"Self Development Workshop"}
            date={"Tuesday, 07 July 2020 - 04:30pm"}
            location={"Grand Convexion Mapura Hotel, Taiwan"}
            price={"50000.00"}
          />
        </div>
        <div className='bg-white mx-6 mt-16 px-8 py-12 rounded-md'>
          <h2 className='font-bold text-primary text-center'>
            GET UPDATE FOR POPULAR EVENTS EVERYDAY
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={landingSchema}
            onSubmit={async (values) => {
              console.log(values)
            }}
          >
            {(props: FormikProps<landingValues>) => {
              const { values, errors, touched, handleChange } = props
              console.log(props.values)
              return (
                <Form className='lg:flex lg:justify-center lg:items-start lg:gap-x-4 lg:mt-10'>
                  <div className='flex flex-col my-5 lg:my-0'>
                    <Field
                      className='px-4 lg:px-6 py-2 lg:py-5 mt-3 lg:mt-0 rounded-md border border-border-line focus:outline-none'
                      type='email'
                      name='email'
                      onChange={handleChange}
                      value={values.email}
                      placeholder='Type your email'
                    />
                    {touched.email && errors.email ? (
                      <div className='text-error text-sm mt-1'>
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                  <button
                    className='bg-primary text-white font-bold w-full lg:w-fit py-2 lg:px-8 lg:py-5 rounded-md'
                    type='submit'
                  >
                    Join now
                  </button>
                </Form>
              )
            }}
          </Formik>
          <p className='text-placeholder text-center mt-8'>
            By joining you as a Tickitz member, we will always send you the
            latest updates via email .
          </p>
        </div>
      </div>
    </div>
  )
}

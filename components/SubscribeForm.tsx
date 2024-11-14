"use client"
import React from "react"
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

const SubscribeForm = () => {
  const initialValues: landingValues = {
    email: "",
  }
  return (
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
                  <div className='text-error text-sm mt-1'>{errors.email}</div>
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
        By joining you as a Tickitz member, we will always send you the latest
        updates via email .
      </p>
    </div>
  )
}

export default SubscribeForm

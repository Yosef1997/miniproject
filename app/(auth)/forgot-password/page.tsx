"use client"
import React from "react"
import Tickitz from "@/public/navbar-logo-mobile.svg"
import TickitzWhite from "@/public/tickitz-white.svg"
import Image from "next/image"
import * as yup from "yup"
import { Field, Form, Formik, FormikProps } from "formik"

const forgotpasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),
})

interface forgotpasswordValues {
  email: string
}
const ForgotPassword = () => {
  const initialValues: forgotpasswordValues = {
    email: "",
  }

  return (
    <div className='lg:grid lg:grid-cols-3 min-h-screen'>
      <div className='hidden justify-center px-28 lg:flex lg:flex-col lg:col-span-2 bg-primary-dark bg-opacity-80'>
        <Image src={TickitzWhite} alt='Tickitz-white' />
        <h2 className='text-white font-bold text-5xl mt-24 mb-5'>
          Lets reset your password
        </h2>
        <p className='text-white text-2xl'>
          To be able to use your account again, please activate your email and
          change your password from email.
        </p>
      </div>
      <div className='px-6 lg:px-14 pt-14'>
        <Image className='lg:hidden' src={Tickitz} alt='Tickitz-mobile' />
        <h2 className='text-2xl font-semibold mt-10 mb-2.5 lg:hidden'>
          Forgot password
        </h2>
        <h2 className='text-2xl font-semibold mt-10 mb-2.5 hidden lg:block'>
          Fill your complete email
        </h2>
        <p>we'll send a link to your email shortly</p>
        <Formik
          initialValues={initialValues}
          validationSchema={forgotpasswordSchema}
          onSubmit={async (values) => {
            console.log(values)
          }}
        >
          {(props: FormikProps<forgotpasswordValues>) => {
            const { values, errors, touched, handleChange } = props
            console.log(props.values)
            return (
              <Form>
                <div className='flex flex-col mb-10 mt-12'>
                  <label htmlFor='email'>Email</label>
                  <Field
                    className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                    type='email'
                    name='email'
                    onChange={handleChange}
                    value={values.email}
                    placeholder='Write your email'
                  />
                  {touched.email && errors.email ? (
                    <div className='text-error text-sm mt-1'>
                      {errors.email}
                    </div>
                  ) : null}
                </div>
                <button
                  className='bg-primary text-white font-bold w-full py-6 rounded-md'
                  type='submit'
                >
                  Activate now
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default ForgotPassword

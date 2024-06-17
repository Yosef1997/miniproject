"use client"
import React, { useState } from "react"
import Tickitz from "@/public/navbar-logo-mobile.svg"
import Image from "next/image"
import { Field, Form, Formik, FormikProps } from "formik"
import * as yup from "yup"
import { IoIosEye } from "react-icons/io"
import { IoIosEyeOff } from "react-icons/io"
import Link from "next/link"

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters at minimum")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),
})

interface signupValues {
  email: string
  password: string
  referral: string
}

const page = () => {
  const [isShow, setIsShow] = useState(false)
  const initialValues: signupValues = { email: "", password: "", referral: "" }

  return (
    <div className='px-6'>
      <Image src={Tickitz} alt='Tickitz-mobile' />
      <h2 className='text-title text-2xl py-10'>Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={async (values) => {
          console.log(values)
        }}
      >
        {(props: FormikProps<signupValues>) => {
          const { values, errors, touched, handleChange } = props
          console.log(props.values)
          return (
            <Form>
              <div className='flex flex-col mb-6'>
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
                  <div className='text-error text-sm mt-1'>{errors.email}</div>
                ) : null}
              </div>
              <div className='flex flex-col mb-6'>
                <label htmlFor='password'>Password</label>
                <div className='px-6 py-5 mt-3 rounded-md border border-border-line flex items-center'>
                  <Field
                    className='w-full focus:outline-none'
                    type={!isShow ? "password" : "text"}
                    name='password'
                    onChange={handleChange}
                    value={values.password}
                    placeholder='Write your password'
                  />
                  <button type='button' onClick={() => setIsShow(!isShow)}>
                    {!isShow ? (
                      <IoIosEye size={20} />
                    ) : (
                      <IoIosEyeOff size={20} />
                    )}
                  </button>
                </div>
                {touched.password && errors.password ? (
                  <div className='text-error text-sm mt-1'>
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <div className='flex flex-col mb-10'>
                <label htmlFor='referral'>Referral</label>
                <Field
                  className='px-6 py-5 mt-3 rounded-md border border-border-line focus:outline-none'
                  type='text'
                  name='referral'
                  onChange={handleChange}
                  value={values.referral}
                  placeholder='Write your referral(optinal)'
                />
                {touched.referral && errors.referral ? (
                  <div className='text-error text-sm mt-1'>
                    {errors.referral}
                  </div>
                ) : null}
              </div>
              <button
                className='bg-primary text-white font-bold w-full py-6 rounded-md'
                type='submit'
              >
                Join for free
              </button>
            </Form>
          )
        }}
      </Formik>
      <p className='text-label font-semibold mt-8'>
        Do you already have an account?{" "}
        <span>
          <Link href={"/forgotpassword"} className='text-primary underline'>
            Log in
          </Link>
        </span>
      </p>
    </div>
  )
}

export default page

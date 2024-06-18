"use client"
import React, { useState } from "react"
import Tickitz from "@/public/navbar-logo-mobile.svg"
import TickitzWhite from "@/public/tickitz-white.svg"
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
    <div className='lg:grid lg:grid-cols-3 min-h-screen'>
      <div className='hidden justify-center px-28 lg:flex lg:flex-col lg:col-span-2 bg-primary-dark bg-opacity-80'>
        <Image src={TickitzWhite} alt='Tickitz-white' />
        <h2 className='text-white font-bold text-5xl mt-24 mb-5'>
          Lets build your account
        </h2>
        <p className='text-white text-2xl'>
          To be a loyal moviegoer and access all of features,
          <br />
          your details are required.
        </p>
      </div>
      <div className='px-6 my-12 lg:px-14 lg:my-auto'>
        <Image className='lg:hidden' src={Tickitz} alt='Tickitz-mobile' />
        <h2 className='text-title text-2xl py-10 lg:hidden'>Sign Up</h2>
        <h2 className='text-title text-2xl mb-11 max-lg:hidden'>
          Fill your additional details
        </h2>
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
                    <div className='text-error text-sm mt-1'>
                      {errors.email}
                    </div>
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
        <p className='text-label text-center font-semibold mt-8'>
          Do you already have an account?{" "}
          <span>
            <Link href={"/signin"} className='text-primary underline'>
              Log in
            </Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default page
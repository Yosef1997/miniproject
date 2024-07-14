"use client"
import React, { useState } from "react"
import Tickitz from "@/public/navbar-logo-mobile.svg"
import TickitzWhite from "@/public/tickitz-white.svg"
import Image from "next/image"
import { Field, Form, Formik, FormikProps } from "formik"
import * as yup from "yup"
import { IoIosEye } from "@react-icons/all-files/io/IoIosEye"
import { IoIosEyeOff } from "@react-icons/all-files/io/IoIosEyeOff"
import Link from "next/link"
import useLogin from "@/hooks/useLogin"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

const signinSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
})

interface signinValues {
  email: string
  password: string
}

const SignIn = () => {
  const [isShow, setIsShow] = useState(false)
  const { handleSignIn, loading, error } = useLogin()
  const initialValues: signinValues = { email: "", password: "" }

  if (error) {
    return <div>Something Error</div>
  }

  return (
    <div className='lg:grid lg:grid-cols-3 min-h-screen'>
      <div className='hidden justify-center items-center lg:flex lg:flex-col lg:col-span-2 bg-primary-dark bg-opacity-80'>
        <Image src={TickitzWhite} width={500} alt='Tickitz-white' />
        <h2 className='text-white text-5xl'>wait, watch, wow!</h2>
      </div>
      <div className='px-6 my-12 lg:px-14 lg:mt-12 xl:my-auto'>
        <Image className='lg:hidden' src={Tickitz} alt='Tickitz-mobile' />
        <h2 className='text-title text-2xl lg:text-5xl py-10 lg:py-0'>
          Sign In
        </h2>
        <p className='text-lg text-placeholder mt-3 mb-12 hidden lg:block'>
          Sign in with your data that you entered during your registration
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={signinSchema}
          onSubmit={async (values) => {
            await handleSignIn(values)
          }}
        >
          {(props: FormikProps<signinValues>) => {
            const { values, errors, touched, handleChange } = props
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
                <div className='flex flex-col mb-10'>
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
                {loading ? (
                  <Button disabled>
                    <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                    Please wait
                  </Button>
                ) : (
                  <button
                    className='bg-primary text-white font-bold w-full py-6 rounded-md'
                    type='submit'
                  >
                    Sign In
                  </button>
                )}
              </Form>
            )
          }}
        </Formik>
        <p className='text-label text-center font-semibold mt-8'>
          Forgot your password?{" "}
          <span>
            <Link href={"/forgot-password"} className='text-primary underline'>
              Reset now
            </Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default SignIn

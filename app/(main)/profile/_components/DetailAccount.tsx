import { MdAccountCircle } from "react-icons/md"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { Field, Form, Formik, FormikProps } from "formik"
import React, { useState } from "react"
import * as yup from "yup"
import { IoIosEye } from "react-icons/io"
import { IoIosEyeOff } from "react-icons/io"
import Image from "next/image"
import LoyaltyCard from "@/public/loyalty-card.svg"

const detailAccountSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),
  phone: yup
    .string()
    .min(11, "Phone number must be 11 numbers at minimum")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters at minimum")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(8, "Password must be 8 characters at minimum")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),
})

interface detailAccountValues {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const DetailAccount = () => {
  const [isShow, setIsShow] = useState(false)
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const initialValues: detailAccountValues = {
    fullName: "Jonny Doe",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }
  return (
    <div className='px-6 pt-8 pb-16'>
      <div className='bg-white rounded-t-md border-b border-border-line p-10'>
        <div className='flex justify-between items-center'>
          <h2 className='text-body'>INFO</h2>
          <button type='button' title='Update Profile Image'>
            <BiDotsHorizontalRounded size={28} />
          </button>
        </div>
        <div className='flex flex-col items-center my-8'>
          <MdAccountCircle size={136} />
        </div>
        <p className='text-xl text-title font-semibold text-center'>
          {initialValues.fullName}
        </p>
      </div>
      <div className='bg-white rounded-b-md  p-10 mb-12'>
        <h2 className='text-body font-semibold'>Loyalty Points</h2>
        <div className='relative mt-6 mb-8'>
          <Image src={LoyaltyCard} alt='Loyalty-card' />
          <h2 className='absolute top-4 left-4 font-bold text-lg text-white'>
            Customer
          </h2>
          <p className='absolute bottom-4 left-4 font-semibold text-2xl text-white'>
            {320} <span className='text-[10px] text-white'>points</span>
          </p>
        </div>
        <p className='text-body text-sm text-center'>
          {180} points become a master
        </p>
        <div className='bg-background-v2 h-4 rounded-lg w-full relative mt-2 mb-10'>
          <div
            style={{ width: `${Math.ceil(320 / 6)}%` }}
            className='bg-primary h-full rounded-lg'
          />{" "}
        </div>
      </div>

      <div>
        <h2 className='font-semibold text-lg'>Account Settings</h2>
        <div className='bg-white rounded-md px-6 py-8 mt-6 mb-2'>
          <Formik
            initialValues={initialValues}
            validationSchema={detailAccountSchema}
            onSubmit={async (values) => {
              console.log(values)
            }}
          >
            {(props: FormikProps<detailAccountValues>) => {
              const { values, errors, touched, handleChange } = props
              console.log(props.values)
              return (
                <Form>
                  <h2 className='w-full pt-2 border-b border-border-line text-title mb-10 py-2'>
                    Details Information
                  </h2>
                  <div className='flex flex-col mb-6'>
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
                  <div className='flex flex-col mb-6'>
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
                  <div className='flex flex-col mb-14'>
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
                  <h2 className='w-full pt-2 border-b border-border-line text-title mb-10 py-2'>
                    Account and Privacy
                  </h2>
                  <div className='flex flex-col mb-6'>
                    <label htmlFor='password' className='text-body'>
                      New Password
                    </label>
                    <div className='px-4 py-3 mt-3 text-body rounded-md border border-border-line flex items-center'>
                      <Field
                        className='w-full focus:outline-none'
                        type={!isShow ? "password" : "text"}
                        name='password'
                        onChange={handleChange}
                        value={values.password}
                        placeholder={values.password}
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
                  <div className='flex flex-col mb-12'>
                    <label htmlFor='confirmPassword' className='text-body'>
                      Confirm Password
                    </label>
                    <div className='px-4 py-3 mt-3 text-body rounded-md border border-border-line flex items-center'>
                      <Field
                        className='w-full focus:outline-none'
                        type={!isShowConfirm ? "password" : "text"}
                        name='confirmPassword'
                        onChange={handleChange}
                        value={values.confirmPassword}
                        placeholder={values.confirmPassword}
                      />
                      <button
                        type='button'
                        onClick={() => setIsShowConfirm(!isShowConfirm)}
                      >
                        {!isShowConfirm ? (
                          <IoIosEye size={20} />
                        ) : (
                          <IoIosEyeOff size={20} />
                        )}
                      </button>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <div className='text-error text-sm mt-1'>
                        {errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>

                  <button
                    className='bg-primary text-white text-sm font-bold w-full py-2 rounded-md mb-4'
                    type='submit'
                  >
                    Update changes
                  </button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default DetailAccount

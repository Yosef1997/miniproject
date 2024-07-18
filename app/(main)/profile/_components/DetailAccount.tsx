import { Field, Form, Formik, FormikProps } from "formik"
import React, { useEffect, useState } from "react"
import * as yup from "yup"
import { IoIosEye } from "@react-icons/all-files/io/IoIosEye"
import { IoIosEyeOff } from "@react-icons/all-files/io/IoIosEyeOff"
import useProfile from "@/hooks/useProfile"
import { User } from "@/types/users"
import { PROFILE_STORAGE } from "@/constant/constant"
import useUpdateProfile, { UpdateProfileReq } from "@/hooks/useUpdateProfile"
import { toast } from "@/components/ui/use-toast"

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
  const [data, setData] = useState<User>()
  const { handleUpdateProfile, response, loading } = useUpdateProfile()

  useEffect(() => {
    const storage = localStorage.getItem(PROFILE_STORAGE)
    if (storage !== null) {
      const parsedData = JSON.parse(storage)
      setData(parsedData)
    }
  }, [response])

  const initialValues: detailAccountValues = {
    fullName: data?.username ?? "",
    email: data?.email ?? "",
    phone: data?.phone ?? "",
    password: "",
    confirmPassword: "",
  }

  const handleUpdate = async () => {
    if (initialValues.password !== initialValues.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Change password failed",
      })
    }
    if (initialValues.password === "" && initialValues.confirmPassword === "") {
      const req: UpdateProfileReq = {
        username: initialValues.fullName,
        email: initialValues.email,
        password: initialValues.password,
        phone: initialValues.phone,
      }
      handleUpdateProfile(req)
    }
  }

  return (
    <div>
      <h2 className='font-semibold text-lg lg:hidden'>Account Settings</h2>
      <div className='bg-white rounded-md px-6 py-8 mt-6 mb-2 lg:mt-0'>
        <Formik
          initialValues={initialValues}
          validationSchema={detailAccountSchema}
          onSubmit={async (values) => {}}
          enableReinitialize={true}
        >
          {(props: FormikProps<detailAccountValues>) => {
            const { values, errors, touched, handleChange } = props
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
                <div className='lg:grid lg:grid-cols-2 lg:gap-x-8'>
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
                </div>

                <h2 className='w-full pt-2 border-b border-border-line text-title mb-10 py-2'>
                  Account and Privacy
                </h2>
                <div className='lg:grid lg:grid-cols-2 lg:gap-x-8'>
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
                </div>

                <button
                  className='bg-primary text-white text-sm font-bold w-full lg:w-1/2 py-2 rounded-md mb-4'
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
  )
}

export default DetailAccount

"use client"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { AiOutlineEye } from "react-icons/ai"
import React, { useState } from "react"

interface FormInputProps {
  label: string
  type: string
  name: string
  onChange: () => void
  value: string
  placeholder: string
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div>
      <label htmlFor={props.label} className='text-body'>
        {props.label}
      </label>
      <div className='px-6 py-5 mt-3 border border-border-line flex items-center'>
        <input
          className='focus:outline-none text-black w-full'
          id={props.label}
          name={props.name}
          type={props.type}
          onChange={props.onChange}
          value={props.value}
          placeholder={props.placeholder}
        />
        {props.type == "password" ? (
          showPassword ? (
            <AiOutlineEyeInvisible
              size={24}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiOutlineEye size={24} onClick={() => setShowPassword(true)} />
          )
        ) : null}
      </div>
    </div>
  )
}

export default FormInput

'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { generatePDF } from '../utils'

export const Editor = ({}) => {
  const [value, setValue] = useState('')
  const [fileName, setFileName] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value)
  }

  const reset = () => {
    setValue('')
    setFileName('')
  }

  const generate = async () => {
    if (!value) {
      toast.error('Please enter some text to download')
      return
    }
    try {
      await generatePDF({ content: value, fileName: fileName || 'file' })
      reset()
      toast.success('PDF generated and downloaded successfully')
    } catch (error) {
      toast.error('Something went while generating the pdf')
    }
  }

  return (
    <div className="flex flex-col w-full gap-16 md:gap-24 max-w-[1034px]">
      <h3
        className={`
        text-6xl font-semibold
        md:text-7xl
      `}
      >
        Create simple pdf 🚀
      </h3>

      <div className="flex flex-col gap-8">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="Enter your text here"
          className={`
            w-full
            p-5
            border
            'border-gray-300'
            rounded-xl
            resize-y
            bg-white
            text-gray-800
            min-h-[200px]
            text-lg
            font-medium
            leading-5
            text-left
            custom-font
            placeholder-gray-500
            focus:outline-none
            focus:border-blue-600
          `}
        />

        <input
          value={fileName}
          onChange={handleFileNameChange}
          placeholder="File name (optional)"
          className={`
            w-full p-5
            border border-gray-300
            rounded-xl bg-white
            text-gray-800
            placeholder-gray-500
            focus:outline-none
            focus:border-blue-600
            text-base
            font-medium
            leading-4
            text-left
          `}
        />

        <button
          onClick={generate}
          className="
            w-fit
            p-5
            border
            border-gray-300
            rounded-xl
            resize-y
            bg-white
            text-gray-800
            text-lg
            font-medium
            leading-5
            text-left
            custom-font
            placeholder-gray-500
            focus:outline-none
            focus:border-blue-600
          "
        >
          Download PDF
        </button>
      </div>
    </div>
  )
}

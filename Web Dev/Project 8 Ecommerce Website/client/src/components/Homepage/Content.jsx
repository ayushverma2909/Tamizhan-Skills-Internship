import React from 'react'
import Button from '../../assets/Utility/Button'
import frontImage from '../../assets/frontImage.png'

const Content = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center px-4 md:px-12 py-10 gap-6">
  
        <div className="flex-1 max-w-[500px] w-full  rounded overflow-hidden">
          <img
            src={frontImage}
            alt="Front"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 max-w-[500px] w-full p-6 rounded text-center md:text-left">
          <p className="text-sm text-gray-600">SUMMER 2025</p>
          <h3 className="text-2xl md:text-3xl font-semibold my-2">Part Of The Neural Universe</h3>
          <p className="text-gray-700 mb-6">
            We know how large objects will act, but things on a small scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button buttonName="BUY NOW" />
            <Button
              buttonName="READ MORE"
              bgColor="bg-white"
              textColor="text-green-800"
              hoverBgColor="hover:bg-gray-100"
            />
          </div>
        </div>

      </div>
  )
}

export default Content
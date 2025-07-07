import React from 'react'
import Button from '../../assets/Utility/Button'

const Banner = (props) => {
  return (
    <div className="relative w-full h-[95vh] overflow-hidden">

        <img
          src={props.heroImage}
          alt="hero image"
          className="w-full h-full object-cover object-top"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center sm:text-left sm:left-1/3 px-4">
          <p className="text-[16px] font-semibold drop-shadow-lg mb-15">{props.year}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg mt-2">{props.heading}</h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl font-normal drop-shadow-md max-w-md mb-15">
            {props.text1}<br className="hidden sm:block " />
            {props.text2}
          </p>
          <Button
            buttonName = {props.buttonName}
          />
          
        </div>
      </div>
  )
}

export default Banner
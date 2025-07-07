import React from "react";
import sample1 from "../../assets/EditorsPick/sample1.png";
import sample2 from "../../assets/EditorsPick/sample2.png";
import sample3 from "../../assets/EditorsPick/sample3.png";
import sample4 from "../../assets/EditorsPick/Sample4.png";

const EditorPick = () => { 
  return (
    <div>
      <div className="flex flex-col justify-center items-center p-5 mt-10">
        <h3 className="text-3xl font-bold">EDITOR'S PICK</h3>
        <p className="text-gray-600">Give your body a little comfort</p>
      </div>

      <div className="px-4 md:px-20 lg:px-40 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="relative col-span-1 sm:col-span-2 sm:row-span-2">
          <img src={sample1} alt="Men" className="w-full h-full object-cover rounded-lg" />
          <button className="absolute bottom-5 left-5 bg-white text-black px-4 py-2 font-semibold text-[14px] cursor-pointer hover:bg-gray-100 rounded-md shadow-md">
            MEN
          </button>
        </div>

        <div className="relative col-span-1 sm:row-span-2">
          <img src={sample3} alt="Women" className="w-full h-full object-cover rounded-lg" />
          <button className="absolute bottom-5 left-5 bg-white text-black px-4 py-2 font-semibold text-[14px] cursor-pointer hover:bg-gray-100 rounded-md shadow-md">
            WOMEN
          </button>
        </div>

        <div className="relative">
          <img src={sample2} alt="Accessories" className="w-full h-full object-cover rounded-lg" />
          <button className="absolute bottom-5 left-5 bg-white text-black px-4 py-2 font-semibold text-[14px] cursor-pointer hover:bg-gray-100 rounded-md shadow-md">
            ACCESSORIES
          </button>
        </div>

        <div className="relative">
          <img src={sample4} alt="Kids" className="w-full h-full object-cover rounded-lg" />
          <button className="absolute bottom-5 left-5 bg-white text-black px-4 py-2 font-semibold text-[14px] cursor-pointer hover:bg-gray-100 rounded-md shadow-md">
            KIDS
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorPick;

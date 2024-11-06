import { useState, useRef } from "react";

function Brands() {
  const row1 = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  const row2 = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  return (
    <>
      <div className="mt-20 w-11/12 mx-auto">
        <p className="text-center font-bold text-5xl text-[#1e1e1e]">
          Brands Thriving with AfterBurn
        </p>
        <div className="marquee flex w-full select-none overflow-hidden">
            <div className="marquee-group shrink-0 flex items-center justify-around whitespace-nowrap w-full">
                {
                    row1.map((el, index) => {
                        return (
                            <div key={index} className="image-group grid place-items-center">
                                <img className="object-contain w-full h-full rounded-lg aspect-video px-20 py-5 shadow-lg" src={el} alt="" />
                            </div>
                        )
                    })
                }
            </div>
            <div className="marquee-group shrink-0 flex items-center justify-around whitespace-nowrap w-full">
                {
                    row1.map((el, index) => {
                        return (
                            <div key={index} className="image-group grid place-items-center">
                                <img className="object-contain w-full h-full rounded-lg aspect-video px-20 py-5 shadow-lg" src={el} alt="" />
                            </div>
                        )
                    })
                }
            </div>    
        </div>
        <div className="marquee flex w-full select-none overflow-hidden">
            <div className="marquee-group2 shrink-0 flex items-center justify-around whitespace-nowrap w-full">
                {
                    row2.map((el, index) => {
                        return (
                            <div key={index} className="image-group grid place-items-center">
                                <img className="object-contain w-full h-full rounded-lg aspect-video px-20 py-5 shadow-lg" src={el} alt="" />
                            </div>
                        )
                    })
                }
            </div>
            <div className="marquee-group2 shrink-0 flex items-center justify-around whitespace-nowrap w-full">
                {
                    row2.map((el, index) => {
                        return (
                            <div key={index} className="image-group grid place-items-center">
                                <img className="object-contain w-full h-full rounded-lg aspect-video px-20 py-5 shadow-lg" src={el} alt="" />
                            </div>
                        )
                    })
                }
            </div> 
        </div>
      </div>
    </>
  );
}

export default Brands;

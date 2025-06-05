import React from 'react';

export default function NavBarButton({text}) {
    return(
        <div className='flex-row text-white text-1xl flex justify-center items-center h-full transition-all duration-300 hover:bg-black cursor-pointer w-15/100'>
            <p className='font-titillium font-semibold'>{text}</p>
        </div>
    )
}
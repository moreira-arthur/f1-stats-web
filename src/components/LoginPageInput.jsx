import React from 'react';

import { Input } from "@/components/ui/input"

export default function LoginPageInput({ label, type, placeholder }) {
    return(
        <div className='flex flex-col items-start justify-start w-full h-fit mb-5'>
            <label className='text-xs mb-2'>{label}</label>
            <Input type={type} placeholder={placeholder} className="text-xs bg-white"></Input>
        </div>
    )

}
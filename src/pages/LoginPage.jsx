import React from 'react';

import { useNavigate } from 'react-router-dom';

import f1_logo from '../assets/f1_logo.png';
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

import LoginPageInput from '@/components/LoginPageInput';

export default function LoginPage() {

    const navigate = useNavigate();

    return(
        <div className='flex flex-col items-start h-screen w-screen' style={{ backgroundColor: '#f8f7ef'}}>   
            <div className='flex flex-row items-center justify-start w-screen h-2/10 ' style={{ backgroundColor: 'rgb(21, 21, 30)'}} >
                <div className='flex flex-row items-center w-7/10 h-full'>
                    <div className='flex flex-col items-start justify-center h-fit w-2/10 ml-10 mr-10'>
                        <img src={f1_logo} className="cursor-pointer" onClick={()=>navigate("/")}/>
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center justify-start w-screen h-1/10 ' style={{ backgroundColor: '#38383f'}} />
            <div className='flex flex-col items-center justify-center w-full h-full' style={{ backgroundColor: '#f8f7ef'}}>
                <div className='flex flex-col items-center justify-start w-4/10 h-full rounded-lg'>
                    <div className='flex flex-col items-start justify-center w-full h-1/5'>
                        <h1 className='text-3xl font-titillium text-center'>SIGN IN</h1>
                    </div>
                    <Separator className='w-full h-1 bg-gray-300 mb-'/>
                    <div className='flex flex-col items-center justify-start w-full h-full mt-5'>
                        <LoginPageInput label='Username' type='email' placeholder='Enter your username'/>
                        <LoginPageInput label='Password' type='password' placeholder='Enter your password'/>
                        <div className='w-full h-full'>
                            <button type='submit'className='text-white bg-red-600 font-titillium rounded bg-red 600 rounded w-2/10 h-1/5 mt-6 flex items-center border-2 border-transparent justify-center text-xs cursor-pointer hover:bg-white hover:text-red-600 hover:border-red-600
                            transition-colors duration-200'>SIGN IN</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
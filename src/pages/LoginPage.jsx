import React from 'react';
import f1_logo from '../assets/f1_logo.png';
import { Input } from "@/components/ui/input"

export default function LoginPage() {
    return(
        <div className='flex flex-col items-start h-screen w-screen' style={{ backgroundColor: '#f8f7ef'}}>   
            <div className='flex flex-row items-center justify-start w-screen h-2/10 ' style={{ backgroundColor: 'rgb(21, 21, 30)'}} >
                <div className='flex flex-row items-center w-7/10 h-full'>
                    <div className='flex flex-col items-start justify-center h-fit w-2/10 ml-10 mr-10'>
                        <img src={f1_logo}/>
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center justify-start w-screen h-1/10 ' style={{ backgroundColor: '#38383f'}} />
            <div className='flex flex-col items-center justify-center w-full h-7/10' style={{ backgroundColor: '#f8f7ef'}}>
                <div className='flex flex-col items-center justify-center w-4/10 h-full bg-white shadow-lg rounded-lg'>
                    <h1 className='text-3xl font-bold text-center mb-4'>Login</h1>
                    <form className='flex flex-col items-center'>
                        <input type='text' placeholder='Username' className='mb-2 p-2 border border-gray-300 rounded w-64'/>
                        <input type='password' placeholder='Password' className='mb-4 p-2 border border-gray-300 rounded w-64'/>
                        <button type='submit' className='bg-blue-500 text-white p-2 rounded w-64'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
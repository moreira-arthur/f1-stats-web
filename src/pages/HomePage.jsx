import React from 'react';
import { useNavigate } from 'react-router-dom';

import { GoChevronDown } from "react-icons/go";
import f1_live_hero from '../assets/f1-live-hero.avif';
import F1_75_Logo from '../assets/F1_75_Logo.png';
import { Button } from '@/components/ui/button';
import NavBarButton from '@/components/NavBarButton';

export default function HomePage() {
    
    const navigate = useNavigate();

    return(
        <div className='flex flex-col items-start h-screen w-screen' style={{
            backgroundImage: `url(${f1_live_hero})`,
            backgroundSize: '150%',
            backgroundPosition: 'center',
        }} >   
            <div className='flex flex-row items-center justify-start w-screen h-1/8 ' style={{ backgroundColor: 'rgb(225, 6, 0)'}} >
                <div className='flex flex-row items-center w-8/10 h-full'>
                    <div className='flex flex-col items-start justify-center h-fit w-2/10 ml-20 mr-10'>
                        <img src={F1_75_Logo}/>
                    </div>
                    <NavBarButton text='Cadastro'/>
                    <NavBarButton text='Dashboard'/>
                    <NavBarButton text='Grupo'/>
                </div>
                <div className='flex flex-col items-end justify-center h-full w-2/5'>
                    <Button className='mr-10 cursor-pointer text-white hover:bg-white hover:text-red-600 transition-colors duration-200' size='lg' onClick={()=>navigate('/login')}>Login</Button>
                </div>
            </div>
        </div>
    )
}
import React from 'react';
import loginI from '../assets/image/login.jpg';
import { LoginSVG } from '../components/svg/LoginSVG';

export default function Login() {
  return (
    <div className='w-screen h-screen bg-gray-400 font-mono'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row gap-4'>
            <div className='w-2/4'>
              {/* Imagen */}
              <div className='flex h-screen w-full justify-center items-center'>
                <LoginSVG />
              </div>
            </div>
            <div className='w-2/4'>
              {/* Formm */}
              <div className="flex h-screen w-full justify-center items-center">
                <div className='w-full max-w-md'>
                  <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>

                    <div className='mb-4'>
                      <p className='block text-gray-700 text-3xl text-center font-bold mb-2'>Login</p>
                    </div>

                    <div className='mb-4'>
                      
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />

                    </div>

                    <div className="mb-4">

                      <label htmlFor="Password" className='block text-gray-700 text-sm font-bold mb-2'>
                        Password
                      </label>

                      <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='password' type="password" placeholder='Password' />
                    </div>

                    <div className="mb-4">

                    <button class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-600 hover:border-red-500 rounded w-full">
                      Button
                    </button>

                    </div>

                  </form>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

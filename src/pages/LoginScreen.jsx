import React, { useState } from 'react';
import { LoginSVG } from '../components/svg/LoginSVG';
import { useForm } from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';

export default function LoginScreen() {

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage]     = useState(false);

  const navigate = useNavigate();

  const auth = useAuthContext();
  
  const { email, password, onChange } = useForm(
    {
      email: '',
      password: '',
    }
  );

  const isDisabled = () => {

    if( email === '' || password === '' ){
      return true;
    } else {
      return false;
    }

  }

  const onSubmitHandlet = ( e ) => {
    e.preventDefault();

    if(auth.login(email, password))
    {
        navigate(`/home/${email}`, { replace: true });
    }else {

        setShowErrorMessage(true);
    }

  }

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
                  <form onSubmit={ onSubmitHandlet }
                  className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>

                    <div className='mb-4'>
                      <p className='block text-gray-700 text-3xl text-center font-bold mb-2'>Login</p>
                    </div>

                    <div className='mb-4'>
                      
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                      </label>
                      <input value={email} onChange={({ target }) => onChange( target.value, 'email' )} 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />

                    </div>

                    <div className="mb-4">

                      <label htmlFor="Password" className='block text-gray-700 text-sm font-bold mb-2'>
                        Password
                      </label>

                      <input value={ password } onChange={ ({ target }) => onChange(target.value, 'password') }
                      className={`shadow appearance-none border ${ showErrorMessage && 'border-red-500' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `} id='password' type="password" placeholder='Password' />
                    </div>

                    {
                      showSuccessMessage ? (<div className='text-center py-4'>Authenticated Successfully</div>) : null
                    }

                    {
                      showErrorMessage ? (<div className='text-center py-4'>Authenticated Failed. Please check your credentials.</div>) : null
                    }

                    <div className="mb-4">

                      <button disabled={ isDisabled() } type='submit'
                      className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-600 hover:border-red-500 rounded w-full">
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

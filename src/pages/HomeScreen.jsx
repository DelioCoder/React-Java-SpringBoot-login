import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthProvider';

export default function HomeScreen() {
  
  const { email } = useParams();
  
  const auth = useAuthContext();

  const navigate = useNavigate();

  function logout()
  {
    navigate(`/`, { replace: true });

    auth.logout();
  }

  return (
    <div className='h-screen flex justify-center items-center static'>
        <div className='flex flex-col '>
          <div>
            <p className='text-7xl text-white text-center'>Hello</p><span className='mx-4 text-7xl capitalize text-amber-400 hover:text-amber-600'>{ email }</span>
          </div>
          <div className='py-4 text-center'>
            <Link to="/todos" className='text-4xl text-white hover:text-yellow-400' >Todos</Link>
          </div>
          
        </div>
        <div className="absolute bottom-4 left-4"><p className='text-white text-4xl'>DelioCoder7</p></div>
        <div className="absolute bottom-4 right-4 cursor-pointer">
          <p className='text-white text-4xl hover:text-black' onClick={logout}>Logout</p>
        </div>
    </div>

  )
}

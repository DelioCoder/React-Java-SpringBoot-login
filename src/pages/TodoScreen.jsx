import React from 'react'
import { Link } from 'react-router-dom';

export default function TodoScreen() {

  const today = new Date();

  const targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDay());

  const todos = [
    {
      id: 1,
      description: 'Learn AWS',
      done: false,
      date: targetDate
    },
    {
      id: 2,
      description: 'Learn Full Stack Dev',
      done: false,
      date: targetDate
    },
    {
      id: 3,
      description: 'Learn DevOps',
      done: false,
      date: targetDate
    }
  ];

  return (
    <div className='container mx-auto h-screen bg-gray-900 static'>
        <p className='py-6 text-7xl text-center text-yellow-400 hover:text-yellow-500'>Things you want to do!</p>
        <div className='w-full my-4'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className='text-sm text-gray-700 uppercase dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3 bg-gray-800'>id</th>
                    <th scope='col' className='px-6 py-3 '>Description</th>
                    <th scope='col' className='px-6 py-3 bg-gray-800'>is Done?</th>
                    <th scope='col' className='px-6 py-3 '>Date</th>
                  </tr>
                </thead>

                <tbody>

                  {
                    todos.map((todo, i) => (
                      <tr key={i} className='border-b border-gray-700'>
                        <td
                          scope="row"
                          className='px-6 py-4 font-medium  whitespace-nowrap text-white bg-gray-800'
                        >{todo.id}</td>
                        <td className='px-6 py-4'>{todo.description}</td>
                        <td
                          className='px-6 py-4 font-medium  whitespace-nowrap text-white bg-gray-800'
                        >{todo.done.toString()}</td>
                        <td className='px-6 py-4'>{todo.date.toDateString()}</td>
                      </tr>
                        
                      ))
                  }
                </tbody>
              </table>
            </div>
            {/* <div className='my-4'>
              <Link to="/welcome" className='text-white'>{'<-'}Go back to home</Link>
            </div>
             */}
        </div>
        <div className="absolute bottom-4 left-4"><p className='text-white text-4xl'>DelioCoder7</p></div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { deleteTodo, retrieveAllTodoForUsername } from '../api/todoApiService';
import { useAuthContext } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

export default function TodoScreen() {

  const { username } = useAuthContext();

  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    
    refreshTodos();
    
  }, []);

  function refreshTodos()
  {
    retrieveAllTodoForUsername(username)
    .then((response) => {
      console.log(response);
      setTodos(response.data);
    })
    .catch(error => console.log(error));
  }

  function deleteTodoHandle(id)
  {
    console.log(`Todo ${id} has been deleted`);
    deleteTodo(username, id)
    .then(() => {
      setMessage(`Delete of todo with ${id} succesful`);
      refreshTodos();
    })
    .catch(error => console.log(error));
  }

  function updateTodoHandle(id)
  {
    navigate(`/todo/${ id }`);
  }

  function addNewTodoHandle()
  {
    navigate(`/todo/-1`);
  }

  return (
    <div className='container mx-auto h-screen bg-gray-900 static'>
        <p className='py-6 text-7xl text-center text-yellow-400 hover:text-yellow-500'>Things you want to do!</p>
        {
          message && (
            <div className='w-full border rounded-lg text-center py-4 border-yellow-400 text-yellow-400 text-2xl my-8'>
              { message }
            </div>
          )
        }
        <div className='w-full my-4'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className='text-sm text-gray-700 uppercase dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3 bg-gray-800'>id</th>
                    <th scope='col' className='px-6 py-3 '>Description</th>
                    <th scope='col' className='px-6 py-3 bg-gray-800'>is Done?</th>
                    <th scope='col' className='px-6 py-3 '>Date</th>
                    <th scope='col' className='px-6 py-3 bg-gray-800 text-center'>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {
                    todos && todos.map((todo, i) => (
                      <tr key={i} className='border-b border-gray-700'>
                        <td
                          scope="row"
                          className='px-6 py-4 font-medium  whitespace-nowrap text-white bg-gray-800'
                        >{todo.id}</td>
                        <td className='px-6 py-4'>{todo.description}</td>
                        <td
                          className='px-6 py-4 font-medium  whitespace-nowrap text-white bg-gray-800'
                        >{todo.done.toString()}</td>
                        <td className='px-6 py-4'>{todo.targetDate.toString()}</td>
                        <td className='flex justify-center gap-x-10'>
                          <button
                            className='transition my-4 bg-transparent hover:bg-yellow-400 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-400 hover:border-transparent rounded'
                            onClick={() => deleteTodoHandle(todo.id)}
                          >Delete</button>
                          <button
                            className='transition my-4 bg-transparent hover:bg-green-400 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-400 hover:border-transparent rounded'
                            onClick={() => updateTodoHandle(todo.id)}
                          >Update</button>
                        </td>
                      </tr>
                        
                      ))
                  }
                </tbody>
              </table>
            </div>
         
            <div className='transition my-8 bg-transparent w-40 cursor-pointer text-center hover:bg-green-400 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-400 hover:border-transparent rounded'
              onClick={addNewTodoHandle}
            > 
            Add New Todo
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

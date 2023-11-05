import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useAuthContext } from '../context/AuthProvider'
import { createTodo, retrieveOneTodo, updateTodo } from '../api/todoApiService';
import moment from 'moment';

export default function SoloTodoScreen() {

  const navigate = useNavigate();

  const [state, setState] = useState(
    {
      description: '',
      targetDate: ''
    }
  );

  const { id } = useParams();

  const { username } = useAuthContext();

  useEffect(() => {
    
    retrieveTodoHandle();
    
  }, [id]);

  function retrieveTodoHandle()
  {

    if(id != -1)
    {
      retrieveOneTodo( username, id )
      .then((response) => {
        setState({ description: response.data.description, targetDate: response.data.targetDate });
      })
      .catch(error => console.log(error));
    }

  }

  const onSubmitHandle = (values) => {
    console.log(values);
    const todo = {
      id,
      username,
      description: values.description,
      targetDate: values.targetDate,
      done: false
    }

    if(id == -1)
    {

      createTodo(username, todo)
      .then(() => {
        navigate('/todo')
      })
      .catch(error => console.log(error));

    }else {

      updateTodo(username, id , todo)
      .then(() =>{
        navigate('/todo');
      })
      .catch(error => console.log(error));
    
    }

  }

  const validateHandle = (values) => {
    let errors = { };

    if(values.description.length < 5 || values.description === '') 
    {
      errors.description = 'Enter atleast 5 characters';
    }

    if(values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid())
    {
      errors.targetDate = 'Enter a target date';
    }

    return errors;
  }

  return (
    <div className='h-screen w-screen text-white flex justify-center items-center static'>
      <div className='flex w-full justify-center items-center static'>
        <Formik className="w-full" initialValues={ state } enableReinitialize={true}  onSubmit={onSubmitHandle} validate={ validateHandle } >
          {
            (props) => (
              <Form className='w-1/2 shadow-2xl p-10 rounded-3xl shadow-red-500/50'>

                <ErrorMessage name="description" component="div" className='w-full border rounded-lg text-center py-4 border-red-400 text-red-400 text-2xl my-8' />

                <ErrorMessage name="targetDate" component="div" className='w-full border rounded-lg text-center py-4 border-red-400 text-red-400 text-2xl my-8' />

                <div className='mb-12'>
                  {
                    id != -1 ? (<p className='text-center text-3xl'>Update Todo number { id }</p>) : (<p className='text-center text-3xl'>Add new Todo</p>)
                  }
                </div>
                <fieldset className='relative z-0 w-full mb-12 group'>
                  <label
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >Description</label>
                  <Field type="text" name="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                </fieldset>
                <fieldset className='relative z-0 w-full mb-6 group'>
                  <label 
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                  Target Date</label>
                  <Field type="date" name="targetDate" className="block py-2.5 text-white px-0 w-full  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                </fieldset>
                <div className='mb-4'>
                  <button type='submit'
                      className="transition bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-600 hover:border-red-500 rounded w-full">
                    Button
                  </button>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
}

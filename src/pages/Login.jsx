import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { increment } from '../functions/auth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    const loginFunc = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:3000/auth/login`, {
            email: email,
            password: password
        })
            .then((response) => {
                dispatch(increment(response.data.data.token))
                alert('Success Login');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        if (token) {
            alert('Success Login');
        }
    }, []);

    return (
        <div className='bg-red-500 flex flex-col justify-center items-center md:h-screen'>
            <div className='flex justify-between w-[500px] pt-4 pb-4 pl-1 rounded-md'>
                <div>
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" className='w-[200px] rounded-md' alt="" srcset="" />
                </div>
                <div>
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" className='w-[200px] rounded-md' alt="" srcset="" />
                </div>
            </div>
            <div className="bg-white w-[500px] pt-4 pb-4 rounded-md">
                <form className='max-w-sm mx-auto' onSubmit={loginFunc}>
                    <div className="mb-5">
                        <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>E-mail <span classname="text-red-500">*</span></label>
                        <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Masukan E-mail Anda' />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>E-mail <span classname="text-red-500">*</span></label>
                        <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Masukkan Password Anda' />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log in</button>
                </form>

            </div>
        </div>
    )
}

export default Login
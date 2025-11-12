import {  signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, NavLink } from 'react-router-dom'
import { auth } from '../../firebase'

const SignIn = () => {
    const {register,handleSubmit,reset} =useForm()
    function regist(data){
        signInWithEmailAndPassword(auth,data.email,data.password)
        // .then((user)=>{
        //     console.log(user)
        // })
          .then((user)=>{
            alert(" login successfully!")
            reset()
            console.log(user?.user?.uid)
            localStorage.setItem('userId',user?.user?.uid)
        })
         .catch(err=>alert(err.message))
         
    }
  return (
    <>
    <form onSubmit={handleSubmit(regist)} className="col-lg-6 mx-auto my-5 p-5 shadow">
        <h2 className='text-center'>Login</h2>
        <div className="mt-4">
            <input type="text"{...register('email')} className='form-control' placeholder="enter email id" />
        </div>
         <div className="mt-4">
               <input type="text"{...register('password')} className='form-control' placeholder="enter password " />
        </div>
        <div className="mt-5 btn-group">
            <button className='btn btn-success'>Register</button>
            <NavLink to="/signin" className='btn btn-info g-5' >Login</NavLink>
        </div>
    </form>
    
    </>
  )
}

export default SignIn
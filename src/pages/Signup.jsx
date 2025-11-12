import { createUserWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'
import { auth } from '../../firebase'

const Signup = () => {
    const {register,handleSubmit,reset} =useForm()
    function regist(data){
        createUserWithEmailAndPassword(auth,data.email,data.password)
        // .then((user)=>{
        //     console.log(user)
        // })
        .then((user)=>{
            alert("user register")
            reset()
            console.log(user)
        })
         .catch(err=>alert(err.message))
    }
  return (
    <>
    <form onSubmit={handleSubmit(regist)} className="col-lg-6 mx-auto my-5 p-5 shadow">
        <h2 className='text-center'>register</h2>
        <div className="mt-4">
            <input type="text"{...register('email')} className='form-control' placeholder="enter email id" />
        </div>
         <div className="mt-4">
               <input type="text"{...register('password')} className='form-control' placeholder="enter password " />
        </div>
        <div className="mt-5">
            <button className='btn btn-success'>register</button>
        </div>
    </form>
    
    </>
  )
}

export default Signup
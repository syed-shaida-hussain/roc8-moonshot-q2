"use client";

import Link from 'next/link'
import styles from "../signup/signupPage.module.css"
import { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [user , setUser] = useState({username: "" , password : ""});
  const [error , setError] = useState({usernameError : "" , passwordError : ""});
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/login' , user);
      if(res.status !== 201) {
        setError({...error , usernameError : res?.data?.errors?.username , passwordError : res?.data?.errors?.password})
      }
      if(res?.data?.status === 200){
        router.push("/");
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleLogin} className= {styles.container}>
        <div className= {styles.wrapper}>
          <h1 className= {styles.title}>Login</h1>
          <label className= {styles.label}> Username
            <input value={user?.username} type='text' placeholder='Enter your username' className= {styles.input} onChange={(e) => setUser({...user , username : e.target.value})} />
            <div className={styles.error}>{error?.usernameError}</div>
          </label>
          <label className= {styles.label}> Password
            <input value={user?.password} type='password' placeholder='Enter your password' className= {styles.input} onChange={(e) => setUser({...user , password : e.target.value})}  />
            <div className={styles.error}>{error?.passwordError}</div>
          </label>
          <button type='submit' className= {styles.button}>Login</button>
          <Link href= "/signup" className= {styles.link}>New here? Register</Link>
        </div>
    </form>
  )
}

export default LoginPage
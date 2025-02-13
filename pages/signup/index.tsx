import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {auth,createUserWithEmailAndPassword,firestore} from "../../firebase"
import { doc, setDoc } from "firebase/firestore";


const SignUp = () => {
const router=useRouter()
const validationSchema=Yup.object({
  name:Yup.string().required("Name is Reuired"),
  surname:Yup.string().required("Surname is required"),
  email:Yup.string().email("invalid email address").required("Email is required"),
  password:Yup.string().min(6,"Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'),undefined], 'Passwords must match')
  .required('Confirm Password is required'),})


  interface signUpProps{
    email:string,
    password:string,
    name:string,
    surname:string
  }
  const handleSignUp= async (values:signUpProps) => {
    const { email, password, name, surname } = values;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userRef = doc(firestore, "users", user.uid);
      await setDoc(userRef, {
        name: name,
        surname: surname,
        email: email,
        uid: user.uid,
      });

      router.push("/login");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };
  const initialValues={
    name:"",
    surname:"",
  email:"",
password:"",
confirmPassword:"" }


return (
  <div>
    <header className='p-4'>
      <Link href="/">
        <button className='text-orange-500'>Home</button>
      </Link>
    </header>
    <div className='w-1/2 m-auto mt-10 text-white text-center'>
      <h1 className='text-4xl text-orange-500'>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {() => (
          <Form className='p-4 border-2 text-black mt-4 border-orange-500 rounded-md flex flex-col gap-4'>
            <Field
              className='p-2 rounded-md text-black'
              type="text"
              name="name"
              placeholder="Name"
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />

            <Field
              className='p-2 rounded-md text-black'
              type="text"
              name="surname"
              placeholder="Surname"
            />
            <ErrorMessage name="surname" component="div" className="text-red-500" />

            <Field
              className='p-2 rounded-md text-black'
              type="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />

            <Field
              className='p-2 rounded-md text-black'
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />

            <Field
              className='p-2 rounded-md text-black'
              type="password"
              name="confirmPassword"
              placeholder="Repeat Password"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />

            <button type="submit" className='w-full rounded-md bg-orange-500 p-2'>Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

}

export default SignUp

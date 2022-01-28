
// FIREBASE IMPORTS

import { Link, useHistory, useLocation } from 'react-router-dom';
import { Auth, Firestore, Storage, Functions } from '../../config/firebae'
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "firebase/auth";

import { onAuthStateChanged } from '@firebase/auth';
import { useEffect, useRef, useState, lazy } from 'react'
import { connectStorageEmulator } from '@firebase/storage';
import firebase from "firebase/app";

import React from 'react'

export default function Certification() {

  const [data, setdata] = useState([])
  useEffect(() => {

    Firestore.collection('students').where('completedCourses', '!=', null).get()
      .then((data) => {

        data.forEach((ndata) => {
          // console.log(ndata.data())
          ndata.data()?.completedCourses.map((courseId) => {
            Firestore.collection('courses').doc(courseId).get()
              .then((coursedetails) => {
                Firestore.collection('teachers').doc(coursedetails.data().teacheruid).get()
                  .then((teacher) => {
                    setdata(prevData => [...prevData, {
                      id: coursedetails.id, ...coursedetails.data(), teacher: teacher.data()?.email,
                      stdName: ndata.data().name,
                      stdEmail: ndata.data().email
                    }])
                  }).catch((err) => {
                    alert(err)
                  })

              }).catch((err) => { alert(err) })
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })




    // Firestore.collection('students').doc(props.auth?.uid).get()
    //   .then((data) => {

    //     data.data()?.completedCourses?.map((courseId) => {
    //       Firestore.collection('courses').doc(courseId).get()
    //         .then((coursedetails) => {
    //           Firestore.collection('teachers').doc(coursedetails.data().teacheruid).get()
    //             .then((teacher) => {
    //               setcompletedCourses(prevData => [...prevData, { id: coursedetails.id, ...coursedetails.data(), teacher: teacher.data()?.email }])
    //             }).catch((err) => {
    //               alert(err)
    //             })

    //         }).catch((err) => { alert(err) })
    //     })

    //   }).catch((err) => { alert(err) })

  }, [])

  console.log(data)

  return (
    <div>
      <h1 className='text-3xl font-bold pb-4 pt-3'>{`LIST OF "STUDENTS" WHO GOT CERTIFIED `}</h1>


      <div className='overflow-x-auto w-full'>
        <table className="w-full mx-auto border-collapse border-2 border-gray-300">
          <thead>
            <tr className='text-lg'>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">S.No</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Std_Name</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Std_Email</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Course Title</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Course Teacher</th>

            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 ?
                data.map((detailData) => (
                  <tr key={detailData.id}>
                    <td className="border border-gray-400 px-4 py-2">1</td>
                    <td className="border border-gray-400 px-4 py-2">{detailData?.stdName}</td>
                    <td className="border border-gray-400 px-4 py-2">{detailData?.stdEmail}</td>
                    <td className="border border-gray-400 px-4 py-2">{detailData?.title}</td>
                    <td className="border border-gray-400 px-4 py-2">{detailData?.teacher}</td>
                  </tr>
                ))
                :
                <></>
            }
          </tbody>
        </table>

      </div>

    </div >
  )
}

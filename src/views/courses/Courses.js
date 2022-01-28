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

export default function Courses() {

  const [totalTeachers, settotalTeachers] = useState([])


  useEffect(() => {
    Firestore.collection('courses').get()
      .then((allteachers) => {

        allteachers.forEach((teacher) => {
          console.log(teacher.data().teacheruid)
          Firestore.collection('teachers').doc(teacher.data().teacheruid)
            .get().then((teachercourses) => {

              let data = []
              let std = 0;

              if (teachercourses.exists) {
                console.log(teachercourses.data())

                if (teacher.data().students?.length > 0)
                  std = std + teacher.data().students?.length

                settotalTeachers(prevData => [...prevData, {
                  id: teacher.id, ...teacher.data(), totalCourses: teachercourses.data().email, students: std,
                  tgl: teacher.data().isActive
                }])
              }
              else {
                settotalTeachers(prevData => [...prevData, {
                  id: teacher.id, ...teacher.data(), totalCourses: '',
                  tgl: teacher.data().isActive
                }])
              }

            })
        })
      })
  }, [])


  const setCourseClaim = (courseId, claim) => {
    // e.preventDefault();
    // console.log(courseId)
    Firestore.collection('courses').doc(courseId)
      .update({
        isActive: claim
      }).then(() => {
        alert('course has been given claim')
      })
      .catch((err) => {
        alert(err)
      })
  }


  return (
    <div>

      {/* SEARCHBAR */}
      <div className="p-2 pb-3">
        <div className="bg-white flex items-center rounded-full shadow-xl">
          <input className="rounded-l-full w-full px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search Course" />

          <div className="p-1">
            <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
              icon
            </button>
          </div>
        </div>
      </div>

      <div className='overflow-x-auto w-full'>
        <table className="w-full mx-auto border-collapse border-2 border-gray-300">
          <thead>
            <tr className='text-lg'>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">#</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Title</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Description</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Course Teacher</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Active Students</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Active / Unactive Course</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Action</th>
            </tr>
          </thead>
          <tbody>
            {totalTeachers?.length > 0 ?
              totalTeachers.map((data, index) => {
                // console.log(data.id)
                return (
                  <>
                    <tr>
                      <td className="border border-gray-400 px-4 py-2">1</td>
                      <td className="border border-gray-400 px-4 py-2">{data?.title}</td>
                      <td className="border border-gray-400 px-4 py-2">{data?.learn}</td>
                      <td className="border border-gray-400 px-4 py-2">{data?.totalCourses}</td>
                      <td className="border border-gray-400 px-4 py-2">{data?.students}</td>

                      <td className="border border-gray-400 px-4 py-2">

                        <div className="flex align-middle  items-center justify-center w-full">
                          <label
                            htmlFor={index}
                            className="flex items-center cursor-pointer">

                            <div className="relative">
                              <input id={index}
                                onChange={() => {
                                  let oldState = [...totalTeachers]
                                  oldState[index] = { ...oldState[index], tgl: !data.tgl }
                                  settotalTeachers(oldState)
                                }}
                                checked={data.tgl}
                                type="checkbox" className="sr-only" />
                              <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                              <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                            </div>
                          </label>
                        </div>

                      </td>

                      <td className="border border-gray-400 px-4 py-2">
                        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setCourseClaim(data?.id, data?.tgl)
                          }}
                        >

                          SAVE
                        </button>
                      </td>

                    </tr>
                  </>
                )
              }
              )
              :
              <>no courses</>
            }
          </tbody>
        </table>
        {/*
        <div className='flex justify-center align-middle py-3'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-2/4 rounded">
            Save
          </button>
        </div> */}
      </div>

    </div >
  )
}

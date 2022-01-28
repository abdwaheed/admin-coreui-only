
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Auth, Firestore, Storage, Functions } from '../../config/firebae'
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "firebase/auth";

import { onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useRef, useState, lazy } from 'react'
import { connectStorageEmulator } from '@firebase/storage';
import firebase from "firebase/app";

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import Courses from '../courses/Courses';

export default function Student() {

  const [visible, SetIsVisible] = useState(false)

  const [totalStudents, setTotalStudents] = useState([])


  useEffect(() => {
    Firestore.collection('students').get()
      .then((allteachers) => {
        // console.log(allteachers.docs.length)
        allteachers.forEach((teacher) => {

          const role = Functions.httpsCallable('studentClaims');


          Firestore.collection('courses').where('students', 'array-contains', teacher.id)
            .get().then((teachercourses) => {

              let data = []
              let std = 0;

              if (teachercourses) {
                teachercourses?.forEach((course) => {
                  console.log(course.data())
                  data.push(course.data().title)
                })

                role({ email: teacher.data().email }).then((claims) => {
                  if (claims?.data.isActive) {

                    setTotalStudents(prevData => [...prevData, { id: teacher.id, ...teacher.data(), totalCourses: data, students: std, tgl: true }])
                  }
                  else {

                    setTotalStudents(prevData => [...prevData, { id: teacher.id, ...teacher.data(), totalCourses: data, students: std, tgl: false }])
                  }

                }).catch((err) => {
                  console.log(err)
                })



                // setTotalStudents(prevData => [...prevData, { id: teacher.id, ...teacher.data(), totalCourses: data, students: std }])
              }
              else {

                role({ email: teacher.data().email }).then((claims) => {
                  if (claims?.data.isActive) {

                    setTotalStudents(prevData => [...prevData, { id: teacher.id, ...teacher.data(), totalCourses: data, students: std, tgl: true }])
                  }
                  else {

                    setTotalStudents(prevData => [...prevData, { id: teacher.id, ...teacher.data(), totalCourses: data, students: std, tgl: false }])
                  }

                }).catch((err) => {
                  console.log(err)
                })
                // setTotalStudents(prevData => [...prevData, {
                //   id: teacher.id, ...teacher.data(), totalCourses: data
                // }])
              }


            })
        })
      })
  }, [])



  // UPDATING SINGLE TEACHER CLAIM

  const setStudentClaimsbyAdmin = async (email, claim) => {
    const role = Functions.httpsCallable('setStudentByAdmin');
    const result = await role({ email, claim });
    console.log(result);
    // alert(result)
  }

  // UPDATING SINGLE TEACHER CLAIM



  return (
    <div>
      <div className='overflow-x-auto w-full'>

        {/* SEARCHBAR */}
        <div className="p-2 pb-3">
          <div className="bg-white flex items-center rounded-full shadow-xl">
            <input className="rounded-l-full w-full px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search Student" />

            <div className="p-1">
              <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
                icon
              </button>
            </div>
          </div>
        </div>


        <table className="w-full mx-auto border-collapse border-2 border-gray-300">
          <thead>
            <tr className='text-lg'>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Name</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Email</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Phone</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Enrolled Courses</th>
              {/* <th className="border border-gray-400 px-4 py-2 text-gray-800">Active Students</th> */}
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Active / Unctive Student</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Action</th>
            </tr>
          </thead>
          <tbody>
            {totalStudents.length > 0 ?
              totalStudents.map((data, index) => (
                <>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">{data?.name}</td>
                    <td className="border border-gray-400 px-4 py-2">{data?.email}</td>
                    <td className="border border-gray-400 px-4 py-2">9243244234</td>

                    {data?.totalCourses.length > 0 ?

                      <td className="border border-gray-400 px-4 py-2">
                        {data.totalCourses + ','}
                      </td>

                      :
                      <td className="border border-gray-400 px-4 py-2"></td>
                    }
                    {/* <td className="border border-gray-400 px-4 py-2">

                      Python , JS, Django
                    </td> */}


                    <td className="border border-gray-400 px-4 py-2">

                      <div className="flex align-middle  items-center justify-center w-full">
                        <label
                          htmlFor={index}
                          className="flex items-center cursor-pointer">

                          <div className="relative">
                            <input id={index}
                              onChange={() => {
                                let oldState = [...totalStudents]
                                oldState[index] = { ...oldState[index], tgl: !data.tgl }
                                setTotalStudents(oldState)
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
                          setStudentClaimsbyAdmin(data?.email, data.tgl)
                        }}>
                        SAVE
                      </button>
                    </td>

                  </tr>
                </>
              ))
              :
              <>no students</>
            }
          </tbody>
        </table>

        {/* FOR SAVE BUTTON */}
        <div className='flex justify-center align-middle py-3'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-2/4 rounded">
            Save
          </button>
        </div>
      </div>

      {/* FOR MODAL */}

      <CModal alignment="center" size='xl' scrollable visible={visible} onClose={() => SetIsVisible(false)}>
        <CModalHeader>
          <CModalTitle>TEACHER DETAILS</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table className="w-full mx-auto border-collapse border-2 border-gray-300">
            <thead>
              <tr className='text-lg'>
                <th className="border border-gray-400 px-4 py-2 text-gray-800">Name</th>
                <th className="border border-gray-400 px-4 py-2 text-gray-800">Email</th>
                <th className="border border-gray-400 px-4 py-2 text-gray-800">Phone</th>
                <th className="border border-gray-400 px-4 py-2 text-gray-800">Country</th>
                <th className="border border-gray-400 px-4 py-2 text-gray-800">Active Courses</th>
                {/* <th className="border border-gray-400 px-4 py-2 text-gray-800">Requested Courses</th> */}
                <th className="border border-gray-400 px-4 py-2 text-gray-800">Total Students</th>
                {/* <th className="border border-gray-400 px-4 py-2 text-gray-800">Unactive/Active Teacher</th> */}
                {/* <th className="border border-gray-400 px-4 py-2 text-gray-800">Action</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 px-4 py-2">John</td>
                <td className="border border-gray-400 px-4 py-2">abc@gmail.com</td>
                <td className="border border-gray-400 px-4 py-2">92343443223</td>
                <td className="border border-gray-400 px-4 py-2">USA</td>

                <td className="border border-gray-400 px-4 py-2">Java, C++, Python</td>
                {/* <td className="border border-gray-400 px-4 py-2">1</td> */}
                <td className="border border-gray-400 px-4 py-2">23</td>

                {/* <td className="border border-gray-400 px-4 py-2">

                  <div className="flex align-middle  items-center justify-center w-full">
                    <label
                      htmlFor="toogleA"
                      className="flex items-center cursor-pointer">

                      <div className="relative">
                        <input id="toogleA" type="checkbox" className="sr-only" />
                        <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                        <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                      </div>

                    </label>
                  </div>

                </td> */}

                {/* <td className="border border-gray-400 px-4 py-2">
                  <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      SetIsVisible(true)
                    }}>VIEW
                  </button>
                </td> */}
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">Jack</td>
                <td className="border border-gray-400 px-4 py-2">abc@gmail.com</td>
                <td className="border border-gray-400 px-4 py-2">92343443223</td>
                <td className="border border-gray-400 px-4 py-2">USA</td>
                <td className="border border-gray-400 px-4 py-2">Java, Python, C++</td>
                {/* <td className="border border-gray-400 px-4 py-2">0</td> */}
                <td className="border border-gray-400 px-4 py-2">19</td>
                {/* <td className="border border-gray-400 px-4 py-2">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="toogleB"
                      className="flex items-center cursor-pointer"
                    >

                      <div className="relative">

                        <input id="toogleB" type="checkbox" className="sr-only" />

                        <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>

                        <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                      </div>
                    </label>
                  </div>
                </td> */}

                {/* <td className="border border-gray-400 px-4 py-2"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    SetIsVisible(true)
                  }}>
                  VIEW
                </button>
                </td> */}
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">Harry</td>
                <td className="border border-gray-400 px-4 py-2">abc@gmail.com</td>
                <td className="border border-gray-400 px-4 py-2">92343443223</td>
                <td className="border border-gray-400 px-4 py-2">USA</td>
                <td className="border border-gray-400 px-4 py-2">JS, Python</td>

                <td className="border border-gray-400 px-4 py-2">12</td>

              </tr>
            </tbody>
          </table>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => SetIsVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* FOR MODAL */}

    </div>
  )
}

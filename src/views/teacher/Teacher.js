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



import React from 'react';

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
  CModalFooter,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
} from '@coreui/react'
// import { Firestore } from 'src/config/firebae';
// import { all } from 'core-js/fn/promise';



export default function Teacher() {

  const [credmsg, setcredmsg] = useState(false)

  const [visible, setVisible] = useState(false);

  const [totalTeachers, settotalTeachers] = useState([])

  // const [toggle, settoggle] = useState({ flag: true, index: -1 });

  const [toggle, settoggle] = useState()



  useEffect(() => {
    Firestore.collection('teachers').get()
      .then((allteachers) => {

        allteachers.forEach((teacher) => {

          // console.log(firebase.auth().currentUser)

          const role = Functions.httpsCallable('studentClaims');
          // role({ email: teacher.data().email }).then((claims) => {
          //   if (claims?.data.isActive) {

          //     settoggle(true);
          //   }
          //   else {

          //     settoggle(false);
          //   }

          // }).catch((err) => {
          //   console.log(err)
          // })



          Firestore.collection('courses').where('teacheruid', '==', teacher.id)
            .get().then((teachercourses) => {

              let data = []
              let std = 0;

              if (teachercourses) {
                teachercourses?.forEach((course) => {

                  data.push(course.data().title)
                  // console.log(course.data().students?.length)
                  if (course.data().students?.length > 0)
                    std = std + course.data().students?.length
                })

                role({ email: teacher.data().email }).then((claims) => {
                  if (claims?.data.isActive) {

                    settotalTeachers(prevData => [...prevData, { id: teacher.id, ...teacher.data(), totalCourses: data, students: std, tgl: true }])
                  }
                  else {

                    settotalTeachers(prevData => [...prevData, { id: teacher.id, ...teacher.data(), totalCourses: data, students: std, tgl: false }])
                  }

                }).catch((err) => {
                  console.log(err)
                })

                // settotalTeachers(prevData => [...prevData, { id: teacher.id, ...teacher.data(), totalCourses: data, students: std, tgl: toggle }])
              }
              else {

                role({ email: teacher.data().email }).then((claims) => {
                  if (claims?.data.isActive) {

                    settotalTeachers(prevData => [...prevData, { id: teacher.id, ...teacher.data(), totalCourses: data, students: std, tgl: true }])
                  }
                  else {

                    settotalTeachers(prevData => [...prevData, { id: teacher.id, ...teacher.data(), totalCourses: data, students: std, tgl: false }])
                  }

                }).catch((err) => {
                  console.log(err)
                })

                // settotalTeachers(prevData => [...prevData, { id: teacher.id, ...teacher.data(), totalCourses: data, tgl: toggle }])
              }

            })
        })
      })
  }, [])


  const setRole = async (e) => {
    e.preventDefault();

    const role = Functions.httpsCallable('checkRole');
    const result = await role({ email: 'waheed@gmail.com' });
    console.log(result);

  }


  // UPDATING SINGLE TEACHER CLAIM

  const setTeacherClaimsbyAdmin = async (email, claim) => {
    const role = Functions.httpsCallable('setTeacherByAdmin');
    const result = await role({ email, claim });
    // console.log(result);
    setcredmsg(true)
    setTimeout(() => {
      setcredmsg(false)
    }, 2000);

  }

  // UPDATING SINGLE TEACHER CLAIM


  return (

    <div>

      {/* SEARCHBAR */}
      <div className="p-2 pb-3">
        <div className="bg-white flex items-center rounded-full shadow-xl">
          <input className="rounded-l-full w-full px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search Teacher" />

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
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Name</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Email</th>

              <th className="border border-gray-400 px-4 py-2 text-gray-800">Teacher-Doc</th>

              <th className="border border-gray-400 px-4 py-2 text-gray-800">Active Courses</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Total Students</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Unactive/Active Teacher</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Action</th>
            </tr>
          </thead>
          <tbody>
            {totalTeachers?.length > 0 ?
              totalTeachers.map((data, index) => {
                // console.log(index)
                return (
                  <>
                    < tr >
                      <td className="border border-gray-400 px-4 py-2">{data?.name}</td>
                      <td className="border border-gray-400 px-4 py-2">{data?.email}</td>
                      <td><img src={data?.imgurl} alt="" /></td>
                      {data?.totalCourses.length > 0 ?

                        <td className="border border-gray-400 px-4 py-2">
                          {data.totalCourses + ','}
                        </td>

                        :
                        <td className="border border-gray-400 px-4 py-2"></td>
                      }

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
                            setTeacherClaimsbyAdmin(data?.email, data.tgl)
                          }}>SAVE
                        </button>
                      </td>
                    </tr>

                  </>
                )
              }
              )
              :
              <>no teachers!</>

            }

          </tbody>
        </table>
        {credmsg ?
          <h5 className='text-center text-dark'>Teacher has been Given the Role</h5>
          :
          <></>
        }

        {/* FOR SAVE BUTTON */}
        {/* <div className='flex justify-center align-middle py-3'>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-2/4 rounded">
            Save
          </button>
        </div> */}
      </div>



      {/* FOR MODAL */}

      <CModal alignment="center" size='xl' scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>TEACHER DETAILS</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table className="w-full mx-auto border-collapse border-2 border-gray-300">
            <thead>
              <tr className='text-lg'>
                <th className="border border-gray-400 px-4 py-2 text-gray-800">First Name</th>
                <th className="border border-gray-400 px-4 py-2 text-gray-800">Last Name</th>
                <th className="border border-gray-400 px-4 py-2 text-gray-800">Email</th>
                <th className="border border-gray-400 px-4 py-2 text-gray-800">Phone</th>
                <th className="border border-gray-400 px-4 py-2 text-gray-800">Active Courses</th>
                <th className="border border-gray-400 px-4 py-2 text-gray-800">Total Students</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-gray-400 px-4 py-2">John</td>
                <td className="border border-gray-400 px-4 py-2">Jones</td>
                <td className="border border-gray-400 px-4 py-2">abc@gmail.com</td>
                <td className="border border-gray-400 px-4 py-2">923424322</td>
                <td className="border border-gray-400 px-4 py-2">Java, C++, Python</td>
                <td className="border border-gray-400 px-4 py-2">23</td>

              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">Jack</td>
                <td className="border border-gray-400 px-4 py-2">Reacher</td>
                <td className="border border-gray-400 px-4 py-2">abc@gmail.com</td>
                <td className="border border-gray-400 px-4 py-2">923424322</td>
                <td className="border border-gray-400 px-4 py-2">Java, Python, C++</td>
                <td className="border border-gray-400 px-4 py-2">19</td>

              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">Harry</td>
                <td className="border border-gray-400 px-4 py-2">Ming</td>
                <td className="border border-gray-400 px-4 py-2">abc@gmail.com</td>
                <td className="border border-gray-400 px-4 py-2">923424322</td>
                <td className="border border-gray-400 px-4 py-2">JS, Python</td>

                <td className="border border-gray-400 px-4 py-2">12</td>

              </tr>
            </tbody>
          </table>

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* FOR MODAL */}

    </div >
  )
}



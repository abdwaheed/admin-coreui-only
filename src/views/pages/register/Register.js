// FIREBASE IMPORTS

import { Link, useHistory, useLocation } from 'react-router-dom';
// import { Auth, Firestore, Storage } from '../../../config/firebase'
import { Auth, Firestore, Storage, Functions } from '../../../config/firebae'

import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "firebase/auth";

import { onAuthStateChanged } from '@firebase/auth';
import { useEffect, useRef, useState } from 'react'
import { connectStorageEmulator } from '@firebase/storage';
import firebase from "firebase/app";


import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {

  const [email, setemail] = useState()
  const [password, setpassword] = useState()

  const history = useHistory()

  // SIGNUP FUNCTION

  const createAdmin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      const role = Functions.httpsCallable('adminRole');
      const result = await role({ email });
      console.log(result);

      await Firestore.collection("admin").doc(firebase.auth().currentUser.uid).set({

        name: '',
        email: email,
        phone: ''
      })
      alert("done auth for admin and admin added to firestore");
      history.push({
        pathname: '/',
        state: {
          admin: firebase.auth().currentUser
        }
      });

    } catch (err) {
      alert(err);
    }
  }

  // SIGNUP FUNCTION





  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup>

                  {/*  FOR EMAIL  */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      onChange={(e) => { setemail(e.target.value) }}
                      placeholder="Email"
                      autoComplete="email" />
                  </CInputGroup>
                  {/*  FOR EMAIL  */}


                  {/*  FOR PASSWORD  */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(e) => { setpassword(e.target.value) }}
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {/*  FOR PASSWORD  */}


                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton
                      onClick={createAdmin}
                      color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

import React, { lazy } from 'react'
// import '../../assets/main.css'

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
} from '@coreui/react'

export default function Manage() {
  return (
    <div>

      <div className='overflow-x-auto w-full'>
        <table className="w-full mx-auto border-collapse border-2 border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">#</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Requested Course Title</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Course Description</th>
              <th className="border border-gray-400 px-4 py-2 text-gray-800">Approve Course</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 px-4 py-2">1</td>
              <td className="border border-gray-400 px-4 py-2">Java</td>
              <td className="border border-gray-400 px-4 py-2">Not much</td>

              <td className="border border-gray-400 px-4 py-2">
                <div className="flex items-center justify-center w-full">
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
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2">2</td>
              <td className="border border-gray-400 px-4 py-2">C++</td>
              <td className="border border-gray-400 px-4 py-2">not much</td>
              <td className="border border-gray-400 px-4 py-2">
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
              </td>

            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2">3</td>
              <td className="border border-gray-400 px-4 py-2">Python</td>
              <td className="border border-gray-400 px-4 py-2">not much</td>
              <td className="border border-gray-400 px-4 py-2">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="toogleC"
                    className="flex items-center cursor-pointer"
                  >

                    <div className="relative">

                      <input id="toogleC" type="checkbox" className="sr-only" />

                      <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>

                      <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                    </div>
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* FOR SAVE BUTTON */}
        <div className='flex justify-center align-middle py-3'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-2/4 rounded">
            Save
          </button>
        </div>
      </div>

    </div>
  )
}

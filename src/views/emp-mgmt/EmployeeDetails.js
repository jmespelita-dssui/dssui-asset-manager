import { useState } from 'react'
import CIcon from '@coreui/icons-react'
import Moment from 'moment'
import {
  CListGroup,
  CListGroupItem,
  CContainer,
  CRow,
  CCol,
  CButton,
  CTooltip,
} from '@coreui/react-pro'

import { cilPencil } from '@coreui/icons'

const EmployeeDetails = ({ details, edit, prepEdit }) => {
  const [editMode, setEditMode] = useState(edit)

  const getDate = (date) => {
    let convertedDate =
      Moment(date).format('DD/MM/YYYY') !== 'Invalid date' ? Moment(date).format('DD/MM/YYYY') : ''
    return convertedDate
  }

  return (
    <>
      <CContainer>
        <CRow xs={{ cols: 2 }} className="justify-content-center">
          <CCol md={5}>
            <CListGroup>
              <CListGroupItem>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Employee info</h5>
                </div>
                <p className="mb-1 text-medium-emphasis">
                  Full name:{' '}
                  <span className="text-body">
                    {details[0].first_name} {details[0].last_name}
                  </span>
                  <br></br>
                  Employment status: <span className="text-body">{details[0].status}</span>
                  {editMode ? (
                    <CTooltip content="Edit">
                      <CIcon
                        icon={cilPencil}
                        className="action-icon"
                        style={{ marginLeft: '5px' }}
                        onClick={() =>
                          prepEdit({
                            edit: 'status',
                            emp_id: details[0].emp_id,
                            first_name: details[0].first_name,
                            last_name: details[0].last_name,
                            status: details[0].status,
                          })
                        }
                      />
                    </CTooltip>
                  ) : (
                    ''
                  )}
                  <br></br>
                  <br></br>
                  Sector:
                  <br></br>
                  {details[0].first_name && details[0].sect_id
                    ? details.map((item, key) => (
                        <span key={key} style={{ marginBottom: '20px' }}>
                          <span className="text-body" style={{ marginLeft: '20px' }}>
                            {item.sect_name}
                          </span>
                          {editMode ? (
                            <CTooltip content="Edit">
                              <CIcon
                                icon={cilPencil}
                                className="action-icon"
                                style={{ marginLeft: '5px' }}
                                onClick={() =>
                                  prepEdit({
                                    edit: 'sector',
                                    emp_id: item.emp_id,
                                    emp_sect_id: item.emp_sect_id,
                                    sect_name: item.sect_name,
                                    date_assigned_sect: item.date_assigned_sect,
                                    date_unassigned_sect: item.date_unassigned_sect,
                                  })
                                }
                              />
                            </CTooltip>
                          ) : (
                            ''
                          )}
                          <br></br>
                          <span className="text-body" style={{ marginLeft: '40px' }}>
                            {getDate(item.date_assigned_sect) !== ''
                              ? getDate(item.date_assigned_sect)
                              : ''}{' '}
                            -{' '}
                            {getDate(item.date_unassigned_sect)
                              ? getDate(item.date_unassigned_sect)
                              : 'PRESENT'}
                            <br></br>
                            <br></br>
                          </span>
                        </span>
                      ))
                    : ''}
                  Office:
                  <br></br>
                  <span className="text-body" style={{ marginLeft: '20px' }}>
                    {details[0].off_id}{' '}
                    {details[0].off_id !== null || details[0].off_id
                      ? ` ${details[0].off_desc} `
                      : ''}
                  </span>
                  {editMode ? (
                    <CTooltip content="Edit">
                      <CIcon
                        icon={cilPencil}
                        className="action-icon"
                        style={{ marginLeft: '5px' }}
                        onClick={() =>
                          prepEdit({
                            edit: 'office',
                            emp_id: details[0].emp_id,
                            emp_full_name: `${details[0].first_name} ${details[0].last_name}`,
                            off_id: details[0].off_id,
                            off_desc: details[0].off_desc,
                            emp_off_id: details[0].emp_off_id,
                          })
                        }
                      />
                    </CTooltip>
                  ) : (
                    ''
                  )}
                </p>
              </CListGroupItem>
              {details[0].first_name ? (
                <CListGroupItem className="footer justify-content-end">
                  {!editMode ? (
                    <CButton color="primary" onClick={() => setEditMode(true)}>
                      Edit
                    </CButton>
                  ) : (
                    <CButton color="primary" onClick={() => setEditMode(false)}>
                      Save
                    </CButton>
                  )}
                </CListGroupItem>
              ) : (
                ''
              )}
            </CListGroup>
          </CCol>
          <CCol md={5}>
            <CListGroup>
              <CListGroupItem>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Email address</h5>
                </div>
                <p className="mb-1 text-medium-emphasis">
                  Primary: <br></br>
                  Username: <br></br>
                  Profile:
                  <br></br>
                  Aliases:
                  <br></br>
                  <br></br>
                  Microsoft 365:
                  <br></br>
                  <br></br>
                  Others:
                </p>
              </CListGroupItem>
              {details[0].first_name ? (
                <CListGroupItem className="footer justify-content-end">
                  {!editMode ? (
                    <CButton color="primary" onClick={() => setEditMode(true)}>
                      Edit
                    </CButton>
                  ) : (
                    <CButton color="primary" onClick={() => setEditMode(false)}>
                      Save
                    </CButton>
                  )}
                </CListGroupItem>
              ) : (
                ''
              )}
            </CListGroup>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default EmployeeDetails

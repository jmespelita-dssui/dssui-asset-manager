import { useState } from 'react'
import { CForm, CFormSelect, CCol, CButton } from '@coreui/react-pro'

const AssignUIDtoEmp = ({ onAdd, employeeList, uidList }) => {
  const [employee, setEmployee] = useState('')
  const [uid, setUID] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    // console.log(employee, device)
    onAdd({ employee, uid })
    clearForm(e)
  }

  const clearForm = (e) => {
    e.target.reset()
    setEmployee('Select employee')
    setUID('Select UID')
  }

  return (
    <>
      <CForm
        className="add-user row g-3 needs-validation justify-content-center"
        id="devToEmpForm"
        onSubmit={onSubmit}
      >
        <CCol md={3}>
          <CFormSelect
            className="form-select"
            onChange={(e) => {
              setEmployee(e.target.value)
            }}
            defaultValue=""
            required
          >
            <option value="">Select employee</option>
            {employeeList.map((e, key) => {
              return (
                <option key={key} value={e.emp_id}>
                  {e.last_name}, {e.first_name}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CFormSelect
            className="form-select"
            onChange={(e) => {
              setUID(e.target.value)
            }}
            defaultValue=""
            required
          >
            <option value="">Select UID</option>
            {uidList.map((d, key) => {
              return (
                <option key={key} value={d.dom_uid}>
                  {d.dom_uid}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CButton type="submit" color="secondary">
            Assign UID
          </CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AssignUIDtoEmp

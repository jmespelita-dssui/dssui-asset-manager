import { useState } from 'react'
import { CForm, CFormSelect, CCol, CButton } from '@coreui/react-pro'

const AssignDevToEmp = ({ onAdd, employeeList, deviceList }) => {
  const [employee, setEmployee] = useState('')
  const [device, setDevice] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    // console.log(employee, device)
    onAdd({ employee, device })
    clearForm(e)
  }

  const clearForm = (e) => {
    e.target.reset()
    setEmployee('Select employee')
    setDevice('Select device')
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
              setDevice(e.target.value)
              // console.log('selected dev_ID: ' + e.target.value)
            }}
            defaultValue=""
            required
          >
            <option value="">Select device</option>
            {deviceList.map((d, key) => {
              return (
                <option key={key} value={d.dev_id}>
                  {d.pc_name}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CButton type="submit" color="secondary">
            Assign device
          </CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AssignDevToEmp

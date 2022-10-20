import { useState } from 'react'
import { CForm, CFormInput, CFormSelect, CCol, CButton } from '@coreui/react-pro'

const AddEmployee = ({ onAdd, employeeList, onError }) => {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [status, setStatus] = useState('ACTIVE')

  const onSubmit = (e) => {
    e.preventDefault()
    const fullName = `${lastName} ${firstName}`

    const checkDuplicate = employeeList.some((employee) => {
      return `${employee.last_name} ${employee.first_name}` === fullName
    })

    if (checkDuplicate) {
      onError('User already exists.')
      return
    }

    // console.log('addEmployee', lastName, firstName, status)
    onAdd({ lastName, firstName, status })

    e.target.reset()
    setLastName('')
    setFirstName('')
    setStatus('ACTIVE')
  }

  return (
    <>
      <CForm
        className="add-user row g-3 needs-validation justify-content-center"
        onSubmit={onSubmit}
      >
        <CCol md={4}>
          <CFormInput
            className="form-control"
            type="text"
            name="lastName"
            maxLength={45}
            placeholder="Last name"
            onChange={(e) => {
              // console.log(e.target.value.trim())
              setLastName(e.target.value.trim())
            }}
            required
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            className="form-control"
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={(e) => {
              // console.log(e.target.value.trim())
              setFirstName(e.target.value.trim())
            }}
            maxLength={45}
            required
          />
        </CCol>
        <CCol md={2}>
          <CFormSelect
            className="form-select"
            onChange={(e) => {
              // console.log(e.target.value.trim())
              setStatus(e.target.value)
            }}
            required
          >
            <option value="">Select status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CButton type="submit" color="secondary">
            Add employee
          </CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddEmployee

import { useState } from 'react'
import { CForm, CFormSelect, CCol, CButton, CDatePicker } from '@coreui/react-pro'
import Moment from 'moment'

const AssignSectorToEmp = ({ onAdd, employeeList, sectorList, getEmployeeDetails }) => {
  const [employee, setEmployee] = useState('')
  const [sector, setSector] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()
    // console.log('on submit', employee, sector, startDate, endDate)

    onAdd({ employee, sector, startDate, endDate })
    clearForm(e)
  }

  const clearForm = (e) => {
    e.target.reset()
    setEmployee('')
    setSector('')
    setStartDate(null)
    setEndDate(null)
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
              if (e.target.value !== '') getEmployeeDetails(e.target.value)
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
              setSector(e.target.value)
            }}
            defaultValue=""
            required
          >
            <option value="">Select Sector</option>
            {sectorList.map((d, key) => {
              return (
                <option key={key} value={d.sect_id}>
                  {d.sect_name}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CDatePicker
            placeholder="Start date"
            locale="it-IT"
            onDateChange={(e) => {
              setStartDate(Moment(e).format('YYYY-MM-DD'))
            }}
          />
        </CCol>
        <CCol md={2}>
          <CDatePicker
            placeholder="End date"
            locale="it-IT"
            onDateChange={(e) => {
              setEndDate(Moment(e).format('YYYY-MM-DD'))
            }}
          />
        </CCol>
        <CCol md={2}>
          <CButton type="submit" color="secondary">
            Assign sector
          </CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AssignSectorToEmp

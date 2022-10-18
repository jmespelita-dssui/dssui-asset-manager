import { useState } from 'react'
import { CForm, CFormInput, CFormSelect, CCol, CButton } from '@coreui/react-pro'

const AddSector = ({ onAdd, sectorList, onError }) => {
  const [sectName, setSectName] = useState('')
  const [sectStatus, setSectStatus] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    const checkDuplicate = sectorList.some((sector) => {
      return sector.sect_name === sectName
    })

    if (checkDuplicate) {
      onError('Sector already exists.')
      // e.target.reset()
      return
    }

    onAdd({ sectName, sectStatus })
    clearForm(e)
  }

  const clearForm = (e) => {
    e.target.reset()
    setSectName('')
    setSectStatus('')
  }

  return (
    <>
      <CForm
        className="add-user row g-3 needs-validation justify-content-center"
        onSubmit={onSubmit}
      >
        <CCol md={5}>
          <CFormInput
            className="form-control"
            type="text"
            name="sectName"
            placeholder="Sector"
            onChange={(e) => {
              setSectName(e.target.value.trim())
            }}
            maxLength={45}
            required
          />
        </CCol>
        <CCol md={3}>
          <CFormSelect
            className="form-select"
            onChange={(e) => {
              setSectStatus(e.target.value)
            }}
            required
          >
            <option value="">Select status</option>
            <option defaultValue="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CButton type="submit" color="secondary">
            Add sector
          </CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddSector

import { useState } from 'react'
import { CForm, CFormInput, CCol, CButton } from '@coreui/react-pro'

const AddOffice = ({ onAdd, officeList, onError }) => {
  const [offID, setOffID] = useState('')
  const [offDesc, setOffDesc] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    const checkDuplicateOffice = officeList.some((office) => {
      return parseInt(office.off_id) === parseInt(offID)
    })

    if (checkDuplicateOffice) {
      onError('Office already exists.')
      // e.target.reset()
      return
    }

    onAdd({ offID, offDesc })
    clearForm(e)
  }

  const clearForm = (e) => {
    e.target.reset()
    setOffID('')
    setOffDesc('')
  }

  return (
    <>
      <CForm
        className="add-user row g-3 needs-validation  justify-content-center"
        onSubmit={onSubmit}
      >
        <CCol md={3}>
          <CFormInput
            className="form-control"
            type="text"
            name="offID"
            placeholder="Office ID"
            onChange={(e) => {
              setOffID(e.target.value.trim())
            }}
            maxLength={3}
            required
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            className="form-control"
            type="text"
            name="desc"
            placeholder="Description"
            onChange={(e) => {
              setOffDesc(e.target.value.trim())
            }}
            maxLength={45}
          />
        </CCol>
        <CCol md={2}>
          <CButton type="submit" color="secondary">
            Add office
          </CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddOffice

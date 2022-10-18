import { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton,
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormFeedback,
  CFormSelect,
} from '@coreui/react-pro'

const EditEmployee = ({ visible, onClose, formContent, onEdit, onDelete }) => {
  const [lastName, setLastName] = useState('')
  const [isEditedLastName, setIsEditedLastName] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [isEditedFirstName, setIsEditedFirstName] = useState(false)
  const [status, setStatus] = useState('ACTIVE')
  const [isEditedStatus, setIsEditedStatus] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    const newFormContent = {
      emp_id: formContent.emp_id,
      last_name: !isEditedLastName ? formContent.last_name : lastName,
      first_name: !isEditedFirstName ? formContent.first_name : firstName,
      status: !isEditedStatus ? formContent.status : status,
    }

    setIsEditedLastName(false)
    setIsEditedFirstName(false)
    setIsEditedStatus(false)

    console.log('from Modal', newFormContent)
    // const fullName = `${newFormContent.last_name} ${newFormContent.first_name}`
    onEdit(newFormContent)
  }

  return (
    <CModal visible={visible} size="lg" backdrop="static" onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Edit employee</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation justify-content-center" onSubmit={onSubmit}>
          <CCol md={4}>
            <CFormLabel htmlFor="validationDefault01">Last Name</CFormLabel>
            <CFormInput
              type="text"
              id="validationDefault01"
              defaultValue={formContent.last_name}
              maxLength={45}
              onChange={(e) => {
                setIsEditedLastName(true)
                setLastName(e.target.value.trim())
                console.log(e.target.value.trim())
              }}
              required
            />
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="validationDefault02">First Name</CFormLabel>
            <CFormInput
              type="text"
              id="validationDefault02"
              defaultValue={formContent.first_name}
              maxLength={45}
              onChange={(e) => {
                setIsEditedFirstName(true)
                setFirstName(e.target.value.trim())
              }}
              required
            />
          </CCol>

          <CCol md={4}>
            <CFormLabel htmlFor="validationDefault04">Status</CFormLabel>
            <CFormSelect
              id="validationDefault04"
              onChange={(e) => {
                setIsEditedStatus(true)
                setStatus(e.target.value.trim())
              }}
              defaultValue={formContent.status}
            >
              <option value="">Choose...</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </CFormSelect>
            <CFormFeedback invalid>Please provide a valid status.</CFormFeedback>
          </CCol>
          <CCol xs={12} className="modal-footer">
            <CButton color="secondary" onClick={onClose}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={() => onDelete(formContent.emp_id)}>
              Delete user
            </CButton>
            <CButton color="primary" type="submit">
              Save changes
            </CButton>
          </CCol>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default EditEmployee

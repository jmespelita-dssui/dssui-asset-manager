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
const EditStatus = ({ visible, onClose, onSave, formContent }) => {
  const [status, setStatus] = useState('')
  const onSubmit = (e) => {
    e.preventDefault(e)
    onSave(status)
    setStatus('')
  }

  return (
    <>
      <CModal visible={visible} backdrop="static" onClose={onClose}>
        <CModalHeader>
          <CModalTitle>Edit status</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3 needs-validation justify-content-center" onSubmit={onSubmit}>
            <CCol md={6}>
              <CFormLabel htmlFor="validationDefault01">Full Name</CFormLabel>
              <CFormInput
                type="text"
                id="validationDefault01"
                defaultValue={`${formContent.first_name} ${formContent.last_name}`}
                disabled
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="validationDefault04">Status</CFormLabel>
              <CFormSelect
                id="validationDefault04"
                onChange={(e) => {
                  // console.log('ON CHANGE', e)
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
              <CButton color="primary" type="submit">
                Save changes
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default EditStatus

import { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton,
  CForm,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'

const EditDevice = ({ visible, onClose, formContent, onEdit, onDelete, onCloseEdit }) => {
  // const [uid, setUID] = useState('')
  // const [isEditedUID, setIsEditedUID] = useState(false)

  const [emailAddress, setEmailAddress] = useState('')
  const [isEditedEmailAddress, setIsEditedEmailAddress] = useState(false)
  const [type, setType] = useState('')
  const [isEditedType, setIsEditedType] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [isEditedDisplayName, setIsEditedDisplayName] = useState(false)
  const [profile, setProfile] = useState('')
  const [isEditedProfile, setIsEditedProfile] = useState(false)
  const [status, setStatus] = useState('')
  const [isEditedStatus, setIsEditedStatus] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    let newFormContent
    newFormContent = {
      uid: formContent.uid,
      email_address: !isEditedEmailAddress ? formContent.email_address : emailAddress,
      email_type: !isEditedType ? formContent.email_type : type,
      display_name: !isEditedDisplayName ? formContent.display_name : displayName,
      profile: !isEditedProfile ? formContent.profile : profile,
      email_status: !isEditedStatus ? formContent.email_status : status,
    }

    // setIsEditedUID(false)
    setIsEditedEmailAddress(false)
    setIsEditedType(false)
    setIsEditedDisplayName(false)
    setIsEditedProfile(false)
    setIsEditedStatus(false)
    console.log('from Edit Modal: ', newFormContent)

    onEdit(newFormContent)
  }

  return (
    <CModal visible={visible} size="lg" backdrop="static" onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Edit email address</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm
          className="add-user row g-3 needs-validation justify-content-center"
          onSubmit={onSubmit}
        >
          <CRow className="mb-3">
            <CCol md={2}>
              <CFormLabel htmlFor="uid" className='className="col-sm-2 col-form-label'>
                UID
              </CFormLabel>
              <CFormInput
                className="form-control"
                type="text"
                name="uid"
                id="uid"
                placeholder="User ID"
                defaultValue={formContent.uid}
                onChange={(e) => {
                  // setIsEditedUID(true)
                  // setUID(e.target.value.trim())
                }}
                maxLength={45}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="email" className='className="col-sm-2 col-form-label'>
                Email address
              </CFormLabel>
              <CFormInput
                className="form-control"
                type="text"
                name="email"
                id="email"
                placeholder="Email Address"
                defaultValue={formContent.email_address}
                onChange={(e) => {
                  setEmailAddress(e.target.value.trim())
                  setIsEditedEmailAddress(true)
                }}
                maxLength={45}
                required
              />
            </CCol>
            <CCol md={2}>
              <CFormLabel htmlFor="type" className='className="col-sm-2 col-form-label'>
                Type
              </CFormLabel>
              <CFormSelect
                className="form-select"
                id="type"
                onChange={(e) => {
                  setType(e.target.value)
                  setIsEditedType(true)
                }}
                defaultValue={formContent.email_type}
                required
              >
                <option disabled>Select type</option>
                <option value="VA">VA</option>
                <option value="365">365</option>
                <option value="Other">Other</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="display-name" className='className="col-sm-2 col-form-label'>
                Display Name
              </CFormLabel>
              <CFormInput
                className="form-control"
                type="text"
                name="display-name"
                id="display-name"
                placeholder="Email Address"
                defaultValue={formContent.display_name}
                onChange={(e) => {
                  setDisplayName(e.target.value.trim())
                  setIsEditedDisplayName(true)
                }}
                maxLength={45}
                required
              />
            </CCol>
            <CCol md={2}>
              <CFormLabel htmlFor="profile" className='className="col-sm-2 col-form-label'>
                Profile
              </CFormLabel>
              <CFormSelect
                className="form-select"
                id="profile"
                onChange={(e) => {
                  setType(e.target.value)
                  setIsEditedType(true)
                }}
                defaultValue={formContent.profile}
              >
                <option value="">Profile</option>
                <option value="copper">copper</option>
                <option value="silver">silver</option>
                <option value="bronze">bronze</option>
              </CFormSelect>
            </CCol>
            <CCol md={2}>
              <CFormLabel htmlFor="status" className='className="col-sm-2 col-form-label'>
                Status
              </CFormLabel>
              <CFormSelect
                className="form-select"
                id="status"
                onChange={(e) => {
                  setStatus(e.target.value)
                  setIsEditedStatus(true)
                }}
                defaultValue={formContent.email_status}
                required
              >
                <option disabled>Status</option>
                <option value="ACTIVE">Active</option>
                <option value="TBC">To be closed</option>
                <option value="INACTIVE">Inactive</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CCol xs={12} className="modal-footer">
            <CButton color="secondary" onClick={onCloseEdit}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={() => onDelete(formContent.dev_id)}>
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

export default EditDevice

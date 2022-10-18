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
} from '@coreui/react-pro'

const EditOffice = ({ visible, onClose, formContent, onEdit, onDelete, onCloseEdit }) => {
  const [offID, setOffID] = useState('')
  const [isEditedOffID, setIsEditedOffID] = useState(false)
  const [offDesc, setOffDesc] = useState('')
  const [isEditedDesc, setIsEditedDesc] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    const newFormContent = {
      off_id: !isEditedOffID ? formContent.off_id : offID,
      off_desc: !isEditedDesc ? formContent.off_desc : offDesc,
    }

    onEdit(newFormContent)
    setIsEditedDesc(false)
    setIsEditedOffID(false)
  }

  return (
    <CModal visible={visible} backdrop="static" onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Edit office</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm
          className="add-user row g-3 needs-validation  justify-content-center"
          onSubmit={onSubmit}
        >
          <CCol md={2}>
            <CFormInput
              className="form-control"
              type="text"
              name="offID"
              placeholder="Office ID"
              defaultValue={formContent.off_id}
              onChange={(e) => {
                setIsEditedOffID(true)
                setOffID(e.target.value.trim())
              }}
              maxLength={3}
              required
            />
          </CCol>
          <CCol md={7}>
            <CFormInput
              className="form-control"
              type="text"
              name="offDesc"
              defaultValue={formContent.off_desc}
              placeholder="Description"
              onChange={(e) => {
                setIsEditedDesc(true)
                console.log(e.target.value.trim())
                setOffDesc(e.target.value.trim())
              }}
              maxLength={45}
            />
          </CCol>
          <CCol xs={12} className="modal-footer">
            <CButton color="secondary" onClick={onCloseEdit}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={() => onDelete(formContent.off_id)}>
              Delete office
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

export default EditOffice

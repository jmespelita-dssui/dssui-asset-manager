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
  CFormSelect,
} from '@coreui/react-pro'

const EditSector = ({
  visible,
  onClose,
  formContent,
  sector,
  sectorList,
  onEdit,
  onDelete,
  onError,
  onCloseEdit,
}) => {
  const [sectName, setSectName] = useState('')
  const [isEditedName, setIsEditedName] = useState(false)
  const [sectStatus, setSectStatus] = useState('')
  const [isEditedStatus, setIsEditedStatus] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    const newFormContent = {
      sect_id: formContent.sect_id,
      sect_name: !isEditedName ? formContent.sect_name : sectName,
      sect_status: !isEditedStatus ? formContent.sect_status : sectStatus,
    }
    console.log(
      'filter + some',
      sectorList
        .filter((a) => {
          return a.sect_name !== formContent.sect_name
        })
        .some((e) => {
          return e.sect_name === newFormContent.sect_name
        }),
    )
    const checkDuplicate = sectorList
      .filter((a) => {
        return a.sect_name !== formContent.sect_name
      })
      .some((e) => {
        return e.sect_name === newFormContent.sect_name
      })

    if (checkDuplicate) {
      onError('Sector already exists.')
      return
    }

    onEdit(newFormContent)
    setIsEditedName(false)
    setIsEditedStatus(false)
  }

  return (
    <CModal visible={visible} backdrop="static" onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Edit sector</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm
          className="add-user row g-3 needs-validation justify-content-center"
          onSubmit={onSubmit}
        >
          <CCol md={7}>
            <CFormInput
              className="form-control"
              type="text"
              name="sectName"
              placeholder="Sector"
              defaultValue={formContent.sect_name}
              onChange={(e) => {
                setIsEditedName(true)
                setSectName(e.target.value.trim())
              }}
              maxLength={45}
              required
            />
          </CCol>
          <CCol md={4}>
            <CFormSelect
              className="form-select"
              onChange={(e) => {
                setIsEditedStatus(true)
                setSectStatus(e.target.value)
              }}
              defaultValue={formContent.sect_status}
              required
            >
              <option value="">Select status</option>
              <option defaultValue="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </CFormSelect>
          </CCol>
          <CCol xs={12} className="modal-footer">
            <CButton color="secondary" onClick={onCloseEdit}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={() => onDelete(sector.sect_id)}>
              Delete sector
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

export default EditSector

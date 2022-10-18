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

const EditDevice = ({ visible, onClose, formContent, onEdit, onDelete, onCloseEdit }) => {
  const [devType, setDevType] = useState('PC')
  const [isEditedDevType, setIsEditedDevType] = useState(false)

  const [pcName, setPcName] = useState('')
  const [isEditedPCName, setIsEditedPCName] = useState(false)
  const [model, setModel] = useState('')
  const [isEditedModel, setIsEditedModel] = useState(false)
  const [cCapacity, setCCapacity] = useState('')
  const [isEditedCCapacity, setIsEditedCCapacity] = useState(false)
  const [ram, setRAM] = useState('')
  const [isEditedRAM, setIsEditedRAM] = useState(false)
  const [source, setSource] = useState('INTERNAL')
  const [isEditedSource, setIsEditedSource] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    let newFormContent
    newFormContent = {
      dev_id: formContent.dev_id,
      dev_type: !isEditedDevType ? formContent.dev_type : devType,
      pc_name: !isEditedPCName ? formContent.pc_name : pcName,
      model: !isEditedModel ? formContent.model : model,
      source: !isEditedSource ? formContent.source : source,
      c_drive_capacity: !isEditedCCapacity ? formContent.c_drive_capacity : cCapacity,
      ram: !isEditedRAM ? formContent.ram : ram,
    }

    setIsEditedCCapacity(false)
    setIsEditedDevType(false)
    setIsEditedModel(false)
    setIsEditedPCName(false)
    setIsEditedRAM(false)
    setIsEditedSource(false)
    console.log('from Modal: ', newFormContent)

    onEdit(newFormContent)
  }

  return (
    <CModal visible={visible} size="lg" backdrop="static" onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Edit device</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm
          className="add-user row g-3 needs-validation justify-content-center"
          onSubmit={onSubmit}
        >
          <CCol md={2}>
            <CFormSelect
              className="form-select"
              onChange={(e) => {
                setDevType(e.target.value)
                setIsEditedDevType(true)
              }}
              defaultValue={formContent.dev_type}
              required
            >
              <option disabled>Select type</option>
              <option defaultValue="PC">PC</option>
              <option value="LAPTOP">Laptop</option>
              <option value="MINIPC">Mini PC</option>
              <option value="MACBOOK">MacBook</option>
              <option value="IMAC">iMac</option>
              <option value="MACMINI">Mac Mini</option>
            </CFormSelect>
          </CCol>
          <CCol md={2}>
            <CFormInput
              className="form-control"
              type="text"
              name="pcName"
              placeholder="PC Name"
              defaultValue={formContent.pc_name}
              onChange={(e) => {
                setIsEditedPCName(true)
                setPcName(e.target.value.trim())
              }}
              maxLength={45}
              required
            />
          </CCol>
          <CCol md={2}>
            <CFormInput
              className="form-control"
              type="text"
              name="model"
              defaultValue={formContent.model}
              placeholder="Model"
              onChange={(e) => {
                setIsEditedModel(true)
                setModel(e.target.value.trim())
              }}
              maxLength={45}
            />
          </CCol>
          <CCol md={2}>
            <CFormInput
              className="form-control"
              type="text"
              name="cCapacity"
              defaultValue={formContent.c_drive_capacity}
              placeholder="C:\"
              onChange={(e) => {
                setIsEditedCCapacity(true)
                setCCapacity(e.target.value.trim())
              }}
              maxLength={45}
            />
          </CCol>
          <CCol md={2}>
            <CFormSelect
              className="form-select"
              defaultValue={formContent.ram}
              onChange={(e) => {
                setIsEditedRAM(true)
                setRAM(e.target.value)
              }}
            >
              <option value="">RAM</option>
              <option value="8192 MB">8 GB</option>
              <option value="10240 MB">10 GB</option>
              <option value="12288 MB">12 GB</option>
              <option value="16384 MB">16 GB</option>
            </CFormSelect>
          </CCol>
          <CCol md={2}>
            <CFormSelect
              className="form-select"
              defaultValue={formContent.source}
              onChange={(e) => {
                setIsEditedSource(true)
                setSource(e.target.value)
              }}
              required
            >
              <option disabled>Select source</option>
              <option defaultValue="EXTERNAL">External</option>
              <option value="INTERNAL">Internal</option>
              <option value="APSA">APSA</option>
            </CFormSelect>
          </CCol>
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

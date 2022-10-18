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

const EditAccessory = ({ visible, onClose, onEdit, formContent, onDelete }) => {
  const [cat, setCat] = useState('')
  const [isEditedCat, setIsEditedCat] = useState(false)
  const [model, setModel] = useState('')
  const [isEditedModel, setIsEditedModel] = useState(false)
  const [source, setSource] = useState('')
  const [isEditedSource, setIsEditedSource] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    const newFormContent = {
      acc_id: formContent.acc_id,
      cat: !isEditedCat ? formContent.cat : cat,
      model: !isEditedModel ? formContent.acc_model : model,
      source: !isEditedSource ? formContent.source : source,
    }
    setIsEditedCat(false)
    setIsEditedModel(false)
    setIsEditedSource(false)

    onEdit(newFormContent)
  }

  return (
    <CModal visible={visible} backdrop="static" onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Edit accessory</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm
          className="add-user row g-3 needs-validation justify-content-center"
          onSubmit={onSubmit}
        >
          <CCol md={3}>
            <CFormSelect
              className="form-select"
              onChange={(e) => {
                setIsEditedCat(true)
                setCat(e.target.value)
              }}
              defaultValue={formContent.cat}
              required
            >
              <option disabled>Select category</option>
              <option defaultValue="PRINTER">Printer</option>
              <option value="MONITOR">Monitor</option>
              <option value="KEYBOARD">Keyboard</option>
              <option value="MOUSE">Mouse</option>
              <option value="WEBCAM">Webcam</option>
              <option value="HEADSET">Headset</option>
              <option value="USB HUB">USB Hub</option>
            </CFormSelect>
          </CCol>
          <CCol md={6}>
            <CFormInput
              className="form-control"
              type="text"
              name="model"
              placeholder="Model"
              defaultValue={formContent.acc_model}
              onChange={(e) => {
                setIsEditedModel(true)
                setModel(e.target.value.trim())
              }}
              maxLength={45}
            />
          </CCol>

          <CCol md={3}>
            <CFormSelect
              className="form-select"
              defaultValue={formContent.source}
              onChange={(e) => {
                setIsEditedSource(true)
                setSource(e.target.value)
              }}
              required
            >
              <option value="">Select source</option>
              <option value="INTERNAL">Internal</option>
              <option value="EXTERNAL">External</option>
              <option value="APSA">APSA</option>
            </CFormSelect>
          </CCol>
          <CCol xs={12} className="modal-footer">
            <CButton color="secondary" onClick={() => onDelete(formContent.acc_id)}>
              Delete accessory
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

export default EditAccessory

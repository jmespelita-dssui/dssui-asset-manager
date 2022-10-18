import { useState } from 'react'
import { CForm, CFormInput, CFormSelect, CCol, CButton } from '@coreui/react-pro'

const AddAccessory = ({ onAdd }) => {
  const [cat, setCat] = useState('PRINTER')
  const [model, setModel] = useState('')
  const [source, setSource] = useState('INTERNAL')
  const [quantity, setQuantity] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()

    onAdd({ cat, model, source, quantity })
    clearForm(e)
  }

  const clearForm = (e) => {
    e.target.reset()
  }

  return (
    <>
      <CForm
        className="add-user row g-3 needs-validation justify-content-center"
        onSubmit={onSubmit}
      >
        <CCol md={2}>
          <CFormSelect
            className="form-select"
            onChange={(e) => {
              setCat(e.target.value)
            }}
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
        <CCol md={3}>
          <CFormInput
            className="form-control"
            type="text"
            name="model"
            placeholder="Model"
            onChange={(e) => {
              setModel(e.target.value.trim())
            }}
            maxLength={45}
            required
          />
        </CCol>
        <CCol md={2}>
          <CFormSelect
            className="form-select"
            onChange={(e) => {
              setSource(e.target.value)
            }}
            required
          >
            <option disabled>Select source</option>
            <option value="INTERNAL">Internal</option>
            <option defaultValue="EXTERNAL">External</option>
            <option defaultValue="APSA">APSA</option>
          </CFormSelect>
        </CCol>
        <CCol md={1}>
          <CFormInput
            className="form-control"
            type="text"
            name="quantity"
            placeholder="qty"
            onChange={(e) => {
              setQuantity(e.target.value.trim())
            }}
            maxLength={45}
            required
          />
        </CCol>
        <CCol md={2}>
          <CButton type="submit" color="secondary">
            Add accessory
          </CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddAccessory

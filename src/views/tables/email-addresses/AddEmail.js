import { useState } from 'react'
import { CForm, CFormInput, CFormSelect, CCol, CButton } from '@coreui/react'

const AddDevice = ({ onAdd, deviceList, onError }) => {
  const [devType, setDevType] = useState('')
  const [pcName, setPcName] = useState('')
  const [model, setModel] = useState('')
  const [cCapacity, setCCapacity] = useState('')
  const [ram, setRAM] = useState('')
  const [source, setSource] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    const checkDuplicatePCName = deviceList.some((device) => {
      return device.pc_name === pcName
    })

    if (checkDuplicatePCName) {
      onError('Device already exists.')
      // e.target.reset()
      return
    }

    onAdd({ devType, pcName, model, cCapacity, ram, source })
    clearForm(e)
  }

  const clearForm = (e) => {
    e.target.reset()
    setDevType('PC')
    setPcName('')
    setRAM('')
    setSource('INTERNAL')
  }

  return (
    <>
      <CForm className="add-user row g-3 needs-validation justify-content-center" onSubmit={onSubmit}>
        <CCol md={2}>
          <CFormSelect
            className="form-select"
            onChange={(e) => {
              setDevType(e.target.value)
            }}
            required
          >
            <option value=''>Select device type</option>
            <option value="PC">PC</option>
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
            onChange={(e) => {
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
            placeholder="Model"
            onChange={(e) => {
              setModel(e.target.value.trim())
            }}
            maxLength={45}
          />
        </CCol>
        <CCol md={1}>
          <CFormInput
            className="form-control"
            type="text"
            name="cCapacity"
            placeholder="C:\"
            onChange={(e) => {
              setCCapacity(e.target.value.trim())
            }}
            maxLength={45}
          />
        </CCol>
        <CCol md={1}>
          <CFormSelect
            className="form-select"
            onChange={(e) => {
              setRAM(e.target.value)
            }}
          >
            <option value=''>RAM</option>
            <option value="8192 MB">8 GB</option>
            <option value="10240 MB">10 GB</option>
            <option value="12288 MB">12 GB</option>
            <option value="16384 MB">16 GB</option>
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CFormSelect
            className="form-select"
            onChange={(e) => {
              setSource(e.target.value)
            }}
            required
          >
            <option value=''>Select source</option>
            <option value="INTERNAL">Internal</option>
            <option value="EXTERNAL">External</option>
            <option value="APSA">APSA</option>
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CButton type="submit" color="secondary">
            Add device
          </CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AddDevice

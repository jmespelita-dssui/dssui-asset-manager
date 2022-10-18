import { useState } from 'react'
import {
  CForm,
  CFormSelect,
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from '@coreui/react-pro'

const AssignPC = ({ visible, onAdd, deviceList, onClose }) => {
  const [device, setDevice] = useState('')

  return (
    <>
      <CModal visible={visible} backdrop="static" onClose={onClose}>
        <CModalHeader>
          <CModalTitle>Assign PC</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="add-user row g-3 needs-validation justify-content-center"
            onSubmit={() => onAdd(device)}
          >
            <CCol md={7}>
              <CFormSelect
                className="form-select"
                onChange={(e) => {
                  setDevice(e.target.value)
                  console.log('selected dev_ID: ' + e.target.value)
                }}
                defaultValue=""
                required
              >
                <option value="">Select device</option>
                {deviceList.map((d, key) => {
                  return (
                    <option key={key} value={d.dev_id}>
                      {d.pc_name}
                    </option>
                  )
                })}
              </CFormSelect>
            </CCol>
            <CCol md={4}>
              <CButton type="submit" color="secondary">
                Assign device
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default AssignPC

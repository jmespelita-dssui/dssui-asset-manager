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

const AssignIPtoDev = ({ visible, onAdd, ipList, onClose }) => {
  const [ip, setIP] = useState('')

  return (
    <>
      <CModal visible={visible} backdrop="static" onClose={onClose}>
        <CModalHeader>
          <CModalTitle>Assign IP</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="add-user row g-3 needs-validation justify-content-center"
            onSubmit={() => onAdd(ip)}
          >
            <CCol md={7}>
              <CFormSelect
                className="form-select"
                onChange={(e) => {
                  setIP(e.target.value)
                }}
                defaultValue=""
                required
              >
                <option value="">Select IP</option>
                {ipList.map((d, key) => {
                  return (
                    <option key={key} value={d.ip_address}>
                      {d.ip_address}
                    </option>
                  )
                })}
              </CFormSelect>
            </CCol>
            <CCol md={4}>
              <CButton type="submit" color="secondary">
                Assign IP
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default AssignIPtoDev

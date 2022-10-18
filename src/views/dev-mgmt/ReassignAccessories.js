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

const ReassignAccessories = ({ visible, currentDevID, onReassign, deviceList, onClose }) => {
  const [devID, setDevID] = useState('')

  return (
    <>
      <CModal visible={visible} backdrop="static" onClose={onClose}>
        <CModalHeader>
          <CModalTitle>Re-assign accessories</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="add-user row g-3 needs-validation justify-content-center"
            onSubmit={() => onReassign(devID)}
          >
            <CCol md={7}>
              <CFormSelect
                className="form-select"
                onChange={(e) => {
                  setDevID(e.target.value)
                }}
                defaultValue=""
                required
              >
                <option value="">Select device</option>

                {deviceList
                  .filter((device) => device.dev_id !== currentDevID)
                  .map((d, key) => {
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
                Confirm
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default ReassignAccessories

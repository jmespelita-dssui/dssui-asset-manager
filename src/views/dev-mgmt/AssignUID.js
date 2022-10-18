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

const AssignUID = ({ visible, onAdd, uidList, employee, onClose }) => {
  const [uid, setUID] = useState('')

  return (
    <>
      <CModal visible={visible} backdrop="static" onClose={onClose}>
        <CModalHeader>
          <CModalTitle>Assign UID </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="add-user row g-3 needs-validation justify-content-center"
            onSubmit={() => onAdd({ employee, uid })}
          >
            <CCol md={7}>
              <CFormSelect
                className="form-select"
                onChange={(e) => {
                  setUID(e.target.value)
                }}
                defaultValue=""
                required
              >
                <option value="">Select UID</option>
                {uidList.map((d, key) => {
                  return (
                    <option key={key} value={d.dom_uid}>
                      {d.dom_uid}
                    </option>
                  )
                })}
              </CFormSelect>
            </CCol>
            <CCol md={4}>
              <CButton type="submit" color="secondary">
                Assign UID
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default AssignUID

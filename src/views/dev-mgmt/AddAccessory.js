import { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CCol,
  CButton,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CFormSelect,
} from '@coreui/react-pro'

const AddAccessory = ({ visible, onClose, onSubmit, accessory, type, filteredAccessories }) => {
  const [model, setModel] = useState('')
  return (
    <>
      <CModal visible={visible} backdrop="static" onClose={onClose}>
        <CModalHeader>
          <CModalTitle>Add accessory</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="add-user row g-3 needs-validation" onSubmit={() => onSubmit(model)}>
            <CCol md={12}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon2">PC Name</CInputGroupText>
                <CFormInput
                  placeholder={accessory.length > 0 ? accessory[0].pc_name : ''}
                  aria-label="Accessory PC Name"
                  aria-describedby="basic-addon2"
                  disabled
                />

                <CFormSelect
                  onChange={(e) => {
                    setModel(e.target.value)
                  }}
                  required
                >
                  <option value="">SELECT {type}</option>
                  {filteredAccessories.map((e, key) => {
                    return (
                      <option key={key} value={e.acc_id}>
                        {e.acc_id} {e.acc_model}
                      </option>
                    )
                  })}
                </CFormSelect>
              </CInputGroup>
            </CCol>
            <CCol xs={12} className="modal-footer">
              <CButton color="secondary" onClick={onClose}>
                Cancel
              </CButton>
              <CButton color="primary" type="submit">
                Confirm
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default AddAccessory

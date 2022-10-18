import { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton,
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
const EditOffice = ({ visible, onClose, officeList, onSave, formContent }) => {
  const [office, setOffice] = useState('')
  const onSubmit = (e) => {
    e.preventDefault(e)

    onSave({ emp_id: formContent.emp_id, off_id: office, emp_off_id: formContent.emp_off_id })
  }

  return (
    <>
      <CModal visible={visible} backdrop="static" onClose={onClose}>
        <CModalHeader>
          <CModalTitle>Edit office</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3 needs-validation justify-content-center" onSubmit={onSubmit}>
            <CCol md={7}>
              <CFormLabel htmlFor="validationDefault01">Full name</CFormLabel>
              <CFormInput
                type="text"
                id="validationDefault01"
                defaultValue={formContent.emp_full_name}
                disabled
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="validationDefault02">Office</CFormLabel>
              <CFormSelect
                id="validationDefault02"
                className="form-select"
                onChange={(e) => {
                  setOffice(e.target.value)
                }}
                defaultValue={formContent.off_id}
              >
                <option value="">Select Office</option>
                {officeList.map((d, key) => {
                  return (
                    <option key={d.off_id} value={d.off_id}>
                      {`${d.off_id} ${d.off_desc}`}
                    </option>
                  )
                })}
              </CFormSelect>
            </CCol>
            <CCol xs={12} className="modal-footer">
              <CButton color="secondary" onClick={onClose}>
                Cancel
              </CButton>
              {/* <CButton
                color="secondary"
                onClick={() =>
                  onUnassign({
                    emp_id: formContent.emp_id,
                    emp_sect_id: formContent.emp_sect_id,
                    type: 'sector',
                  })
                }
              >
                Unassign sector
              </CButton> */}
              <CButton color="primary" type="submit">
                Save changes
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default EditOffice

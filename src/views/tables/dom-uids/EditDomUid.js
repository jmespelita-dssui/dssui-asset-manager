import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton,
  CForm,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react-pro'

const EditDomUid = ({ visible, onClose, formContent, onDelete, onCloseEdit }) => {
  return (
    <CModal visible={visible} backdrop="static" onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Domain UID</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="add-user row g-3 needs-validation justify-content-center">
          <CInputGroup>
            <CInputGroupText id="basic-addon1">User ID</CInputGroupText>
            <CFormInput
              className="form-control"
              type="text"
              name="ipAddress"
              disabled
              defaultValue={formContent.dom_uid}
              maxLength={6}
              required
            />
          </CInputGroup>
          <CCol xs={12} className="modal-footer">
            <CButton color="secondary" onClick={onCloseEdit}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={() => onDelete(formContent.dom_uid)}>
              Delete user
            </CButton>
          </CCol>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default EditDomUid

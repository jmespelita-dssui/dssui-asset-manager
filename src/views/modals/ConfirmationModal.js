import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CCol,
  CButton,
} from '@coreui/react-pro'

const ConfirmationModal = ({ visible, onClose, onSubmit, item, popupMsg }) => {
  return (
    <>
      <CModal visible={visible} size="sm" backdrop="static" onClose={onClose}>
        <CModalHeader>
          <CModalTitle>Save changes</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="add-user row g-3 needs-validation" onSubmit={() => onSubmit(item)}>
            <CCol md={12}>{popupMsg}</CCol>
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

export default ConfirmationModal

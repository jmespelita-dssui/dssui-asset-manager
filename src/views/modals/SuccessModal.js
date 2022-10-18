import { CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/react-pro'

const SuccessModal = ({ visible, popupMsg, onClose }) => {
  return (
    <CModal size="sm" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Success</CModalTitle>
      </CModalHeader>
      <CModalBody>{popupMsg}</CModalBody>
    </CModal>
  )
}

export default SuccessModal

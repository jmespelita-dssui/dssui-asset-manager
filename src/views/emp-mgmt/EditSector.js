import { useState } from 'react'
import Moment from 'moment'
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
  CDatePicker,
} from '@coreui/react-pro'

const EditSector = ({ visible, onClose, onUnassign, onSave, formContent }) => {
  const [startDate, setStartDate] = useState(formContent.date_assigned_sect)
  const [endDate, setEndDate] = useState(formContent.date_unassigned_sect)
  const [isChangedStartDate, setIsChangedStartDate] = useState(false)
  const [isChangedEndDate, setIsChangedEndDate] = useState(false)
  
  const onSubmit = (e) => {
    e.preventDefault(e)
    let checkedStartDate = isChangedStartDate ? startDate : formContent.date_assigned_sect
    let checkedEndDate = isChangedEndDate ? endDate : formContent.date_unassigned_sect
    onSave({
      emp_id: formContent.emp_id,
      emp_sect_id: formContent.emp_sect_id,
      date_assigned_sect: checkedStartDate,
      date_unassigned_sect: checkedEndDate,
    })
    setStartDate(formContent.date_assigned_sect)
    setEndDate(formContent.date_assigned_sect)
    setIsChangedStartDate(false)
    setIsChangedEndDate(false)
  }
  return (
    <>
      <CModal visible={visible} size="lg" backdrop="static" onClose={onClose}>
        <CModalHeader>
          <CModalTitle>Edit status</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3 needs-validation justify-content-center" onSubmit={onSubmit}>
            <CCol md={5}>
              <CFormLabel htmlFor="validationDefault01">Sector</CFormLabel>
              <CFormInput
                type="text"
                id="validationDefault01"
                defaultValue={formContent.sect_name}
                disabled
                required
              />
            </CCol>
            <CCol md={3}>
              <CFormLabel htmlFor="validationDefault02">Start date</CFormLabel>
              <CDatePicker
                placeholder="Start date"
                locale="it-IT"
                id="validationDefault02"
                date={Moment(formContent.date_assigned_sect).format('MM/DD/YYYY')}
                onDateChange={(e) => {
                  setIsChangedStartDate(true)
                  console.log('start date change', e)
                  if (e !== null) {
                    setStartDate(Moment(e).format('YYYY-MM-DD'))
                    console.log('OUTPUT DATE', e)
                  } else {
                    setStartDate(null)
                  }
                }}
              />
            </CCol>
            <CCol md={3}>
              <CFormLabel htmlFor="validationDefault03">End date</CFormLabel>
              <CDatePicker
                placeholder="End date"
                locale="it-IT"
                id="validationDefault03"
                date={
                  formContent.date_unassigned_sect
                    ? Moment(formContent.date_unassigned_sect).format('MM/DD/YYYY')
                    : ''
                }
                // onDateChange={(e) => {
                //   console.log('date changed!!', Moment(e).format('YYYY-MM-DD'))
                //   setEndDate(Moment(e).format('YYYY-MM-DD'))
                // }}
                onDateChange={(e) => {
                  setIsChangedEndDate(true)
                  console.log('end date change', e)
                  if (e !== null) {
                    setEndDate(Moment(e).format('YYYY-MM-DD'))
                  } else {
                    setEndDate(null)
                  }
                }}
              />
            </CCol>
            <CCol xs={12} className="modal-footer">
              <CButton color="secondary" onClick={onClose}>
                Cancel
              </CButton>
              <CButton
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
              </CButton>
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

export default EditSector

import { useState } from 'react'
import {
  CForm,
  CFormInput,
  CButton,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react-pro'

const AddDomUid = ({ onAdd, domUidList, onError }) => {
  const [domUid, setDomUid] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const completeID = 'dssui.user' + domUid;
    
    const regex=/^[0-9]+$/;
    if(!domUid.match(regex)){
      onError('Please insert valid ID.')
      return
    }
    
    const checkDuplicate = domUidList.some((u) => {
      return completeID === u.dom_uid
    })

    setDomUid()
    if (checkDuplicate) {
      onError('Domain UID already exists.')
      return
    }

    onAdd({ completeID })
    clearForm(e)
  }

  const clearForm = (e) => {
    e.target.reset()
    setDomUid('')
  }

  return (
    <>
      <CForm className="add-user row g-3 needs-validation justify-content-center" onSubmit={onSubmit}>
        <CInputGroup>
          <CInputGroupText id="basic-addon1">dssui.user</CInputGroupText>
          <CFormInput
            className="form-control"
            type="text"
            name="domUid"
            onChange={(e) => {
              setDomUid(e.target.value.trim())
            }}
            maxLength={6}
            required
          />
          <CButton type="submit" color="secondary">
            Add Domain UID
          </CButton>
        </CInputGroup>
      </CForm>
    </>
  )
}

export default AddDomUid

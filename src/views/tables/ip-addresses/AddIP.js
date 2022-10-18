import { useState } from 'react'
import { CForm, CFormInput, CButton, CInputGroup, CInputGroupText } from '@coreui/react-pro'

const AddIPAddress = ({ onAdd, ipAddressList, onError }) => {
  const [ipAddress, setIPAddress] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const completeIP = '10.7.12.' + ipAddress

    const regex = /^[0-9]+$/
    if (!ipAddress.match(regex)) {
      onError('Please insert valid IP address.')
      return
    }

    const checkDuplicate = ipAddressList.some((ip) => {
      return completeIP === ip.ip_address
    })

    setIPAddress()
    if (checkDuplicate) {
      onError('IP Address already exists.')
      return
    }

    onAdd({ completeIP })
    clearForm(e)
  }

  const clearForm = (e) => {
    e.target.reset()
    setIPAddress('')
  }

  return (
    <>
      <CForm
        className="add-user row g-3 needs-validation justify-content-center"
        onSubmit={onSubmit}
      >
        <CInputGroup>
          <CInputGroupText id="basic-addon1">10.7.12.</CInputGroupText>
          <CFormInput
            className="form-control"
            type="text"
            name="ipAddress"
            onChange={(e) => {
              setIPAddress(e.target.value.trim())
            }}
            maxLength={3}
            required
          />
          <CButton type="submit" color="secondary">
            Add IP Address
          </CButton>
        </CInputGroup>
      </CForm>
    </>
  )
}

export default AddIPAddress

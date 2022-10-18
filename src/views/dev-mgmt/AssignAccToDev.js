import { useState } from 'react'
import { CForm, CFormSelect, CCol, CButton } from '@coreui/react-pro'
import axios from 'axios'

const AssignAccToDev = ({ onAdd, onError, deviceList }) => {
  const [device, setDevice] = useState('34')
  const [cat, setCat] = useState('PRINTER')
  const [acc, setAcc] = useState('')
  const [options, setOptions] = useState([])

  const onSubmit = (e) => {
    e.preventDefault()
    let accID = acc.split(' ')[0]
    if (acc === '' || acc === 'Select') {
      onError('No accessory chosen.')
      return
    }
    onAdd({ device, accID })
    clearForm(e)
  }

  const changeSelectOptionHandler = (e) => {
    console.log('chosen category: ' + e)
    // let filteredList = []

    axios
      .get(`http://localhost:3001/api/dev-acc-id/${e}`)
      .then((response) => {
        console.log(response.data)
        let content = response.data.map((i) => (
          <option key={i.acc_id}>
            {i.acc_id} {i.model}
          </option>
        ))
        setOptions((o) => content)
      })
      .catch((error) => {
        onError(error.message)
        console.log(error.message)
        return
      })
  }

  const clearForm = (e) => {
    e.target.reset()
    setDevice(deviceList[0].dev_id)
    setCat('PRINTER')
    setAcc('')
    setOptions((o) => '')
  }

  return (
    <>
      <CForm className="add-user row g-3 needs-validation" onSubmit={onSubmit}>
        <CCol md={3}>
          <CFormSelect
            className="form-select"
            // onLoad={clearForm}
            onChange={(e) => {
              setDevice(e.target.value)
              console.log('selected dev ID: ' + e.target.value)
            }}
            defaultValue=""
            required
          >
            <option value="">Select device</option>
            {deviceList.map((e, key) => {
              return (
                <option key={key} value={e.dev_id}>
                  {e.pc_name}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CFormSelect
            className="form-select"
            onChange={(e) => {
              setCat(e.target.key)
              changeSelectOptionHandler(e.target.value)
            }}
            defaultValue=""
            required
          >
            <option value="">Select category</option>
            <option value="PRINTER">Printer</option>
            <option value="MONITOR">Monitor</option>
            <option value="KEYBOARD">Keyboard</option>
            <option value="MOUSE">Mouse</option>
            <option value="WEBCAM">Webcam</option>
            <option value="HEADSET">Headset</option>
            <option value="USB HUB">USB Hub</option>
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CFormSelect
            className="form-select"
            onClick={(e) => {
              setAcc(e.target.value)
              console.log('selected accessory: ' + e.target.value)
            }}
            defaultValue=""
            required
          >
            <option value="">Select accessory</option>
            {options}
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CButton type="submit" color="secondary">
            Assign Accessory
          </CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default AssignAccToDev

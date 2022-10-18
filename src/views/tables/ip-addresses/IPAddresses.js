import { React, useState, useEffect } from 'react'
import { CSmartTable, CButton } from '@coreui/react-pro'
import axios from 'axios'
import { config } from '../../../Config'

import AddIPAddress from './AddIP'
import EditIPAddress from './EditIP'
import SuccessModal from '../../modals/SuccessModal'
import FailModal from '../../modals/FailModal'

// import '@fortawesome/fontawesome-free/css/all.min.css'

const IPAddresses = () => {
  const [ipAddressList, setIPAddressList] = useState([])
  const [visibleIPAddress, setVisibleIPAddress] = useState(false)
  const [formContent, setFormContent] = useState({})
  const [ipAddress, setIPAddress] = useState({})
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleFail, setVisibleFail] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  const columns = [
    'ip_address',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]

  const fetchData = async () => {
    console.log('fetching data...')
    axios.get(`${config.api}/api/ip-addresses`).then((response) => {
      setIPAddressList(response.data)
    })
  }

  const addIPAddress = (ipAddress) => {
    axios
      .post(`${config.api}/api/add-ip-address`, {
        ipAddress: ipAddress.completeIP,
      })
      .then((res) => {
        setPopupMsg('IP Address successfully added.')
        setVisibleSuccess(!visibleSuccess)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleIPAddress(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const deleteIPAddress = (id) => {
    axios
      .delete(`${config.api}/${id}`)
      .then(() => {
        setPopupMsg('Entry successfully deleted.')
        setVisibleSuccess(!visibleSuccess)
        setVisibleIPAddress(false)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleIPAddress(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        return
      })
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 2000)
  }, [setIPAddressList])

  const onCloseSuccess = () => {
    setVisibleSuccess(false)
  }
  const onCloseFail = () => {
    setVisibleFail(false)
  }

  const onCloseEdit = () => {
    setVisibleIPAddress(false)
  }

  const onError = (msg) => {
    setPopupMsg(msg)
    setVisibleFail(!visibleFail)
  }

  return (
    <div className="table">
      <SuccessModal visible={visibleSuccess} popupMsg={popupMsg} onClose={onCloseSuccess} />
      <FailModal visible={visibleFail} popupMsg={popupMsg} onClose={onCloseFail} />

      <EditIPAddress
        visible={visibleIPAddress}
        onClose={onCloseEdit}
        formContent={formContent}
        ipAddress={ipAddress}
        ipAddressList={ipAddressList}
        onDelete={deleteIPAddress}
        onError={onError}
        onCloseEdit={onCloseEdit}
      />

      <div className="table card">
        <AddIPAddress onAdd={addIPAddress} ipAddressList={ipAddressList} onError={onError} />
      </div>

      <div className="table card">
        <CSmartTable
          cleaner
          columns={columns}
          tableProps={{
            hover: true,
            responsive: true,
          }}
          // columnFilter
          columnSorter
          items={ipAddressList}
          pagination
          itemsPerPage={10}
          tableFilter
          scopedColumns={{
            show_details: (item) => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      console.log(item)
                      setFormContent(item)
                      setIPAddress(item)
                      setVisibleIPAddress(true)
                    }}
                  >
                    Edit
                  </CButton>
                </td>
              )
            },
          }}
          // loading
        />
      </div>
    </div>
  )
}

export default IPAddresses

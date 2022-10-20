import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { config } from '../../../Config'

import AddDevice from './AddDevice'
import EditDevice from './EditDevice'
import SuccessModal from '../../modals/SuccessModal'
import FailModal from '../../modals/FailModal'

import { CSmartTable, CButton } from '@coreui/react-pro'

// import '@fortawesome/fontawesome-free/css/all.min.css'

const Devices = () => {
  const [deviceList, setDeviceList] = useState([])
  const [visibleDevice, setVisibleDevice] = useState(false)
  const [formContent, setFormContent] = useState({})
  const [device, setDevice] = useState({})
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleFail, setVisibleFail] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  const columns = [
    'dev_id',

    {
      key: 'dev_type',
      label: 'Type',
    },
    'pc_name',
    'model',
    {
      key: 'c_drive_capacity',
      label: 'C: Capacity',
    },
    {
      key: 'ram',
      label: 'RAM',
    },
    'source',
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
    axios.get(`${config.api}/api/devices`).then((response) => {
      setDeviceList(response.data)
    })
  }

  const addDevice = (device) => {
    // console.log('adding device:', device)

    axios
      .post(`${config.api}/api/add-device`, {
        devType: device.devType,
        pcName: device.pcName,
        model: device.model,
        cCapacity: device.cCapacity,
        ram: device.ram,
        source: device.source,
      })
      .then((res) => {
        setPopupMsg('Device successfully added.')
        setVisibleSuccess(!visibleSuccess)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleDevice(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const editDevice = (device) => {
    // e.preventDefault()
    // console.log('editDevice', formContent, device)
    if (
      formContent.dev_type === device.dev_type &&
      formContent.pc_name === device.pc_name &&
      formContent.model === device.model &&
      formContent.c_drive_capacity === device.c_drive_capacity &&
      formContent.ram === device.ram &&
      formContent.source === device.source
    ) {
      onError('No changes were made.')
    } else {
      axios
        .put(`${config.api}/api/edit-device`, device)
        .then(() => {
          setPopupMsg('Device successfully updated.')
          setVisibleSuccess(!visibleSuccess)
          setTimeout(() => {
            fetchData()
          }, 2000)
        })
        .catch((error) => {
          setVisibleDevice(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          console.log(error.message)
          return
        })
    }

    setVisibleDevice(false)
  }

  const deleteDevice = (id) => {
    axios
      .delete(`${config.api}/api/delete-device/${id}`)
      .then(() => {
        setPopupMsg('Entry successfully deleted.')
        setVisibleSuccess(!visibleSuccess)
        setVisibleDevice(false)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleDevice(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        return
      })
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 2000)
  }, [setDeviceList])

  const onCloseSuccess = () => {
    setVisibleSuccess(false)
  }
  const onCloseFail = () => {
    setVisibleFail(false)
  }

  const onCloseEdit = () => {
    setVisibleDevice(false)
  }

  const onError = (msg) => {
    setPopupMsg(msg)
    setVisibleFail(!visibleFail)
  }

  return (
    <div className="table">
      <SuccessModal visible={visibleSuccess} popupMsg={popupMsg} onClose={onCloseSuccess} />
      <FailModal visible={visibleFail} popupMsg={popupMsg} onClose={onCloseFail} />

      <EditDevice
        visible={visibleDevice}
        onClose={onCloseEdit}
        onEdit={editDevice}
        formContent={formContent}
        onDelete={deleteDevice}
        onError={onError}
        onCloseEdit={onCloseEdit}
      />

      <div className="table card">
        <AddDevice onAdd={addDevice} deviceList={deviceList} onError={onError} />
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
          items={deviceList}
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
                      setFormContent(item)
                      setDevice(item)
                      setVisibleDevice(true)
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

export default Devices

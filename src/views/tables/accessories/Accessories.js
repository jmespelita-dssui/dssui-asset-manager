import { React, useState, useEffect } from 'react'
import axios from 'axios'
import AddAccessory from './AddAccessory'
import EditAccessory from './EditAccessory'
import SuccessModal from '../../modals/SuccessModal'
import FailModal from '../../modals/FailModal'
import { config } from '../../../Config'

import { CSmartTable, CButton } from '@coreui/react-pro'

// import '@fortawesome/fontawesome-free/css/all.min.css'

const Accessories = () => {
  const [accessoryList, setAccessoryList] = useState([])
  const [visibleAccessory, setVisibleAccessory] = useState(false)
  const [formContent, setFormContent] = useState({})
  const [accessory, setAccessory] = useState({})
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleFail, setVisibleFail] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  const columns = [
    'acc_id',
    {
      key: 'cat',
      label: 'Category',
    },
    {
      key: 'acc_model',
      label: 'Model',
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
    axios.get(`${config.api}/api/accessories`).then((response) => {
      setAccessoryList(response.data)
    })
  }

  const addAccessory = (accessory) => {
    console.log('adding accessory:')
    console.log(accessory)

    let requests = []
    for (let i = 0; i < parseInt(accessory.quantity); i++) {
      requests.push(
        axios.post(`${config.api}/api/add-accessory`, {
          cat: accessory.cat,
          model: accessory.model,
          source: accessory.source,
        }),
      )
    }

    axios
      .all(requests)
      .then((res) => {
        setPopupMsg('Accessory successfully added.')
        setVisibleSuccess(!visibleSuccess)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleAccessory(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const editAccessory = (accessory) => {
    if (
      formContent.acc_id === accessory.acc_id &&
      formContent.cat === accessory.cat &&
      formContent.model === accessory.model
    ) {
      onError('No changes were made.')
    } else {
      axios
        .put(`${config.api}/api/edit-accessory`, accessory)
        .then(() => {
          setPopupMsg('Accessory successfully updated.')
          setVisibleSuccess(!visibleSuccess)
          setTimeout(() => {
            fetchData()
          }, 2000)
        })
        .catch((error) => {
          setVisibleAccessory(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          console.log(error.message)
          return
        })
    }

    setVisibleAccessory(false)
  }

  const deleteAccessory = (id) => {
    axios
      .delete(`${config.api}/api/delete-accessory/${id}`)
      .then(() => {
        setPopupMsg('Entry successfully deleted.')
        setVisibleSuccess(!visibleSuccess)
        setVisibleAccessory(false)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleAccessory(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        return
      })
  }

  function refreshPage() {
    window.location.reload(false)
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 2000)
  }, [setAccessoryList])

  const onCloseSuccess = () => {
    setVisibleSuccess(false)
  }
  const onCloseFail = () => {
    setVisibleFail(false)
  }

  const onCloseEdit = () => {
    setVisibleAccessory(false)
  }

  const onError = (msg) => {
    setPopupMsg(msg)
    setVisibleFail(!visibleFail)
  }

  return (
    <div className="table">
      <SuccessModal visible={visibleSuccess} popupMsg={popupMsg} onClose={onCloseSuccess} />
      <FailModal visible={visibleFail} popupMsg={popupMsg} onClose={onCloseFail} />

      <EditAccessory
        visible={visibleAccessory}
        onClose={onCloseEdit}
        onEdit={editAccessory}
        formContent={formContent}
        onDelete={deleteAccessory}
        onError={onError}
        onCloseEdit={onCloseEdit}
      />

      <div className="table card">
        <AddAccessory onAdd={addAccessory} accessoryList={accessoryList} onError={onError} />
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
          items={accessoryList}
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
                      setAccessory(item)
                      setVisibleAccessory(!visibleAccessory)
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

export default Accessories

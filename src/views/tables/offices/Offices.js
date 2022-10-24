import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { CSmartTable, CButton } from '@coreui/react-pro'
import { config } from '../../../Config'

import AddOffice from './AddOffice'
import EditOffice from './EditOffice'
import SuccessModal from '../../modals/SuccessModal'
import FailModal from '../../modals/FailModal'
// import '@fortawesome/fontawesome-free/css/all.min.css'

const Offices = () => {
  const [officeList, setOfficeList] = useState([])
  const [visibleOffice, setVisibleOffice] = useState(false)
  const [formContent, setFormContent] = useState({})
  // const [office, setOffice] = useState({})
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleFail, setVisibleFail] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  const columns = [
    {
      key: 'off_id',
      label: 'ID',
    },
    {
      key: 'off_desc',
      label: 'Description',
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]

  const fetchData = async () => {
    // console.log('fetching data...')
    axios.get(`${config.api}/api/offices`).then((response) => {
      setOfficeList(response.data)
    })
  }

  const addOffice = (office) => {
    axios
      .post(`${config.api}/api/add-office`, {
        offID: office.offID,
        offDesc: office.offDesc,
      })
      .then((res) => {
        setPopupMsg('Office successfully added.')
        setVisibleSuccess(!visibleSuccess)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleOffice(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const editOffice = (office) => {
    let params
    if (formContent.off_desc === office.off_desc && formContent.off_id === office.off_id) {
      onError('No changes were made.')
    } else {
      params = { ...office, prev_id: formContent.off_id }
      axios
        .put(`${config.api}/api/edit-office`, params)
        .then(() => {
          setPopupMsg('Office successfully updated.')
          setVisibleSuccess(!visibleSuccess)
          setTimeout(() => {
            fetchData()
          }, 2000)
        })
        .catch((error) => {
          setVisibleOffice(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          console.log(error.message)
          return
        })
    }
    setVisibleOffice(false)
  }

  const deleteOffice = (id) => {
    axios
      .delete(`${config.api}/api/delete-office/${id}`)
      .then(() => {
        setPopupMsg('Entry successfully deleted.')
        setVisibleSuccess(!visibleSuccess)
        setVisibleOffice(false)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleOffice(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        return
      })
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 2000)
  }, [setOfficeList])

  const onCloseSuccess = () => {
    setVisibleSuccess(false)
  }
  const onCloseFail = () => {
    setVisibleFail(false)
  }

  const onCloseEdit = () => {
    setVisibleOffice(false)
  }

  const onError = (msg) => {
    setPopupMsg(msg)
    setVisibleFail(!visibleFail)
  }

  return (
    <div className="table">
      <SuccessModal visible={visibleSuccess} popupMsg={popupMsg} onClose={onCloseSuccess} />
      <FailModal visible={visibleFail} popupMsg={popupMsg} onClose={onCloseFail} />

      <EditOffice
        visible={visibleOffice}
        onClose={onCloseEdit}
        formContent={formContent}
        onEdit={editOffice}
        onDelete={deleteOffice}
        onCloseEdit={onCloseEdit}
      />

      <div className="table card">
        <AddOffice onAdd={addOffice} officeList={officeList} onError={onError} />
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
          items={officeList}
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
                      // setOffice(item)
                      setVisibleOffice(true)
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

export default Offices

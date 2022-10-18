import { React, useState, useEffect } from 'react'
import { CSmartTable, CButton } from '@coreui/react-pro'
import axios from 'axios'
import { config } from '../../../Config'

import AddDomUid from './AddDomUid'
import EditDomUid from './EditDomUid'
import SuccessModal from '../../modals/SuccessModal'
import FailModal from '../../modals/FailModal'

// import '@fortawesome/fontawesome-free/css/all.min.css'

const DomUids = () => {
  const [domUidList, setDomUidList] = useState([])
  const [visibleDomUid, setVisibleDomUid] = useState(false)
  const [formContent, setFormContent] = useState({})
  const [domUid, setDomUid] = useState({})
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleFail, setVisibleFail] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  const columns = [
    'dom_uid',
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
    axios.get(`${config.api}/api/dom-uids`).then((response) => {
      setDomUidList(response.data)
    })
  }

  const addDomUid = (domUid) => {
    axios
      .post(`${config.api}/api/add-dom-uid`, {
        domUid: domUid.completeID,
      })
      .then((res) => {
        setPopupMsg('Domain UID successfully added.')
        setVisibleSuccess(!visibleSuccess)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleDomUid(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const deleteDomUid = (id) => {
    axios
      .delete(`${config.api}/api/delete-dom-uid/${id}`)
      .then(() => {
        setPopupMsg('Entry successfully deleted.')
        setVisibleSuccess(!visibleSuccess)
        setVisibleDomUid(false)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleDomUid(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        return
      })
  }

  // function refreshPage() {
  //   window.location.reload(false)
  // }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 2000)
  }, [setDomUidList])

  const onCloseSuccess = () => {
    setVisibleSuccess(false)
  }
  const onCloseFail = () => {
    setVisibleFail(false)
  }

  const onCloseEdit = () => {
    setVisibleDomUid(false)
  }

  const onError = (msg) => {
    setPopupMsg(msg)
    setVisibleFail(!visibleFail)
  }

  return (
    <div className="table">
      <SuccessModal visible={visibleSuccess} popupMsg={popupMsg} onClose={onCloseSuccess} />
      <FailModal visible={visibleFail} popupMsg={popupMsg} onClose={onCloseFail} />

      <EditDomUid
        visible={visibleDomUid}
        onClose={onCloseEdit}
        formContent={formContent}
        domUid={domUid}
        domUidList={domUidList}
        onDelete={deleteDomUid}
        onError={onError}
        onCloseEdit={onCloseEdit}
      />

      <div className="table card">
        <AddDomUid onAdd={addDomUid} domUidList={domUidList} onError={onError} />
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
          items={domUidList}
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
                      setDomUid(item)
                      setVisibleDomUid(true)
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

export default DomUids

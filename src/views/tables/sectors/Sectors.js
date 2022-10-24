import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { config } from "../../../Config";

import AddSector from './AddSector'
import EditSector from './EditSector'
import SuccessModal from '../../modals/SuccessModal'
import FailModal from '../../modals/FailModal'

import { CSmartTable, CButton } from '@coreui/react-pro'
// import '@fortawesome/fontawesome-free/css/all.min.css'

const Sectors = () => {
  const [sectorList, setSectorList] = useState([])
  const [visibleSector, setVisibleSector] = useState(false)
  const [formContent, setFormContent] = useState({})
  const [sector, setSector] = useState({ sect_id: '', sect_name: '', sect_status: '' })
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleFail, setVisibleFail] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  const columns = [
    {
      key: 'sect_id',
      label: 'ID',
    },
    {
      key: 'sect_name',
      label: 'Name',
    },
    {
      key: 'sect_status',
      label: 'Status',
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
    axios.get(`${config.api}/api/sectors`).then((response) => {
      setSectorList(response.data)
    })
  }

  const addSector = (sector) => {
    axios
      .post(`${config.api}/api/add-sector`, {
        sect_name: sector.sectName,
        sect_status: sector.sectStatus,
      })
      .then((res) => {
        setPopupMsg('Sector successfully added.')
        setVisibleSuccess(!visibleSuccess)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleSector(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const editSector = (sector) => {
    // e.preventDefault()

    if (
      formContent.sect_id === sector.sect_id &&
      formContent.sect_name === sector.sect_name &&
      formContent.sect_status === sector.sect_status
    ) {
      onError('No changes were made.')
    } else {
      axios
        .put(`${config.api}/api/edit-sector`, sector)
        .then(() => {
          setPopupMsg('Sector successfully updated.')
          setVisibleSuccess(!visibleSuccess)
          setTimeout(() => {
            fetchData()
          }, 2000)
        })
        .catch((error) => {
          setVisibleSector(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          console.log(error.message)
          return
        })
    }

    setVisibleSector(false)
  }

  const deleteSector = (id) => {
    axios
      .delete(`${config.api}/api/delete-sector/${id}`)
      .then(() => {
        setPopupMsg('Entry successfully deleted.')
        setVisibleSuccess(!visibleSuccess)
        setVisibleSector(false)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleSector(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        return
      })
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 2000)
  }, [setSectorList])

  const onCloseSuccess = () => {
    setVisibleSuccess(false)
  }
  const onCloseFail = () => {
    setVisibleFail(false)
  }

  const onCloseEdit = () => {
    setVisibleSector(false)
  }

  const onError = (msg) => {
    setPopupMsg(msg)
    setVisibleFail(!visibleFail)
  }

  return (
    <div className="table">
      <SuccessModal visible={visibleSuccess} popupMsg={popupMsg} onClose={onCloseSuccess} />
      <FailModal visible={visibleFail} popupMsg={popupMsg} onClose={onCloseFail} />

      <EditSector
        visible={visibleSector}
        onClose={onCloseEdit}
        onEdit={editSector}
        formContent={formContent}
        sector={sector}
        sectorList={sectorList}
        onDelete={deleteSector}
        onError={onError}
        onCloseEdit={onCloseEdit}
      />

      <div className="table card">
        <AddSector onAdd={addSector} sectorList={sectorList} onError={onError} />
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
          items={sectorList}
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
                      setSector(item)
                      setVisibleSector(true)
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

export default Sectors

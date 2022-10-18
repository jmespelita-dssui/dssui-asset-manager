import { React, useState, useEffect } from 'react'
import axios from 'axios'

// import AddEmailAddress from './AddEmail'
import EditEmailAddress from './EditEmail'
import SuccessModal from '../../modals/SuccessModal'
import FailModal from '../../modals/FailModal'

import { config } from '../../../Config'

import { CSmartTable, CButton } from '@coreui/react-pro'

// import '@fortawesome/fontawesome-free/css/all.min.css'

const EmailAddresses = () => {
  const [emailAddressList, setEmailAddressList] = useState([])
  const [visibleEmailAddress, setVisibleEmailAddress] = useState(false)
  const [formContent, setFormContent] = useState({})
  // const [emailAddress, setEmailAddress] = useState({})
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleFail, setVisibleFail] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  const columns = [
    {
      key: 'uid',
      label: 'User ID',
    },
    'email_address',
    'email_type',
    'display_name',
    'profile',
    {
      key: 'email_status',
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
    console.log('fetching data...')
    axios.get(`${config.api}/api/email-addresses`).then((response) => {
      setEmailAddressList(response.data)
    })
  }

  // const addEmailAddress = (emailAddress) => {
  //   console.log('adding emailAddress:', emailAddress)

  //   axios
  //     .post('https://dssui-asset-manager.herokuapp.com/api/add-emailAddress', {
  //       devType: emailAddress.devType,
  //       pcName: emailAddress.pcName,
  //       model: emailAddress.model,
  //       cCapacity: emailAddress.cCapacity,
  //       ram: emailAddress.ram,
  //       source: emailAddress.source,
  //     })
  //     .then((res) => {
  //       setPopupMsg('EmailAddress successfully added.')
  //       setVisibleSuccess(!visibleSuccess)
  //       setTimeout(() => {
  //         fetchData()
  //       }, 2000)
  //     })
  //     .catch((error) => {
  //       setVisibleEmailAddress(false)
  //       setPopupMsg(error.message)
  //       setVisibleFail(!visibleFail)
  //       console.log(error.message)
  //       return
  //     })
  // }

  const editEmailAddress = (newFormContent) => {
    // e.preventDefault()
    console.log(newFormContent)
    if (
      formContent.uid === newFormContent.dev_type &&
      formContent.email_address === newFormContent.pc_name &&
      formContent.email_type === newFormContent.model &&
      formContent.display_name === newFormContent.c_drive_capacity &&
      formContent.profile === newFormContent.ram &&
      formContent.email_status === newFormContent.source
    ) {
      onError('No changes were made.')
    } else {
      axios
        .put(`${config.api}/api/edit-email-address`, newFormContent)
        .then(() => {
          setPopupMsg('Email address successfully updated.')
          setVisibleSuccess(!visibleSuccess)
          setTimeout(() => {
            fetchData()
          }, 2000)
        })
        .catch((error) => {
          setVisibleEmailAddress(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          console.log(error.message)
          return
        })
    }

    setVisibleEmailAddress(false)
  }

  const deleteEmailAddress = (id) => {
    console.log('delete', id)
    // axios
    //   .delete(`https://dssui-asset-manager.herokuapp.com/api/delete-emailAddress/${id}`)
    //   .then(() => {
    //     setPopupMsg('Entry successfully deleted.')
    //     setVisibleSuccess(!visibleSuccess)
    //     setVisibleEmailAddress(false)
    //     setTimeout(() => {
    //       fetchData()
    //     }, 2000)
    //   })
    //   .catch((error) => {
    //     setVisibleEmailAddress(false)
    //     setPopupMsg(error.message)
    //     setVisibleFail(!visibleFail)
    //     return
    //   })
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 2000)
  }, [setEmailAddressList])

  const onCloseSuccess = () => {
    setVisibleSuccess(false)
  }
  const onCloseFail = () => {
    setVisibleFail(false)
  }

  const onCloseEdit = () => {
    setVisibleEmailAddress(false)
  }

  const onError = (msg) => {
    setPopupMsg(msg)
    setVisibleFail(!visibleFail)
  }

  return (
    <div className="table">
      <SuccessModal visible={visibleSuccess} popupMsg={popupMsg} onClose={onCloseSuccess} />
      <FailModal visible={visibleFail} popupMsg={popupMsg} onClose={onCloseFail} />
      <EditEmailAddress
        visible={visibleEmailAddress}
        onClose={onCloseEdit}
        onEdit={editEmailAddress}
        formContent={formContent}
        onDelete={deleteEmailAddress}
        onError={onError}
        onCloseEdit={onCloseEdit}
      />

      {/* 
      <div className="table card">
        <AddEmailAddress onAdd={addEmailAddress} emailAddressList={emailAddressList} onError={onError} />
      </div> */}

      <div className="table card table-responsive">
        <CSmartTable
          cleaner
          columns={columns}
          tableProps={{
            hover: true,
            responsive: true,
          }}
          // columnFilter
          columnSorter
          items={emailAddressList}
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
                      // setEmailAddress(item)
                      setVisibleEmailAddress(true)
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

export default EmailAddresses

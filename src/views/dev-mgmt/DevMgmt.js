import { React, useState, useEffect } from 'react'
import { config } from '../../Config'
import axios from 'axios'
import {
  CAccordion,
  CAccordionHeader,
  CAccordionBody,
  CAccordionItem,
  CSmartTable,
  CButton,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilHamburgerMenu } from '@coreui/icons'

import FailModal from '../modals/FailModal'
import SuccessModal from '../modals/SuccessModal'
import ConfirmationModal from '../modals/ConfirmationModal'

import EditPCDetails from './EditPCDetails'
import AddAccessory from './AddAccessory'
import AssignPC from './AssignPC'
import AssignIP from './AssignIP'
import AssignUID from './AssignUID'
import AssignDevToEmp from './AssignDevToEmp'
import AssignUIDtoEmp from './AssignUIDtoEmp'
import ReassignAccessories from './ReassignAccessories'

import ExportToExcel from '../forms/export-to-excel/ExportToExcel'

const DevMgmt = () => {
  //complete
  const [devMgmtList, setDevMgmtList] = useState([])

  //emp_dev
  const [empDevList, setEmpDevList] = useState([])

  //singular
  const [employeeList, setEmployeeList] = useState([])
  const [unusedDeviceList, setUnusedDeviceList] = useState([])
  const [deviceList, setDeviceList] = useState([])
  const [employeeUnassignedUIDList, setEmployeeUnassignedUIDList] = useState([])
  const [filteredAccessories, setFilteredAccessories] = useState([])
  const [unusedIPList, setUnusedIPList] = useState([])
  const [ipList, setIPList] = useState([])
  const [uidList, setUIDList] = useState([])
  const [accessory, setAccessory] = useState([])

  //modals
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleFail, setVisibleFail] = useState(false)
  const [visibleConfirmation, setVisibleConfirmation] = useState(false)
  const [visibleAddAccessory, setVisibleAddAccessory] = useState(false)
  const [visibleAssignPC, setVisibleAssignPC] = useState(false)
  const [visibleAssignIP, setVisibleAssignIP] = useState(false)
  const [visibleAssignUID, setVisibleAssignUID] = useState(false)
  const [visibleReassignAccessories, setVisibleReassignAccessories] = useState(false)

  const [popupMsg, setPopupMsg] = useState('')
  const [pcDetails, setPCDetails] = useState({})
  const [accessories, setAccessories] = useState([
    {
      first_name: '',
      last_name: '',
      pc_name: '',
      dev_type: '',
      model: '',
      source: '',
      ip_address: '',
    },
  ])
  const [requestType, setRequestType] = useState([])

  const columns = [
    'last_name',
    'first_name',
    'status',
    'dev_type',
    'pc_name',
    'ip_address',
    'dom_uid',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]

  function refreshPage() {
    window.location.reload(false)
  }

  const fetchData = async () => {
    axios
      .get(`${config.api}/api/employees`)
      .then((response) => {
        setEmployeeList(response.data)
      })
      .catch((error) => {
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
    getUnusedDevices()
    axios
      .get(`${config.api}/api/unused-ip-addresses`)
      .then((response) => {
        setIPList(response.data)
      })
      .catch((error) => {
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
    axios
      .get(`${config.api}/api/unused-dom-uids`)
      .then((response) => {
        setUIDList(response.data)
      })
      .catch((error) => {
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
    axios
      .get(`${config.api}/api/unused-dom-uid-emp`)
      .then((response) => {
        setEmployeeUnassignedUIDList(response.data)
      })
      .catch((error) => {
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
    axios
      .get(`${config.api}/api/devices`)
      .then((response) => {
        setDeviceList(response.data)
      })
      .catch((error) => {
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
    axios
      .get(`${config.api}/api/dev-mgmt`)
      .then((response) => {
        setDevMgmtList(response.data)
      })
      .catch((error) => {
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const getUnusedDevices = () => {
    axios
      .get(`${config.api}/api/unused-devices`)
      .then((response) => {
        setUnusedDeviceList(response.data)
      })
      .catch((error) => {
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const getAccessoryDetails = (devID) => {
    axios
      .get(`${config.api}/api/dev-acc-assigned/${devID}`)
      .then((response) => {
        setAccessories(response.data)
      })
      .catch((error) => {
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const getAccessoryDetailsMultipleDevice = (devID) => {
    axios
      .get(`${config.api}/api/dev-acc-assigned-mult/${devID}`)
      .then((response) => {
        setAccessories(response.data)
      })
      .catch((error) => {
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const addEmpDev = (devID) => {
    axios
      .post(`${config.api}/api/add-emp-dev`, {
        empID: accessory[0].emp_id,
        devID: devID,
      })
      .then((res) => {
        setPopupMsg('Device successfully assigned.')
        setVisibleSuccess(!visibleSuccess)
        setVisibleAssignPC(false)
        getAccessoryDetails(accessory[0].dev_id)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        // setVisibleDevice(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const addEmpMultipleDev = (d) => {
    axios
      .post(`${config.api}/api/add-emp-dev`, {
        empID: d.employee,
        devID: d.device,
      })
      .then((res) => {
        setPopupMsg('Device successfully assigned.')
        setVisibleSuccess(!visibleSuccess)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        // setVisibleDevice(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const assignUID = (d) => {
    axios
      .post(`${config.api}/api/add-emp-uid`, {
        empID: d.employee,
        domUID: d.uid,
      })
      .then((res) => {
        setPopupMsg('UID successfully assigned.')
        setVisibleAssignUID(false)
        setVisibleSuccess(!visibleSuccess)
        getAccessoryDetails(accessories[0].dev_id)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleAssignIP(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const addDevIP = (ip) => {
    axios
      .post(`${config.api}/api/add-dev-ip`, {
        ip: ip,
        devID: accessory.dev_id,
      })
      .then((res) => {
        setPopupMsg('IP successfully assigned.')
        setVisibleAssignIP(false)
        setVisibleSuccess(!visibleSuccess)
        getAccessoryDetails(accessory.dev_id)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleAssignIP(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  //-----------EditPCDetails

  //------------------ASSIGN PC, IP, UID, ACCESSORY
  const addAccessory = (accID) => {
    axios
      .post(`${config.api}/api/add-dev-acc`, {
        devID: accessory[0].dev_id,
        accID: accID,
      })
      .then((res) => {
        setPopupMsg('Accessory successfully assigned.')
        setVisibleAddAccessory(false)
        setVisibleSuccess(!visibleSuccess)
        getAccessoryDetails(accessory[0].dev_id)
      })
      .catch((error) => {
        // setVisibleDevice(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const confirmAssign = (acc, type) => {
    setAccessory(acc)
    setRequestType(type)

    if (type === 'PC') {
      getUnusedDevices()
      setVisibleAssignPC(true)
    } else if (type === 'IP') {
      setVisibleAssignIP(true)
    } else if (type === 'UID') {
      setVisibleAssignUID(true)
    } else if (type === 'SET') {
      setVisibleReassignAccessories(true)
    } else {
      axios
        .get(`${config.api}/api/dev-acc-id/${type}`)
        .then((response) => {
          setFilteredAccessories(response.data)
          setVisibleAddAccessory(true)
        })
        .catch((error) => {
          onError(error.message)
          console.log(error.message)
          return
        })
    }
  }

  //------------------UNASSIGN
  const confirmUnassign = (acc, type) => {
    setAccessory(acc)
    setRequestType(type)
    setPopupMsg('Are you sure?')
    setVisibleConfirmation(true)
  }

  const unassignAccessory = () => {
    if (requestType === 'ACCESSORY') {
      axios
        .delete(`${config.api}/api/delete-dev-acc/${accessory.acc_id}`)
        .then(() => {
          setVisibleConfirmation(false)
          setPopupMsg('Accessory successfully unassigned.')
          setVisibleSuccess(!visibleSuccess)
          getAccessoryDetails(accessory.dev_id)
        })
        .catch((error) => {
          setVisibleConfirmation(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          return
        })
    } else if (requestType === 'PC') {
      axios
        .delete(`${config.api}/api/delete-emp-dev/${accessory.dev_id}`)
        .then(() => {
          setVisibleConfirmation(false)
          setPopupMsg('Device successfully unassigned.')
          setVisibleSuccess(!visibleSuccess)
          setTimeout(() => {
            refreshPage()
          }, 2000)
        })
        .catch((error) => {
          setVisibleConfirmation(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          return
        })
    } else if (requestType === 'IP') {
      axios
        .delete(`${config.api}/api/delete-dev-ip/${accessories[0].dev_id}`)
        .then(() => {
          setVisibleConfirmation(false)
          setPopupMsg('IP successfully unassigned.')
          setVisibleSuccess(!visibleSuccess)
          getAccessoryDetails(accessories[0].dev_id)
          setTimeout(() => {
            fetchData()
          }, 2000)
        })
        .catch((error) => {
          setVisibleConfirmation(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          return
        })
    } else if (requestType === 'UID') {
      axios
        .delete(`${config.api}/api/delete-emp-uid/${accessories[0].emp_id}`)
        .then(() => {
          setVisibleConfirmation(false)
          setPopupMsg('UID successfully unassigned.')
          setVisibleSuccess(!visibleSuccess)
          getAccessoryDetails(accessories[0].dev_id)
          setTimeout(() => {
            fetchData()
          }, 2000)
        })
        .catch((error) => {
          setVisibleConfirmation(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          return
        })
    }
  }

  //------------------REASSIGN ACCESSORIES
  const reassignAccessory = (devID) => {
    let params = { currentDevID: accessories[0].dev_id, devID: devID }
    axios
      .put(`${config.api}/api/reassign-acc`, params)
      .then(() => {
        setPopupMsg('Accessory successfully reassigned.')
        setVisibleReassignAccessories(false)
        setVisibleSuccess(!visibleSuccess)
        getAccessoryDetails(accessories[0].dev_id)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleReassignAccessories(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 2000)
  }, [setEmpDevList])

  //MODAL FUNCTIONS

  const onCloseSuccess = () => {
    setVisibleSuccess(false)
  }
  const onCloseFail = () => {
    setVisibleFail(false)
  }
  const onCloseConfirmation = () => {
    setVisibleConfirmation(false)
  }
  const onCloseAddAccessory = () => {
    setVisibleAddAccessory(false)
  }
  const onCloseAssignPC = () => {
    setVisibleAssignPC(false)
  }
  const onCloseAssignIP = () => {
    setVisibleAssignIP(false)
  }
  const onCloseAssignUID = () => {
    setVisibleAssignUID(false)
  }
  const onCloseReassignAccesories = () => {
    setVisibleReassignAccessories(false)
  }
  const onError = (msg) => {
    setPopupMsg(msg)
    setVisibleFail(!visibleFail)
  }

  return (
    <>
      <SuccessModal visible={visibleSuccess} popupMsg={popupMsg} onClose={onCloseSuccess} />
      <FailModal visible={visibleFail} popupMsg={popupMsg} onClose={onCloseFail} />

      <ConfirmationModal
        item={accessory}
        visible={visibleConfirmation}
        onClose={onCloseConfirmation}
        onSubmit={unassignAccessory}
        popupMsg={popupMsg}
      />

      <AssignIP
        visible={visibleAssignIP}
        onClose={onCloseAssignIP}
        onAdd={addDevIP}
        ipList={ipList}
      />
      <AssignUID
        visible={visibleAssignUID}
        onClose={onCloseAssignUID}
        employee={accessories[0].emp_id}
        onAdd={assignUID}
        uidList={uidList}
      />
      <AddAccessory
        visible={visibleAddAccessory}
        onClose={onCloseAddAccessory}
        onSubmit={addAccessory}
        filteredAccessories={filteredAccessories}
        accessory={accessory}
        type={requestType}
      />
      <AssignPC
        visible={visibleAssignPC}
        onClose={onCloseAssignPC}
        onAdd={addEmpDev}
        deviceList={unusedDeviceList}
      />
      <ReassignAccessories
        visible={visibleReassignAccessories}
        onClose={onCloseReassignAccesories}
        deviceList={deviceList}
        currentDevID={accessories[0].dev_id}
        // onSave={addAccessory}
        onReassign={reassignAccessory}
      />

      <div className="table card">
        <EditPCDetails
          pcDetails={pcDetails}
          accessories={accessories}
          unassignAccessory={confirmUnassign}
          assignAccessory={confirmAssign}
          edit={false}
        />
        <CAccordion flush>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              <CIcon icon={cilHamburgerMenu} />
              <span style={{ marginLeft: '7px' }}>Assign device</span>
            </CAccordionHeader>
            <CAccordionBody>
              <AssignDevToEmp
                onAdd={addEmpMultipleDev}
                employeeList={employeeList}
                deviceList={unusedDeviceList}
              />
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={2}>
            <CAccordionHeader>
              <CIcon icon={cilHamburgerMenu} />
              <span style={{ marginLeft: '7px' }}>Assign UID</span>
            </CAccordionHeader>
            <CAccordionBody>
              <AssignUIDtoEmp
                onAdd={assignUID}
                employeeList={employeeUnassignedUIDList}
                uidList={uidList}
              />
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </div>

      <div className="table card">
        <ExportToExcel
          fileName={'devices_'}
          rows={devMgmtList}
          columns={['Last Name', 'First Name', 'Status', 'Dev Type', 'PC Name', 'IP Address']}
        />
        <CSmartTable
          cleaner
          columns={columns}
          tableProps={{
            hover: true,
            responsive: true,
          }}
          columnSorter
          items={devMgmtList}
          pagination
          itemsPerPage={10}
          tableFilter
          scopedColumns={{
            show_details: (item) => {
              return (
                <td className="py-2">
                  {item.dev_id ? (
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        setPCDetails(item)
                        if (item.dev_id !== null) {
                          getAccessoryDetails(item.dev_id)
                        } else {
                          getAccessoryDetailsMultipleDevice(item.dev_id)
                        }
                      }}
                    >
                      View
                    </CButton>
                  ) : (
                    ''
                  )}
                  {/* <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      setPCDetails(item)
                      if (item.dev_id !== null) {
                        getAccessoryDetails(item.dev_id)
                      } else {
                        getAccessoryDetailsMultipleDevice(item.dev_id)
                      }
                    }}
                  > 
                    View
                  </CButton>*/}
                </td>
              )
            },
          }}
          // loading
        />
      </div>
    </>
  )
}

export default DevMgmt

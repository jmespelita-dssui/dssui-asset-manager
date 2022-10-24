import { React, useState, useEffect } from 'react'
import { config } from '../../Config'
import Moment from 'moment'
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

// import '@fortawesome/fontawesome-free/css/all.min.css'

import EmployeeDetails from './EmployeeDetails'
import AssignSectorToEmp from './AssignSectortoEmp'

import ExportToExcel from '../forms/export-to-excel/ExportToExcel'

//Edit
import EditStatus from './EditStatus'
import EditSector from './EditSector'
import EditOffice from './EditOffice'

const EmployeeMgmt = () => {
  const [employeeList, setEmployeeList] = useState([])
  const [employeeDetails, setEmployeeDetails] = useState([
    {
      emp_sect_id: '',
      date_assigned_off: '',
      date_assigned_sect: '',
      date_unassigned_off: '',
      date_unassigned_sect: '',
      emp_id: '',
      first_name: '',
      last_name: '',
      off_desc: '',
      off_id: '',
      sect_id: '',
      sect_name: '',
      status: '',
    },
  ])
  const [editMode, setEditMode] = useState(false)
  const [sectorList, setSectorList] = useState([])
  const [officeList, setOfficeLIst] = useState([])

  //modal
  const [popupMsg, setPopupMsg] = useState('')
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleFail, setVisibleFail] = useState(false)

  //edit modals
  const [visibleEditStatus, setVisibleEditStatus] = useState(false)
  const [visibleEditSector, setVisibleEditSector] = useState(false)
  const [visibleEditOffice, setVisibleEditOffice] = useState(false)
  const [visibleConfirmation, setVisibleConfirmation] = useState(false)
  const [request, setRequest] = useState({})
  const [formContent, setFormContent] = useState({})

  const columns = [
    'last_name',
    'first_name',
    'status',
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]

  const getEmployeeDetails = (empID) => {
    // console.log('get emp details', empID)
    axios
      .get(`${config.api}/api/emp-details/${empID}`)
      .then((response) => {
        console.log('employee details', response.data)
        setEmployeeDetails(response.data)
      })
      .catch((error) => {
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const refreshTable = async () => {
    // console.log('fetching data...')
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
    axios
      .get(`${config.api}/api/sectors`)
      .then((response) => {
        setSectorList(response.data)
      })
      .catch((error) => {
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
    axios
      .get(`${config.api}/api/offices`)
      .then((response) => {
        setOfficeLIst(response.data)
      })
      .catch((error) => {
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const addSector = (d) => {
    if (d.endDate && d.startDate > d.endDate) {
      setPopupMsg('Invalid dates.')
      setVisibleFail(true)
    } else if (!d.startDate) {
      setPopupMsg('Please specify start date')
      setVisibleFail(true)
    } else if (employeeDetails.filter((e) => e.sect_id === d.sector).length > 0) {
      setPopupMsg('Sector already assigned to employee.')
      setVisibleFail(true)
    } else {
      axios
        .post(`${config.api}/api/add-emp-sect`, {
          empID: d.employee,
          sectID: d.sector,
          startDate: d.startDate,
          endDate: d.endDate,
        })
        .then((res) => {
          getEmployeeDetails(d.employee)
          setPopupMsg('Sector successfully assigned.')
          setVisibleSuccess(!visibleSuccess)
        })
        .catch((error) => {
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          console.log(error.message)
          return
        })
    }
  }

  //EDIT
  const prepEdit = (e) => {
    if (e.edit === 'status') {
      setFormContent(e)
      setVisibleEditStatus(true)
    } else if (e.edit === 'sector') {
      setFormContent(e)
      setVisibleEditSector(true)
    } else if (e.edit === 'office') {
      // console.log('FORM CONTENT', e)
      setFormContent(e)
      setVisibleEditOffice(true)
    }
  }

  const prepDelete = (r) => {
    setRequest(r)
    setPopupMsg('Are you sure?')
    setVisibleConfirmation(true)
  }

  const editStatus = (e) => {
    setVisibleEditStatus(false)
    if (e !== formContent.status && e !== '') {
      const employee = {
        ...formContent,
        status: e,
      }
      axios
        .put(`${config.api}/api/edit-employee`, employee)
        .then(() => {
          setPopupMsg('Status successfully updated.')
          setVisibleSuccess(!visibleSuccess)
          setFormContent(employee)
          setTimeout(() => {
            getEmployeeDetails(employee.emp_id)
            refreshTable()
          }, 2000)
        })
        .catch((error) => {
          // setVisibleEmployee(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          console.log(error.message)
          return
        })
    } else {
      setVisibleEditStatus(false)
      setPopupMsg('No changes made.')
      setVisibleFail(!visibleFail)
    }
  }

  const editSector = (s) => {
    setVisibleEditSector(false)
    if (s.date_assigned_sect === null) {
      setPopupMsg('Please specify start date')
      setVisibleFail(!visibleFail)
    } else if (s.date_assigned_sect > s.date_unassigned_sect) {
      setPopupMsg('Invalid dates')
      setVisibleFail(!visibleFail)
    } else {
      setVisibleEditSector(false)
      if (
        s.date_assigned_sect !== formContent.date_assigned_sect ||
        s.date_unassigned_sect !== formContent.date_unassigned_sect
      ) {
        if (s.date_unassigned_sect !== null)
          s.date_unassigned_sect = Moment(s.date_unassigned_sect).format('YYYY-MM-DD')
        const empSect = {
          ...formContent,
          date_assigned_sect: Moment(s.date_assigned_sect).format('YYYY-MM-DD'),
          date_unassigned_sect: s.date_unassigned_sect,
        }
        axios
          .put(`${config.api}/api/edit-emp-sect`, empSect)
          .then(() => {
            setPopupMsg('Sector successfully updated.')
            setVisibleSuccess(!visibleSuccess)
            setTimeout(() => {
              getEmployeeDetails(s.emp_id)
              refreshTable()
            }, 2000)
          })
          .catch((error) => {
            setVisibleEditSector(false)
            setPopupMsg(error.message)
            setVisibleFail(!visibleFail)
            console.log(error.message)
            return
          })
      } else {
        setVisibleEditSector(false)
        setPopupMsg('No changes made.')
        setVisibleFail(!visibleFail)
      }
    }
  }

  const editOffice = (e) => {
    const empOff = {
      empID: e.emp_id,
      offID: e.off_id,
    }
    if (formContent.off_id === null && e.off_id !== null) {
      // console.log('add office', empOff)
      axios
        .post(`${config.api}/api/add-emp-off`, empOff)
        .then(() => {
          setVisibleEditOffice(!visibleEditOffice)
          setPopupMsg('Office successfully updated.')
          setVisibleSuccess(!visibleSuccess)
          setTimeout(() => {
            getEmployeeDetails(e.emp_id)
            refreshTable()
          }, 2000)
        })
        .catch((error) => {
          setVisibleEditSector(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          console.log(error.message)
          return
        })
    } else if (e.off_id === '') {
      // console.log('delete emp_off', e.emp_off_id)
      axios
        .delete(`${config.api}/api/delete-emp-off/${e.emp_off_id}`)
        .then(() => {
          setVisibleEditOffice(false)
          setVisibleConfirmation(false)
          setPopupMsg('Office successfully unassigned.')
          setVisibleSuccess(!visibleSuccess)
          getEmployeeDetails(e.emp_id)
        })
        .catch((error) => {
          setVisibleConfirmation(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          return
        })
    } else {
      // console.log('edit office', empOff)
      axios
        .put(`${config.api}/api/edit-emp-off`, empOff)
        .then(() => {
          setVisibleEditOffice(false)
          setPopupMsg('Office successfully updated.')
          setVisibleSuccess(!visibleSuccess)
          setTimeout(() => {
            getEmployeeDetails(e.emp_id)
            refreshTable()
          }, 2000)
        })
        .catch((error) => {
          setVisibleEditOffice(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          console.log(error.message)
          return
        })
    }
  }

  const unassignInfo = () => {
    // console.log(request.emp_sect_id, request.type)
    if (request.type === 'sector') {
      axios
        .delete(`${config.api}/api/delete-emp-sect/${request.emp_sect_id}`)
        .then(() => {
          setVisibleEditSector(false)
          setVisibleConfirmation(false)
          setPopupMsg('Sector successfully unassigned.')
          setVisibleSuccess(!visibleSuccess)
          getEmployeeDetails(request.emp_id)
        })
        .catch((error) => {
          setVisibleConfirmation(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          return
        })
    }
  }

  //MODAL FUNCTIONS

  const onCloseSuccess = () => {
    setVisibleSuccess(false)
  }
  const onCloseFail = () => {
    setVisibleFail(false)
  }

  const onCloseEditStatus = () => {
    setVisibleEditStatus(false)
  }
  const onCloseEditSector = () => {
    setVisibleEditSector(false)
  }
  const onCloseEditOffice = () => {
    setVisibleEditOffice(false)
  }
  const onCloseConfirmation = () => {
    setVisibleConfirmation(false)
  }

  useEffect(() => {
    setTimeout(() => {
      refreshTable()
    }, 2000)
  }, [setEmployeeList])

  return (
    <>
      <SuccessModal visible={visibleSuccess} popupMsg={popupMsg} onClose={onCloseSuccess} />
      <FailModal visible={visibleFail} popupMsg={popupMsg} onClose={onCloseFail} />
      <ConfirmationModal
        visible={visibleConfirmation}
        onClose={onCloseConfirmation}
        onSubmit={unassignInfo}
        popupMsg={popupMsg}
      />

      <EditStatus
        visible={visibleEditStatus}
        onClose={onCloseEditStatus}
        onSave={editStatus}
        formContent={formContent}
      />
      <EditSector
        visible={visibleEditSector}
        onClose={onCloseEditSector}
        onSave={editSector}
        onUnassign={prepDelete}
        formContent={formContent}
      />
      <EditOffice
        visible={visibleEditOffice}
        onClose={onCloseEditOffice}
        onSave={editOffice}
        officeList={officeList}
        onUnassign={prepDelete}
        formContent={formContent}
      />

      <div className="table card">
        <EmployeeDetails details={employeeDetails} edit={editMode} prepEdit={prepEdit} />
        <CAccordion flush>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              <CIcon icon={cilHamburgerMenu} />
              <span style={{ marginLeft: '7px' }}>Assign sector to employee</span>
            </CAccordionHeader>
            <CAccordionBody>
              <AssignSectorToEmp
                onAdd={addSector}
                employeeList={employeeList}
                sectorList={sectorList}
                getEmployeeDetails={getEmployeeDetails}
              />
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </div>
      <div className="table card">
        <ExportToExcel
          fileName={'employees_'}
          rows={employeeList}
          columns={['Last Name', 'First Name', 'Status']}
        />
        <CSmartTable
          cleaner
          columns={columns}
          tableProps={{
            hover: true,
            responsive: true,
          }}
          // columnFilter
          columnSorter
          items={employeeList}
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
                      setEditMode(false)
                      getEmployeeDetails(item.emp_id)
                    }}
                  >
                    View
                  </CButton>
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

export default EmployeeMgmt

import { React, useState, useEffect } from 'react'
import axios from 'axios'
// import { MDBDataTableV5 } from 'mdbreact'
import { config } from '../../../Config'

import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import SuccessModal from '../../modals/SuccessModal'
import FailModal from '../../modals/FailModal'

import { CSmartTable, CButton } from '@coreui/react-pro'

// import '@fortawesome/fontawesome-free/css/all.min.css'

const Employees = () => {
  const [employeeList, setEmployeeList] = useState([])
  const [visibleEmployee, setVisibleEmployee] = useState(false)
  const [formContent, setFormContent] = useState({})
  // const [employee, setEmployee] = useState({ last_name: '', first_name: '', status: '' })
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleFail, setVisibleFail] = useState(false)
  const [popupMsg, setPopupMsg] = useState('')

  const columns = [
    {
      key: 'emp_id',
      label: 'ID',
    },
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

  const fetchData = async () => {
    console.log('fetching data...')
    axios.get(`${config.api}/api/employees`).then((response) => {
      setEmployeeList(response.data)
    })
  }

  const addEmployee = (employee) => {
    console.log('addEmployee: ', employee)

    axios
      .post(`${config.api}/api/add-employee`, {
        last_name: employee.lastName,
        first_name: employee.firstName,
        status: employee.status,
      })
      .then(() => {
        setPopupMsg('Employee successfully added.')
        setVisibleSuccess(!visibleSuccess)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleEmployee(false)
        setPopupMsg(error.message)
        setVisibleFail(!visibleFail)
        console.log(error.message)
        return
      })
  }

  const editEmployee = (employee) => {
    if (
      formContent.last_name === employee.last_name &&
      formContent.first_name === employee.first_name &&
      formContent.status === employee.status
    ) {
      onError('No changes were made.')
    } else {
      axios
        .put(`${config.api}/api/edit-employee`, employee)
        .then(() => {
          setPopupMsg('Employee successfully updated.')
          setVisibleSuccess(!visibleSuccess)
          setTimeout(() => {
            fetchData()
          }, 2000)
        })
        .catch((error) => {
          setVisibleEmployee(false)
          setPopupMsg(error.message)
          setVisibleFail(!visibleFail)
          console.log(error.message)
          return
        })
    }

    setVisibleEmployee(false)
    console.log(employee)
  }

  const deleteEmployee = (id) => {
    axios
      .delete(`${config.api}/api/delete-employee/${id}`)
      .then((response) => {
        setPopupMsg('Entry successfully deleted.')
        setVisibleSuccess(!visibleSuccess)
        setVisibleEmployee(false)
        setTimeout(() => {
          fetchData()
        }, 2000)
      })
      .catch((error) => {
        setVisibleEmployee(false)
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
  }, [setEmployeeList])

  const onCloseSuccess = () => {
    setVisibleSuccess(false)
  }
  const onCloseFail = () => {
    setVisibleFail(false)
  }

  const onCloseEdit = () => {
    setVisibleEmployee(false)
  }

  const onError = (msg) => {
    setPopupMsg(msg)
    setVisibleFail(!visibleFail)
  }

  return (
    <div className="table">
      <SuccessModal visible={visibleSuccess} popupMsg={popupMsg} onClose={onCloseSuccess} />
      <FailModal visible={visibleFail} popupMsg={popupMsg} onClose={onCloseFail} />

      <EditEmployee
        visible={visibleEmployee}
        formContent={formContent}
        onClose={onCloseEdit}
        onEdit={editEmployee}
        onDelete={deleteEmployee}
      />

      <div className="table card">
        <AddEmployee onAdd={addEmployee} employeeList={employeeList} onError={onError} />
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
                      setFormContent(item)
                      // setEmployee(item)
                      setVisibleEmployee(true)
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

export default Employees

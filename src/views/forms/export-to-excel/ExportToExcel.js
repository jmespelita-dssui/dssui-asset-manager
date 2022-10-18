import React, { useRef } from 'react'
import { DownloadTableExcel } from 'react-export-table-to-excel'
import { JsonToExcel } from 'react-json-to-excel'
import { CButton } from '@coreui/react-pro'

const ExportToExcel = ({ fileName, columns, rows }) => {
  const tableRef = useRef(null)

  const getCurrentDate = () => {
    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`
  }

  return (
    <>
      <div className="d-flex flex-row-reverse">
        <DownloadTableExcel
          filename={`${fileName}${getCurrentDate()}`}
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <CButton size="sm" color="secondary">
            Export to excel
          </CButton>
        </DownloadTableExcel>
      </div>
      <table ref={tableRef} className="hidden">
        <tbody>
          <tr>
            {columns.map((name, key) => (
              <th key={key}>{name}</th>
            ))}
          </tr>
          {rows.map((row, key) => (
            <tr key={key}>
              <td>{row.last_name}</td>
              <td>{row.first_name}</td>
              <td>{row.status}</td>
              <td>{row.dev_type}</td>
              <td>{row.pc_name}</td>
              <td>{row.ip_address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ExportToExcel

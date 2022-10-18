import { useState } from 'react'
import CIcon from '@coreui/icons-react'
import {
  CListGroup,
  CListGroupItem,
  CContainer,
  CRow,
  CCol,
  CButton,
  CTooltip,
} from '@coreui/react-pro'

import { cilTrash, cilPlus } from '@coreui/icons'

const EditPCDetails = ({ accessories, unassignAccessory, assignAccessory, edit }) => {
  const [editMode, setEditMode] = useState(edit)

  return (
    <>
      <CContainer>
        <CRow xs={{ cols: 2 }} className="justify-content-center">
          <CCol md={5}>
            <CListGroup>
              <CListGroupItem>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Device info</h5>
                </div>
                <p className="mb-1 text-medium-emphasis">
                  Owner:{' '}
                  <span className="text-body">
                    {accessories[0].first_name} {accessories[0].last_name}
                  </span>
                  <br></br>
                  PC Name:{' '}
                  <span className="text-body">
                    {accessories[0].pc_name}
                    <CTooltip content="Unassign device">
                      <CIcon
                        icon={cilTrash}
                        className={`action-icon delete ${
                          editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                        }`}
                        style={{ marginLeft: '5px' }}
                        onClick={() => unassignAccessory(accessories[0], 'PC')}
                      />
                    </CTooltip>
                    <CTooltip content="Assign PC">
                      <CIcon
                        icon={cilPlus}
                        style={{ color: 'green' }}
                        className={`action-icon ${
                          editMode && accessories[0].pc_name == null ? '' : 'hidden'
                        }`}
                        onClick={() => assignAccessory(accessories, 'PC')}
                      />
                    </CTooltip>{' '}
                  </span>
                  <br></br>
                  Device type: <span className="text-body">{accessories[0].dev_type}</span>
                  <br></br>
                  Model: <span className="text-body">{accessories[0].model}</span>
                  <br></br>
                  Source: <span className="text-body">{accessories[0].source}</span>
                  <br></br>
                  IP Address:
                  <span className="text-body">
                    {accessories[0].ip_address}
                    <CTooltip content="Unassign IP address">
                      <CIcon
                        icon={cilTrash}
                        className={`action-icon delete ${
                          editMode && accessories[0].ip_address !== null ? '' : 'hidden'
                        }`}
                        onClick={() => unassignAccessory(accessories, 'IP')}
                      />
                    </CTooltip>
                    <CTooltip content="Assign PC">
                      <CIcon
                        icon={cilPlus}
                        style={{ color: 'green' }}
                        className={`action-icon ${
                          editMode &&
                          accessories[0].pc_name != null &&
                          accessories[0].ip_address == null
                            ? ''
                            : 'hidden'
                        }`}
                        onClick={() => assignAccessory(accessories[0], 'IP')}
                      />
                    </CTooltip>{' '}
                  </span>
                  <br></br>
                  Domain UID:{' '}
                  <span className="text-body">
                    {accessories[0].dom_uid}
                    <CTooltip content="Unassign UID">
                      <CIcon
                        icon={cilTrash}
                        className={`action-icon delete delete ${
                          editMode && accessories[0].dom_uid !== null ? '' : 'hidden'
                        }`}
                        style={{ marginLeft: '5px', color: '' }}
                        onClick={() => unassignAccessory(accessories, 'UID')}
                      />
                    </CTooltip>
                    <CTooltip content="Assign PC">
                      <CIcon
                        icon={cilPlus}
                        style={{ color: 'green' }}
                        className={`action-icon ${
                          editMode &&
                          accessories[0].first_name != null &&
                          accessories[0].dom_uid == null
                            ? ''
                            : 'hidden'
                        }`}
                        onClick={() => assignAccessory(accessories[0], 'UID')}
                      />
                    </CTooltip>{' '}
                  </span>
                  <br></br>
                </p>
              </CListGroupItem>
            </CListGroup>
          </CCol>
          <CCol>
            <CListGroup>
              <CListGroupItem>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Accessories</h5>
                </div>
                <p className="text-medium-emphasis">
                  <CTooltip content="Add monitor">
                    <CIcon
                      icon={cilPlus}
                      style={{ color: 'green' }}
                      className={`action-icon ${
                        editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                      }`}
                      onClick={() => assignAccessory(accessories, 'MONITOR')}
                    />
                  </CTooltip>{' '}
                  Monitor:{' '}
                  {accessories
                    .filter((a) => {
                      return a.cat === 'MONITOR'
                    })
                    .map((m) => (
                      <span key={m.acc_id} className="text-body">
                        {m.acc_model}{' '}
                        <CTooltip content="Unassign">
                          <CIcon
                            icon={cilTrash}
                            className={`action-icon delete ${
                              editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                            }`}
                            onClick={() => unassignAccessory(m, 'ACCESSORY')}
                          />
                        </CTooltip>
                      </span>
                    ))}
                  <br></br>
                  <CTooltip content="Add mouse">
                    <CIcon
                      icon={cilPlus}
                      style={{ color: 'green' }}
                      className={`action-icon ${
                        editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                      }`}
                      onClick={() => assignAccessory(accessories, 'MOUSE')}
                    />
                  </CTooltip>{' '}
                  Mouse:{' '}
                  {accessories
                    .filter((a) => {
                      return a.cat === 'MOUSE'
                    })
                    .map((m) => (
                      <span key={m.acc_id} className="text-body">
                        {' '}
                        {m.acc_model}{' '}
                        <CTooltip content="Unassign">
                          <CIcon
                            icon={cilTrash}
                            className={`action-icon delete ${
                              editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                            }`}
                            onClick={() => unassignAccessory(m, 'ACCESSORY')}
                          />
                        </CTooltip>
                      </span>
                    ))}
                  <br></br>
                  <CTooltip content="Add headset">
                    <CIcon
                      icon={cilPlus}
                      style={{ color: 'green' }}
                      className={`action-icon ${
                        editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                      }`}
                      onClick={() => assignAccessory(accessories, 'HEADSET')}
                    />
                  </CTooltip>{' '}
                  Headset:{' '}
                  {accessories
                    .filter((a) => {
                      return a.cat === 'HEADSET'
                    })
                    .map((m) => (
                      <span key={m.acc_id} className="text-body">
                        {' '}
                        {m.acc_model}{' '}
                        <CTooltip content="Unassign">
                          <CIcon
                            icon={cilTrash}
                            className={`action-icon delete ${
                              editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                            }`}
                            onClick={() => unassignAccessory(m, 'ACCESSORY')}
                          />
                        </CTooltip>
                      </span>
                    ))}
                  <br></br>
                </p>
                <small>Others</small>
                <br></br>
                <p className=" text-medium-emphasis">
                  <CTooltip content="Add USB hub">
                    <CIcon
                      icon={cilPlus}
                      style={{ color: 'green' }}
                      className={`action-icon ${
                        editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                      }`}
                      onClick={() => assignAccessory(accessories, 'USB HUB')}
                    />
                  </CTooltip>{' '}
                  USB Hub:{' '}
                  {accessories
                    .filter((a) => {
                      return a.cat === 'USB HUB'
                    })
                    .map((m) => (
                      <span key={m.acc_id} className="text-body">
                        {' '}
                        {m.acc_model}{' '}
                        <CTooltip content="Unassign">
                          <CIcon
                            icon={cilTrash}
                            className={`action-icon delete ${
                              editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                            }`}
                            onClick={() => unassignAccessory(m, 'ACCESSORY')}
                          />
                        </CTooltip>
                      </span>
                    ))}
                  <br></br>
                  <CTooltip content="Add printer">
                    <CIcon
                      icon={cilPlus}
                      style={{ color: 'green' }}
                      className={`action-icon ${
                        editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                      }`}
                      onClick={() => assignAccessory(accessories, 'PRINTER')}
                    />
                  </CTooltip>{' '}
                  Printer:{' '}
                  {accessories
                    .filter((a) => {
                      return a.cat === 'PRINTER'
                    })
                    .map((m) => (
                      <span key={m.acc_id} className="text-body">
                        {' '}
                        {m.acc_model}{' '}
                        <CTooltip content="Unassign">
                          <CIcon
                            icon={cilTrash}
                            className={`action-icon delete ${
                              editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                            }`}
                            onClick={() => unassignAccessory(m, 'ACCESSORY')}
                          />
                        </CTooltip>
                      </span>
                    ))}
                  <br></br>
                  <CTooltip content="Add keyboard">
                    <CIcon
                      icon={cilPlus}
                      style={{ color: 'green' }}
                      className={`action-icon ${
                        editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                      }`}
                      onClick={() => assignAccessory(accessories, 'KEYBOARD')}
                    />
                  </CTooltip>{' '}
                  Keyboard:{' '}
                  {accessories
                    .filter((a) => {
                      return a.cat === 'KEYBOARD'
                    })
                    .map((m) => (
                      <span key={m.acc_id} className="text-body">
                        {' '}
                        {m.acc_model}{' '}
                        <CTooltip content="Unassign">
                          <CIcon
                            icon={cilTrash}
                            className={`action-icon delete ${
                              editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                            }`}
                            onClick={() => unassignAccessory(m, 'ACCESSORY')}
                          />
                        </CTooltip>
                      </span>
                    ))}
                  <br></br>
                  <CTooltip content="Add webcam">
                    <CIcon
                      icon={cilPlus}
                      style={{ color: 'green' }}
                      className={`action-icon ${
                        editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                      }`}
                      onClick={() => assignAccessory(accessories, 'WEBCAM')}
                    />
                  </CTooltip>{' '}
                  Webcam:{' '}
                  {accessories
                    .filter((a) => {
                      return a.cat === 'WEBCAM'
                    })
                    .map((m) => (
                      <span key={m.acc_id} className="text-body">
                        {' '}
                        {m.acc_model}{' '}
                        <CTooltip content="Unassign">
                          <CIcon
                            icon={cilTrash}
                            className={`action-icon delete ${
                              editMode && accessories[0].pc_name !== null ? '' : 'hidden'
                            }`}
                            onClick={() => unassignAccessory(m, 'ACCESSORY')}
                          />
                        </CTooltip>
                      </span>
                    ))}
                  <br></br>
                </p>
                {editMode && accessories[0].acc_id != null ? (
                  <CButton color="link" onClick={() => assignAccessory(accessories, 'SET')}>
                    <small>Re-assign accessories</small>
                  </CButton>
                ) : (
                  ''
                )}
              </CListGroupItem>
              {accessories[0].first_name ? (
                <CListGroupItem className="footer justify-content-end">
                  {!editMode ? (
                    <CButton color="primary" onClick={() => setEditMode(true)}>
                      Edit
                    </CButton>
                  ) : (
                    <CButton color="primary" onClick={() => setEditMode(false)}>
                      Save
                    </CButton>
                  )}
                </CListGroupItem>
              ) : (
                ''
              )}
            </CListGroup>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default EditPCDetails

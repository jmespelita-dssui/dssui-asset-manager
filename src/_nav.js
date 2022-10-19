import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilBuilding,
  cilContact,
  cilDevices,
  cilLan,
  cilApps,
  cilTag,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Employee Management',
    to: '/emp-mgmt',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Device Management',
    to: '/dev-mgmt',
    icon: <CIcon icon={cilLan} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Tables',
    to: '/tables',
    items: [
      {
        component: CNavItem,
        name: 'Employees',
        to: '/employees',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Sectors',
        to: '/sectors',
        icon: <CIcon icon={cilLan} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Offices',
        to: '/offices',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Devices',
        to: '/devices',
        icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Accessories',
        to: '/accessories',
        icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'IP Addresses',
        to: '/ip-addresses',
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Domain UIDs',
        to: '/dom-uids',
        icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: 'Email Addresses',
      //   to: '/email-addresses',
      //   icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
      // },
    ],
  },
]

export default _nav

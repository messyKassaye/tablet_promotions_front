import DashboardIcon from '@material-ui/icons/Dashboard'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import TabletIcon from '@material-ui/icons/Tablet'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import EventIcon from '@material-ui/icons/Event'
import SettingIcon from '@material-ui/icons/Settings'
import VideocamIcon from '@material-ui/icons/Videocam'
import React from "react";
const drawerMenu = [
    {
        name:'Dashboard',
        route:'/',
        icon:<DashboardIcon/>
    },
    {
        name:'My adverts',
        route:'/myAdverts',
        icon: <VideocamIcon/>
    },
    {
        name:'My Companies',
        route:'/myCompanies',
        icon: <DirectionsCarIcon/>
    },
    {
        name:'Settings',
        route:'/settings',
        icon: <SettingIcon/>
    },
]

export default drawerMenu
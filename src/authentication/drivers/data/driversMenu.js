import DashboardIcon from '@material-ui/icons/Dashboard'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import TabletIcon from '@material-ui/icons/Tablet'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import EventIcon from '@material-ui/icons/Event'
import SettingIcon from '@material-ui/icons/Settings'
import VideocamIcon from '@material-ui/icons/Videocam'
import React from "react";
const driverMenu = [
    {
        name:'Dashboard',
        route:'/auth',
        icon:<DashboardIcon/>
    },
    {
        name:'Adverts',
        route:'/auth/adverts',
        icon: <VideocamIcon/>
    },
    {
        name:'My cars',
        route:'/auth/my_cars',
        icon: <DirectionsCarIcon/>
    },
    {
        name:'My tablets',
        route:'/auth/my_tablets',
        icon:<TabletIcon/>
    },
    {
        name:'Finance',
        route:'/auth/finance',
        icon:<AttachMoneyIcon/>
    },
    {
        name:'Ekub',
        route:'/auth/ekub',
        icon:<EventIcon/>
    },
    {
        name:'Settings',
        route:'/auth/settings',
        icon:<SettingIcon/>
    }
]

export default driverMenu

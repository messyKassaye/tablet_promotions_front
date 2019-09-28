import DashboardIcon from '@material-ui/icons/Dashboard'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import TabletIcon from '@material-ui/icons/Tablet'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import EventIcon from '@material-ui/icons/Event'
import SettingIcon from '@material-ui/icons/Settings'
import React from "react";
const driverMenu = [
    {
        name:'Dashboard',
        route:'/',
        icon:<DashboardIcon/>
    },
    {
        name:'My cars',
        route:'/my_cars',
        icon: <DirectionsCarIcon/>
    },
    {
        name:'My tablets',
        route:'/my_tablets',
        icon:<TabletIcon/>
    },
    {
        name:'Finance',
        route:'/finance',
        icon:<AttachMoneyIcon/>
    },
    {
        name:'Ekub',
        route:'/ekub',
        icon:<EventIcon/>
    },
    {
        name:'Settings',
        route:'/settings',
        icon:<SettingIcon/>
    }
]

export default driverMenu
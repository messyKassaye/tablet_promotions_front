import DashboardIcon from '@material-ui/icons/Dashboard'
import SettingIcon from '@material-ui/icons/Settings'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import VideocamIcon from '@material-ui/icons/Videocam'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

import React from "react";
const drawerMenu = [
    {
        name:'Dashboard',
        route:'/auth',
        icon:<DashboardIcon/>
    },
    {
        name:'My adverts',
        route:'/auth/driver/my_adverts',
        icon:<VideocamIcon/>
    },
    {
        name:'Finance',
        route:'/auth/driver/finances',
        icon:<AttachMoneyIcon/>
    },
    {
        name:'Settings',
        route:'/auth/driver/settings',
        icon: <SettingIcon/>,
    },
]

export default drawerMenu

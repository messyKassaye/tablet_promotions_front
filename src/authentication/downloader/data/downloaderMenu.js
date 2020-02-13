import DashboardIcon from '@material-ui/icons/Dashboard'
import SettingIcon from '@material-ui/icons/Settings'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PersonIcon from '@material-ui/icons/Person';
import React from "react";
const drawerMenu = [
    {
        name:'Dashboard',
        route:'/auth',
        icon:<DashboardIcon/>
    },
    {
        name:'Downloads',
        route:'/auth/downloader/downloads',
        icon:<CloudDownloadIcon/>
    },
    {
        name:'Settings',
        route:'/auth/downloader/settings',
        icon: <SettingIcon/>,
    },
]

export default drawerMenu

import DashboardIcon from '@material-ui/icons/Dashboard'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import SettingIcon from '@material-ui/icons/Settings'
import VideocamIcon from '@material-ui/icons/Videocam'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import MusicNotIcon from '@material-ui/icons/MusicNote'
import PersonIcon from '@material-ui/icons/Person';
import SupervisedUserCircleSharpIcon from '@material-ui/icons/SupervisedUserCircleSharp'
import React from "react";
const drawerMenu = [
    {
        name:'Dashboard',
        route:'/auth',
        icon:<DashboardIcon/>
    },
    {
        name:'Roles',
        route:'/auth/admin/roles',
        icon:<PersonIcon/>
    },
    {
        name:'Banks',
        route:'/auth/admin/banks',
        icon:<AttachMoneyIcon/>
    },
    {
        name:'Cars',
        route:'/auth/admin/cars',
        icon:<DirectionsCarIcon/>
    },
    {
        name:'Medias',
        route:'/auth/admin/medias',
        icon:<MusicNotIcon/>
    },
    {
        name:'Advertisers',
        route:'/auth/admin/users',
        icon: <VideocamIcon/>,
        children:[
            {
                name:'Advertisers',
                route:'/admin/advertisers',
                icon:<VideocamIcon/>
            },
            {
                name:'Drivers',
                route:'/admin/advertisers',
                icon:<VideocamIcon/>
            },
            {
                name:'Supporters',
                route:'/admin/advertisers',
                icon:<VideocamIcon/>
            },
            {
                name:'Downloader',
                route:'/admin/advertisers',
                icon:<VideocamIcon/>
            }
        ]
    },
    {
      name:"Drivers",
      route:'/auth/admin/drivers',
      icon:<DirectionsCarIcon/>,
      children:[
          {
              name:'payment',
              route:'/auth/admin/driver/payment',
              icon:<AttachMoneyIcon/>
          }
      ]
    },
    {
        name:'Settings',
        route:'/settings',
        icon: <SettingIcon/>
    },
]

export default drawerMenu

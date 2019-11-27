import DashboardIcon from '@material-ui/icons/Dashboard'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import SettingIcon from '@material-ui/icons/Settings'
import VideocamIcon from '@material-ui/icons/Videocam'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import MusicNotIcon from '@material-ui/icons/MusicNote'
import SupervisedUserCircleSharpIcon from '@material-ui/icons/SupervisedUserCircleSharp'
import React from "react";
const drawerMenu = [
    {
        name:'Dashboard',
        route:'/',
        icon:<DashboardIcon/>
    },
    {
        name:'Banks',
        route:'/admin/banks',
        icon:<AttachMoneyIcon/>
    },
    {
        name:'Cars',
        route:'/admin/cars',
        icon:<DirectionsCarIcon/>
    },
    {
        name:'Medias',
        route:'/admin/medias',
        icon:<MusicNotIcon/>
    },
    {
        name:'Advertisers',
        route:'/admin/users',
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
      route:'admin/drivers',
      icon:<DirectionsCarIcon/>,
      children:[
          {
              name:'payment',
              route:'/admin/driver/payment',
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

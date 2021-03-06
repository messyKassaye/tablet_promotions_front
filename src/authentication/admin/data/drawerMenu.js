import DashboardIcon from '@material-ui/icons/Dashboard'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import SettingIcon from '@material-ui/icons/Settings'
import VideocamIcon from '@material-ui/icons/Videocam'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import MusicNotIcon from '@material-ui/icons/MusicNote'
import PersonIcon from '@material-ui/icons/Person';
import ExtensionIcon from '@material-ui/icons/Extension';
import BusinessIcon from '@material-ui/icons/Business'
import React from "react";
const drawerMenu = [
    {
        name:'Dashboard',
        route:'/auth',
        icon:<DashboardIcon/>
    },
    {
        name:'Users',
        route:'/auth/admin/users',
        icon:<PersonIcon/>
    },
    {
        name:'Companies',
        route:'/auth/admin/companies',
        icon:<BusinessIcon/>
    },
    {
      name:'Adverts',
      route:'/auth/admin/adverts',
      icon:<VideocamIcon/>
    },
    {
        name:'Finances',
        icon:<AttachMoneyIcon/>,
        children:[
            {
                name:'Check advert views',
                route:'/auth/admin/checking_advert_views',
                icon:<AttachMoneyIcon/>
            },
            {
                name:'My payment',
                route:'/auth/admin/my_payment',
                icon:<AttachMoneyIcon/>
            },
            {
                name:'Withdraw request',
                route:'/auth/admin/withdrawal_request',
                icon:<AttachMoneyIcon/>
            },
            {
                name:'Payed withdraw',
                route:'/auth/admin/approved_withdraw_request',
                icon:<AttachMoneyIcon/>
            }
        ]
    },
    {
      name:'Utilities',
      icon:<ExtensionIcon/>,
        children:[
            {
                name:'Currency',
                route:'/auth/admin/currency',
                icon:<AttachMoneyIcon/>
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
                name:'Partners',
                route:'/auth/admin/partners',
                icon:<MusicNotIcon/>
            },
            {
                name:'Testimony',
                route:'/auth/admin/testimonies',
                icon:<MusicNotIcon/>
            },
            {
                name:'Places',
                route:'/auth/admin/places',
                icon:<MusicNotIcon/>
            },
        ]
    },

    {
        name:'Settings',
        route:'/auth/admin/settings',
        icon: <SettingIcon/>,
    },
]

export default drawerMenu

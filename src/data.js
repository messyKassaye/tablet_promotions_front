import React from 'react';
import MenuIcon from '@material-ui/icons/Menu'


const data = {
    menus: [
        {text: 'DashBoard', icon: <MenuIcon/>, link: '/dashboard'},
        {text: 'Form Page', icon: <MenuIcon/>, link: '/form'},
        {text: 'Table Page', icon: <MenuIcon/>, link: '/table'},
        {text: 'Login Page', icon: <MenuIcon/>, link: '/login'}
    ],
}

export  default data;
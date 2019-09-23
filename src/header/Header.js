import React from 'react';
import {TopBar, TopBarLeft, TopBarRight}  from 'react-foundation';
import {Menu, MenuItem, MenuText}  from 'react-foundation';


function Header() {
    return (
        <TopBar className="top-bar" >
            <TopBarLeft className='my-top-bar-right'>
                <Menu>
                    <MenuItem isActive><a href="1">Home</a></MenuItem>
                    <MenuItem><a href="2">About</a></MenuItem>
                    <MenuItem><a href="3">Nachos</a></MenuItem>
                </Menu>
            </TopBarLeft>

            <TopBarRight className='my-top-bar-right'>
                <Menu>
                    <MenuText>Site Title</MenuText>
                    <MenuItem><a href="4">One</a></MenuItem>
                    <MenuItem><a href="5">Two</a></MenuItem>
                    <MenuItem><a href="6">Three</a></MenuItem>
                </Menu>
            </TopBarRight>
        </TopBar>
    )
}

export default Header;
import React from 'react';
import {TopBar, TopBarLeft, TopBarRight}  from 'react-foundation';
import {Menu, MenuText, MenuItem}  from 'react-foundation';
import { authenticationService } from '../../services/authentication';


function Header(props) {
    return (
        <TopBar className="top-bar" >
            <TopBarLeft className='my-top-bar-right'>
                <Menu>
                    <MenuText>Common Platform Job Search Tool</MenuText>
                </Menu>
            </TopBarLeft>
            <TopBarRight className='my-top-bar-right'>
                <Menu>
                    {authenticationService.getCurrentUser() && 
                        <MenuItem><a href="#" onClick={() => {props.logoutCallback();}}>Logout</a></MenuItem>                
                    }
                </Menu>
            </TopBarRight>
        </TopBar>
    )
}

export default Header;
import React from 'react';
import {TopBar, TopBarLeft, TopBarRight}  from 'react-foundation';
import {Menu, MenuText}  from 'react-foundation';


function Header() {
    return (
        <TopBar className="top-bar" >
            <TopBarLeft className='my-top-bar-right'>
                <Menu>
                    <MenuText>Common Platform Job Search Tool</MenuText>
                </Menu>
            </TopBarLeft>
            <TopBarRight className='my-top-bar-right'>
                <Menu>
                </Menu>
            </TopBarRight>
        </TopBar>
    )
}

export default Header;
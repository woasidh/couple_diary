import React, { useState, useEffect } from 'react'
import { Button } from 'antd';
import SlideButton from './Sections/SlideButton'
import './LandingPage.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

function LandingPage(props) {


    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;

    const [IsCouple, setIsCouple] = useState(false)

    useEffect(() => {
        props.user.userData && setIsCouple(props.user.userData.isCouple)
    }, [props.user])

    return (
        <>
            <div>
                <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'center', margin: '3rem auto'
                }}>
                    <div style={{ fontSize: '3rem' }}>
                        Welcome to Timetree
                </div>
                    <br />
                Share your schedule and memory with your lover!
                <br />
                {
                props.user.userData && props.user.userData.isAuth ? 
                <Button href='/connect' style={{ marginTop: '2rem' }} type="primary">
                Connect with your partner first!!
            </Button> : <div></div>}
                </div>
            </div>
        </>
    )
}

export default LandingPage

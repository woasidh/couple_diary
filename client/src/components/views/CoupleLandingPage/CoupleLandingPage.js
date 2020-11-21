import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import Bucket from './Sections/Bucket'
import Memory from './Sections/Memory'
import Schedule from './Sections/Schedule'
import Home from './Sections/Home'
import Setting from './Sections/Setting'


function CoupleLandingPage() {

    const [SelectedMenu, setSelectedMenu] = useState("1")

    const { Content, Sider } = Layout;

    useEffect(() => {

    }, [SelectedMenu])

    const onClickHandler = (item) => {
        setSelectedMenu(item.key)
    }

    const changeMenu=()=>{
        console.log('hihi')
        setSelectedMenu("1")
    }

    const handleContentHandler = () => {
        switch (SelectedMenu) {
            case '1':
                return <Home />
            case '2':
                return <Schedule />
            case '3':
                return <Memory />
            case '4':
                return <Bucket />
            case '5':
                return <Setting passMenuSelector={changeMenu}/>
        }
    }

    return (
        <div>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu onClick={onClickHandler}
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {/* <SubMenu key="sub1" title="subnav 1">
                            </SubMenu>*/}
                        <Menu.Item key="1">홈</Menu.Item>
                        <Menu.Item key="2">일정</Menu.Item>
                        <Menu.Item key="3">추억</Menu.Item>
                        <Menu.Item key="4">버킷리스트</Menu.Item>
                        <Menu.Item key="5">설정</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px', height: '450px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {handleContentHandler()}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default CoupleLandingPage

import React, { useEffect, useState } from 'react'
import { HeartTwoTone } from '@ant-design/icons';
import { Input, Button } from 'antd';
import axios from 'axios';

function ConnectPage(props) {

    const [MyCode, setMyCode] = useState("")
    const [YourCode, setYourCode] = useState("")

    useEffect(() => {
        let randomNum = Math.random().toString(10).substr(2, 8)
        let current = new Date();
        let currentTime = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate()
            + '-' + current.getHours() + '-' + current.getMinutes() + '-' + current.getSeconds();
        let body = {
            code: randomNum,
            time: currentTime
        }
        setMyCode(randomNum)
        axios.post('/api/users/code', body)
            .then(response => {
                if(!response.data.success){
                    alert('오류발생!')
                }
            })
    }, [])

    const enterCode = (e) => {
        setYourCode(e.currentTarget.value)
    }

    const verifyAndSetCouple= (code)=>{
        axios.post('/api/couple', 
        {
            myCode : MyCode,
            yourCode: YourCode
        }).then(response =>{
            if(!response.data.success){
                alert('성공적으로 이루어지지 않았습니다')
            }else{
                alert('성공!')
                props.history.push('/')
            }
        })
    }

    return (
        <div style={{ display: 'flex', width: '50%', flexDirection: 'column', margin: 'auto', alignItems: 'center' }}>
            <HeartTwoTone style={{ fontSize: '4rem', marginTop: '3rem' }} twoToneColor="#eb2f96" />
            <br />
            <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>서로의 초대코드를 입력하여 연결해주세요!</div>
            <div style={{ marginTop: '2rem', width: '50%' }}>
                내 초대코드
                <Input value={MyCode} />
                <br />
                <br />
                상대방 초대코드를 받으셨나요??
                <Input defaultValue="전달받은 초대코드 입력" onChange={enterCode} allowClear/>
            </div>
            <Button style={{ marginTop: '1rem' }} type="primary" onClick={()=>verifyAndSetCouple(YourCode)}>
                연결하기
                </Button>
        </div>
    )
}

export default ConnectPage

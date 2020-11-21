import React, { useEffect, useState } from 'react'
import { HeartTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import axios from 'axios';

function ConnectPage() {

    const [MyCode, setMyCode] = useState("")
    
    useEffect(() => {
        let randomNum = Math.random().toString(10).substr(2, 8)
        let current = new Date();
        let currentTime = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate()
        +'-'+current.getHours()+'-'+current.getMinutes()+'-'+current.getSeconds();
        let body = {
            code : randomNum,
            time : currentTime
        }
        setMyCode(randomNum)
        axios.post('/api/users/setCode', body)
        .then(response=>{
            console.log(response.data)
        })
    }, [])

    return (
        <div style={{ display: 'flex', width: '50%', flexDirection: 'column', margin: 'auto', alignItems: 'center' }}>
            <HeartTwoTone style={{ fontSize: '4rem', marginTop: '3rem' }} twoToneColor="#eb2f96" />
            <br />
            <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>서로의 초대코드를 입력하여 연결해주세요!</div>
            <div style={{marginTop: '3rem', width: '50%'}}>
                내 초대코드
                <Input value ={MyCode}/>
                <br/>
                <br/>
                상대방 초대코드를 받으셨나요?
                <Input value="전달받은 초대코드 입력" />
            </div>
        </div>
    )
}

export default ConnectPage

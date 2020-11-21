import React, { useState } from 'react'
import { Input, Button, Select } from 'antd'
import FileUpload from '../../../utils/FileUpload'
import axios from 'axios';
import { withRouter } from 'react-router';

function Setting(props) {

    const { TextArea } = Input;
    const { Option } = Select;

    const [Images, setImages] = useState([])
    const [Year, setYear] = useState(0)
    const [Month, setMonth] = useState(0)
    const [Date, setDate] = useState(0)

    let Years = []
    let Months = []
    let Dates = []

    for (let i = 1980; i < 2021; i++) {
        Years.push(i)
    }
    for (let i = 1; i < 13; i++) {
        Months.push(i)
    }
    for (let i = 1; i < 32; i++) {
        Dates.push(i)
    }

    const getFiles = (filepath) => {
        console.log(filepath)
        setImages(filepath)
    }

    const yearHandler = (value) => {
        setYear(value)
    }

    const monthHandler = (value) => {
        setMonth(value)
    }

    const dateHandler = (value) => {
        setDate(value)
    }

    const onClickHandler = () => {
        let date = Year + "-" + Month + "-" + Date
        let body = {
            filter: "setinfo",
            filepath: Images,
            date: date
        }
        axios.post('/api/couple', body)
        .then(response =>{
            if(response.data.success){
                alert('성공')
                window.location.reload(false);
            }else{
            }
        })
    }
    return (
        <div style={{
            display: 'flex', maxWidth: "100%", margin: "2rem auto", flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ textAlign: "center" }}>
                <h2>두분에 대해서 알려주세요!</h2>
                <div>우리가 사랑하기 시작한 날</div>
                <br />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* <FileUpload refreshFunction = {updateImages}/> */}
                <Select style={{ width: 100 }} onChange={yearHandler}>
                    {Years.map(item => (<Option key={item} value={item}>{item}</Option>))}
                </Select>
                년
                <Select style={{ width: 100, marginLeft: '1rem' }} onChange={monthHandler}>
                    {Months.map(item => (<Option key={item} value={item}>{item}</Option>))}
                </Select>
                월
                <Select style={{ width: 100, marginLeft: '1rem' }} onChange={dateHandler}>
                    {Dates.map(item => (<Option key={item} value={item}>{item}</Option>))}
                </Select>
                일
            </div>
            <div>
                <FileUpload passFiles={(files) => { getFiles(files) }} />
                <Button style={{ marginTop: '1rem' }} onClick={onClickHandler}>submit</Button>
                <br />
            </div>
        </div>
    )
}

export default withRouter(Setting)

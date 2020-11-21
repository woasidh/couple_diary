import React from 'react'
import { Form, Input, Button} from 'antd'

function Setting() {

    const { TextArea } = Input;

    return (
        <div style={{ maxWidth: "70%", margin: "2rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>Upload your product!</h2>
            </div>
            <Form> 
                {/* <FileUpload refreshFunction = {updateImages}/> */}
                <label>우리가 사랑을 시작한 날</label>
                <Input value = 'a'/>
                <br />
                <br />
                <Button>submit</Button>
            </Form>
        </div>
    )
}

export default Setting

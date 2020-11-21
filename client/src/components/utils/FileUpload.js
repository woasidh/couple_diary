import React, { useState } from 'react'
import DropZone from 'react-dropzone'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'

function FileUpload(props) {

    const onDropHandler = (files) => {
        let formData = new FormData();
        formData.append("images", files[0]);
        axios.post('/api/couple/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.data.success) {
                console.log(response.data)
                props.passFiles(response.data.filePath)
            } else {
                alert('file failed!')
                console.log(response.data.err)
            }
        })
    }

    return (
        <div style={{ marginTop: '1rem', alignSelf: 'center' }}>
            <DropZone onDrop={onDropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            style={{
                                width: 300, height: 240, border: "1px solid gray",
                                alignItems: 'center', display: 'flex', justifyContent: 'center'
                            }}
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <PlusOutlined style={{ fontSize: '3rem' }} />
                        </div>
                    </section>
                )}
            </DropZone>
            {/* <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                {Images.map((image, index) => (
                    <div key ={index} onClick={(image)=>deleteHandler(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`} />
                    </div>
                ))}
            </div> */}
        </div>

    )
}

export default FileUpload

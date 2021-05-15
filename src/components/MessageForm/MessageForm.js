import React from 'react'
import {useState} from 'react'
import {sendMessage, isTyping} from 'react-chat-engine'
import {SendOutlined, PictureOutlined, PaperClipOutlined} from '@ant-design/icons'

const MessageForm = (props) => {
    const [value, setValue] = useState('')
    const {chatID, creds} = props

    function handleSubmit(event) {
        event.preventDefault()

        const text = value.trim()
        if (text.length > 0){
            sendMessage(creds, chatID, {text})

        }
        setValue('')

    }
    function handleChange(event){
        setValue(event.target.value)
        isTyping(props, chatID)
    }

    function handleUpload(event) {
        sendMessage(creds, chatID, {files: event.target.files, text: ' '})
    }
    return (
        <form className = 'message-form' onSubmit={handleSubmit}>
            <input className = 'message-input'
                placeholder = ' Send a message'
                value = {value}
                onChange = {handleChange}
                onSubmit = {handleSubmit}
            />
            {/* Upload image */}
            <label htmlFor = 'upload-button'>
                <span className= 'image-button'>
                    <PictureOutlined className = 'picture-icon'/>
                </span>
            </label>
            <input type = 'file'
            multiple = {false}
            id = 'upload-button'
            style = {{display: 'none'}}
            onChange = {handleUpload}/>

            {/* Upload file
            <label htmlFor = 'upload-file'>
                <span className = 'file-button'>
                <PaperClipOutlined  className = 'paper-clip-ion'/>
                </span>
            </label>
            <input type = 'file'
            multiple = {false}
            id = 'upload-file'
            style = {{display: 'none'}}
            onChange = {handleUpload}/> */}


            <button type = 'submit' className = 'send-button'>
                <SendOutlined className = 'send-icon'/>
            </button>
          
        </form>
    )
}

export default MessageForm

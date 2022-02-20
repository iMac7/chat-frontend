import React, {useState, useRef, useEffect} from 'react'
import './imgUpload.css'

function ImgUpload(props) {
    const [file, setFile] = useState()
    const [previewURL, setPreviewURL] = useState()
    const [isValid, setIsValid] = useState(false)
    
    useEffect(() => {
       if(!file){
           return
       }
       const fileReader = new FileReader();
       fileReader.onload = ()=>{
           setPreviewURL(fileReader.result);
       }
       fileReader.readAsDataURL(file);

    }, [file])

    const filePickerRef = useRef()

    const onFileChange = (e)=>{
        let fileIsValid = isValid;

        if(e.target.files && e.target.files.length === 1){
            setFile(e.target.files[0])
            fileIsValid = true
            setIsValid(true)
        }else{
            fileIsValid = false
            setIsValid(false)
        }
        // props.childImage(props.id, pickedFile, fileIsValid)
        // props.childImage(file)

    }

    const pickImage = ()=>{
        filePickerRef.current.click()
    }

    const removeFile = (e)=>{
        e.preventDefault()
        setFile()
        setPreviewURL()
    }

    return (
        <div className='imgUpload'>
                              
            <svg viewBox="0 0 24 24" aria-hidden="true" className='imgUploadIcon'
            onClick={pickImage}><g>
                <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path><circle cx="8.868" cy="8.309" r="1.542"></circle></g>
            </svg>

            <input type="file" className='fileUpload' id={props.id}
            ref={filePickerRef} accept='.png,.jpg,.jpeg'
            style={{display:'none'}} onChange={onFileChange}/>

            <div className="preview">
                {previewURL && <img src={previewURL} className='previewImg' alt="Preview" /> }
                {!previewURL &&  <p>No image selected</p> }
            </div>

            {console.log(file)}
            {props.childImage(file)}
            <button onClick={removeFile}>X</button>
            

        </div>
    )
}


export default ImgUpload

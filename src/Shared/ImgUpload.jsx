import React, {useState, useRef, useEffect} from 'react'
import Resizer from 'react-image-file-resizer'
import './imgUpload.css'

function ImgUpload(props) {
    const [file, setFile] = useState()
    const [previewURL, setPreviewURL] = useState()
    const [isValid, setIsValid] = useState(false)
    
    //image preview
    useEffect(() => {
       if(!file){
           return
       }

       const fileReader = new FileReader();
       fileReader.onload = ()=>{
           setPreviewURL(fileReader.result);
       }
       fileReader.readAsDataURL(file);
       props.childImage(file)

    }, [file,props])

    const filePickerRef = useRef()

    //image resize
    const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
        file,
        400,
        400,
        "WEBP",
        100,
        0,
        (uri) => resolve(uri),
        "file"
        )
    })


    const onFileChange = async (e)=>{
        let fileIsValid = isValid;

        if(e.target.files && e.target.files.length === 1){
            // setFile(e.target.files[0])
            const unOptimizedImage = e.target.files[0]
            const optimized = await resizeFile(unOptimizedImage)
            setFile(optimized)
            fileIsValid = true
            setIsValid(true)
        }else{
            fileIsValid = false
            setIsValid(false)
        }
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
            ref={filePickerRef} accept='.png,.jpg,.jpeg,.WEBP'
            style={{display:'none'}} onChange={onFileChange}/>

            <div className="preview">
                {previewURL && <img src={previewURL} className='previewImg' alt="Preview" /> }
                {/* {!previewURL &&  <p>No image selected</p> } */}
            </div>

            {console.log(file)}
            <button className='imgUploadBtn' onClick={removeFile}>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
            </button>

        </div>
    )
}


export default ImgUpload

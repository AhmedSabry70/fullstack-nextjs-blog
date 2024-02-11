'use client'

import Image from 'next/image'
import styles from './imageUploader.module.css'
import { useEffect, useRef, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app as firebaseApp} from '@/utils/firebase';

const storage = getStorage(firebaseApp);


// Create the file metadata
/** @type {any} */
const metadata = {
    contentType: 'image/jpeg'
};


export const ImageUploader = ({ handleMedia }) => {

    const fileInput = useRef()
    const reactText = useRef()
    const [file, setFile] = useState()
    //const [mediaUrl, setMediaUrl] = useState()
    const [imageReview, setImageReview] = useState()


    useEffect(() => {

        const onUploadImg = () => {
            const fileName = new Date().getTime() + file.name
            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, 'images/postsCover/' + fileName);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            throw new Error('User doesnt have permission to access the object')
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            return console.log('User canceled the upload');
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);

                        handleMedia(downloadURL)
                    });
                }
            );
        }

        file && onUploadImg()

    }, [file])

    const handleChange = (e) => {
        e.preventDefault()
        setFile(e.target.files[0])
        setImageReview(URL.createObjectURL(e.target.files[0]))
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        reactText.current.textContent = 'Release to Uplaod'
    }



    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        reactText.current.textContent = 'drag and drop'
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFile(e.dataTransfer.files[0])
        setImageReview(URL.createObjectURL(e.dataTransfer.files[0]))

    }


    return (

        <div

            className={`${styles.wrapper} ${styles.postcover}`}
        >
            <h4 className={styles.title}>Post cover</h4>
            <div className={styles.coverContainer}>
                <div className={styles.imageContainer}>
                    <Image
                        className={styles.image}
                        src={imageReview || '/assets/images/bg/bg3.jpg'}
                        alt='post cover'
                        blurDataURL="/assets/images/bg/bg3.jpg"
                        placeholder="blur"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                </div>
                <button className={`${styles.button} ${styles.removeBtn}`}>Remove photo</button>

                <div
                    onClick={() => fileInput.current.click()}
                    onDragOver={(e) => handleDragOver(e)}
                    onDragLeave={(e) => handleDragLeave(e)}
                    onDrop={(e) => handleDrop(e)}
                    className={styles.uploadDragDrop}

                >
                    <Image
                        src={'/assets/images/bg/bg4.jpg'}
                        alt='upload'
                        width={70}
                        height={70}
                        blurDataURL="/assets/images/bg/bg4.jpg"
                        priority
                        placeholder="blur"
                        className={styles.image}
                    />
                    <div className={styles.textContainer}>
                        <h5><u className={styles.click}>Click to upload</u> <span ref={reactText}>{'  or drag and drop'}</span></h5>
                        <p className={styles.info}>(SVG,JPG,PNG, or gif maximum 900x400)</p>

                    </div>
                    <input ref={fileInput} type="file" name="file" id="uploadFile" className={styles.fileInput} onChange={(e) => handleChange(e)} onDrop={(e) => handleDrop(e)} hidden />
                </div>



            </div>
        </div>

    )
}

export default ImageUploader
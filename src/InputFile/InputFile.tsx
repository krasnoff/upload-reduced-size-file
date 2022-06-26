import { useRef } from 'react';
import { useConvertToFileObject } from './hooks/ConvertToFileObject';
import styles from './InputFile.module.scss';

interface MyProps {
    onSelectFile: (selectedSymbol: FileReader, fileName: string) => void
}

function InputFile(props: MyProps) {
    const imageUploadWrap = useRef<HTMLDivElement>(null);
    const fileUploadImage = useRef<HTMLImageElement>(null);
    const fileUploadContent = useRef<HTMLDivElement>(null);
    const imageTitle = useRef<HTMLSpanElement>(null);
    const fileUploadInput = useRef<HTMLInputElement>(null);

    const dataURLtoFile = useConvertToFileObject();

    const readURL = (input: any) => {
        const files = input.target.files;
        if (files && files[0]) {
            const reader = new FileReader();

            reader.onload = function(e: any) {
                imageUploadWrap.current?.style.setProperty('display', 'none');
                fileUploadImage.current?.setAttribute('src', e.target.result);
                fileUploadContent.current?.style.setProperty('display', 'block');

                imageTitle.current!.innerHTML = files[0].name;
                
            }

            reader.readAsDataURL(files[0]);
            // TODO here add the reduce function
            console.log('dataURLtoFile.....', files)
            // console.log('dataURLtoFile.....', dataURLtoFile())
            props.onSelectFile(reader, files[0]);
        } else {
            removeUpload();
        }
    }

    const openFilesBox = () => {
        fileUploadInput.current?.click();
    }

    const removeUpload = () => {
        fileUploadInput.current!.value = '';
        fileUploadContent.current?.style.setProperty('display', 'none');
        imageUploadWrap.current?.style.setProperty('display', 'block');
    }
    
    return (
        <div className={styles.fileUpload}>
            <button className={styles.fileUploadBtn} type="button" onClick={() => openFilesBox()}>Add Image</button>
            <div className={styles.imageUploadWrap} ref={imageUploadWrap}>
                <input className={styles.fileUploadInput} type='file' accept="image/*" onChange={(input) => readURL(input)} ref={fileUploadInput} />
                <div className={styles.dragText}>
                    <h3>Drag and drop a file or select add Image</h3>
                </div>
            </div>
            <div className={styles.fileUploadContent} ref={fileUploadContent}>
                <img className={styles.fileUploadImage} src="#" alt="" ref={fileUploadImage} />
                <div className={styles.imageTitleWrap}>
                    <button type="button" className={styles.removeImage}>Remove <span className={styles.imageTitle} ref={imageTitle} onClick={() => removeUpload()}>Uploaded Image</span></button>
                </div>
            </div>
        </div>
    );
  }
  
export default InputFile;
  
import { useEffect, useState } from "react";

export function useConvertToFileObject(base64Str: string) {
    const [fileObj, setFileObj] = useState<File>();

    useEffect(() => {
        function dataURLtoFile(dataurl: any, filename: string) {
 
            const arr = dataurl.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length; 
            const u8arr = new Uint8Array(n);
                
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            
            return new File([u8arr], filename, {type:mime});
        }

        setFileObj(dataURLtoFile(base64Str,'hello.txt'));
    });

    return fileObj;
}
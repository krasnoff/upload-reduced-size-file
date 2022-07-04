export interface IResizeImageOptions {
    file: File;
    maxWidth: number;
    maxHeight?: number | undefined;
}

export function useReducePicSize() {
    const dataURItoBlob = (dataURI: string) => {
        const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
            atob(dataURI.split(',')[1]) :
            unescape(dataURI.split(',')[1]);
        const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const max = bytes.length;
        const ia = new Uint8Array(max);
        for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], {type:mime});
    };

    const getFileType = (src: string) => {
        if (src.indexOf('image/jpeg') > -1) {
            return 'image/jpeg'
        }
        if (src.indexOf('image/png') > -1) {
            return 'image/png'
        }
        if (src.indexOf('image/gif') > -1) {
            return 'image/gif'
        }
        return undefined;
    }

    const resize = (image: HTMLImageElement, maxWidth: number, canvas: HTMLCanvasElement, maxHeight?: number) => {
        let width = image.width;
        let height = image.height;
    
        // if (width > height) {
        //     if (width > maxSize) {
        //         height *= maxSize / width;
        //         width = maxSize;
        //     }
        // } else {
        //     if (height > maxSize) {
        //         width *= maxSize / height;
        //         height = maxSize;
        //     }
        // }
        if (!maxHeight) {
            width = maxWidth > width ? width : maxWidth;
            height = maxWidth > width ? height : maxWidth / width * height;
        } else {
            width = maxWidth > width ? width : maxWidth;
            height = maxHeight > height ? height : maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        canvas?.getContext('2d')?.drawImage(image, 0, 0, width, height);
        let dataUrl = canvas.toDataURL(getFileType(image.src));
        return dataURItoBlob(dataUrl);
    };
    
    const resizeImage = (settings: IResizeImageOptions): Promise<Blob> => {
        const file = settings.file;
        const maxWidth = settings.maxWidth;
        const maxHeight = settings.maxHeight ? settings.maxHeight : undefined;
        const reader = new FileReader();
        const image = new Image();
        const canvas = document.createElement('canvas');

        return new Promise((ok, no) => {
            if (!file.type.match(/image.*/)) {
              no(new Error("Not an image"));
              return;
            }
      
            reader.onload = (readerEvent: any) => {
              image.onload = () => ok(resize(image, maxWidth, canvas, maxHeight));
              image.src = readerEvent.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    return {resizeImage};
}
export interface IResizeImageOptions {
    maxSize: number;
    file: File;
}

// TODO
// set parameter to stadn alone width and stand alone height
// input file validation
// handle file type png gif jfif and so forth

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

    const resize = (image: HTMLImageElement, maxSize: number, canvas: HTMLCanvasElement) => {
        let width = image.width;
        let height = image.height;
    
        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
        }

        canvas.width = width;
        canvas.height = height;
        canvas?.getContext('2d')?.drawImage(image, 0, 0, width, height);
        let dataUrl = canvas.toDataURL('image/jpeg');
        return dataURItoBlob(dataUrl);
    };
    
    const resizeImage = (settings: IResizeImageOptions): Promise<any> => {
        const file = settings.file;
        const maxSize = settings.maxSize;
        const reader = new FileReader();
        const image = new Image();
        const canvas = document.createElement('canvas');

        return new Promise((ok, no) => {
            if (!file.type.match(/image.*/)) {
              no(new Error("Not an image"));
              return;
            }
      
            reader.onload = (readerEvent: any) => {
              image.onload = () => ok(resize(image, maxSize, canvas));
              image.src = readerEvent.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    return {resizeImage};
}
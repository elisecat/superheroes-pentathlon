export const convertImageToBase64 = (image: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const img = new Image();
        img.src = image;
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/jpeg');
            resolve(dataURL);
        };
        img.onerror = (error) => reject(error);
    });
};

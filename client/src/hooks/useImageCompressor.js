

function dataURLtoFile(dataurl, filename) {
    if (dataurl) {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File(
            [u8arr],
            filename,
            { type: mime }
        );
    }
}


export async function imageCompressor(file, state) {

    const image = new Image();
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
        const canvas = document.createElement("canvas");

        image.onload = (imageEvent) => {
            const context = canvas.getContext("2d");
            const width = 200;
            const height = 200;

            canvas.width = width;
            canvas.height = height;

            context.drawImage(
                image,
                0,
                0,
                width,
                height
            )

            const canvasURL = canvas.toDataURL(file.type, 0.8);
            const resizedImage = dataURLtoFile(canvasURL);
            state({
                file: resizedImage,
                previewURI: canvasURL,
            });
        }
        image.src = readerEvent.target.result;
    }
    reader.readAsDataURL(file);

}
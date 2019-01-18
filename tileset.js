const TileSet = function(imageWidth, imageHeight, tileWidth, tileHeight, image) {
    let tiles = null;
    console.log(image);
    const enumerate = () => {
        const canvas = document.createElement("canvas");

        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height);

        for (let x = 0; x < canvas.width; ++x) {
            const pixel = canvas.getContext("2d").getImageData(x, 16, 1, 1);

            console.log(pixel);
        }
    };

    enumerate();
};
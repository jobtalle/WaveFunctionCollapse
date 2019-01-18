const Color = function(pixel) {
    this.r = pixel[0];
    this.g = pixel[1];
    this.b = pixel[2];
};

Color.prototype.equals = function(other) {
    return this.r == other.r && this.g == other.g && this.b == other.b;
};

const Tile = function(x, y, width, height) {

};

const TileImage = function(x, y, width, height, tileHeight, context) {
    this.northwest = [];
    this.northwestMatches = [];
    this.north = [];
    this.northMatches = [];
    this.northeast = [];
    this.northeastMatches = [];
    this.southwest = [];
    this.southwestMatches = [];
    this.south = [];
    this.southMatches = [];
    this.southeast = [];
    this.southeastMatches = [];

    for (let xPixel = 0; xPixel < (tileHeight >> 1) - 1; ++xPixel) {
        this.northwest.push(new Color(context.getImageData(
            x + xPixel,
            y + (height >> 1) - 1 - xPixel,
            1, 1).data));
        this.northeast.push(new Color(context.getImageData(
            x + width - xPixel - 1,
            y + (height >> 1) - 1 - xPixel,
            1, 1).data));
        this.southwest.push(new Color(context.getImageData(
            x + xPixel,
            y + (height >> 1) + xPixel,
            1, 1).data));
        this.southeast.push(new Color(context.getImageData(
            x + width - xPixel - 1,
            y + (height >> 1) + xPixel,
            1, 1).data));
    }

    for (let xPixel = (tileHeight >> 1) - 1; xPixel <= width - (tileHeight >> 1); ++xPixel) {
        this.north.push(new Color(context.getImageData(
            x + xPixel,
            y + ((height - tileHeight) >> 1),
            1, 1).data));
        this.south.push(new Color(context.getImageData(
            x + xPixel,
            y + ((height + tileHeight) >> 1) - 1,
            1, 1).data));
    }
};

const TileSet = function(imageWidth, imageHeight, tileHeight, image) {
    let tiles = [];
    
    const enumerate = () => {
        const colorArrayMatch = (first, second, invert) => {
            for (let i = 0; i < first.length; ++i)
                if (!first[i].equals(second[invert?first.length - i - 1:i]))
                    return false;
            
            return true;
        };

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const tileImages = [];

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);

        for (let y = 0; y < image.height; y += imageHeight) for (let x = 0; x < image.width; x += imageWidth)
            tileImages.push(new TileImage(x, y, imageWidth, imageHeight, tileHeight, context));

        for (let index = 0; index < tileImages.length; ++index) {
            for (let otherIndex = index + 1; otherIndex < tileImages.length; ++otherIndex) {
                if (colorArrayMatch(tileImages[index].north, tileImages[otherIndex].south, false)) {
                    tileImages[index].northMatches.push(otherIndex);
                    tileImages[otherIndex].southMatches.push(index);
                }

                if (colorArrayMatch(tileImages[index].south, tileImages[otherIndex].north, false)) {
                    tileImages[index].southMatches.push(otherIndex);
                    tileImages[otherIndex].northMatches.push(index);
                }

                if (colorArrayMatch(tileImages[index].northwest, tileImages[otherIndex].southeast, true)) {
                    tileImages[index].northwestMatches.push(otherIndex);
                    tileImages[otherIndex].southeastMatches.push(index);
                }

                if (colorArrayMatch(tileImages[index].southwest, tileImages[otherIndex].northeast, true)) {
                    tileImages[index].southwestMatches.push(otherIndex);
                    tileImages[otherIndex].northeastMatches.push(index);
                }

                if (colorArrayMatch(tileImages[index].northeast, tileImages[otherIndex].southwest, true)) {
                    tileImages[index].northeastMatches.push(otherIndex);
                    tileImages[otherIndex].southwestMatches.push(index);
                }

                if (colorArrayMatch(tileImages[index].southeast, tileImages[otherIndex].northwest, true)) {
                    tileImages[index].southeastMatches.push(otherIndex);
                    tileImages[otherIndex].northwestMatches.push(index);
                }
            }
        }

        for (const tileImage of tileImages)
            console.log(tileImage);
    };

    enumerate();
};
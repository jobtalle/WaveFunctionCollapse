const Dimensions = function(imageWidth, imageHeight, tileHeight) {
    this.imageWidth = this.tileWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.tileHeight = tileHeight;
    this.innerWidth = this.tileWidth - this.tileHeight + 2;
    this.outerWidth = this.tileWidth - this.innerWidth;
    this.outerHeight = this.imageHeight - tileHeight;
};
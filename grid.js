const GridTile = function(x, y, dimensions, tiles) {
    this.x = x;
    this.y = y;
    this.width = dimensions.tileWidth;
    this.height = dimensions.tileHeight;
    this.element = null;
    this.wave = [];

    for (const tile of tiles)
        this.wave.push(tile);
};

GridTile.prototype.getGridX = function() {
    return this.x * (this.width - ((this.height >> 1) - 1));
};

GridTile.prototype.getGridY = function() {
    return this.y * this.height + (this.x & 1) * (this.height >> 1);
};

GridTile.prototype.createElement = function(grid) {
    const element = document.createElement("div");

    element.className = "grid-tile unset";
    element.style.width = this.width + "px";
    element.style.height = this.height + "px";
    element.style.left = this.getGridX() + "px";
    element.style.top = this.getGridY() + "px";
    element.onclick = () => {
        if (element.classList.contains("unset"))
            grid.set(this.x, this.y);
    };

    this.element = element;

    return element;
};

GridTile.prototype.set = function(tile, dimensions) {
    this.element.classList.remove("unset");
    this.wave = [tile];
    
    tile.setFrame(this.element, dimensions);
};

const Grid = function(element, tileSet, dimensions) {
    const width = Math.floor((element.offsetWidth - dimensions.outerWidth / 2) / (dimensions.innerWidth + dimensions.outerWidth / 2));
    const height = Math.floor((element.offsetHeight - dimensions.tileHeight / 2) / dimensions.tileHeight);
    const grid = [];

    const getTile = (x, y) => {
        return grid[x * height + y];
    };

    this.set = (x, y) => {
        getTile(x, y).set(tileSet.getSelected(), dimensions);
    };

    const initialize = () => {
        for (let x = 0; x < width; ++x) for (let y = 0; y < height; ++y) {
            const tile = new GridTile(x, y, dimensions, tileSet.getTiles());

            grid.push(tile);

            element.appendChild(tile.createElement(this));
        }
    };

    initialize();
};
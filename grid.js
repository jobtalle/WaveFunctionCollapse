const GridTile = function(x, y, dimensions) {
    this.x = x;
    this.y = y;
    this.width = dimensions.tileWidth;
    this.height = dimensions.tileHeight;
    this.element = null;
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
    element.onclick = () => grid.collapse(this.x, this.y);

    this.element = element;

    return element;
};

GridTile.prototype.set = function(tile, dimensions) {
    this.element.classList.remove("unset");
    
    tile.setFrame(this.element, dimensions);
};

const Grid = function(element, tileSet, dimensions) {
    const width = Math.floor((element.offsetWidth - dimensions.outerWidth / 2) / (dimensions.innerWidth + dimensions.outerWidth / 2));
    const height = Math.floor((element.offsetHeight - dimensions.tileHeight / 2) / dimensions.tileHeight);
    const grid = [];

    this.collapse = (x, y) => {
        const tile = grid[x * height + y];
        
        tile.set(tileSet.getSelected(), dimensions);
    };

    const initialize = () => {
        for (let x = 0; x < width; ++x) for (let y = 0; y < height; ++y) {
            const tile = new GridTile(x, y, dimensions);

            grid.push(tile);

            element.appendChild(tile.createElement(this));
        }
    };

    initialize();
};
const TILE_IMAGE_WIDTH = 32;
const TILE_IMAGE_HEIGHT = 32;
const TILE_WIDTH = 32;
const TILE_HEIGHT = 18;

const tileset = new TileSet(
    TILE_IMAGE_WIDTH,
    TILE_IMAGE_HEIGHT,
    TILE_WIDTH,
    TILE_HEIGHT,
    document.getElementById("tiles"));
const grid = new Grid(4, 4);

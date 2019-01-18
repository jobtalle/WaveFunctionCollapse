const TILE_IMAGE_WIDTH = 32;
const TILE_IMAGE_HEIGHT = 32;
const TILE_HEIGHT = 18;

const dimensions = new Dimensions(
    64,
    64,
    34);
const tileSet = new TileSet(
    document.getElementById("tiles"),
    dimensions);
const grid = new Grid(
    document.getElementById("grid"),
    tileSet,
    dimensions);

tileSet.makeLegend(document.getElementById("legend"));
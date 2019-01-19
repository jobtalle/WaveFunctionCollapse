let text = null;

const generate = seed => {
    let result = "";

    result = text.generate(seed);

    document.getElementById("text").innerText = result;
};

const graph = new Graph(document.getElementById("graph"), generate);

const load = () => {
    text = loadText(document.getElementById("source-picker").value, data => {
        text = new Text(data, 2, graph);

        generate();
    });
};

document.getElementById("sources").onchange = load;
document.getElementById("button-generate").onclick = () => generate();

load();
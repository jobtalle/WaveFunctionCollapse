const graph = new Graph(document.getElementById("graph"));
let text = null;

const loadText = (file, onFinished) => {
    const request = new XMLHttpRequest();

    request.open("GET", file);
    request.onreadystatechange = () => {
        if (request.readyState === 4)
            onFinished(request.responseText);
    };

    request.send();
};

const generate = () => {
    let result = "";

    while (result.length < 30)
        result = text.generate();

    document.getElementById("text").innerText = result;
};

const load = () => {
    text = loadText(document.getElementById("source-picker").value, data => {
        text = new Text(data, 2, graph);

        generate();
    });
};

document.getElementById("sources").onchange = load;
document.getElementById("button-generate").onclick = generate;

load();
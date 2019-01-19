const loadText = (file, onFinished) => {
    const request = new XMLHttpRequest();

    request.open("GET", file);
    request.onreadystatechange = () => {
        if (request.readyState === 4)
            onFinished(request.responseText);
    };

    request.send();
};

let text = null;

loadText("text.txt", data => text = new Text(data));

document.getElementById("button-generate").onclick = () => {
    if (text)
        document.getElementById("text").innerText = text.generate();
};
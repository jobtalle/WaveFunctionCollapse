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

loadText("obama.txt", data => text = new Text(data, 2));

document.getElementById("button-generate").onclick = () => {
    if (text) {
        let result = "";

        while (result.length < 30)
            result = text.generate();

        document.getElementById("text").innerText = result;
    }
};
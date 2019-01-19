const loadText = (file, onFinished) => {
    const request = new XMLHttpRequest();

    request.open("GET", file);
    request.onreadystatechange = () => {
        if (request.readyState === 4)
            onFinished(request.responseText);
    };

    request.send();
};

const loadTextLocal = (file, onFinished) => {
    const reader = new FileReader();

    reader.onload = function() {
        const text = reader.result;

        onFinished(text);
    };

    reader.readAsText(file);
};
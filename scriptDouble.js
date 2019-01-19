const chat = new Chat(document.getElementById("chat"));
const graph = new Graph(document.getElementById("graph"));
let left = null;
let right = null;
let leftPrefix = null;
let rightPrefix = null;

const openFile = event => {
    loadTextLocal(event.target.files[0], data => {
        const parser = new WhatsAppParser(data, graph);

        left = parser.getLeft();
        right = parser.getRight();

        leftPrefix = parser.getNameLeft() + ": ";
        rightPrefix = parser.getNameRight() + ": ";
    });
};

const sendMessage = (event, left) => {
    if (event.keyCode !== 13)
        return;

    const message = event.srcElement.value;

    if (message.length === 0)
        return;

    event.srcElement.value = "";

    if (left)
        chat.sendLeft(message);
    else
        chat.sendRight(message);
};

document.getElementById("button-speak-left").onclick = () => {
    if (left)
        chat.sendLeft(leftPrefix + left.generate());
};

document.getElementById("button-speak-right").onclick = () => {
    if (right)
        chat.sendRight(rightPrefix + right.generate());
};
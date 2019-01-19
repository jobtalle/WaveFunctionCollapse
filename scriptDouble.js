const chat = new Chat(document.getElementById("chat"));
let left = null;
let right = null;

const openFile = event => {
    loadTextLocal(event.target.files[0], data => {
        const parser = new WhatsAppParser(data);

        left = parser.getLeft();
        right = parser.getRight();
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
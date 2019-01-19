const Chat = function(element) {
    const makeElement = message => {
        const element = document.createElement("div");

        element.className = "message";
        element.appendChild(document.createTextNode(message));

        return element;
    };

    const scrollDown = () => {
        element.scrollTop = element.scrollHeight;
    };

    this.sendLeft = message => {
        const messageElement = makeElement(message);

        messageElement.classList.add("left");

        element.appendChild(messageElement);

        scrollDown();
    };

    this.sendRight = message => {
        const messageElement = makeElement(message);

        messageElement.classList.add("right");

        element.appendChild(messageElement);

        scrollDown();
    };
}
const Chat = function(element) {
    const MAX_MESSAGES = 500;

    const makeElement = message => {
        const element = document.createElement("div");

        element.className = "message";
        element.appendChild(document.createTextNode(message));

        return element;
    };

    const scrollDown = () => {
        element.scrollTop = element.scrollHeight;
    };

    const trim = () => {
        messages = element.getElementsByClassName("message");

        if (messages.length > MAX_MESSAGES)
            element.removeChild(messages[0]);
    };

    this.sendLeft = message => {
        const messageElement = makeElement(message);

        messageElement.classList.add("left");

        element.appendChild(messageElement);

        trim();
        scrollDown();
    };

    this.sendRight = message => {
        const messageElement = makeElement(message);

        messageElement.classList.add("right");

        element.appendChild(messageElement);

        trim();
        scrollDown();
    };
}
const GraphNode = function(options, chosen) {
    this.options = options;
    this.chosen = chosen;
};

GraphNode.prototype.toElement = function() {
    const element = document.createElement("div");

    element.className = "options";

    for (const option of this.options) {
        const word = document.createElement("div");

        word.className = "word";
        word.appendChild(document.createTextNode(option));

        if (this.chosen === option)
            word.classList.add("chosen");

        element.appendChild(word);
    }

    return element;
};

const Graph = function(element) {
    let nodes = [];

    const makeElement = () => {
        while (element.firstChild)
            element.removeChild(element.firstChild);

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const elements = [];
        let height = 0;

        element.appendChild(svg);

        for (const node of nodes) {
            const options = node.toElement();

            elements.push(options);
            element.appendChild(options);

            const optionsHeight = options.offsetTop + options.clientHeight;

            if (optionsHeight > height)
                height = optionsHeight;
        }
        
        svg.setAttribute("width", elements[elements.length - 1].offsetLeft + elements[elements.length - 1].clientWidth);
        svg.setAttribute("height", height);

        const BEZIER_OFFSET = 24;
        const BEZIER_OVERLAP = 2;
        let previousElement = null;

        for (const element of elements) {
            if (previousElement === null) {
                previousElement = element;

                continue;
            }

            const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const from = previousElement.getElementsByClassName("chosen")[0];
            const to = element.getElementsByClassName("chosen")[0];

            line.setAttribute("d", "M " +
                (from.offsetLeft + from.clientWidth - BEZIER_OVERLAP) + " " +
                (from.offsetTop + from.clientHeight / 2) + " " +
                "C " +
                (from.offsetLeft + from.clientWidth + BEZIER_OFFSET) + " " +
                (from.offsetTop + from.clientHeight / 2) + " " +
                (to.offsetLeft - BEZIER_OFFSET) + " " +
                (to.offsetTop + to.clientHeight / 2) + " " +
                (to.offsetLeft + BEZIER_OVERLAP) + " " +
                (to.offsetTop + to.clientHeight / 2));


            line.setAttribute("stroke", "gray");
            line.setAttribute("stroke-width", 2);
            line.setAttribute("fill", "none");

            svg.appendChild(line);

            previousElement = element;
        }
    };

    this.clear = () => {
        nodes = [];
    };

    this.add = (options, chosen) => {
        const lastNode = nodes.length?nodes[nodes.length - 1]:null;
        
        if (lastNode && lastNode.options.length === 1 && options.length === 1) {
            lastNode.options[0] += " " + options[0];
            lastNode.chosen = lastNode.options[0];

            return;
        }

        const uniqueOptions = [];

        for (const option of options) if (!uniqueOptions.includes(option) && option !== null)
            uniqueOptions.push(option);

        nodes.push(new GraphNode(uniqueOptions, chosen));
    };

    this.finish = () => {
        makeElement();
    };
};
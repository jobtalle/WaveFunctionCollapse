const WhatsAppParser = function(data, graph) {
    const CHARACTER_THRESHOLD = 16;

    let left = null;
    let right = null;
    let nameLeft = null;
    let nameRight = null;

    const build = () => {
        const names = [];
        const lines = data.split("\n");
        let textLeft = "";
        let textRight = "";
        let carry = "";

        const processLine = line => {
            if (line.length === 0)
                return;
            
            const nameIndex = line.indexOf("- ") + 2;
            const sentenceIndex = line.indexOf(":", nameIndex);
            const name = line.substring(nameIndex, sentenceIndex);
            let content = line.substring(sentenceIndex + 2);
            const lastChar = content[content.length - 1];
            
            if (!names.includes(name))
                names.push(name);

            if (content === "<Media omitted>" || content.indexOf("http") !== -1)
                return;
            
            if (content.length < CHARACTER_THRESHOLD)
                return;

            if (lastChar !== "!" && lastChar !== "?" && lastChar !== ".")
                content += ". ";
            else   
                content += " ";

            switch (names.indexOf(name)) {
                case 0:
                    textLeft += content;

                    break;
                case 1:
                    textRight += content;

                    break;
            }
        };

        for (let i = 0; i < lines.length; ++i) {
            const line = lines[i];
            const date = line.substring(0, line.indexOf(","));

            if (date.length < 6 || date.length > 8)
                carry += " " + line;
            
            processLine(carry + line);
            
            carry = "";
        }

        nameLeft = names[0];
        nameRight = names[1];

        left = new Text(textLeft, 2, graph);
        right = new Text(textRight, 2, graph);
    };

    this.getLeft = () => left;
    this.getRight = () => right;
    this.getNameLeft = () => nameLeft;
    this.getNameRight = () => nameRight;

    build();
};
const Text = function(data, lookback, graph) {
    const words = {};
    const starts = [];

    const makeWordList = list => {
        let result = list[0];

        for (let i = 1; i < list.length; ++i) {
            result += " " + list[i];
        }

        return result;
    };

    const makeWordListPlus = (list, word) => {
        let result = "";

        // TODO: Verify this ternary statement
        if (list) for (let i = list.length === lookback?1:0; i < list.length; ++i)
            result += list[i] + " ";
        
        return result + word;
    };

    const addWord = (previousWords, word, isFirst, isLast) => {
        if (word.length === 0)
            return;

        const entry = makeWordListPlus(previousWords, word);
        
        if (!words[entry]) {
            words[entry] = [];

            if (isFirst)
                starts.push(word);
        }

        if (isLast)
            words[entry].push(null);
        
        if (!isFirst)
            words[makeWordList(previousWords)].push(word);
    };

    const build = () => {
        let previousWords = [];
        let word = "";
        let isFirst = true;

        const addPrevious = word => {
            previousWords.push(word);
            
            if (previousWords.length > lookback)
                previousWords.shift();
        };

        for (let i = 0; i < data.length; ++i) {
            switch (data[i]) {
                case " ":
                    addWord(isFirst?null:previousWords, word, isFirst, false);

                    addPrevious(word);

                    isFirst = false;

                    word = "";

                    break;
                case ".":
                case "?":
                case "!":
                    if (i + 1 < data.length && data[i + 1] !== " ")
                        word += data[i].toLowerCase();
                    else {
                        addWord(previousWords, word, isFirst, true);

                        isFirst = true;

                        previousWords = [];
                        word = "";
                        ++i;
                    }

                    break;
                case "(":
                case ")":
                case '"':
                    break;
                default:
                    word += data[i].toLowerCase();

                    break;
            }
        }
    };

    build();
    
    this.generate = first => {
        let word = first?first:starts[Math.floor(Math.random() * starts.length)];
        let previousWords = [];
        let sentence = word;

        if (graph) {
            graph.clear();
            graph.add([word], word);
        }

        const addPrevious = word => {
            previousWords.push(word);
            
            if (previousWords.length > lookback)
                previousWords.shift();
        };

        while (true) {
            addPrevious(word);
            
            const options = words[makeWordList(previousWords)];

            if (!options)
                break;

            word = options[Math.floor(Math.random() * options.length)];

            if (graph && word)
                graph.add(options, word);

            if (word === null)
                break;

            sentence += " " + word;
        }

        if (graph)
            graph.finish();

        return sentence[0].toUpperCase() + sentence.substr(1) + ".";
    };
};
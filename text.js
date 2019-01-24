const Text = function(data, lookback, graph) {
    const words = {};
    const starts = [];

    const makeWordList = list => {
        let result = list[0];

        for (let i = 1; i < list.length; ++i) if (list[i] && list[i].length)
            result += " " + list[i];

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
        
        if (!isFirst) {
            const wordList = makeWordList(previousWords);
            
            if (words[wordList])
                words[wordList].push(word);
        }
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
                case "\n":
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

    this.generate = seed => {
        let word = seed?seed[seed.length - 1]:starts[Math.floor(Math.random() * starts.length)];
        let previousWords = seed?seed.slice(-3, -1):[];
        let sentence = seed?makeWordList(seed):word;

        if (graph) {
            graph.clear();

            if (seed) {
                for (let i = 0; i < seed.length; ++i)
                    graph.add(i?words[makeWordList(seed.slice(Math.max(0, i - lookback), i))]:[seed[i]], seed[i]);
            }
            else
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
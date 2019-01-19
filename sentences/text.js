const CHAR_CODE_FIRST = "A".charCodeAt(0);
const CHAR_CODE_LAST = "Z".charCodeAt(0);

const Text = function(data) {
    const words = {};
    const starts = [];
    const ends = [];

    const addWord = (previousWord, word, isFirst, isLast) => {
        if (word.length === 0)
            return;

        if (!words[word]) {
            words[word] = [];

            if (isFirst)
                starts.push(word);

            if (isLast)
                ends.push(word);
        }
        
        if (previousWord && !isFirst)
            words[previousWord].push(word);
    };

    const build = () => {
        let previousWord = null;
        let word = "";
        let isFirst = true;

        for (let i = 0; i < data.length; ++i) {
            switch (data[i]) {
                case " ":
                    addWord(isFirst?null:previousWord, word, isFirst, false);

                    previousWord = word;
                    isFirst = false;

                    word = "";

                    break;
                case ".":
                    if (i + 1 < data.length && data[i + 1] !== " ")
                        word += data[i].toLowerCase();
                    else {
                        addWord(previousWord, word, isFirst, true);

                        isFirst = true;

                        previousWord = word;
                        word = "";
                        ++i;
                    }

                    break;
                case "(":
                case ")":
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
        let sentence = word;

        while (ends.indexOf(word) === -1) {
            const options = words[word];

            word = options[Math.floor(Math.random() * options.length)];

            sentence += " " + word;
        }

        return sentence[0].toUpperCase() + sentence.substr(1) + ".";
    };
};
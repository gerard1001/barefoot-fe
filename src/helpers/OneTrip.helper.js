const formatCapitalFirst = (word) => {
  const splitWord = word.trim().toLowerCase().split(' ');

  const changedSplitWord = splitWord.map((word) => {
    const wordArr = word.trim().toLowerCase().split('');
    wordArr[0] = wordArr[0].toUpperCase();
    return wordArr.join('');
  });

  return changedSplitWord.join(' ');
};

const formatCapitalAll = (word) => word.toUpperCase();

export { formatCapitalFirst, formatCapitalAll };

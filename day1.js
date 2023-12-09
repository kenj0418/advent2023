const fs = require("fs");
const { sum, readStringArrayFromFile } = require("./lib");

const run = (filename) => {
  const lines = readStringArrayFromFile(filename, "\n");
  const values1 = lines.map((line) => {
    const match = line.match(/^[^\d]*(\d).*(\d)[^\d]*$/)
    if (match) {
      return parseInt(match[1]) * 10 + parseInt(match[2])
    } else {
      const matchSingle = line.match(/^[^\d]*(\d).*[^\d]*$/)

      return matchSingle ? parseInt(matchSingle[1]) * 11 : 0
    }
  });

  const digitValue = (digitStr) => {
    if (digitStr.match(/\d/)) {
      return parseInt(digitStr)
    } else {
      return ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].indexOf(digitStr);
    }
  }


  const values2 = lines.map((line) => {
    const matchFirst = line.match(/^.*?(one|two|three|four|five|six|seven|eight|nine|zero|\d).*$/)
    const matchLast = line.match(/^.*(one|two|three|four|five|six|seven|eight|nine|zero|\d).*?$/)
    if (!matchFirst || !matchLast) { return 0; }

    return digitValue(matchFirst[1]) * 10 + digitValue(matchLast[1]);
  });

  console.log(`Part 1: ${sum(values1)}`);
  console.log(`Part 2: ${sum(values2)}`); // 53986 too low
}

module.exports = { run };
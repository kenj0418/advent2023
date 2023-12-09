const fs = require("fs");
const { readStringArrayFromFile, sum } = require("./lib");

const run = (filename) => {
  const st = readStringArrayFromFile(filename, "\n");

  const getRect = (schematic, row, startCol, endCol) => {
    const x1 = (startCol < 0) ? 0 : startCol;
    const x2 = (endCol >= schematic[0].length) ? schematic[0].length - 1 : endCol;

    // console.log(`${x1}:${y1} - ${x2}:${y2}`);
    let rect = "";

    if (row > 0) {
      rect += schematic[row - 1].substring(x1, x2 + 1);
    }

    if (startCol > 0) {
      rect += schematic[row][x1];
    }
    if (endCol + 1 < schematic[row].length) {
      rect += schematic[row][endCol];
    }

    if (row + 1 < schematic.length) {
      rect += schematic[row + 1].substring(x1, x2 + 1);
    }

    return rect;
  }

  const isAPart = (schematic, row, startCol, endCol) => {
    const rect = getRect(schematic, row, startCol - 1, endCol);
    console.log(`${schematic[row].substring(startCol, endCol)} ${rect}`);

    // console.log(`${row} ${startCol} ${endCol}`);
    // console.log(rect);
    return rect.match(/[^\.]/)
  }

  const engineParts = st.flatMap((line, n) => {
    let parts = []
    let lineStrLeft = line;
    while (lineStrLeft) {
      const match = lineStrLeft.match(/^\D*(\d+)(.*?)$/)
      if (match) {
        const possiblePart = match[1];
        const pos = line.indexOf(possiblePart);
        lineStrLeft = match[2];

        if (isAPart(st, n, pos, pos + possiblePart.length)) {
          parts.push(parseInt(possiblePart));
        }
      } else {
        lineStrLeft = null;
      }
    }

    return parts;
  })

  const uniqueParts = [...new Set(engineParts)];
  const part1 = sum(uniqueParts);

  console.log(`Part 1: ${part1}`);
  // 595838 too high
  // 549272 too high
  // 333371 too low
  // 336859 ???
  // 332309 ??? (Didn't say, but too low)

  console.log(`Part 2: ${0}`);

}

module.exports = { run };
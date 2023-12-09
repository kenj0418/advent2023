const fs = require("fs");
const { readStringArrayFromFile, sum } = require("./lib");

const run = (filename) => {
  const st = readStringArrayFromFile(filename, "\n");
  const games = st.map((line) => {
    const match = line.match(/^Game (\d+)\: (.*)$/);
    const n = parseInt(match[1])
    const sets = match[2].split('; ').map(set => set.split(', ')).map(set => {
      let setObj = {}
      set.forEach((setPartSt) => {
        const setParts = setPartSt.match(/^(\d+) ([a-z]+)$/);
        setObj[setParts[2]] = parseInt(setParts[1])
      })

      return setObj;
    })

    return {
      n,
      sets
    }
  });

  const isValidPart1 = (game) => {
    const maxRed = 12;
    const maxGreen = 13;
    const maxBlue = 14;

    for (let i = 0; i < game.sets.length; i++) {
      set = game.sets[i];


      if (set.red > maxRed || set.green > maxGreen || set.blue > maxBlue) {
        return false;
      }
    }

    return true;
  }

  const calculateMinimums = (game) => {
    let minimums = { red: 0, green: 0, blue: 0 }
    for (let i = 0; i < game.sets.length; i++) {
      set = game.sets[i];

      if (set.red > minimums.red) {
        minimums.red = set.red
      }

      if (set.green > minimums.green) {
        minimums.green = set.green
      }

      if (set.blue > minimums.blue) {
        minimums.blue = set.blue
      }
    }

    return minimums;
  }

  const part1Games = games.filter(isValidPart1);
  const part1Total = sum(part1Games.map(game => game.n));

  const part2Total = sum(games.map(calculateMinimums).map((gameMin) => gameMin.red * gameMin.green * gameMin.blue))


  console.log(`Part 1: ${part1Total}`);
  console.log(`Part 2: ${part2Total}`);

}

module.exports = { run };
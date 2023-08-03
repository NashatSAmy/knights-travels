const makeBored = () => {
  // Makes a graph chess bored stored as an adjacency list.
  // Edges are made based on how the knight moves.
  const bored = [];
  for (let x = 1; x <= 8; x++) {
    for (let y = 1; y <= 8; y++) {
      const edges = [
        [x + 2, y - 1],
        [x + 2, y + 1],
        [x + 1, y - 2],
        [x + 1, y + 2],
        [x - 2, y - 1],
        [x - 2, y + 1],
        [x - 1, y - 2],
        [x - 1, y + 2],
      ].filter((e) => e[0] > 0 && e[1] > 0 && e[0] < 9 && e[1] < 9);
      bored.push(edges);
    }
  }
  return bored;
};

const qN = (square) => {
  // Convert square coordinates to array index.
  return square[0] * 8 - (8 - square[1]) - 1;
};

const qC = (n) => {
  // Convert array index to square coordinates.
  const x = Math.ceil((n + 1) / 8);
  const y = 8 - (x * 8 - (n + 1));
  return [x, y];
};

const clean = (arr) => {
  let cleanArr = [];
  arr.forEach((i) => (cleanArr.includes(i) ? "" : cleanArr.push(i)));
  return cleanArr;
};

const bored = makeBored();

const knight = (start, end, q = [start], h = [], m = []) => {
  // This function return the path our knight took to discover which is the shortest way to take.
  m = qC(
    h
      .map((x) => qN(x))
      .filter((y) => bored[y].map((z) => qN(z)).includes(qN(start)))[0]
  );
  const possibleMoves = bored[qN(start)];
  h.push(q.shift());
  q.push(...possibleMoves.filter((move) => !q.includes(move)));
  if (possibleMoves.map((move) => qN(move)).includes(qN(end)))
    return [m, start, end];
  return [m, ...knight(q[0], end, q, h, m)];
};

const knightTravels = (x,y) => {
  // This function clean the knight path and return nicely formatted.
  const arr = knight(x, y)
  const xN = clean(arr.map((s) => qN(s))).slice(1);
  const xF = [xN[xN.length-1]];
  for (let n = 0; n < xF.length; n++) {
    for (let i = 0; i < xN.length; i++) {
      if (bored[xN[i]].map((f) => qN(f)).includes(xF[n]) && !xF.includes(xN[i])) {
        xF.push(xN[i])
        break
      }
    }
    if (xF[xF.length - 1] == xN[0]) break
  };
  xF.reverse();
  return `=> You made it in ${xF.length} moves!  Here's your path: ${xF.map(move=> ` 
  [${qC(move)}]`)}`
};

console.log(knightTravels([3,3],[4,3]));

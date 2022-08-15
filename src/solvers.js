/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  /*
  var board = new Board({n:n})

  var solution = board.rows();

  var makeASolution = function(row) {
    if (row === n) {
      solution = _.map(board.rows(), function(innerRow) {
        return innerRow.slice();
      });
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        makeASolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  makeASolution(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
  */

  var board = new Board({n:n});
  var solution = board.rows();
  var counter = 0;

  for (var i = 0; i < solution.length; i++) {
    for (var j = 0; j < solution[i].length; j++) {
      board.togglePiece(i, j);
      counter++;

      if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
        board.togglePiece(i, j);
        counter--;
      }
    }
  }

  if (counter === n) {
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
  }

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
//[1, 1, 2, 6, 24, 120, 720, 5040, 40320]

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({n:n});

  var makeASolution = function(row) {

    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        makeASolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  makeASolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


  /*
If rows === n
    There's no more solutions to get, so...
      Increment solutionCount
      Return to break out of recursive iteration

Iterate through row
    Iterate with each column
    At each column...
      Toggle a piece
        Check conditional
          If true, invoke recursive function with next row
      Untoggle piece
        This will reset the board after the conditional checks
*/

  //Maybe a conditional to trigger this continuously?

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});

  var solution = board.rows();

  // var counter = 0;

  // for (var i = 0; i < solution.length; i++) {
  //   for (var j = 0; j < solution[i].length; j++) {
  //     board.togglePiece(i, j);
  //     counter++;

  //     if (board.hasAnyQueensConflicts()) {
  //       board.togglePiece(i, j);
  //       counter--;
  //     }
  //   }
  // }
  var makeASolution = function(row) {
    if (row === n) {
      //  var board = new Board({n:n});
      /*
      [[0, 0],
       [0, 0]]
      */

      // var solution = board.rows();
      /*
      [[0, 0],
       [0, 0]]
      */

      solution = _.map(board.rows(), function(row){
        return row.slice();
      // /*
      // [[0, 1],
      //  [1, 0]]
      // */
      });
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        makeASolution(row + 1);
      }
      board.togglePiece(row, i);
    }

  }

  makeASolution(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
//[1, 1, 0, 0, 2, 10, 4, 40, 92]

window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({n:n});

  var makeASolution = function(row) {

    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        makeASolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  makeASolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


    /*
    Final solution:
    [[1, 0],
    [0, 0]]
    |
    v TOGGLE AT (row 0, column 1)
    [[1, 1],
    [0, 0]]
    |
    v CHECK FOR CONFLICT (which it will)
    |
    v TOGGLE AGAIN AT (row 0, column 1)
    [[1, 0],
    [0, 0]]
    */
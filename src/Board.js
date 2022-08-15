// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // var board = this.rows();

      // var singleRow = board[rowIndex];
      var row = this.get(rowIndex);

      var counter = 0;

      for (var i = 0; i < row.length; i++) {
        // if (singleRow[i] === 1) {
        //   counter++;
        // }
        if (counter > 1) {
          return true;
        }
        counter += row[i];
      }

      return false;
      // return counter > 1;
    },

    hasAnyRowConflicts: function() {
      // var board = this.rows();
      var boardLength = this.get('n')

      for (var i = 0; i < boardLength; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var counter = 0;

      for (var i = 0; i < board.length; i++) {
        // if (board[i][colIndex] === 1) {
        //   counter++;
        // }
        counter += board[i][colIndex];
        if (counter > 1) {
          return true;
        }
      }
      return false;
    },

    hasAnyColConflicts: function() {

      var board = this.rows();

      var rowNumbers = board.length;
      var colNumbers = rowNumbers;


      for (var i = 0; i < colNumbers; i++) {

        if(this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow, rowIndex) {

      var columnIndex = majorDiagonalColumnIndexAtFirstRow;

      var board = this.rows();

      if (rowIndex === undefined) {
        rowIndex = 0;
      }

      var counter = 0;

      // var backRow = rowIndex - 1;
      // var backColumn = columnIndex - 1;

      for (var i = rowIndex; i < board.length; i++) {

        if (board[i][columnIndex] === 1) {
          counter++
        }

        if (counter >= 2) {
          return true;
        }

        columnIndex++
      }

      // for (var i = backRow; i >= 0; i--) {
      //   if (board[i][backColumn] === 1) {
      //     counter++
      //   }

      //   if (counter >= 2) {
      //     return true;
      //   }

      //   backColumn--;
      // }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();

      var rowNumbers = board.length;
      var colNumbers = rowNumbers;

      for (var j = 0; j < rowNumbers; j++) {
        for (var i = 0; i < colNumbers; i++) {
          if(this.hasMajorDiagonalConflictAt(i, j)) {
            return true;
          }
        }
      }

      return false;
    },

    /*
 What is currently being checked with this function?

      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]  i = 0 in hasAnyMajorDiagonalConflicts

      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0]  i = 1

      [0, 0, 1, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]  i = 2

      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]  i = 3

      May have to take into account other initial rows

      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0]

      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 1, 0, 0]

      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0]
    */



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //

    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow, rowIndex) {
      var board = this.rows();

      var columnIndex = minorDiagonalColumnIndexAtFirstRow;

      var counter = 0;

      // var backRow = rowIndex - 1;
      // var backColumn = columnIndex + 1;

      if (rowIndex === undefined) {
        rowIndex = 0;
      }

      for (var i = rowIndex; i < board.length; i++) {
        // if (columnIndex < 0) {
        //   return false;
        // }

        if (board[i][columnIndex] === 1) {
          counter++;
        }

        if (counter >= 2) {
          return true;
        }

        columnIndex--;
      }

      // for (var i = backRow; i >= 0; i--) {
      //   if (board[i][backColumn] === 1) {
      //     counter++;
      //   }

      //   if (counter >= 2) {
      //     return true;
      //   }

      //   columnIndex++;
      // }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();

      var rowNumbers = board.length;
      var colNumbers = rowNumbers;

      for (var j = 0; j < rowNumbers; j++) {
        for (var i = 0; i < colNumbers; i++) {
          if (this.hasMinorDiagonalConflictAt(i, j)) {
            return true;
          }
        }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

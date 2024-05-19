export const checkWinner = (tablero) => {
    for(let i = 0; i < tablero.length; i++){
      for(let j = 0; j < tablero[i].length; j++){
        if(tablero[i][j] === null) continue;
        //compare horizontal
        if(i + 3 < tablero.length &&
          tablero[i][j] === tablero[i + 1][j] &&
          tablero[i][j] === tablero[i + 2][j] &&
          tablero[i][j] === tablero[i + 3][j]
        ){
          return tablero[i][j];
        }
        //compare vertical
        if(j + 3 < tablero[i].length){
          if(tablero[i][j] === tablero[i][j + 1] &&
            tablero[i][j] === tablero[i][j + 2] &&
            tablero[i][j] === tablero[i][j + 3]
          ){
            return tablero[i][j];
          }
        }
        //compare diagonal
        if(i + 3 < tablero.length && j + 3 < tablero[i].length){
          if(tablero[i][j] === tablero[i + 1][j + 1] &&
            tablero[i][j] === tablero[i + 2][j + 2] &&
            tablero[i][j] === tablero[i + 3][j + 3]
          ){
            return tablero[i][j];
          }
        }
        //compare diagonal
        if(i + 3 < tablero.length && j - 3 >= 0){
          if(tablero[i][j] === tablero[i + 1][j - 1] &&
            tablero[i][j] === tablero[i + 2][j - 2] &&
            tablero[i][j] === tablero[i + 3][j - 3]
          ){
            return tablero[i][j];
          }
        }
      }
    }
  }
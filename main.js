class Game{
    constructor(){
          this.turn = 'X';
            this.winner = null;
      this.numElements = 0;
      this.scoreX = 0;
      this.scoreY = 0;
    }
    
    resetGame(){
        this.resetBoard();
      this.scoreX = 0;
      this.scoreY = 0;
    }
    
    /*Reset board but not the entire game*/
    resetBoard(){
        const allBoxes = document.querySelectorAll('.box');
      allBoxes.forEach(function(currentElement){
          currentElement.textContent = '';
      });
      this.numElements = 0;
      this.turn = 'X';
      this.winner = null;
      
          this.updateBoardTurn();
      
          this.hideOverlay();
    }
    
    /*Update's booard to display who's turn it is.*/
    updateBoardTurn(){
      const turnIndicator = document.querySelector('#user_turn');
      turnIndicator.textContent = this.turn + "'s turn!";
    }
    
    hideOverlay(){
      const overlaySelector = document.querySelector('#overlay');
      overlaySelector.style.display = 'none';
      return;
    }
    
    showOverlay(){
        const overlaySelector = document.querySelector('#overlay');
        overlaySelector.style.display = 'block';
    }
    
    updateScore(){
      if(this.winner === 'X')
          this.scoreX++;
      else
          this.scoreY++;
    }
    
    updateOverlayMessage(winner){
        const message = document.querySelector('#overlay_text');
      message.textContent = winner;
    }
    /*Borrowed function - Checks to see if the 4 elements are equal*/
    
    areEqual(x){
       var len = x.length;
       for (var i = 1; i< len; i++){
          if (x[i] === null || x[i] !== x[i-1])
             return false;
       }
       return true;
    }
  
      /*CHeck to see if winner. Possibly easier way this could have been achieved lol*/
    checkWinner(prev){
  
        let winner = this.winner;
      
      /*Push all values of the boxes into an array*/
        const allBoxesObjects = document.querySelectorAll('.box');
      var allBoxes = [];
      allBoxesObjects.forEach(function(currentBox){
          allBoxes.push(currentBox.textContent);
      });
  
          /*Convoluted way of checking to see if there is a winner or not*/
     
      this.areEqual([allBoxes[0], allBoxes[3],allBoxes[6],prev]);
      
      if(this.areEqual([allBoxes[0], allBoxes[3], allBoxes[6], prev])
      || this.areEqual([allBoxes[0], allBoxes[4], allBoxes[8], prev])
      || this.areEqual([allBoxes[0], allBoxes[1], allBoxes[2], prev])){
          winner = allBoxes[0];
      }
      else if(this.areEqual([allBoxes[3], allBoxes[4], allBoxes[5], prev])
      || this.areEqual([allBoxes[2], allBoxes[4], allBoxes[6], prev])){
          winner = allBoxes[4]
      }
      else if(this.areEqual([allBoxes[2], allBoxes[5], allBoxes[8], prev])
      || this.areEqual([allBoxes[6], allBoxes[7], allBoxes[8], prev]))
     {
          winner = allBoxes[8];
        }
      
      /*Check if board is full. If there is no winner, it's a draw!*/
         if(this.numElements == 9 && (winner == null)){
          this.draw();
        return null;
      }
      
      /*There's a winner*/
      if(winner != null){
          return winner;
      }
    }
    
    /*There is a winner! Update score, show overlay and allow user to restart*/
    declareWinner(){
      this.updateOverlayMessage(this.winner + ' is the winner!');
      
      this.updateScore();
      this.showOverlay();
    }
    
    /*There is a draw!*/
    draw(){
      this.updateOverlayMessage('Game ended in a draw. You are both winners (or losers)!');
      this.showOverlay();
    }
    
    /*Places element on board and check if there is a winner*/
    placeElement(e){
        /*Element already in grid!*/
      if(e.target.textContent != ''){
        return;
      }
        e.target.textContent = this.turn; //place element in grid
      this.numElements++;
      
      /*Update turn to reflect next player*/
      this.turn = this.turn == 'X' ? 'O' : 'X';
          let prev = this.turn == 'X' ? 'O' : 'X';
      
          this.updateBoardTurn();
      
      /*If winner, set. ELse, return null*/
      this.winner = this.checkWinner(prev);
      
      if(this.winner != null)
          this.declareWinner();
    }
    
    /*Should be run once in order to set event listeners.*/
    setElementListener(){
        var _this = this; /*Why is this needed? Does the scope of this change when in ohhh maybe it's becase this in the function is referring to the object?!*/
        const allBoxes = document.querySelectorAll('.box');
      allBoxes.forEach(function(currentBox){
          currentBox.addEventListener('click', function(e){
            _this.placeElement(e);
        });
      });
    }
  }
  
  const currentGame = new Game();
  
  /*Set listener for overlay(onpy done once)*/
  document.querySelector('#play_again').addEventListener('click', function(){
      currentGame.resetBoard();
    });
  
  /*Reset game before starting (just in case)*/
  currentGame.resetGame();
  currentGame.setElementListener();
  
  
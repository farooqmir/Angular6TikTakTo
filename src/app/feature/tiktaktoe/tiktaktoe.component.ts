import { Component, OnInit, Input } from '@angular/core';

/**
 * @interface Player
 */
interface Player {
  name: string;
  symbol: string;
}


/**
 * Cell Class
 * @class Square
 */
class Square {
  constructor(public index: number) {
  }
  player: Player;
}


@Component({
  selector: 'app-square',
  template: '<span>{{square?.player?.symbol}}</span>'
})

/**
 *Dumb component
 * @export
 * @class SquareComponent
 */
export class SquareComponent {
   @Input() square: Square;
}

/**
 *Main TikTakToe component
 *
 * @export
 * @class TiktaktoeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-tiktaktoe',
  templateUrl: './tiktaktoe.component.html',
  styleUrls: ['./tiktaktoe.component.css']
})


export class TiktaktoeComponent implements OnInit {
  players: Player[] = [
    {name: 'Player 1', symbol: 'X'},
    {name: 'Player 2', symbol: 'Y'}
  ];

  /**
   * current player
   */
  player: Player = this.players[0];

  selectCount: number = 0;
  /**
   * Sqaures to be drawn
   */
  squares: Square[] = [
    new Square(0),
    new Square(1),
    new Square(2),
    new Square(3),
    new Square(4),
    new Square(5),
    new Square(6),
    new Square(7),
    new Square(8)
  ];

  winningLine: number[];
  /**
   * Winning lines
   */
  lines: number[][] = [
       [0, 1, 2],
       [0, 4, 8],
       [0, 3, 6],
       [1, 4, 7],
       [2, 4, 6],
       [2, 5, 8],
       [3, 5, 4],
       [6, 7, 8]
  ];

 /**
  * change the turn
  */
  changePlayer() {

    if (!this.player) {
      this.player = this.players[1];
     } else if (this.player.symbol === 'X') {
      this.player = this.players[1];
     } else {
      this.player = this.players[0];
     }
  }

  isWinningCell(index) {
    if(this.player.isWinner)
    {
      console.log(index);
      console.log(this.winningLine);
      console.log((this.winningLine.indexOf(index)>0));
      return this.winningLine.indexOf(index)>=0;
    }
    return false;
  }

  /**
   * Check if we have a winner
   * @param index: cell index
   */
  isWinner(index) {
    let isWinner = false, line_ = [], sq=0;
    for (let line=0; line < this.lines.length; line++) {
       isWinner = false;
       line_ = this.lines[line];
       if (line_.indexOf(index) >= 0 ) {
        this.winningLine = [];
        for (sq = 0; sq < line_.length; sq++) {
           if (!this.squares[line_[sq]].player || (this.squares[line_[sq]].player.symbol !== this.player.symbol))
           {

             console.log(this.winningLine);
             break;
           }
           this.winningLine.push(line_[sq]);
        }
        isWinner = (sq === line_.length) ? true : false;
        if (isWinner) {
          return isWinner;
        }
      }
    }
       return isWinner;
  }

  /**
   * Checks the winner
   * @param index
   * @param square
   */
  checkWinner(index, square) {

    /* Lock the cell */
    if (this.squares[index].player || this.player.isWinner) {
      return;
    }

    this.selectCount++;

    /* set the cell player */
    this.squares[index].player = this.player;

    /* check if we have a winner */
    if(this.isWinner(index))
      this.player.isWinner= true;
    else
      this.changePlayer(); // change the player if we dont have  the winner

      if(this.selectCount==9 &&  !this.player.isWinner){
        this.player.noWinner = true;
      }
  }

  ngOnInit() {

  }

}

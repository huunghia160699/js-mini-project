const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// $("#js-select").onchange = (e) => {
//   tab = e.target.value;
//   if (tab === "calendar") {
//     calendar.start();
//   } else if (tab === "draggable slider tab") {
//     draggableSliderTab.start();
//   } else if (tab === "tic tac toe") {
//     ticTacToe.start();
//   }
// };

const calendar = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
  render() {
    $("#main").innerHTML = `
    <li id="calendar">
        <div class="header">
            <p class="month-year">September 2023</p>
            <div class="arrow">
            <div class="arrow-btn left" >
                <img src="./icon/arrow-small-left.svg" alt="" />
            </div>
            <div class="arrow-btn right" >
                <img src="./icon/arrow-small-right.svg" alt="" />
            </div>
            </div>
        </div>
        <ul class="weeks">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
        </ul>
        <ul class="days"></ul>

    </li>
    
      `;
  },
  renderCalendar() {
    let lastDateOfCurrentMonth = new Date(
      this.year,
      this.month + 1,
      0
    ).getDate();
    //ngày cuối tháng hiện tại
    let lastDateOfPreviousMonth = new Date(this.year, this.month, 0).getDate();
    //ngày cuối của tháng trước
    let lastDayOfPreviousMonth = new Date(this.year, this.month, 0).getDay();
    // thứ cuối của tháng trước
    let firstDayOfCurrentMonth = new Date(
      this.year,
      this.month + 1,
      1
    ).getDay();
    //thứ đầu của tháng sau
    let html = [];

    for (let i = lastDayOfPreviousMonth; i >= 0; i--) {
      html.push(`<li class="inactive">${lastDateOfPreviousMonth - i}</li>`);
    }
    for (let i = 1; i <= lastDateOfCurrentMonth; i++) {
      let isToday =
        i === new Date().getDate() &&
        this.month === new Date().getMonth() &&
        this.year === new Date().getFullYear();
      html.push(`<li class=${this.isToday ? "active" : ""}>${i}</li>`);
    }
    if (html.length < 35) {
      max = 14;
    } else {
      max = 7;
    }
    for (let i = firstDayOfCurrentMonth; i < max; i++) {
      html.push(`<li  class="inactive">${i - firstDayOfCurrentMonth + 1}</li>`);
    }

    $(".days").innerHTML = html.join("");
    $(".month-year").innerText = `${this.months[this.month]} ${this.year}`;
  },
  handleEvents() {
    $$(".arrow-btn").forEach((arrow) => {
      arrow.onclick = (e) => {
        this.month =
          e.target.closest(".arrow-btn").classList[1] === "left"
            ? this.month - 1
            : this.month + 1;
        if (this.month < 0) {
          this.year -= 1;
          this.month = 11;
        } else if (this.month > 11) {
          this.year += 1;
          this.month = 0;
        }
        this.renderCalendar();
      };
    });
  },
  start() {
    this.render();
    this.renderCalendar();
    this.handleEvents();
  },
};

const draggableSliderTab = {
  isDragging: false,

  render() {
    $("#main").innerHTML = `
            <li id="draggable-slider-tab">
      <div class="arrow hide" id="left">
        <img src="./icon/arrow-small-left.svg" alt="" />
      </div>
      <div class="arrow" id="right">
        <img src="./icon/arrow-small-right.svg" alt="" />
      </div>
      <ul>
        <li>Coding</li>
        <li>JavaScript</li>
        <li>adsgahadf</li>
        <li>dhdsfh</li>
        <li>hdfshds</li>
        <li>fsghfghfghfg</li>
        <li>Coding</li>
        <li>JavaScript</li>
        <li>Coding</li>
        <li>hdfshdfgsh</li>
        <li>Coding</li>
        <li>sdfgdsfgdfg</li>
        <li>sdhdfshsdh</li>
        <li>agadgdfgdfsgfd</li>
        <li>Coding</li>
        <li>JaagadfgfdgfdgvaScript</li>
      </ul>
    </li>
        
        `;
  },
  handleEvents() {
    const ul = $("#draggable-slider-tab ul");
    const arrows = $$("#draggable-slider-tab .arrow");
    ul.onmousemove = (e) => {
      isDragging && (ul.scrollLeft -= e.movementX);
      ul.classList.toggle("dragging", isDragging);
    };
    ul.onmousedown = () => (isDragging = true);
    document.onmouseup = () => {
      isDragging = false;
      ul.classList.toggle("dragging", isDragging);
    };
    ul.onscroll = () => {
      let value = ul.scrollLeft;
      arrows[0].classList.toggle("hide", !value > 0);
      arrows[1].classList.toggle(
        "hide",
        value == ul.scrollWidth - ul.clientWidth
      );
      //
    };
    arrows.forEach((arrow) => {
      arrow.onclick = (e) => {
        let el = e.target.closest(".arrow").id;
        ul.scrollLeft +=
          el === "left" ? -ul.scrollWidth / 5 : ul.scrollWidth / 5;
      };
    });
  },
  start() {
    this.render();
    this.handleEvents();
  },
};

const ticTacToe = {
  human: "x",
  AI: "o",
  aiTurn: false,
  winCells: [],
  gameBoard: [],
  cells: null,
  isGameWin: null,
  winCombo: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ],

  renderStart() {
    //
    $("#main").innerHTML = `
    <li id="tic-tac-toe">
        <div class="play-game">
          <div class="play-turn">
            <span id="x-turn"><i class='fa-solid fa-xmark'></i></span>
            <span id="o-turn"><i class='fa-solid fa-o'></i></span>
            <div id="slider"></div>
          </div>
          <ul class="play-board">
            <li id="0"></li>
            <li id="1"></li>
            <li id="2"></li>
            <li id="3"></li>
            <li id="4"></li>
            <li id="5"></li>
            <li id="6"></li>
            <li id="7"></li>
            <li id="8"></li>
          </ul>
        </div>

        <div class="end-game">
          <p></p>
          <button id="replay">Replay</button>
        </div>
      </li>
        `;
  },

  handleEvents() {
    $("#replay").onclick = (e) => {
      // this.replay();
      this.aiTurn = false;
      this.gameBoard = [];
      this.isGameWin = false;
      $(".end-game").classList.remove("show");
      $(".play-turn").classList.toggle("o", this.aiTurn);
      this.cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove("active");
      });
      this.startGame();
    };
    $(".play-board").onclick = (e) => {
      if (e.target === $(".play-board")) return;
      if (typeof this.gameBoard[e.target.id] !== "number") return;
      // aiTurn = false -> người
      // aiTurn = true -> máy
      if (!this.aiTurn) {
        this.clickSpot(e.target.id, this.human);
        this.aiTurn = !this.aiTurn;
        setTimeout(() => {
          if (!this.checkWin(this.gameBoard, this.human) && !this.checkTie()) {
            this.clickSpot(this.bestMove(), this.AI);
            this.aiTurn = !this.aiTurn;
          }
        }, 500);
      }
    };
  },
  startGame() {
    //
    this.cells = $$(".play-board li");
    this.gameBoard = Array.from(Array(9).keys());
  },

  clickSpot(cellId, player) {
    //
    // thay x/o vào mảng kết quả
    this.gameBoard[cellId] = player;
    // điền x/o vào ô chọn
    let icon =
      player === "o"
        ? "<i class='fa-solid fa-o'></i>"
        : "<i class='fa-solid fa-xmark'></i>";
    this.cells[parseInt(cellId)].innerHTML = icon;
    //đổi người chơi

    $(".play-turn").classList.toggle("o", this.aiTurn);

    // kiểm tra thắng
    let gameWin = this.checkWin(this.gameBoard, player);
    gameWin && this.gameOver(gameWin);
  },
  checkWin(board, player) {
    //
    let plays = board.reduce(
      (prev, cur, index) => (cur === player ? prev.concat(index) : prev),
      []
    );
    let gameWin = null;
    // lặp qua từng wincombo
    for (let [index, win] of this.winCombo.entries()) {
      // nếu plays chứa đủ win
      if (win.every((elem) => plays.includes(elem))) {
        gameWin = { index: index, player: player };
      }
    }
    return gameWin;
  },
  checkTie() {
    if (this.availableMoves().length == 0) {
      this.gameOver({ index: -1, player: "tie" });
      return true;
    }
    return false;
  },

  gameOver(gameWin) {
    //
    player = gameWin.player;
    for (let i of this.winCombo[gameWin.index]) {
      this.cells[i].classList.add("active");
    }
    // for (var i = 0; i < this.cells.length; i++) {
    //   this.cells[i].removeEventListener("click", this.turnClick, false);
    // }
    $(".end-game").classList.add("show");
    $(".end-game p").innerText = `${
      player === "tie" ? "Hòa" : player === "x" ? "Người thắng" : "Nonnnnnn"
    }`;
  },
  availableMoves() {
    //
    return this.gameBoard.filter((move) => typeof move == "number");
  },
  bestMove() {
    //
    return this.minimax(this.gameBoard, this.AI, 0).index;
  },
  minimax(newBoard, player, depth) {
    //
    let a = -10 + depth,
      b = 10 + depth;
    let availMoves = this.availableMoves();
    if (this.checkWin(newBoard, this.human)) {
      return { score: a };
    } else if (this.checkWin(newBoard, this.AI)) {
      return { score: b };
    } else if (availMoves.length === 0) {
      return { score: 0 };
    }
    // kiểm tra nước đi
    var moves = [];
    for (let i = 0; i < availMoves.length; i++) {
      //
      var move = {};
      move.index = newBoard[availMoves[i]];
      newBoard[availMoves[i]] = player; // đánh thử ô trống i
      if (player == this.AI) {
        var result = this.minimax(newBoard, this.human, depth - 1);
        move.score = result.score;
      } else {
        var result = this.minimax(newBoard, this.AI, depth - 1);
        move.score = result.score;
      }
      newBoard[availMoves[i]] = move.index; // bỏ đánh thử ô trống i

      moves.push(move);
    }
    //

    var bMove;
    if (player == this.AI) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bMove = i;
        }
      }
    }
    //
    // console.log(moves[bMove]);
    return moves[bMove];
  },
  start() {
    this.renderStart();
    this.startGame();
    this.handleEvents();
  },
};
ticTacToe.start();

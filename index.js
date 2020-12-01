window.onload = function () {
    //Local variables
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('.score');
    const resultDisplay = document.getElementById('result');
    const resultMessage = document.getElementById('result-Message');
    window.localStorage.setItem('Score',0);
    const width = 4;
    let squares = [];
    let score = 0;

    //Creating playing board
    function creatBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }

        console.log(squares);
        generateNumber();
        generateNumber();
        //Setting High score using local storage value
        document.querySelector('.Last-score').innerHTML =`High Score ${parseInt(window.localStorage.getItem('HighScore'))}`;
    }

    creatBoard();

    //Generate an number 
    function generateNumber() {
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            checkOver();
        } else {
            generateNumber()
        }
    }


    // swipe right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                //parse value into int and put into an array
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                
                // filter any new value
                let filterRow = row.filter(num => num)
                // check missing values
                let missing = 4 - filterRow.length
                // fill missing values with 0
                let zeros = Array(missing).fill(0);

                let newRow = zeros.concat(filterRow);
                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }


    // Swipe Left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 == 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                
                let filterRow = row.filter(num => num)
                let missing = 4 - filterRow.length
                let zeros = Array(missing).fill(0);
                let newRow = filterRow.concat(zeros);
                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }


    //Swipe Down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filterColumn = column.filter(num => num);
            let missing = 4 - filterColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filterColumn);

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]
        }
    }

    //Swipe Up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filterColumn = column.filter(num => num);
            let missing = 4 - filterColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filterColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]
        }
    }



    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);

                // setTimeout(() => {
                //     squares[i].classList = 'combined'
                //     squares[i+1].classList = 'combined'
                // }, 1000);
                // squares[i].classList.remove('combined')
                // squares[i+1].classList.remove('combined')

                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML =`Score: ${score}`;
            }
        }
        check(score);
    }


    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);

                    // setTimeout(() => {
                    //     squares[i].classList = 'combined'
                    //     squares[i+width].classList = 'combined'
                    // }, 1000);
                    // squares[i].classList.remove('combined')
                    // squares[i+width].classList.remove('combined')

                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML =`Score: ${score}`;
            }
        }
        check(score);
    }

    document.addEventListener('keyup', control)

    //Assign keyboard
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }


    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generateNumber();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generateNumber();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generateNumber();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generateNumber();
    }


    //checkOut win
    function check(score) {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] == 2048) {
                resultDisplay.innerHTML = `You Win!!`
                document.removeEventListener('keyup', control)
            }
        }
        //Get score and stored it into local storage
        window.localStorage.setItem('Score',score);
        //Comparing two key of local storage to set high score
        if(parseInt(localStorage.getItem('Score')) >= parseInt(localStorage.getItem('HighScore')))
        {
            window.localStorage.setItem('HighScore',parseInt(localStorage.getItem('Score')))
            document.querySelector('.Last-score').innerHTML =`High Score ${parseInt(localStorage.getItem('Score'))}`
        }
    }
    //check over
    function checkOver() {
        //Checking how many zeros are available
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++
            }
        }
        //Checking condition of 0 zeros
        if (zeros === 0) {
            resultDisplay.classList.toggle('display');
            resultMessage.innerHTML = `You Loss!!`
            document.removeEventListener('keyup', control)
            window.localStorage.setItem('Score',0);
            document.querySelector('.btn-reset').addEventListener('click',reset)
        }
    }
    
    //Reset
    function reset(){
        location.reload();
    }

}






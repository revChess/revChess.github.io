/*
 * render.js
 * (c) 2023 rheild
 *
 * THIS ONLY WORKS WITH RENDERING VISUALLY
 * IT DOES NOT THINK
 */

let boardSize;
let squareSize;
function updateBoardSize() {
    const size = CHESS_BOARD.clientWidth;
    boardSize = size;
    squareSize = size / 8;
}
updateBoardSize();

function renderFen() {
    // this completely re-renders everything
    // so it should be used with a new FEN, not a single move

    updateBoardSize();
    $.removeChildren(CHESS_BOARD);

    const board = reviewer.board();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const currentSquare = board[i][j];

            if (currentSquare !== null) {
                const imgSrc = CHESS_PIECES_PATH + currentSquare.color + 
                    currentSquare.type.toUpperCase() + '.svg';

                const column = chessColumns.indexOf(currentSquare.square[0]);
                const row = chessRows.indexOf(currentSquare.square[1]);
                const imgStyle = `transform: translate(${column*squareSize+.05}px, ${row*squareSize}px)`;

                const piece = $.createElement(
                    'img',
                    {
                        ['class']: 'chess-piece',
                        ['src']: imgSrc,
                        ['piece-square']: currentSquare.square,
                        ['style']: imgStyle,
                    }
                );

                CHESS_BOARD.appendChild(piece);
            }
        }
    }
}
renderFen();

// the 'transform: translate()' styling only works for a given board size
// if the window is resized, everything should be re-rendered
window.addEventListener('resize', renderFen);

function renderMove(color, oldSquare, newSquare, infoObj={isCapture:false, isPromotion:false}) {
    // infoObj.isCapture
    // infoObj.captureSquare
    // infoObj.isPromotion
    // infoObj.promotionPiece

    // this is where the 'piece-square' attribute comes in
    // it makes it much easier to select a piece on a given square
    const pieceToMove = $(`[piece-square=${oldSquare}]`)[0];

    if (infoObj.isCapture) {
        // captureSquare is usually newSquare
        // but not when there is en passant
        // so this is necessary
        $(`[piece-square=${infoObj.captureSquare}]`)[0].remove();
    }

    if (infoObj.isPromotion) {
        pieceToMove.remove();

        const imgSrc = CHESS_PIECES_PATH + 
            color + 
            infoObj.promotionPiece.toUpperCase() + 
            '.svg';

        const column = chessColumns.indexOf(newSquare[0]);
        const row = chessRows.indexOf(newSquare[1]);
        const imgStyle = `transform: translate(${column*squareSize+.05}px, ${row*squareSize}px)`;

        const piece = $.createElement(
            'img',
            {
                ['class']: 'chess-piece',
                ['src']: imgSrc,
                ['piece-square']: newSquare,
                ['style']: imgStyle,
            }
        );

        CHESS_BOARD.appendChild(piece);
    } else {
        pieceToMove.setAttribute('piece-square', newSquare);

        const column = chessColumns.indexOf(newSquare[0]);
        const row = chessRows.indexOf(newSquare[1]);
        const imgStyle = `transform: translate(${column*squareSize+.05}px, ${row*squareSize}px)`;
        pieceToMove.setAttribute('style', imgStyle);
    }
}

function flipPerspective() {
    // this makes renderFen() and renderMove() basically flip the board
    chessColumns.reverse();
    chessRows.reverse();
    renderFen();
}
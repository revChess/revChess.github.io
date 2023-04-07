// 0 for opening training
// 1 for position training
const TRAINING_MODE = 0;
const CHESS_BOARD = $('#chess-board');
const CHESS_PIECES_PATH = './staunty/';

const REVIEW_BTN = $('#btn-review');
const LEARN_BTN = $('#btn-learn');
const MANAGE_BTN = $('#btn-manage');
const SETTINGS_BTN = $('#btn-settings');

const REVIEW_ASIDE = $('#aside-review');
const LEARN_ASIDE = $('#aside-learn');
const MANAGE_ASIDE = $('#aside-manage');
const SETTINGS_ASIDE = $('#aside-settings');

const POPUP_OVERLAY = $('#transparent-overlay');

const reviewer = new Chess();

let chessColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let chessRows = ['8', '7', '6', '5', '4', '3', '2', '1'];
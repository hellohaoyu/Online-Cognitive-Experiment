function init() {
    debug = new Debug(); // TODO: convert to singleton to eliminate global variable.
    new Game(3);
    //prequestion();
    document.body.style.backgroundColor = 'white !important';

}

window.addEventListener('load', init, false);
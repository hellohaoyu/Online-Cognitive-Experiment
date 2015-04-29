function init() {
    debug = new Debug(); // TODO: convert to singleton to eliminate global variable.
    new Game(3);
    //prequestion();

}

window.addEventListener('load', init, false);
const images = [window.sprite['arrow'], window.sprite['shot']]

PIXI.loader
    .add(images)
    .load(setup);

function setup() {
    let newGame = new Editor(window.innerWidth, window.innerHeight);
}
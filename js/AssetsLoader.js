const images = ['complete', window.sprite.complete]

PIXI.loader
    .add(images)
    .load(setup);

function setup() {
    let newGame = new Editor(window.innerWidth, window.innerHeight);
}
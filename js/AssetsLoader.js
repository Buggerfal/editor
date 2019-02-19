const images = ['complete', window.sprite.complete]

PIXI.loader
    .add(images)
    .load(setup);

function setup() {
    const w = +prompt('Enter width size in pixels');
    const h = +prompt('Enter height size in pixels');
    
    let newGame = new Editor(w, h);
}
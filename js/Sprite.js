class Sprite {
    constructor() {
        this.defaultOptions = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            interactive: false
        }
    }

    createSprite(options) {
        const finalOptions = Object.assign(this.defaultOptions, options);

        const sprite = PIXI.Sprite.fromImage(window.sprite.complete);

        sprite.anchor.set(0.5);
        sprite.width = finalOptions.width;
        sprite.height = finalOptions.height;
        sprite.x = finalOptions.x;
        sprite.y = finalOptions.y;
        sprite.interactive = finalOptions.interactive;

        return sprite;
    }

    drawButton(width, height) {
        var graphics = new PIXI.Graphics()
            .beginFill(0x005577, 1)
            .drawRect(0, -1, width, height)
            .endFill();

        return graphics;
    }

    drawText(text) {
        var text = new PIXI.Text(text);
        text.anchor.set(0.5);

        return text;
    }
}
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

    createSprite(options, name) {
        const finalOptions = Object.assign(this.defaultOptions, options);

        const sprite = PIXI.Sprite.fromImage(name);

        sprite.anchor.set(0.5);
        sprite.width = finalOptions.width;
        sprite.height = finalOptions.height;
        sprite.x = finalOptions.x;
        sprite.y = finalOptions.y;
        sprite.interactive = finalOptions.interactive;

        return sprite;
    }

    drawButton(width, height, text) {
        var graphics = new PIXI.Graphics()
            .beginFill(0xFFFFFF, 1)
            .drawRect(0, -1, width, height)
            .endFill();

        graphics.tint = 0x0000FF;
        graphics.interactive = true;

        var text = this.drawText(text);

        text.x = graphics.width / 2;
        text.y = graphics.height / 2;

        graphics.addChild(text);

        return graphics;
    }

    drawText(text) {
        var text = new PIXI.Text(text);
        text.anchor.set(0.5);

        return text;
    }
}
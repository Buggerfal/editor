class Circle extends PIXI.Graphics {
    constructor(radius, color) {
        super();

        this.sprite = null;
        this.flag = null;

        this.isActive = false;

        this.radius = radius;
        this.color = color || 0x005577;
        this.addSprite(this.radius);
        this.addFlag(this.radius);

        this.on('pointerdown', this.activate, this);
    }

    addSprite(radius) {
        this.sprite = new PIXI.Graphics()
            .lineStyle(Math.max(1, Math.round(radius * 0.1)))
            .beginFill(0x005577, 1)
            .drawCircle(0, 0, radius)
            .endFill();

        this.addChild(this.sprite);
    }

    addFlag(radius) {
        this.flag = new PIXI.Graphics()
            .lineStyle(4, 0xffd900, 1)
            .beginFill(0x005577, 1)
            .drawCircle(0, 0, 10)
            .endFill();

        this.addChild(this.flag);

        this.flag.visible = false;
    }

    chandeRadius(rad) {
        this.sprite.clear();
        this.addSprite(rad);
    }

    activate() {
        console.log(4444, this.isActive)
        if (!this.isActive) {
            return;
        }
        console.log(this.isActive)
        this.flag.visible = true;
    }

    deActivate() {
        this.flag.visible = false;
    }
}
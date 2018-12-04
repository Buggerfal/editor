class Circle extends PIXI.Graphics {
    constructor(radius, color) {
        super();
        PIXI.Graphics.call(this);

        this.radius = radius;
        this.color = color || 0x005577;
        this.addSprite();
        // this.addSprite();        
    }

    addSprite() {
        this
            .lineStyle(Math.max(1, Math.round(this.radius * 0.1)))
            .beginFill(0x005577, 1)
            .drawCircle(0, 0, this.radius)
            .endFill();

        this.addEvents();
    }

    addEvents() {
        this.on('pointerdown', () => {
            console.log(3);
        }, this);
    }
}
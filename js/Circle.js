class Circle {
    constructor() {
        // this.x = x;
        // this.y = y;

        this.drawCircle();
    }

    drawCircle() {
        this.graphics = new PIXI.Graphics()
            .lineStyle(10)
            .beginFill(0x005577, 1)
            .drawCircle(100, 100, 60)
            .endFill();

        return this.graphics;
    }
}
class Circle extends PIXI.Graphics {
    constructor() {
        super();

        this.sprite = null;
        this.flag = null;

        this.isActive = false;

        this.radius = CONFIG.circleRaius;
        this.backColor = CONFIG.circleColor;
        this.lineWidth = CONFIG.circleLineWidth;
        this.lineColor = CONFIG.circleLineColor;
        console.log('1')
        this.addSprite(this.radius);
        this.addFlag(this.radius);
    }

    addSprite() {
        this.sprite = new PIXI.Graphics()
            .lineStyle(this.lineWidth, this.lineColor, 1)
            .beginFill(this.backColor, 1)
            .drawCircle(0, 0, this.radius)
            .endFill();

        this.addChild(this.sprite);
    }

    addFlag() {
        this.flag = new PIXI.Graphics()
            .lineStyle(this.lineWidth, 0xffffff, 1)
            .beginFill(this.backColor, 1)
            .drawCircle(0, 0, 10)
            .endFill();

        this.addChild(this.flag);

        this.flag.visible = false;
    }

    chandeRadius(rad, state) {
        this.radius += -rad * state;

        this.clear();
    }

    chandeLineWidth(width, state) {
        this.lineWidth += -width * state;

        this.clear();
    }

    activate() {
        this.isActive = true;
        this.flag.visible = true;
    }

    deActivate() {
        this.isActive = false;
        this.flag.visible = false;
    }

    changeLineColor(color) {
        var col = color.slice(1, 7)
        this.lineColor = '0x' + col;

        this.clear();
    }

    changeBackColor(color) {
        var col = color.slice(1, 7)
        this.backColor = '0x' + col;

        this.clear();
    }

    clear() {
        this.sprite.clear();
        this.flag.clear();

        this.addSprite();
        this.addFlag();

        this.flag.visible = true;
    }
}
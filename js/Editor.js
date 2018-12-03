const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Editor extends Sprite {
    constructor(width, height) {
        super();

        this.app = null;
        this.width = width;
        this.height = height;
        this.initApp(width, height);
        this.drawButtons();
    }

    initApp() {
        this.app = new PIXI.Application(this.width, this.height, { backgroundColor: 0x1099bb });
        document.body.appendChild(this.app.view);
    }

    drawButtons() {
        var self = this
        this.btnAddCircle = this.drawButton(200, 50);
        this.app.stage.addChild(this.btnAddCircle);
        this.btnAddCircle.x = 100;
        this.btnAddCircle.y = 100;

        this.btnAddCircle.interactive = true;

        this.btnAddCircle.on('pointerdown', function() {
            this.drawCircle();
        }, this);

        var btnCircleText = this.drawText('ADD CIRCLE');

        btnCircleText.x = this.btnAddCircle.width / 2;
        btnCircleText.y = this.btnAddCircle.height / 2;

        this.btnAddCircle.addChild(btnCircleText);
    }

    drawCircle() {
        let circle = new PIXI.Graphics()
            .lineStyle(1)
            .beginFill(0x005577, 1)
            .drawCircle(0, 0, 60)
            .endFill();

        circle.x = this.width / 2;
        circle.y = this.height / 2;

        circle.interactive = true;

        this.app.stage.addChild(circle);

        let fix = circle.addChild(new PIXI.Graphics()
            .beginFill(0x005577, 1)
            .drawRect(-10, -10, 10, 10)
            .endFill());

        fix.x = circle.width / 2;
        fix.y = circle.height / 2;

        circle.on('pointerdown', this.activate, circle);
        fix.on('pointerdown', this.drag, fix);
    }

    drag() {
        console.log(this);
    }

    activate() {
        if (this.isActive) {
            this.clear();
            this.lineStyle(1)
                .beginFill(0x005577, 1)
                .drawCircle(0, 0, 60)
                .endFill();
            this.isActive = false;


            return;
        }

        this.isActive = true;

        this.clear();
        this.lineStyle(1)
            .beginFill(0x000077, 1)
            .drawCircle(0, 0, 60)
            .endFill();
    }

}
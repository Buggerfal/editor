const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Editor extends Sprite {
    constructor(width, height) {
        super();

        this.app = null;

        this.btnAddCircle = null;
        this.btnCircleText = null;
        this.buttonRadius = null;

        this.btnCircleMove = null;
        this.btnMoveText = null;
        this.btnComplete = null;

        this.width = width;
        this.height = height;

        this.isMovingMode = false;
        this.isChangeRadiusMode = false;

        this.circles = [];
        this.initApp(width, height);
        this.drawButtons();
    }

    initApp() {
        this.app = new PIXI.Application(this.width, this.height, { backgroundColor: 0x1099bb });
        document.body.appendChild(this.app.view);
    }

    addBtnComplete() {
        this.btnComplete = this.createSprite({
            width: 100,
            height: 100,
            x: this.width - 100,
            y: 100,
            interactive: true
        }, window.sprite.complete);

        this.btnComplete.visible = false;
        this.app.stage.addChild(this.btnComplete);

        this.btnComplete.on('pointerdown', this.resetEvents, this);
    }

    resetEvents() {
        this.btnComplete.visible = false;
        this.isChangeRadiusMode = false;
        this.btnAddCircle.interactive = true;
        this.buttonRadius.interactive = true;


        this.circles.forEach((el) => {
            el.off("pointerdown", this.onShapeMoveStart);
            el.off("pointerdown", this.onShapeMove);
            el.off("pointermove", this.onShapeMove);
            el.off("pointerup", this.onShapeMoveEnd);
            el.off("pointerupoutside", this.onShapeMoveEnd);
            el.interactive = true;
        });
    }

    drawCircle() {
        var circle = this.app.stage.addChild(new Circle(60, 255));
        circle.position.set(this.width / 2, this.height / 2);
        circle.on('pointerdown', () => {
            console.log(this)
            if (this.isChangeRadiusMode) {
                circle.isActive = true;
                circle.activate();
                // this.activation(circle);
            }
        }, this);
        circle.interactive = true;

        this.circles.push(circle);
    }


    // activation(obj) {
    //     console.log(obj)
    //     if (this.isChangeRadiusMode) {
    //         obj.isActive = true;
    //         obj.activate();
    //     }
    // }

    drawButtons() {
        this.btnCircle();
        this.btnMove();
        this.addBtnComplete();
        this.btnChangeRadius();
    }

    btnCircle() {
        var self = this;

        this.btnAddCircle = this.drawButton(200, 50);
        this.btnAddCircle.x = 0;
        this.btnAddCircle.y = 0;

        this.btnAddCircle.interactive = true;

        this.btnAddCircle.on('pointerdown', function() {
            this.drawCircle();
        }, this);

        var btnCircleText = this.drawText('ADD CIRCLE');

        btnCircleText.x = this.btnAddCircle.width / 2;
        btnCircleText.y = this.btnAddCircle.height / 2;

        this.app.stage.addChild(this.btnAddCircle);
        this.btnAddCircle.addChild(btnCircleText);
    }

    btnMove() {
        this.btnCircleMove = this.drawButton(200, 50);
        this.btnCircleMove.x = 205;
        this.btnCircleMove.y = 0;

        this.btnCircleMove.interactive = true;

        this.btnCircleMove.on('pointerdown', this.subscribeShapesMove, this);

        var btnMoveText = this.drawText('MOVE');

        btnMoveText.x = this.btnCircleMove.width / 2;
        btnMoveText.y = this.btnCircleMove.height / 2;

        this.app.stage.addChild(this.btnCircleMove);
        this.btnCircleMove.addChild(btnMoveText);
    }

    btnChangeRadius() {
        this.buttonRadius = this.drawButton(200, 50);
        this.buttonRadius.x = 410;
        this.buttonRadius.y = 0;
        this.buttonRadius.interactive = true;
        this.buttonRadius.on('pointerdown', this.onBtn, this);

        var btnRadiusText = this.drawText('CHANGE');
        btnRadiusText.x = this.buttonRadius.width / 2;
        btnRadiusText.y = this.buttonRadius.height / 2;

        this.radiusPlus = this.drawButton(20, 20);
        this.radiusPlus.x = 620;
        this.radiusPlus.y = 0;
        this.radiusPlus.interactive = true;

        this.radiusPlus.on('pointerdown', this.changeRadius(100), this);

        var radiusPlusText = this.drawText('+');
        radiusPlusText.x = this.radiusPlus.width / 2;
        radiusPlusText.y = this.radiusPlus.height / 2;

        this.radiusMinus = this.drawButton(20, 20);
        this.radiusMinus.x = 620;
        this.radiusMinus.y = 30;
        this.radiusMinus.interactive = true;

        this.radiusMinus.on('pointerdown', this.changeRadius(50), this);

        var radiusMinusText = this.drawText('-');
        radiusMinusText.x = this.radiusMinus.width / 2;
        radiusMinusText.y = this.radiusMinus.height / 2;

        this.app.stage.addChild(this.buttonRadius);
        this.app.stage.addChild(this.radiusPlus);
        this.app.stage.addChild(this.radiusMinus);

        this.buttonRadius.addChild(btnRadiusText);
        this.radiusPlus.addChild(radiusPlusText);
        this.radiusMinus.addChild(radiusMinusText);
    }

    changeRadius(radius) {
        this.circles.forEach((el) => {
            if (el.isActive) {
                el.chandeRadius(radius);
            }
        });
    }

    onBtn() {
        this.isChangeRadiusMode = true;
        this.radiusMinus.interactive = true;
        this.radiusPlus.interactive = true;
        this.btnComplete.visible = true;
    }

    subscribeShapesMove() {
        this.btnComplete.visible = true;
        this.btnAddCircle.interactive = false;

        this.circles.forEach((el) => {
            el.on("pointerdown", this.onShapeMoveStart);
            el.on("pointerdown", this.onShapeMove);
            el.on("pointermove", this.onShapeMove);
            el.on("pointerup", this.onShapeMoveEnd);
            el.on("pointerupoutside", this.onShapeMoveEnd);
            el.interactive = true;
        });
    }

    onShapeMoveStart(event) {
        this.isMovingMode = true;
        this.moveOffset = event.data.getLocalPosition(this);
        this.moveOffset.x = Math.floor(this.moveOffset.x * this.scale.x);
        this.moveOffset.y = Math.floor(this.moveOffset.y * this.scale.y);
    }

    onShapeMove(event) {
        if (!this.isMovingMode) { return };

        var point = event.data.getLocalPosition(this.parent);

        point.x = Math.floor(point.x);
        point.y = Math.floor(point.y);

        this.position.set(point.x - this.moveOffset.x, point.y - this.moveOffset.y);
    }

    onShapeMoveEnd(event) {
        this.isMovingMode = false;
        this.moveOffset = { x: 0, y: 0 };
    };
}
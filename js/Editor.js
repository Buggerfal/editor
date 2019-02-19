const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Editor extends Sprite {
    constructor(width, height) {
        super();

        this.app = null;

        this.btnAddCircle = null;
        this.buttonRadius = null;
        this.btnCircleMove = null;

        this.btnCircleText = null;
        this.btnMoveText = null;
        this.btnComplete = null;

        this.width = width;
        this.height = height;

        this.isMovingMode = false;
        this.isChangeRadiusMode = false;
        this.color = "#" + parseInt(0xffffff).toString(16);

        this.buttons = [];
        this.circles = [];

        this.initApp(width, height);
        this.drawButtons();
    }

    initApp() {
        this.app = new PIXI.Application(this.width, this.height, {
            backgroundColor: 0x1099bb
        });
        document.body.appendChild(this.app.view);
    }

    drawButtons() {
        this.btnCircle();
        this.btnMove();
        this.addBtnComplete();
    }

    btnCircle() {
        this.btnAddCircle = this.drawButton(200, 50, 'ADD POINT');
        this.btnAddCircle.x = 0;
        this.btnAddCircle.y = 0;

        this.btnAddCircle.on('pointerdown', function() {
            this.drawCircle();
        }, this);

        this.app.stage.addChild(this.btnAddCircle);

        this.buttons.push(this.btnAddCircle);
    }

    btnMove() {
        this.btnCircleMove = this.drawButton(200, 50, 'MOVE');
        this.btnCircleMove.x = 205;
        this.btnCircleMove.y = 0;

        this.btnCircleMove.on('pointerdown', this.subscribeShapesMove, this);

        this.app.stage.addChild(this.btnCircleMove);

        this.buttons.push(this.btnCircleMove);
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

    drawCircle() {
        var circle = this.app.stage.addChild(new Circle());

        circle.position.set(this.width / 2, this.height / 2);
        circle.on('pointerdown', this.turnOnBackLight.bind(this, circle));
        circle.interactive = true;

        this.circles.push(circle);
    }

    resetEvents() {
        this.resetBackLights();

        this.btnComplete.visible = false;
        // this.isChangeRadiusMode = false;
        this.btnAddCircle.interactive = true;

        this.circles.forEach((el) => {
            if (el.isActive) {
                el.deActivate();
            }
        });

        this.circles.forEach((el) => {
            el.off("pointerdown", this.onShapeMoveStart);
            el.off("pointerdown", this.onShapeMove);
            el.off("pointermove", this.onShapeMove);
            el.off("pointerup", this.onShapeMoveEnd);
            el.off("pointerupoutside", this.onShapeMoveEnd);
            el.interactive = true;
        });
    }

    turnOnBackLight(obj) {
        if (this.isChangeRadiusMode) {
            obj.activate();
        }
    }

    activateBtn() {
        this.obj.tint = 0x0000FF;
    }

    enableRadiusMode() {
        this.isChangeRadiusMode = true;
        this.radiusMinus.interactive = true;
        this.radiusPlus.interactive = true;
        this.btnComplete.visible = true;
        this.isMovingMode = false;

        this.resetBackLights();
        this.enableBackLight(this.buttonRadius);
    }

    enableBackLight(obj) {
        obj.tint = 0xA52A2A;
    }

    resetBackLights() {
        this.buttons.forEach(el => {
            el.tint = 0x0000FF;
        });
    }

    subscribeShapesMove() {
        this.btnComplete.visible = true;
        this.btnAddCircle.interactive = false;
        this.isChangeRadiusMode = false;

        this.resetBackLights();
        this.enableBackLight(this.btnCircleMove);

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
        if (!this.isMovingMode) {
            return
        };

        var point = event.data.getLocalPosition(this.parent);

        point.x = Math.floor(point.x);
        point.y = Math.floor(point.y);

        this.position.set(point.x - this.moveOffset.x, point.y - this.moveOffset.y);
    }

    onShapeMoveEnd() {
        this.isMovingMode = false;
        this.moveOffset = {
            x: 0,
            y: 0
        };
    };
}
   
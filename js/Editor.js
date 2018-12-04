const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Editor extends Sprite {
    constructor(width, height) {
        super();

        this.app = null;

        this.btnAddCircle = null;
        this.btnCircleText = null;

        this.btnCircleMove = null;
        this.btnMoveText = null;
        this.btnComplete = null;

        this.width = width;
        this.height = height;

        this.isMoving = false;

        this.circles = [];
        this.initApp(width, height);
        this.drawButtons();
        this.addBtnComplete();
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
        });

        this.btnComplete.visible = false;
        this.app.stage.addChild(this.btnComplete);

        this.btnComplete.on('pointerdown', this.resetEvents, this);
    }

    resetEvents() {
        this.btnComplete.visible = false;
        this.btnAddCircle.interactive = true;

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

        this.circles.push(circle);
    }

    drawButtons() {
        this.btnCircle();
        this.btnMove();
    }

    btnCircle() {
        var self = this;

        this.btnAddCircle = this.drawButton(200, 50);
        this.btnAddCircle.x = 100;
        this.btnAddCircle.y = 100;

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
        this.btnCircleMove.x = 400;
        this.btnCircleMove.y = 100;

        this.btnCircleMove.interactive = true;

        this.btnCircleMove.on('pointerdown', this.subscribeShapesMove, this);

        var btnMoveText = this.drawText('MOVE');

        btnMoveText.x = this.btnCircleMove.width / 2;
        btnMoveText.y = this.btnCircleMove.height / 2;

        this.app.stage.addChild(this.btnCircleMove);
        this.btnCircleMove.addChild(btnMoveText);
    }

    subscribeShapesMove() {
        this.btnComplete.visible = true;
        this.btnAddCircle.interactive = false;

        this.circles.forEach((el) => {
            el.off("pointerdown", this.onShapeMoveStart);
            el.off("pointerdown", this.onShapeMove);
            el.off("pointermove", this.onShapeMove);
            el.off("pointerup", this.onShapeMoveEnd);
            el.off("pointerupoutside", this.onShapeMoveEnd);
            el.interactive = true;
        });
    }

    onShapeMoveStart(event) {
        this.isMoving = true;
        this.moveOffset = event.data.getLocalPosition(this);
        this.moveOffset.x = Math.floor(this.moveOffset.x * this.scale.x);
        this.moveOffset.y = Math.floor(this.moveOffset.y * this.scale.y);
    }

    onShapeMove(event) {
        if (!this.isMoving) { return };

        var point = event.data.getLocalPosition(this.parent);

        point.x = Math.floor(point.x);
        point.y = Math.floor(point.y);

        this.position.set(point.x - this.moveOffset.x, point.y - this.moveOffset.y);
    }

    onShapeMoveEnd(event) {
        this.isMoving = false;
        this.moveOffset = { x: 0, y: 0 };
    };
}
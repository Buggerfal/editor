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
        this.circleRadius();
        this.addBtnComplete();

        this.vue();
    }

    btnCircle() {
        this.btnAddCircle = this.drawButton(200, 50, 'ADD CIRCLE');
        this.btnAddCircle.x = 0;
        this.btnAddCircle.y = 0;

        this.btnAddCircle.on('pointerdown', function() {
            this.drawCircle();
        }, this);

        this.app.stage.addChild(this.btnAddCircle);

        this.buttons.push(this.btnAddCircle);
    }

    vue() {
        var editor = this;

        this.ui = new Vue({
            el: '#level-editor',
            data: {
                color: editor.color
            },
            methods: {
                onColorChange: function() {
                    this.editor.color = this.color;
                }
            },
            template: '<span>' +
                '<input type="color" @change="onColorChange"  value="#0000ff" v-model="color" />' +
                '</span>',
        });

        document.getElementById("test").style.display = "none"; // hide display
        document.getElementById("test").style.display = "initial"; // show display
    }

    btnMove() {
        this.btnCircleMove = this.drawButton(200, 50, 'MOVE');
        this.btnCircleMove.x = 205;
        this.btnCircleMove.y = 0;

        this.btnCircleMove.on('pointerdown', this.subscribeShapesMove, this);

        this.app.stage.addChild(this.btnCircleMove);

        this.buttons.push(this.btnCircleMove);
    }

    circleRadius() {
        this.buttonRadius = this.drawButton(200, 50, 'CHANGE');
        this.buttonRadius.x = 410;
        this.buttonRadius.y = 0;
        this.buttonRadius.on('pointerdown', this.enableRadiusMode, this);

        this.text = this.drawText('Radius : ');
        this.text.x = 380 + this.buttonRadius.width / 2;
        this.text.y = this.buttonRadius.height + this.text.height;

        this.radiusPlus = this.drawButton(20, 20, '+');
        this.radiusPlus.x = this.text.x + this.text.width / 2;
        this.radiusPlus.y = this.text.y - 10;
        this.radiusPlus.on('pointerdown', this.changeRadiusPlus, this);

        this.radiusMinus = this.drawButton(20, 20, '-');
        this.radiusMinus.x = this.text.x + this.text.width / 2 + this.radiusPlus.width * 2;
        this.radiusMinus.y = this.text.y - 10;
        this.radiusMinus.on('pointerdown', this.changeRadiusMinus, this);

        this.app.stage.addChild(this.buttonRadius, this.text, this.radiusPlus, this.radiusMinus);

        this.buttons.push(this.buttonRadius);

        this.circleLineWidth();
        this.lineColor();
        this.backColor();
    }

    circleLineWidth() {
        this.textLineWidth = this.drawText('Line width : ');
        this.textLineWidth.x = 380 + this.buttonRadius.width / 2;
        this.textLineWidth.y = this.buttonRadius.height + this.textLineWidth.height + 50;

        this.lineWidthPlus = this.drawButton(20, 20, '+');
        this.lineWidthPlus.x = this.textLineWidth.x + this.textLineWidth.width / 2;
        this.lineWidthPlus.y = this.textLineWidth.y - 10;
        this.lineWidthPlus.on('pointerdown', this.changeLineStylePlus, this);

        this.lineWidthMinus = this.drawButton(20, 20, '-');
        this.lineWidthMinus.x = this.textLineWidth.x + this.textLineWidth.width / 2 + this.lineWidthPlus.width * 2;
        this.lineWidthMinus.y = this.textLineWidth.y - 10;
        this.lineWidthMinus.on('pointerdown', this.changeLineStyleMinus, this);

        this.app.stage.addChild(this.textLineWidth, this.lineWidthPlus, this.lineWidthMinus);
    }

    lineColor() {
        this.textLineColor = this.drawText('Line color : ');
        this.textLineColor.x = 380 + this.buttonRadius.width / 2;
        this.textLineColor.y = this.buttonRadius.height + this.textLineWidth.height + 100;

        this.changeColor = this.drawButton(20, 20, '?');
        this.changeColor.x = this.textLineColor.x + this.textLineColor.width / 2;
        this.changeColor.y = this.textLineColor.y - 10;
        this.changeColor.on('pointerdown', this.changeCircleLineColor, this);

        this.app.stage.addChild(this.textLineColor, this.changeColor);
    }

    backColor() {
        this.textBackColor = this.drawText('Back color : ');
        this.textBackColor.x = 380 + this.buttonRadius.width / 2;
        this.textBackColor.y = this.changeColor.height + this.textLineWidth.height + 170;

        this.changeBackColorCircle = this.drawButton(20, 20, '?');
        this.changeBackColorCircle.x = this.textBackColor.x + this.textBackColor.width / 2;
        this.changeBackColorCircle.y = this.textBackColor.y - 10;
        this.changeBackColorCircle.on('pointerdown', this.changeBackLineColor, this);

        this.app.stage.addChild(this.textBackColor, this.changeBackColorCircle);
    }

    changeBackLineColor() {
        this.circles.forEach((el) => {
            if (el.isActive) {
                el.changeBackColor(this.ui.color);
            }
        });
    }

    changeCircleLineColor() {
        console.log(this.ui.color)

        this.circles.forEach((el) => {
            if (el.isActive) {
                el.changeLineColor(this.ui.color);
            }
        });
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
        this.isChangeRadiusMode = false;
        this.btnAddCircle.interactive = true;
        this.buttonRadius.interactive = true;


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

    //TODO universal functionn on all call back
    changeRadiusPlus() {
        this.circles.forEach((el) => {
            if (el.isActive) {
                el.chandeRadius(10, -1);
            }
        });
    }

    changeRadiusMinus() {
        this.circles.forEach((el) => {
            if (el.isActive) {
                el.chandeRadius(10, 1);
            }
        });
    }

    changeLineStylePlus() {
        this.circles.forEach((el) => {
            if (el.isActive) {
                el.chandeLineWidth(1, -1);
            }
        });
    }

    changeLineStyleMinus() {
        this.circles.forEach((el) => {
            if (el.isActive) {
                el.chandeLineWidth(1, 1);
            }
        });
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
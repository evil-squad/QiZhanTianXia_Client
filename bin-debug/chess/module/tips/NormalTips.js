var NormalTips = (function () {
    function NormalTips() {
        this._status = 0;
        this._container = new egret.Sprite();
        this._txt = new egret.TextField();
        this._txt.x = this._txt.y = 10;
        this._txt.textColor = 0xffffff;
        this._txt.textAlign = egret.HorizontalAlign.CENTER;
        this._container.addChild(this._txt);
    }
    var d = __define,c=NormalTips,p=c.prototype;
    p.getStatus = function () {
        return this._status;
    };
    p.show = function (message, parent, autoHide, delayHide) {
    };
    p.showForDirection = function (message, parent, direction) {
        if (parent != null) {
            this._status = 1;
            this._txt.text = message;
            var tw = this._txt.width;
            var th = this._txt.height;
            this._container.alpha = 1;
            this._container.graphics.clear();
            this._container.graphics.beginFill(0x0, .5);
            this._container.graphics.drawRoundRect(0, 0, tw + 20, th + 20, 5, 5);
            this._container.graphics.endFill();
            switch (direction) {
                case Direction.LEFT:
                    this._container.x = 20;
                    this._container.y = (parent.height - this._container.height) * .5;
                    break;
                case Direction.RIGHT:
                    this._container.x = parent.width - this._container.width;
                    this._container.y = (parent.height - this._container.height) * .5;
                    break;
                case Direction.TOP:
                    this._container.x = (parent.width - this._container.width) * .5;
                    this._container.y = 100;
                    break;
                case Direction.BOTTOM:
                    this._container.x = (parent.width - this._container.width) * .5;
                    this._container.y = parent.height - 80;
                    break;
                case Direction.CENTER:
                    this._container.x = (parent.width - this._container.width) * .5;
                    this._container.y = (parent.height - this._container.height) * .5;
                    break;
            }
            parent.addChild(this._container);
            this.hide(300);
        }
        else {
            Log.error("parent should not be null");
        }
    };
    p.hide = function (delay) {
        var startY = this._container.y;
        var endY = Math.max(this._container.y - Math.floor(Math.random() * 100) - 40, 0);
        var tw = egret.Tween.get(this._container);
        tw.to({ y: endY }, 1000).call(function () {
        }).wait(2)
            .to({ alpha: .5 }, 1000).call(function () {
            App.DisplayUtils.removeFromParent(this);
        });
        egret.setTimeout(function (arg) {
            arg();
        }, this, 3000, this.reset);
        // setTimeout(function(arg:Function){
        // 	arg();
        // },3000, this.reset);
        //App.DisplayUtils.removeFromParent(this._container);
    };
    p.reset = function () {
        this._status = 0;
    };
    return NormalTips;
}());
egret.registerClass(NormalTips,'NormalTips',["BaseTips"]);
//# sourceMappingURL=NormalTips.js.map
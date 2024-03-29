var MahjongItem = (function (_super) {
    __extends(MahjongItem, _super);
    function MahjongItem() {
        _super.call(this);
        this._status = 0;
        this._status = 0;
        this._img = new egret.Bitmap();
        this.addChild(this._img);
        this._img.width = BMahjongBar.ITEM_WIDTH;
        this._img.height = BMahjongBar.ITEM_HEIGHT;
    }
    var d = __define,c=MahjongItem,p=c.prototype;
    d(p, "info",undefined
        ,function (value) {
            this._info = value;
            this.refresh();
        }
    );
    p.switchMove = function () {
        egret.Tween.removeTweens(this);
        if (this._status == 0) {
            this._status = 1;
            egret.Tween.get(this).to({ y: -20 }, 300);
        }
        else {
            this._status = 0;
            egret.Tween.get(this).to({ y: 0 }, 300);
        }
    };
    p.revertPos = function () {
        egret.Tween.get(this).to({ y: 0 }, 300);
    };
    p.discard = function () {
    };
    p.refresh = function () {
        if (this._info != null) {
            this._img.texture = RES.getRes("mj" + this._info.mid);
        }
    };
    return MahjongItem;
}(BaseMahjongItem));
egret.registerClass(MahjongItem,'MahjongItem');
//# sourceMappingURL=MahjongItem.js.map
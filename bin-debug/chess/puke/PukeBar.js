var PukeBar = (function (_super) {
    __extends(PukeBar, _super);
    function PukeBar() {
        _super.call(this);
        this._infos = new Array();
        this._items = new Array();
    }
    var d = __define,c=PukeBar,p=c.prototype;
    d(p, "data",undefined
        ,function (value) {
            this._infos = value;
            this.render();
        }
    );
    p.switchItem = function (item) {
        if (this._curtItem == null) {
            this._curtItem = item;
            this._curtItem.switchMove();
        }
        else {
            if (this._curtItem != item) {
                this._curtItem.revertPos();
            }
            this._curtItem = item;
            this._curtItem.switchMove();
        }
    };
    p.render = function () {
        this.removeAllChildren();
        var count = this._infos.length;
        var item;
        this._infos.sort(this.sortFun);
        for (var i = 0; i < count; i++) {
            if (i > this._items.length - 1) {
                item = new PukeItem();
                this._items.push(item);
            }
            item = this._items[i];
            item.info = this._infos[i];
            this.addChild(item);
            egret.Tween.get(item).to({ x: PukeBar.ITEM_WIDTH * i }, 1000);
        }
    };
    p.sortFun = function (a, b) {
        if (a.pid == b.pid)
            return 0;
        if (a.pid > b.pid)
            return 1;
        return -1;
    };
    p.removeAllChildren = function () {
        while (this.numChildren > 0) {
            var item = this.removeChildAt(0);
            item.x = 0;
            item.y = 0;
        }
    };
    PukeBar.ITEM_WIDTH = 40;
    PukeBar.ITEM_HEIGHT = 60;
    return PukeBar;
}(eui.Component));
egret.registerClass(PukeBar,'PukeBar');
//# sourceMappingURL=PukeBar.js.map
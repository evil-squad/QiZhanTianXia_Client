var SettlementList = (function (_super) {
    __extends(SettlementList, _super);
    function SettlementList() {
        _super.call(this);
        this._items = new Array();
    }
    var d = __define,c=SettlementList,p=c.prototype;
    d(p, "data",undefined
        ,function (value) {
            this.removeAllChildren();
            var settlements = value;
            var info;
            var item;
            for (var i = 0; i < settlements.length; i++) {
                info = settlements[i];
                if (i >= this._items.length) {
                    this._items.push(new SettlementItem());
                }
                item = this._items[i];
                item.info = info;
                this.addChild(item);
                item.x = 10;
                item.y = SettlementList.ITEM_HEIGHT * i;
            }
        }
    );
    p.removeAllChildren = function () {
        while (this.numChildren > 0) {
            var item = this.removeChildAt(0);
            item.x = 0;
            item.y = 0;
        }
    };
    SettlementList.ITEM_WIDTH = 120;
    SettlementList.ITEM_HEIGHT = 42;
    return SettlementList;
}(eui.Component));
egret.registerClass(SettlementList,'SettlementList');
//# sourceMappingURL=SettlementList.js.map
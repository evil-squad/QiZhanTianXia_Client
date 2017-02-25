var RoomView = (function (_super) {
    __extends(RoomView, _super);
    function RoomView($controller, $parent) {
        _super.call(this, $controller, $parent);
        this._pukes = new Array();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
    }
    var d = __define,c=RoomView,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.bbar = new PukeBar();
        this.bbar.x = (App.StageUtils.getWidth() - PukeBar.ITEM_STACKED_WIDTH * 5) / 2;
        this.bbar.y = App.StageUtils.getHeight() - 290;
        this.addChild(this.bbar);
    };
    p.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        //this.refreshView(PukeManager.random(13));
        this.refreshView([]);
    };
    p.refreshView = function (data) {
        this.bbar.data = data;
    };
    p.revert = function () {
        this.bbar.revert();
    };
    p.getOnePuke = function (info) {
        this.bbar.addItem(info);
        return info;
    };
    d(p, "pukeCount"
        ,function () {
            return this.bbar.pukeCount;
        }
    );
    p.onClickItem = function (evt) {
        if (evt.target instanceof PukeItem) {
            this.bbar.switchItem(evt.target);
        }
    };
    return RoomView;
}(BaseEuiView));
egret.registerClass(RoomView,'RoomView');
//# sourceMappingURL=RoomView.js.map
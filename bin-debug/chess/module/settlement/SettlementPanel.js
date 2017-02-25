var SettlementPanel = (function (_super) {
    __extends(SettlementPanel, _super);
    function SettlementPanel(controller, parent) {
        _super.call(this, controller, parent);
        this.icon = "table_shop";
    }
    var d = __define,c=SettlementPanel,p=c.prototype;
    p.initData = function () {
        _super.prototype.initData.call(this);
        this.width = 350;
        this.height = 200;
        this.list = new SettlementList();
        this.contentGroup.addChild(this.list);
        this.list.x = 30;
        this.list.y = 30;
        this.closeButton = new eui.Button();
        this.closeButton.label = "关闭";
        this.closeButton.x = (this.width - this.closeButton.width) * .5;
        this.closeButton.y = this.height - 20;
        this.contentGroup.addChild(this.closeButton);
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClickHandler, this);
    };
    p.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.list.data = param[2];
    };
    p.closeClickHandler = function (evt) {
        App.ViewManager.closeView(this);
    };
    return SettlementPanel;
}(BasePanelView));
egret.registerClass(SettlementPanel,'SettlementPanel');
//# sourceMappingURL=SettlementPanel.js.map
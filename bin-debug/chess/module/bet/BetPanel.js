var BetPanel = (function (_super) {
    __extends(BetPanel, _super);
    function BetPanel(controller, parent) {
        _super.call(this, controller, parent);
        this.icon = "table_shop";
    }
    var d = __define,c=BetPanel,p=c.prototype;
    p.initData = function () {
        _super.prototype.initData.call(this);
        this.width = 350;
        this.height = 200;
        this.tile = new BetTile();
        this.contentGroup.addChild(this.tile);
        this.tile.x = 30;
        this.tile.y = 30;
        this.closeBtn.visible = false;
        App.MessageCenter.addListener(BetEvent.PLAYER_BET, this.onPlayerBet, this);
    };
    p.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
    };
    p.onPlayerBet = function (index) {
        var bet = 0;
        switch (index) {
            case 0:
                bet = 20;
                break;
            case 1:
                bet = 50;
                break;
            case 2:
                bet = 100;
                break;
            case 3:
                bet = 200;
                break;
        }
        if (bet != 0) {
            this.applyFunc(BetConst.BET_REQ, bet);
            App.ViewManager.closeView(this);
        }
    };
    return BetPanel;
}(BasePanelView));
egret.registerClass(BetPanel,'BetPanel');
//# sourceMappingURL=BetPanel.js.map
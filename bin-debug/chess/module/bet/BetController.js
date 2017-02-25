var BetController = (function (_super) {
    __extends(BetController, _super);
    function BetController() {
        _super.call(this);
        this.betView = new BetPanel(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Bet, this.betView);
        this.proxy = new BetProxy(this);
    }
    var d = __define,c=BetController,p=c.prototype;
    p.addEvents = function () {
        this.registerFunc(BetConst.BET_REQ, this.betReq, this);
    };
    p.removeEvents = function () {
        this.removeFunc(BetConst.BET_REQ);
    };
    p.betReq = function (bet) {
        //this.roomUIView.state = GamingStates.PLAYER_BET;//点击下注就禁用
        this.proxy.betReq(bet);
    };
    return BetController;
}(BaseController));
egret.registerClass(BetController,'BetController');
//# sourceMappingURL=BetController.js.map
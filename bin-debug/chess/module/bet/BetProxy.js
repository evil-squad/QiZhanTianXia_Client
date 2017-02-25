var BetProxy = (function (_super) {
    __extends(BetProxy, _super);
    function BetProxy($controller) {
        _super.call(this, $controller);
    }
    var d = __define,c=BetProxy,p=c.prototype;
    p.betReq = function (bet) {
        var body = {
            "head": App.Head,
            "bet": bet
        };
        this.writeAndFlush(Cmd.BET, body);
    };
    return BetProxy;
}(BaseProxy));
egret.registerClass(BetProxy,'BetProxy');
//# sourceMappingURL=BetProxy.js.map
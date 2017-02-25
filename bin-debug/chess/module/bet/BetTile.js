var BetTile = (function (_super) {
    __extends(BetTile, _super);
    function BetTile() {
        _super.call(this);
        this.skinName = "resource/skins/BetTileSkin.exml";
        this.tBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.fBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.ohBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.thBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }
    var d = __define,c=BetTile,p=c.prototype;
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.tBtn:
                App.MessageCenter.dispatch(BetEvent.PLAYER_BET, 0);
                break;
            case this.fBtn:
                App.MessageCenter.dispatch(BetEvent.PLAYER_BET, 1);
                break;
            case this.ohBtn:
                App.MessageCenter.dispatch(BetEvent.PLAYER_BET, 2);
                break;
            case this.thBtn:
                App.MessageCenter.dispatch(BetEvent.PLAYER_BET, 3);
                break;
        }
    };
    return BetTile;
}(eui.Component));
egret.registerClass(BetTile,'BetTile');
//# sourceMappingURL=BetTile.js.map
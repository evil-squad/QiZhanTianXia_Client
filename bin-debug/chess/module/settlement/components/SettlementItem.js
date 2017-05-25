var SettlementItem = (function (_super) {
    __extends(SettlementItem, _super);
    function SettlementItem() {
        _super.call(this);
        this.skinName = "resource/skins/SettlementItemSkin.exml";
        var sp = new egret.Shape();
        sp.graphics.beginFill(0xcccccc, .9);
        sp.graphics.drawRect(0, 0, 350, 40);
        sp.graphics.endFill();
        this.addChildAt(sp, 0);
    }
    var d = __define,c=SettlementItem,p=c.prototype;
    d(p, "info",undefined
        ,function (value) {
            this._info = value;
            var player = RoomManager.getPlayer(this._info.uid);
            if (player != null) {
                this.nickLbl.text = player.nick;
            }
            else {
                this.nickLbl.text = "";
            }
            this.handcatLbl.text = HandCat.getName(this._info.handcat);
            this.scoreLbl.text = this._info.score;
        }
    );
    return SettlementItem;
}(eui.Component));
egret.registerClass(SettlementItem,'SettlementItem');
//# sourceMappingURL=SettlementItem.js.map
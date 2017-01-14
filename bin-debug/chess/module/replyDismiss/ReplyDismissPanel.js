var ReplyDismissPanel = (function (_super) {
    __extends(ReplyDismissPanel, _super);
    function ReplyDismissPanel(controller, parent) {
        _super.call(this, controller, parent);
        this.icon = "table_shop";
    }
    var d = __define,c=ReplyDismissPanel,p=c.prototype;
    /**
     *对面板数据的初始化，用于子类继承
     */
    p.initData = function () {
        _super.prototype.initData.call(this);
        this.height = 200;
        this._tipsLbl = new eui.Label();
        this.contentGroup.addChild(this._tipsLbl);
        this._tipsLbl.x = 10;
        this._tipsLbl.y = 10;
        this._tipsLbl.width = 400;
        this._tipsLbl.text = "解除房间？";
        this._agreeBtn = new eui.Button();
        this._agreeBtn.skinName = "skins.ButtonSkin";
        this.contentGroup.addChild(this._agreeBtn);
        this._agreeBtn.width = 100;
        this._agreeBtn.label = "同意";
        this._agreeBtn.x = (this.width - this._agreeBtn.width) * .5 - 50 - this._agreeBtn.width;
        this._agreeBtn.y = this.height - 30;
        this._disagreeBtn = new eui.Button();
        this._disagreeBtn.skinName = "skins.ButtonSkin";
        this.contentGroup.addChild(this._disagreeBtn);
        this._disagreeBtn.width = 100;
        this._disagreeBtn.label = "不同意";
        this._disagreeBtn.x = (this.width - this._disagreeBtn.width) * .5 + 50;
        this._disagreeBtn.y = this.height - 30;
        this._agreeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeClickHandler, this);
        this._disagreeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.disagreeClickHandler, this);
    };
    p.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        if (RoomManager.hasRoomInfo) {
        }
    };
    p.agreeClickHandler = function (evt) {
        this.applyFunc(RoomConst.ROOM_REPLY_DISMISS_REQ, true);
    };
    p.disagreeClickHandler = function (evt) {
        this.applyFunc(RoomConst.ROOM_REPLY_DISMISS_REQ, false);
    };
    return ReplyDismissPanel;
}(BasePanelView));
egret.registerClass(ReplyDismissPanel,'ReplyDismissPanel');
//# sourceMappingURL=ReplyDismissPanel.js.map
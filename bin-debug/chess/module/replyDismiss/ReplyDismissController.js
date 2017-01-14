var ReplyDismissController = (function (_super) {
    __extends(ReplyDismissController, _super);
    function ReplyDismissController() {
        _super.call(this);
        this.replyView = new ReplyDismissPanel(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.ReplyDismiss, this.replyView);
        this.proxy = new ReplyDismissProxy(this);
        this.registerFunc(RoomConst.ROOM_REPLY_DISMISS_REQ, this.onReq, this);
        this.registerFunc(RoomConst.ROOM_REPLY_DISMISS_RESP, this.onResp, this);
    }
    var d = __define,c=ReplyDismissController,p=c.prototype;
    p.onReq = function (agree) {
        this.proxy.replyDismiss(agree);
    };
    p.onResp = function (obj) {
        App.TipsUtils.showCenter("reply dismiss room resp");
    };
    return ReplyDismissController;
}(BaseController));
egret.registerClass(ReplyDismissController,'ReplyDismissController');
//# sourceMappingURL=ReplyDismissController.js.map
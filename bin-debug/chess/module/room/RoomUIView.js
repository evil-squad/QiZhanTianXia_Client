var RoomUIView = (function (_super) {
    __extends(RoomUIView, _super);
    function RoomUIView($controller, $parent) {
        _super.call(this, $controller, $parent);
        this.skinName = "resource/skins/RoomUISkin.exml";
    }
    var d = __define,c=RoomUIView,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.dismissBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissBtnClickHandler, this);
        this.leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leaveClickHandler, this);
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
    };
    p.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
    };
    p.dismissBtnClickHandler = function (evt) {
        this.applyFunc(HomeConst.ROOM_DISMISS_REQ);
    };
    p.leaveClickHandler = function (evt) {
        this.applyFunc(HomeConst.ROOM_LEAVE_REQ);
    };
    p.sendClickHandler = function (evt) {
        if (this.msgInput.text == "" || this.msgInput.text == null)
            return;
        App.TipsUtils.showCenter(this.msgInput.text);
    };
    p.refreshView = function () {
        var players = RoomManager.players;
        var player;
        for (var i = 0; i < players.length; i++) {
            player = players[i];
            switch (player.seatId) {
                case 0:
                    this.topPlayerLabel.text = player.nick;
                    break;
                case 1:
                    this.leftPlayerLabel.text = player.nick;
                    break;
                case 2:
                    this.bottomPlayerLabel.text = player.nick;
                    break;
                case 3:
                    this.rightPlayerLabel.text = player.nick;
                    break;
            }
        }
    };
    return RoomUIView;
}(BaseEuiView));
egret.registerClass(RoomUIView,'RoomUIView');
//# sourceMappingURL=RoomUIView.js.map
var RoomUIView = (function (_super) {
    __extends(RoomUIView, _super);
    function RoomUIView($controller, $parent) {
        _super.call(this, $controller, $parent);
        this.skinName = "resource/skins/RoomUISkin.exml";
    }
    var d = __define,c=RoomUIView,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        // var bp = new egret.Bitmap();
        // bp.texture = RES.getRes("puke204");
        // this.addChild(bp);
        this.dismissBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissBtnClickHandler, this);
        this.leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leaveClickHandler, this);
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
        this.refreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClickHandler, this);
        this.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.inviteClickHandler, this);
    };
    p.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.refreshView();
    };
    p.dismissBtnClickHandler = function (evt) {
        this.applyFunc(RoomConst.ROOM_DISMISS_REQ);
    };
    p.leaveClickHandler = function (evt) {
        this.applyFunc(RoomConst.ROOM_LEAVE_REQ);
    };
    p.sendClickHandler = function (evt) {
        if (this.msgInput.text == "" || this.msgInput.text == null)
            return;
        App.TipsUtils.showCenter(this.msgInput.text);
    };
    p.refreshClickHandler = function (evt) {
        this.applyFunc(RoomConst.ROOM_PLAYERS_GET_REQ, RoomManager.playerIds);
    };
    p.inviteClickHandler = function (evt) {
        Log.trace("invite");
        WeixinApi.ready(function (api) {
            App.TipsUtils.showCenter("WeixinAPI ready");
            var info = new WeixinShareInfo();
            info.title = "HelloEgret";
            info.desc = "欢迎使用Egret";
            info.link = "www.egret-labs.org";
            //                        info.imgUrl = "";
            api.shareToFriend(info);
            api.shareToTimeline(info);
        });
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
        if (RoomManager.hasRoomInfo) {
            this.roomLabel.text = "房间号：" + RoomManager.roomId;
        }
        else {
            this.roomLabel.text = "房间";
        }
    };
    return RoomUIView;
}(BaseEuiView));
egret.registerClass(RoomUIView,'RoomUIView');
//# sourceMappingURL=RoomUIView.js.map
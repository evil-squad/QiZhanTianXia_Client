var RoomController = (function (_super) {
    __extends(RoomController, _super);
    function RoomController() {
        _super.call(this);
        this.totalPoints = 0;
        this.proxy = new RoomProxy(this);
        this.roomView = new RoomView(this, LayerManager.Room_Main);
        App.ViewManager.register(ViewConst.Room, this.roomView);
        this.roomUIView = new RoomUIView(this, LayerManager.Room_Main);
        App.ViewManager.register(ViewConst.RoomUI, this.roomUIView);
        this.registerFunc(RoomConst.NOTIFY, this.notify, this);
        App.MessageCenter.addListener(NotifyConst.PLAYER_ENTER, this.onPlayersChange, this);
        App.MessageCenter.addListener(NotifyConst.PLAYER_LEAVE, this.onPlayersChange, this);
        App.MessageCenter.addListener(NotifyConst.ROOM_START, this.onRoomStart, this);
    }
    var d = __define,c=RoomController,p=c.prototype;
    p.addEvents = function () {
        this.registerFunc(RoomConst.ROOM_DISMISS_REQ, this.onDismiss, this);
        this.registerFunc(RoomConst.ROOM_ASK_DISMISS_REQ, this.onAskDismiss, this);
        this.registerFunc(RoomConst.ROOM_LEAVE_REQ, this.onLeave, this);
        this.registerFunc(RoomConst.ROOM_PLAYERS_GET_REQ, this.getPlayers, this);
        this.registerFunc(RoomConst.ROOM_DISMISS_RESP, this.dismissResp, this);
        this.registerFunc(RoomConst.ROOM_ASK_DISMISS_RESP, this.askDismissResp, this);
        this.registerFunc(RoomConst.ROOM_LEAVE_RESP, this.leaveResp, this);
        this.registerFunc(RoomConst.ROOM_PLAYERS_GET_RESP, this.onGetPlayersResp, this);
        this.registerFunc(RoomConst.ROOM_PUKE_GET_REQ, this.getPuke, this);
        this.totalPoints = 0;
    };
    p.removeEvents = function () {
        this.removeFunc(RoomConst.ROOM_DISMISS_REQ);
        this.removeFunc(RoomConst.ROOM_ASK_DISMISS_REQ);
        this.removeFunc(RoomConst.ROOM_LEAVE_REQ);
        this.removeFunc(RoomConst.ROOM_PLAYERS_GET_REQ);
        this.removeFunc(RoomConst.ROOM_DISMISS_RESP);
        this.removeFunc(RoomConst.ROOM_ASK_DISMISS_RESP);
        this.removeFunc(RoomConst.ROOM_LEAVE_RESP);
        this.removeFunc(RoomConst.ROOM_PLAYERS_GET_RESP);
        this.removeFunc(RoomConst.ROOM_PUKE_GET_REQ);
    };
    p.onDismiss = function () {
        this.proxy.dismissRoom();
    };
    p.onAskDismiss = function () {
        this.proxy.askDismissRoom();
    };
    p.onLeave = function () {
        this.proxy.leaveRoom();
    };
    p.dismissResp = function () {
        App.TipsUtils.showCenter("解散房间");
        App.SceneManager.runScene(SceneConsts.Home);
    };
    p.askDismissResp = function (wait_seconds) {
        App.TipsUtils.showCenter("发起解散,剩余时间:" + wait_seconds);
        //App.SceneManager.runScene(SceneConsts.Home);
    };
    p.getPlayers = function () {
        this.proxy.getRoomPlayersInfo(RoomManager.playerIds);
    };
    p.leaveResp = function (obj) {
        App.TipsUtils.showCenter("离开房间");
        App.SceneManager.runScene(SceneConsts.Home);
    };
    p.onGetPlayersResp = function (obj) {
        RoomManager.parsePlayers(obj.playerInfo, "room");
        this.roomUIView.refreshView();
        this.roomView.refreshView(PukeManager.random(13));
    };
    p.notify = function (obj) {
        if (obj.type == NotifyType.PLAYER_ENTER) {
            RoomManager.addPlayer(obj.player_enter.enterer);
        }
    };
    //
    p.onPlayersChange = function (obj) {
        this.roomUIView.refreshView();
    };
    p.onRoomStart = function (obj) {
        App.TipsUtils.showCenter("牌局开始");
        if (App.SceneManager.getCurrScene != SceneConsts.Room.valueOf) {
            //自动进入？
            App.SceneManager.runScene(SceneConsts.Room); //进入房间
        }
    };
    //
    p.getPuke = function (obj) {
        var info = this.roomView.getOnePuke();
        this.totalPoints += info.points;
        if (this.totalPoints > 10.5) {
            this.roomUIView.state = GamingStates.BOOM;
        }
        else {
            App.TipsUtils.showCenter("当前点数：" + this.totalPoints);
        }
        if (this.roomView.pukeCount >= PukeBar.PUKE_MAX_COUNT) {
            this.roomUIView.state = GamingStates.SETTLEMENT;
            this.roomUIView.curtPoints = this.totalPoints;
        }
    };
    return RoomController;
}(BaseController));
egret.registerClass(RoomController,'RoomController');
//# sourceMappingURL=RoomController.js.map
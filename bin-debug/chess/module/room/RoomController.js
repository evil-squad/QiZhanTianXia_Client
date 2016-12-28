var RoomController = (function (_super) {
    __extends(RoomController, _super);
    function RoomController() {
        _super.call(this);
        this.proxy = new RoomProxy(this);
        this.roomView = new RoomView(this, LayerManager.Room_Main);
        App.ViewManager.register(ViewConst.Room, this.roomView);
        this.roomUIView = new RoomUIView(this, LayerManager.Room_Main);
        App.ViewManager.register(ViewConst.RoomUI, this.roomUIView);
    }
    var d = __define,c=RoomController,p=c.prototype;
    p.addEvents = function () {
        this.registerFunc(RoomConst.ROOM_DISMISS_REQ, this.onDismiss, this);
        this.registerFunc(RoomConst.ROOM_LEAVE_REQ, this.onLeave, this);
        this.registerFunc(RoomConst.ROOM_PLAYERS_GET_REQ, this.getPlayers, this);
        this.registerFunc(RoomConst.ROOM_DISMISS_RESP, this.dismissResp, this);
        this.registerFunc(RoomConst.ROOM_LEAVE_RESP, this.leaveResp, this);
        this.registerFunc(RoomConst.ROOM_PLAYERS_GET_RESP, this.onGetPlayersResp, this);
    };
    p.removeEvents = function () {
        this.removeFunc(RoomConst.ROOM_DISMISS_REQ);
        this.removeFunc(RoomConst.ROOM_LEAVE_REQ);
        this.removeFunc(RoomConst.ROOM_PLAYERS_GET_REQ);
        this.removeFunc(RoomConst.ROOM_DISMISS_RESP);
        this.removeFunc(RoomConst.ROOM_LEAVE_RESP);
        this.removeFunc(RoomConst.ROOM_PLAYERS_GET_RESP);
    };
    p.onDismiss = function () {
        this.proxy.dismissRoom();
    };
    p.onLeave = function () {
        this.proxy.leaveRoom();
    };
    p.dismissResp = function () {
        App.TipsUtils.showCenter("解散房间");
        App.SceneManager.runScene(SceneConsts.Home);
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
    return RoomController;
}(BaseController));
egret.registerClass(RoomController,'RoomController');
//# sourceMappingURL=RoomController.js.map
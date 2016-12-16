var RoomController = (function (_super) {
    __extends(RoomController, _super);
    function RoomController() {
        _super.call(this);
        this.proxy = new RoomProxy(this);
        this.roomView = new RoomView(this, LayerManager.Room_Main);
        App.ViewManager.register(ViewConst.Room, this.roomView);
        this.roomUIView = new RoomUIView(this, LayerManager.Room_Main);
        App.ViewManager.register(ViewConst.RoomUI, this.roomUIView);
        this.registerFunc(HomeConst.ROOM_DISMISS_REQ, this.onDismiss, this);
        this.registerFunc(HomeConst.ROOM_LEAVE_REQ, this.onLeave, this);
        this.registerFunc(HomeConst.ROOM_PLAYERS_GET_REQ, this.getPlayers, this);
        this.registerFunc(HomeConst.ROOM_DISMISS_RESP, this.dismissResp, this);
        this.registerFunc(HomeConst.ROOM_LEAVE_RESP, this.leaveResp, this);
        this.registerFunc(HomeConst.ROOM_PLAYERS_GET_RESP, this.onGetPlayersResp, this);
    }
    var d = __define,c=RoomController,p=c.prototype;
    p.onDismiss = function () {
        this.proxy.dismissRoom();
    };
    p.onLeave = function () {
        this.proxy.leaveRoom();
    };
    p.dismissResp = function () {
        App.TipsUtils.showCenter("解释房间");
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
        var players = obj.playerInfo;
        var player;
        var ps = "";
        RoomManager.clearPlayers();
        for (var i = 0; i < players.length; i++) {
            ps += players[i].nick + " ";
            RoomManager.addPlayer(new PlayerInfo(players[i]));
        }
        App.TipsUtils.showCenter("牌友: " + ps);
    };
    return RoomController;
}(BaseController));
egret.registerClass(RoomController,'RoomController');
//# sourceMappingURL=RoomController.js.map
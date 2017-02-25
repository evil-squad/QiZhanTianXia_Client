var RoomProxy = (function (_super) {
    __extends(RoomProxy, _super);
    function RoomProxy($controller) {
        _super.call(this, $controller);
        //注册从服务器返回消息的监听
        this.receiveServerMsg(Cmd.ROOM_DISMISS, this.dismissRoomSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_ASK_DISMISS, this.askDismissSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_LEAVE, this.leaveRoomSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_PLAYER_INFO_GET, this.getRoomPlayersInfoSuccess, this);
        this.receiveServerMsg(Cmd.READY_FOR_START, this.onReadyForStart, this);
        this.receiveServerMsg(Cmd.BET, this.onBet, this);
        this.receiveServerMsg(Cmd.HIT, this.onHit, this);
        this.receiveServerMsg(Cmd.STAND, this.onStand, this);
        this.receiveServerMsg(Cmd.GET_GAME_DATA, this.onGetGameData, this);
    }
    var d = __define,c=RoomProxy,p=c.prototype;
    p.dismissRoom = function () {
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.ROOM_DISMISS, body);
    };
    p.askDismissRoom = function () {
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.ROOM_ASK_DISMISS, body);
    };
    p.leaveRoom = function () {
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.ROOM_LEAVE, body);
    };
    p.getRoomPlayersInfo = function (uids) {
        var body = {
            "head": App.Head,
            "uid": uids
        };
        this.writeAndFlush(Cmd.ROOM_PLAYER_INFO_GET, body);
    };
    p.dismissRoomSuccess = function (obj) {
        RoomManager.clearRoomInfo();
        this.applyFunc(RoomConst.ROOM_DISMISS_RESP, obj);
    };
    p.askDismissSuccess = function (obj) {
        this.applyFunc(RoomConst.ROOM_ASK_DISMISS_RESP, obj.waitSeconds);
    };
    p.leaveRoomSuccess = function (obj) {
        this.applyFunc(RoomConst.ROOM_LEAVE_RESP, obj);
    };
    p.getRoomPlayersInfoSuccess = function (obj) {
        this.applyFunc(RoomConst.ROOM_PLAYERS_GET_RESP, obj);
    };
    //
    p.readyForStartReq = function () {
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.READY_FOR_START, body);
    };
    p.betReq = function (bet) {
        var body = {
            "head": App.Head,
            "bet": bet
        };
        this.writeAndFlush(Cmd.BET, body);
    };
    p.hitReq = function () {
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.HIT, body);
    };
    p.standReq = function () {
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.STAND, body);
    };
    p.getGameDataReq = function () {
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.GET_GAME_DATA, body);
    };
    //
    p.onReadyForStart = function (obj) {
        this.applyFunc(RoomConst.READY_FOR_START_RESP, obj);
    };
    p.onBet = function (obj) {
        this.applyFunc(RoomConst.BET_RESP, obj);
    };
    p.onHit = function (obj) {
        this.applyFunc(RoomConst.HIT_RESP, obj);
    };
    p.onStand = function (obj) {
        this.applyFunc(RoomConst.STAND_RESP, obj);
    };
    p.onGetGameData = function (obj) {
        this.applyFunc(RoomConst.GET_GAME_DATA_RESP, obj);
    };
    p.gmReq = function (cmd, msg) {
        var body = {
            "head": App.Head,
            "cmd": cmd,
            "text": msg
        };
        this.writeAndFlush(Cmd.GM, body);
    };
    return RoomProxy;
}(BaseProxy));
egret.registerClass(RoomProxy,'RoomProxy');
//# sourceMappingURL=RoomProxy.js.map
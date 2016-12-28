var RoomProxy = (function (_super) {
    __extends(RoomProxy, _super);
    function RoomProxy($controller) {
        _super.call(this, $controller);
        //注册从服务器返回消息的监听
        this.receiveServerMsg(Cmd.ROOM_DISMISS, this.dismissRoomSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_LEAVE, this.leaveRoomSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_PLAYER_INFO_GET, this.getRoomPlayersInfoSuccess, this);
    }
    var d = __define,c=RoomProxy,p=c.prototype;
    p.dismissRoom = function () {
        var body = {
            "head": App.Head
        };
        RoomManager.clearRoomInfo();
        this.writeAndFlush(Cmd.ROOM_LEAVE, body);
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
        this.applyFunc(RoomConst.ROOM_DISMISS_RESP, obj);
    };
    p.leaveRoomSuccess = function (obj) {
        this.applyFunc(RoomConst.ROOM_LEAVE_RESP, obj);
    };
    p.getRoomPlayersInfoSuccess = function (obj) {
        this.applyFunc(RoomConst.ROOM_PLAYERS_GET_RESP, obj);
    };
    return RoomProxy;
}(BaseProxy));
egret.registerClass(RoomProxy,'RoomProxy');
//# sourceMappingURL=RoomProxy.js.map
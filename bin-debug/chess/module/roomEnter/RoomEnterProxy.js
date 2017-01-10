var RoomEnterProxy = (function (_super) {
    __extends(RoomEnterProxy, _super);
    function RoomEnterProxy($controller) {
        _super.call(this, $controller);
        //注册从服务器返回消息的监听
        this.receiveServerMsg(Cmd.ROOM_ENTER, this.enterRoomSuccess, this);
    }
    var d = __define,c=RoomEnterProxy,p=c.prototype;
    p.enterRoom = function (roomid) {
        var body = {
            "head": App.Head,
            "ob": RoomManager.isOb,
            "roomid": roomid
        };
        this.writeAndFlush(Cmd.ROOM_ENTER, body);
    };
    p.enterRoomSuccess = function (obj) {
        this.applyFunc(HomeConst.ROOM_ENTER_RESP, obj);
    };
    return RoomEnterProxy;
}(BaseProxy));
egret.registerClass(RoomEnterProxy,'RoomEnterProxy');

var HomeProxy = (function (_super) {
    __extends(HomeProxy, _super);
    function HomeProxy($controller) {
        _super.call(this, $controller);
        this.receiveServerMsg(Cmd.ROOM_CREATE, this.createRoomSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_ENTER, this.enterRoomSuccess, this);
    }
    var d = __define,c=HomeProxy,p=c.prototype;
    p.createRoom = function () {
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.ROOM_CREATE, body);
    };
    p.enterRoom = function () {
        if (!RoomManager.hasRoomInfo) {
            App.TipsUtils.showCenter("无房间数据");
            return;
        }
        var body = {
            "head": App.Head,
            "ob": RoomManager.isOb,
            "roomid": RoomManager.roomId
        };
        // var body = App.lookupProtoMessage(Msg.EnterRoomReq).create({ head: App.Head, ob:1, roomid: RoomManager.roomId});
        // var Message = App.lookupProtoMessage("cspb.EnterRoomReq");
        // Message.ob = false;
        // Message.head = App.Head;
        // Message.roomid = RoomManager.roomId;
        this.writeAndFlush(Cmd.ROOM_ENTER, body);
    };
    p.createRoomSuccess = function (obj) {
        RoomManager.setRoomInfo(obj.roomid);
        this.applyFunc(HomeConst.ROOM_CREATE_RESP, RoomManager.roomId);
    };
    p.enterRoomSuccess = function (obj) {
        this.applyFunc(HomeConst.ROOM_ENTER_RESP, obj);
    };
    return HomeProxy;
}(BaseProxy));
egret.registerClass(HomeProxy,'HomeProxy');
//# sourceMappingURL=HomeProxy.js.map
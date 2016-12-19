var LoginProxy = (function (_super) {
    __extends(LoginProxy, _super);
    function LoginProxy($controller) {
        _super.call(this, $controller);
        /**
         * 用户登陆
         * @param userName
         * @param pwd
         */
        this.logined = true;
        //注册从服务器返回消息的监听
        this.receiveServerMsg(Cmd.LOGIN, this.loginSuccess, this);
    }
    var d = __define,c=LoginProxy,p=c.prototype;
    p.login = function (openId, code) {
        if (this.logined) {
            var debug = App.lookupProtoMessage(Msg.DEBUG).create({ openid: openId });
            var wechat = App.lookupProtoMessage(Msg.WECHAT).create({ code: code });
            var body = {
                "head": App.Head,
                "debug": debug,
                "wechat": wechat
            };
            this.writeAndFlush(Cmd.LOGIN, body);
            return;
        }
        //this.logined = true;
        var debug = App.lookupProtoMessage(Msg.DEBUG).create({ openid: openId });
        var wechat = App.lookupProtoMessage(Msg.WECHAT).create({ code: code });
        var body = {
            "head": App.Head,
            "debug": debug,
            "wechat": wechat
        };
        var body2 = {
            "head": App.Head,
            "ob": 1,
            "roomid": "roomid123" ///RoomManager.roomId
        };
        //this.writeAndFlush(Cmd.ROOM_ENTER, body2);
        // var body = App.lookupProtoMessage(Msg.EnterRoomReq).create({ head: App.Head, ob:1, roomid: RoomManager.roomId});
        var Message = App.lookupProtoMessage(Msg.LoginReq);
        var msg = Message.create(body);
        var bytes = Message.encode(msg).finish();
        var ob = Message.decode(bytes);
        //Log.trace(ob.roomid);
        var EnterRoomReq = App.lookupProtoMessage(Msg.EnterRoomReq);
        msg = EnterRoomReq.create(body2);
        bytes = EnterRoomReq.encode(msg).finish();
        ob = EnterRoomReq.decode(bytes);
        //Log.trace(ob.wechat.code);
        // Message.ob = false;
        // Message.head = App.Head;
        // Message.roomid = RoomManager.roomId;
        this.writeAndFlush(Cmd.LOGIN, body);
        this.writeAndFlush(Cmd.ROOM_ENTER, body2);
    };
    /**
     * 用户登陆成功返回
     */
    p.loginSuccess = function (obj) {
        MainManager.setUserInfo(obj.player);
        this.applyFunc(LoginConst.LOGIN_RESP, obj);
    };
    return LoginProxy;
}(BaseProxy));
egret.registerClass(LoginProxy,'LoginProxy');
//# sourceMappingURL=LoginProxy.js.map
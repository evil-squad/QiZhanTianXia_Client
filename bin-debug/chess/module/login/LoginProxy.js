var LoginProxy = (function (_super) {
    __extends(LoginProxy, _super);
    function LoginProxy($controller) {
        _super.call(this, $controller);
        //注册从服务器返回消息的监听
        this.receiveServerMsg(Cmd.LOGIN, this.loginSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_ENTER, this.enterRoomSuccess, this);
    }
    var d = __define,c=LoginProxy,p=c.prototype;
    /**
     * 用户登陆
     * @param userName
     * @param pwd
     */
    p.login = function (openId, code, nick) {
        //var nick = "nick"+Math.floor(Math.random()*10);
        MainManager.initLoginInfo(openId, nick, code);
        var debug = App.lookupProtoMessage(Msg.DEBUG).create({ openid: openId, nick: nick });
        var wechat = App.lookupProtoMessage(Msg.WECHAT).create({ code: code });
        var body = {
            "head": App.Head,
            "debug": debug,
            "type": 0 //DEBUG:0,WECHAT:1
        };
        this.writeAndFlush(Cmd.LOGIN, body);
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
        this.writeAndFlush(Cmd.ROOM_ENTER, body);
    };
    /**
     * 用户登陆成功返回
     */
    p.loginSuccess = function (obj) {
        MainManager.setUserInfo(obj.player);
        RoomManager.roomId = obj.roomid;
        this.applyFunc(LoginConst.LOGIN_RESP, obj);
    };
    p.enterRoomSuccess = function (obj) {
        this.applyFunc(LoginConst.ROOM_ENTER_RESP, obj);
    };
    return LoginProxy;
}(BaseProxy));
egret.registerClass(LoginProxy,'LoginProxy');
//# sourceMappingURL=LoginProxy.js.map
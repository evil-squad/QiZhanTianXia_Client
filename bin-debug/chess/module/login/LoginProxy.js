var LoginProxy = (function (_super) {
    __extends(LoginProxy, _super);
    function LoginProxy($controller) {
        _super.call(this, $controller);
        //注册从服务器返回消息的监听
        this.receiveServerMsg(Cmd.LOGIN, this.loginSuccess, this);
    }
    var d = __define,c=LoginProxy,p=c.prototype;
    /**
     * 用户登陆
     * @param userName
     * @param pwd
     */
    p.login = function (openId, code) {
        var debug = App.lookupProtoMessage(Msg.DEBUG).create({ openid: openId });
        var wechat = App.lookupProtoMessage(Msg.WECHAT).create({ code: code });
        var body = {
            "head": App.Head,
            "debug": debug,
            "wechat": wechat
        };
        this.sendSocketCBMsg(Cmd.LOGIN, body);
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
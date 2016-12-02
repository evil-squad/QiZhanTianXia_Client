var LoginProxy = (function (_super) {
    __extends(LoginProxy, _super);
    function LoginProxy($controller) {
        _super.call(this, $controller);
        //注册从服务器返回消息的监听
        this.receiveServerMsg(HttpConst.USER_LOGIN, this.loginSuccess, this);
    }
    var d = __define,c=LoginProxy,p=c.prototype;
    /**
     * 用户登陆
     * @param userName
     * @param pwd
     */
    p.login = function (userName, pwd) {
        var paramObj = {
            "uName": userName,
            "uPass": pwd
        };
        this.sendHttpMsg(HttpConst.USER_LOGIN, paramObj);
    };
    /**
     * 用户登陆成功返回
     */
    p.loginSuccess = function (obj) {
        this.applyFunc(LoginConst.LOGIN_S2C, obj);
    };
    return LoginProxy;
}(BaseProxy));
egret.registerClass(LoginProxy,'LoginProxy');
//# sourceMappingURL=LoginProxy.js.map
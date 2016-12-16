var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView($controller, $parent) {
        _super.call(this, $controller, $parent);
        this.skinName = "resource/skins/LoginSkin.exml";
    }
    var d = __define,c=LoginView,p=c.prototype;
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.passwordInput.displayAsPassword = true;
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
    };
    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    p.initData = function () {
        _super.prototype.initData.call(this);
    };
    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    p.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
    };
    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    p.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.close.call(this, param);
    };
    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    p.onLogin = function () {
        var userName = this.usernameInput.text;
        var pwd = this.passwordInput.text;
        //进行基础检测
        if (userName == null || userName.length == 0) {
            App.TipsUtils.showCenter("账号密码不能为空");
            return;
        }
        if (pwd == null || pwd.length == 0) {
            App.TipsUtils.showCenter("账号密码不能为空");
            return;
        }
        var openId = "213sefwe";
        var code = "344";
        this.applyFunc(LoginConst.LOGIN_REQ, openId, code);
    };
    /**
     * 登陆成功处理
     */
    p.loginSuccess = function () {
        //TODO 登陆成功处理
        App.TipsUtils.showCenter("登录成功");
    };
    return LoginView;
}(BaseEuiView));
egret.registerClass(LoginView,'LoginView');
//# sourceMappingURL=LoginView.js.map
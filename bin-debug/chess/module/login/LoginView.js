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
        var msg = {};
        msg.key = "user_login_c2s";
        msg.body = {
            "username": userName,
            "password": pwd
        };
        App.Socket.send(msg);
        App.MessageCenter.addListener("user_login_s2c", function (obj) {
            App.TipsUtils.showCenter(obj.message);
            if (obj.flag == 1) {
                App.ViewManager.close(ViewConst.Login);
                App.ViewManager.open(ViewConst.Home);
            }
        }, this);
    };
    p.test = function () {
        //初始化simple_proto
        var message = dcodeIO.ProtoBuf.loadProto(RES.getRes("simple_proto"));
        //创建user_login_class
        var user_login_class = message.build("user_login_c2s");
        Log.trace(user_login_class);
        //创建一条消息
        // var user_login = new user_login_class({
        //     "username" : "666",
        //     "password" : "777"
        // });
        //序列化
        //var bytes = user_login.toArrayBuffer();
        //Log.trace("序列化数据：", bytes);
        //App.Socket.send(user_login);
    };
    /**
     * 登陆成功处理
     */
    p.loginSuccess = function () {
        //TODO 登陆成功处理
    };
    return LoginView;
}(BaseEuiView));
egret.registerClass(LoginView,'LoginView');
//# sourceMappingURL=LoginView.js.map
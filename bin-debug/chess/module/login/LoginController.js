var LoginController = (function (_super) {
    __extends(LoginController, _super);
    function LoginController() {
        _super.call(this);
        //初始化Model
        this.loginModel = new LoginModel(this);
        //初始化UI
        this.loginView = new LoginView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Login, this.loginView);
        //初始化Proxy
        this.loginProxy = new LoginProxy(this);
        //注册模块间、模块内部事件监听
        //注册C2S消息
        this.registerFunc(LoginConst.LOGIN_C2S, this.onLogin, this);
        //注册S2C消息
        this.registerFunc(LoginConst.LOGIN_S2C, this.loginSuccess, this);
    }
    var d = __define,c=LoginController,p=c.prototype;
    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    p.onLogin = function (userName, pwd) {
        this.loginProxy.login(userName, pwd);
    };
    /**
     * 登陆成功处理
     */
    p.loginSuccess = function (userInfo) {
        //保存数据
        this.loginModel.userInfo = userInfo;
        //本模块UI处理
        this.loginView.loginSuccess();
        //UI跳转
        App.ViewManager.close(ViewConst.Login);
        var model = this.getControllerModel(ControllerConst.Login);
    };
    return LoginController;
}(BaseController));
egret.registerClass(LoginController,'LoginController');
//# sourceMappingURL=LoginController.js.map
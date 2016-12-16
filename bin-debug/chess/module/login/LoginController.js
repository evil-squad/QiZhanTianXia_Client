var LoginController = (function (_super) {
    __extends(LoginController, _super);
    function LoginController() {
        _super.call(this);
        //初始化UI
        this.loginView = new LoginView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Login, this.loginView);
        //初始化Proxy
        this.loginProxy = new LoginProxy(this);
        //注册模块间、模块内部事件监听
        //注册C2S消息
        this.registerFunc(LoginConst.LOGIN_REQ, this.onLogin, this);
        //注册S2C消息
        this.registerFunc(LoginConst.LOGIN_RESP, this.loginSuccess, this);
    }
    var d = __define,c=LoginController,p=c.prototype;
    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    p.onLogin = function (openId, code) {
        this.loginProxy.login(openId, code);
    };
    /**
     * 登陆成功处理
     */
    p.loginSuccess = function (userInfo) {
        //本模块UI处理
        this.loginView.loginSuccess();
        //UI跳转
        App.SceneManager.runScene(SceneConsts.Home);
    };
    return LoginController;
}(BaseController));
egret.registerClass(LoginController,'LoginController');
//# sourceMappingURL=LoginController.js.map
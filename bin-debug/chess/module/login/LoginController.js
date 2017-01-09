var LoginController = (function (_super) {
    __extends(LoginController, _super);
    function LoginController() {
        _super.call(this);
        //初始化UI
        this.loginView = new LoginView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Login, this.loginView);
        //初始化Proxy
        this.loginProxy = new LoginProxy(this);
    }
    var d = __define,c=LoginController,p=c.prototype;
    //注册模块间、模块内部事件监听
    p.addEvents = function () {
        //注册C2S消息
        this.registerFunc(LoginConst.LOGIN_REQ, this.onLogin, this);
        //注册S2C消息
        this.registerFunc(LoginConst.LOGIN_RESP, this.loginSuccess, this);
        this.registerFunc(LoginConst.ROOM_ENTER_RESP, this.enterResp, this);
    };
    p.removeEvents = function () {
        this.removeFunc(LoginConst.LOGIN_REQ);
        this.removeFunc(LoginConst.LOGIN_RESP);
        this.removeFunc(LoginConst.ROOM_ENTER_RESP);
    };
    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    p.onLogin = function (openId, code, nick) {
        this.loginProxy.login(openId, code, nick);
    };
    /**
     * 登陆成功处理
     */
    p.loginSuccess = function (userInfo) {
        //本模块UI处理
        this.loginView.loginSuccess();
        //UI跳转
        if (RoomManager.hasRoomInfo) {
            this.loginProxy.enterRoom();
        }
        else {
            App.SceneManager.runScene(SceneConsts.Home);
        }
    };
    p.enterResp = function (obj) {
        RoomManager.parsePlayers(obj.players, "login");
        App.SceneManager.runScene(SceneConsts.Room);
    };
    return LoginController;
}(BaseController));
egret.registerClass(LoginController,'LoginController');
//# sourceMappingURL=LoginController.js.map
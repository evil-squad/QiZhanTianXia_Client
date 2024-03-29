var HomeController = (function (_super) {
    __extends(HomeController, _super);
    function HomeController() {
        _super.call(this);
        this.proxy = new HomeProxy(this);
        this.homeView = new HomeView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Home, this.homeView);
    }
    var d = __define,c=HomeController,p=c.prototype;
    p.addEvents = function () {
        //注册C2S消息
        this.registerFunc(HomeConst.ROOM_CREATE_REQ, this.onCreate, this);
        this.registerFunc(HomeConst.ROOM_ENTER_REQ, this.onEnter, this);
        //注册S2C消息
        this.registerFunc(HomeConst.ROOM_CREATE_RESP, this.createResp, this);
        this.registerFunc(HomeConst.ROOM_ENTER_RESP, this.enterResp, this);
        this.registerFunc(HomeConst.GM, this.gmReq, this);
    };
    p.removeEvents = function () {
        this.removeFunc(HomeConst.ROOM_CREATE_REQ);
        this.removeFunc(HomeConst.ROOM_ENTER_REQ);
        this.removeFunc(HomeConst.ROOM_CREATE_RESP);
        this.removeFunc(HomeConst.ROOM_ENTER_RESP);
        this.removeFunc(HomeConst.GM);
    };
    p.onCreate = function () {
        this.proxy.createRoom();
    };
    p.onEnter = function () {
        this.proxy.enterRoom();
    };
    p.gmReq = function (cmd, body) {
        this.proxy.gmReq(cmd, body);
    };
    p.createResp = function (roomId) {
        this.homeView.createRoomSuccess();
        App.TipsUtils.showCenter("创建成功");
        this.proxy.enterRoom();
    };
    p.enterResp = function (obj) {
        RoomManager.parsePlayers(obj.players, "home");
        RoomManager.parseGameInfo(obj.gameInfo);
        App.SceneManager.runScene(SceneConsts.Room);
    };
    return HomeController;
}(BaseController));
egret.registerClass(HomeController,'HomeController');
//# sourceMappingURL=HomeController.js.map
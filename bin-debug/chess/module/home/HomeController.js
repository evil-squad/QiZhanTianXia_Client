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
    };
    p.removeEvents = function () {
        this.removeFunc(HomeConst.ROOM_CREATE_REQ);
        this.removeFunc(HomeConst.ROOM_ENTER_REQ);
        this.removeFunc(HomeConst.ROOM_CREATE_RESP);
        this.removeFunc(HomeConst.ROOM_ENTER_RESP);
    };
    p.onCreate = function () {
        this.proxy.createRoom();
    };
    p.onEnter = function () {
        this.proxy.enterRoom();
    };
    p.createResp = function (roomId, seatId) {
        this.homeView.createRoomSuccess();
        App.TipsUtils.showCenter("创建房间 roomId:" + roomId + " seatId:" + seatId);
    };
    p.enterResp = function (obj) {
        RoomManager.parsePlayers(obj.players, "home");
        App.SceneManager.runScene(SceneConsts.Room);
    };
    return HomeController;
}(BaseController));
egret.registerClass(HomeController,'HomeController');
//# sourceMappingURL=HomeController.js.map
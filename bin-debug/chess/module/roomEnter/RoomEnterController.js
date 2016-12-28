var RoomEnterController = (function (_super) {
    __extends(RoomEnterController, _super);
    function RoomEnterController() {
        _super.call(this);
        this.enterView = new RoomEnterPanel(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.RoomEnter, this.enterView);
        this.proxy = new RoomEnterProxy(this);
        this.registerFunc(HomeConst.ROOM_ENTER_REQ, this.onEnter, this);
        this.registerFunc(HomeConst.ROOM_ENTER_RESP, this.enterResp, this);
    }
    var d = __define,c=RoomEnterController,p=c.prototype;
    p.onEnter = function (roomid) {
        RoomManager.roomId = roomid;
        this.proxy.enterRoom(roomid);
    };
    p.enterResp = function (obj) {
        RoomManager.parsePlayers(obj.players, "room enter");
        App.SceneManager.runScene(SceneConsts.Room);
    };
    return RoomEnterController;
}(BaseController));
egret.registerClass(RoomEnterController,'RoomEnterController');
//# sourceMappingURL=RoomEnterController.js.map
var ServerChooseView = (function (_super) {
    __extends(ServerChooseView, _super);
    function ServerChooseView($controller, $parent) {
        _super.call(this, $controller, $parent);
        this.skinName = "resource/skins/ServerChooseSkin.exml";
    }
    var d = __define,c=ServerChooseView,p=c.prototype;
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.serverList.itemRenderer = ServerItemRenderer;
        this.serverList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listItemClickHandler, this);
    };
    p.listItemClickHandler = function (e) {
        Log.trace("list:", this.serverList.selectedItem);
        var item = this.serverList.selectedItem;
        if (item != undefined && item != null) {
            App.Socket.initServer(item.ip, item.port, new ByteArrayMsgByProtobuf());
            App.Socket.connect();
            App.MessageCenter.addListener(SocketConst.SOCKET_CONNECT, function () {
                Log.trace("[Startup]与服务器连接上");
                App.ViewManager.close(ViewConst.ServerChoose);
                App.ViewManager.open(ViewConst.Login);
            }, this);
            App.MessageCenter.addListener(SocketConst.SOCKET_RECONNECT, function () {
                Log.trace("[Startup]与服务器重新连接上");
            }, this);
            App.MessageCenter.addListener(SocketConst.SOCKET_START_RECONNECT, function () {
                Log.trace("[Startup]开始与服务器重新连接");
            }, this);
            App.MessageCenter.addListener(SocketConst.SOCKET_CLOSE, function () {
                Log.trace("[Startup]与服务器断开连接");
            }, this);
            App.MessageCenter.addListener(SocketConst.SOCKET_NOCONNECT, function () {
                Log.trace("[Startup]服务器连接不上");
            }, this);
            App.MessageCenter.addListener("10001", function (msg) {
                Log.trace("[Startup]收到服务器消息:", msg);
            }, this);
        }
    };
    return ServerChooseView;
}(BaseEuiView));
egret.registerClass(ServerChooseView,'ServerChooseView');
//# sourceMappingURL=ServerChooseView.js.map
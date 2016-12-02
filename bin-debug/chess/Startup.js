var Startup = (function () {
    function Startup() {
        var groupName = "preload";
        var subGroups = ["preload_core", "preload_ui"];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }
    var d = __define,c=Startup,p=c.prototype;
    /**
     * 资源组加载完成
     */
    p.onResourceLoadComplete = function () {
        this.initModule();
        App.Init();
        //音乐音效处理
        App.SoundManager.setBgOn(true);
        App.SoundManager.setEffectOn(!App.DeviceUtils.IsHtml5 || !App.DeviceUtils.IsMobile);
        App.SceneManager.runScene(SceneConsts.UI);
        //this.clientTest();
        //this.socketTest();
        Log.trace(App.ProtoFile.build("user_login_c2s"));
    };
    /**
     * 资源组加载进度
     */
    p.onResourceLoadProgress = function (itemsLoaded, itemsTotal) {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    };
    /**
     * 初始化所有模块
     */
    p.initModule = function () {
        App.ControllerManager.register(ControllerConst.Home, new ServerChooseController());
        App.ControllerManager.register(ControllerConst.Login, new LoginController());
        App.ControllerManager.register(ControllerConst.Home, new HomeController());
        //App.ControllerManager.register(ControllerConst.Friend, new FriendController());
        //App.ControllerManager.register(ControllerConst.Shop, new ShopController());
        //App.ControllerManager.register(ControllerConst.Warehouse, new WarehouseController());
        //App.ControllerManager.register(ControllerConst.Factory, new FactoryController());
        //App.ControllerManager.register(ControllerConst.Task, new TaskController());
        //App.ControllerManager.register(ControllerConst.Mail, new MailController());
    };
    p.clientTest = function () {
        //初始化simple_proto
        var message = dcodeIO.ProtoBuf.loadProto(RES.getRes("simple_proto"));
        //创建user_login_class
        var user_login_class = message.build("user_login_c2s");
        //创建一条消息
        var user_login = new user_login_class({
            "accid": 888,
            "tstamp": 999,
            "ticket": "haichao"
        });
        //序列化
        var bytes = user_login.toArrayBuffer();
        Log.trace("序列化数据：", bytes);
        //反序列化
        var new_user_login = user_login_class.decode(bytes);
        Log.trace("反序列化数据：", new_user_login);
    };
    p.socketTest = function () {
        //发送一条消息到服务器
        function send() {
            Log.trace("send");
            var msg = {};
            msg.key = "user_login_c2s";
            msg.body = {
                "accid": 888,
                "tstamp": 999,
                "ticket": "海潮"
            };
            var buf = new ByteArrayMsgByProtobuf();
            buf.encode(msg);
            App.Socket.send(msg);
        }
        App.Socket.connect();
        App.MessageCenter.addListener(SocketConst.SOCKET_CONNECT, function () {
            Log.trace("[Startup]与服务器连接上");
            send();
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_RECONNECT, function () {
            Log.trace("[Startup]与服务器重新连接上");
            send();
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
    };
    return Startup;
}());
egret.registerClass(Startup,'Startup');
//# sourceMappingURL=Startup.js.map
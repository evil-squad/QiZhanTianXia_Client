class Startup {
	public constructor() {
		var groupName:string = "preload";
        var subGroups:Array<string> = ["preload_core", "preload_ui"];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
	}

	/**
     * 资源组加载完成
     */
    private onResourceLoadComplete():void {
        this.initModule();
        App.Init();

        //音乐音效处理
        App.SoundManager.setBgOn(true);
        App.SoundManager.setEffectOn(!App.DeviceUtils.IsHtml5 || !App.DeviceUtils.IsMobile);

        App.SceneManager.runScene(SceneConsts.UI);

        //this.clientTest();
        //this.socketTest();

        Log.trace(App.ProtoFile.build("user_login_c2s"));
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    }

    /**
     * 初始化所有模块
     */
    private initModule():void{
        App.ControllerManager.register(ControllerConst.Home, new ServerChooseController());
        App.ControllerManager.register(ControllerConst.Login, new LoginController());
        App.ControllerManager.register(ControllerConst.Home, new HomeController());

        //App.ControllerManager.register(ControllerConst.Friend, new FriendController());
        //App.ControllerManager.register(ControllerConst.Shop, new ShopController());
        //App.ControllerManager.register(ControllerConst.Warehouse, new WarehouseController());
        //App.ControllerManager.register(ControllerConst.Factory, new FactoryController());
        //App.ControllerManager.register(ControllerConst.Task, new TaskController());
        //App.ControllerManager.register(ControllerConst.Mail, new MailController());
    }


    private clientTest():void{
        //初始化simple_proto
        var message = dcodeIO.ProtoBuf.loadProto(RES.getRes("simple_proto"));

        //创建user_login_class
        var user_login_class = message.build("user_login_c2s");

        //创建一条消息
        var user_login = new user_login_class({
            "accid" : 888,
            "tstamp" : 999,
            "ticket": "haichao"
        });

        //序列化
        var bytes = user_login.toArrayBuffer();
        Log.trace("序列化数据：", bytes);

        //反序列化
        var new_user_login = user_login_class.decode(bytes);
        Log.trace("反序列化数据：", new_user_login);
    }

    private socketTest():void{
        //发送一条消息到服务器
        function send():void{
            Log.trace("send");
            
            var msg:any = {};
            msg.key = "user_login_c2s";
            msg.body = {
                "accid" : 888,
                "tstamp" : 999,
                "ticket": "海潮"
            };
            var buf:ByteArrayMsgByProtobuf = new ByteArrayMsgByProtobuf();
            buf.encode(msg);
            App.Socket.send(msg);
        }

        App.Socket.connect();
        App.MessageCenter.addListener(SocketConst.SOCKET_CONNECT, ()=>{
            Log.trace("[Startup]与服务器连接上");
            send();
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_RECONNECT, ()=>{
            Log.trace("[Startup]与服务器重新连接上");
            send();
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_START_RECONNECT, ()=>{
            Log.trace("[Startup]开始与服务器重新连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_CLOSE, ()=>{
            Log.trace("[Startup]与服务器断开连接");
        }, this);
        App.MessageCenter.addListener(SocketConst.SOCKET_NOCONNECT, ()=>{
            Log.trace("[Startup]服务器连接不上");
        }, this);
        App.MessageCenter.addListener("10001", function(msg):void{
            Log.trace("[Startup]收到服务器消息:", msg);
        }, this);
    }
}
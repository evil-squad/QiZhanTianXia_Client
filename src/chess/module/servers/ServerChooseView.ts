class ServerChooseView extends BaseEuiView{
    public constructor($controller:BaseController, $parent:eui.Group) {
        super($controller, $parent);

        this.skinName = "resource/skins/ServerChooseSkin.exml";
    }

    public serverList:eui.List;

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void{
        super.initUI();

        this.serverList.itemRenderer = ServerItemRenderer;

        this.serverList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.listItemClickHandler,this);
	}

    private listItemClickHandler(e:egret.TouchEvent):void{
		Log.trace("list:",this.serverList.selectedItem);

        var item:any = this.serverList.selectedItem;
        if(item != undefined && item != null){
            App.Socket.initServer(item.ip, item.port, new ByteArrayMsgByProtobuf());
            App.Socket.connect();

            App.MessageCenter.addListener(SocketConst.SOCKET_CONNECT, ()=>{
                Log.trace("[Startup]与服务器连接上");
                App.ViewManager.close(ViewConst.ServerChoose);
                if (item.seletedIdex == 0) {
                    App.ViewManager.open(ViewConst.Home);
                }
                else {
                    App.ViewManager.open(ViewConst.Login);
                }
            }, this);
            App.MessageCenter.addListener(SocketConst.SOCKET_RECONNECT, ()=>{
                Log.trace("[Startup]与服务器重新连接上");
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
}
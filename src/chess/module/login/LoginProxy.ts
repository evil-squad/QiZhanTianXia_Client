class LoginProxy extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);

        //注册从服务器返回消息的监听
        this.receiveServerMsg(Cmd.LOGIN, this.loginSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_ENTER, this.enterRoomSuccess, this);
    }

    /**
     * 用户登陆
     * @param userName
     * @param pwd
     */
    public login(openId:string, code:number):void{
        var debug = App.lookupProtoMessage(Msg.DEBUG).create({ openid: openId });
        var wechat = App.lookupProtoMessage(Msg.WECHAT).create({ code: code });
        var body = {
            "head": App.Head,
            "debug": debug,
            "wechat": wechat
        };
        this.writeAndFlush(Cmd.LOGIN, body);
    }

    public enterRoom(){
        if (!RoomManager.hasRoomInfo) {
            App.TipsUtils.showCenter("无房间数据");
            return;
        }
        var body = {
            "head": App.Head,
            "ob": RoomManager.isOb,
            "roomid": RoomManager.roomId
        };
        this.writeAndFlush(Cmd.ROOM_ENTER, body);
    }

    /**
     * 用户登陆成功返回
     */
    public loginSuccess(obj:any):void{
        MainManager.setUserInfo(obj.player);
        this.applyFunc(LoginConst.LOGIN_RESP, obj);
    }

    private enterRoomSuccess(obj:any):void{
        this.applyFunc(LoginConst.ROOM_ENTER_RESP, obj);
    }
}
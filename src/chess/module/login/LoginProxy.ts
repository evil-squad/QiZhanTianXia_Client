class LoginProxy extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);

        //注册从服务器返回消息的监听
        this.receiveServerMsg(Cmd.LOGIN, this.loginSuccess, this);
    }

    /**
     * 用户登陆
     * @param userName
     * @param pwd
     */
    private logined:boolean = true;
    public login(openId:string, code:number):void{
        if(this.logined){
            var debug = App.lookupProtoMessage(Msg.DEBUG).create({ openid: openId });
            var wechat = App.lookupProtoMessage(Msg.WECHAT).create({ code: code });
            var body = {
                "head": App.Head,
                "debug": debug,
                "wechat": wechat
            };
            this.writeAndFlush(Cmd.LOGIN, body);
            return;
        }
        
        //this.logined = true;

        var debug = App.lookupProtoMessage(Msg.DEBUG).create({ openid: openId });
        var wechat = App.lookupProtoMessage(Msg.WECHAT).create({ code: code });

        var body = {
            "head": App.Head,
            "debug": debug,
            "wechat": wechat
        };

        var body2 = {
            "head": App.Head,
            "ob": 1,
            "roomid": "roomid123"///RoomManager.roomId
        };
        //this.writeAndFlush(Cmd.ROOM_ENTER, body2);

        // var body = App.lookupProtoMessage(Msg.EnterRoomReq).create({ head: App.Head, ob:1, roomid: RoomManager.roomId});
        
        var Message = App.lookupProtoMessage(Msg.LoginReq);

        var msg = Message.create(body);
        var bytes = Message.encode(msg).finish();

        var ob = Message.decode(bytes);
        //Log.trace(ob.roomid);

        
        
        var EnterRoomReq = App.lookupProtoMessage(Msg.EnterRoomReq);
        msg = EnterRoomReq.create(body2);
        bytes = EnterRoomReq.encode(msg).finish();
        ob = EnterRoomReq.decode(bytes);
        //Log.trace(ob.wechat.code);

        // Message.ob = false;
        // Message.head = App.Head;
        // Message.roomid = RoomManager.roomId;

        this.writeAndFlush(Cmd.LOGIN, body);
        this.writeAndFlush(Cmd.ROOM_ENTER, body2);
    }

    /**
     * 用户登陆成功返回
     */
    public loginSuccess(obj:any):void{
        MainManager.setUserInfo(obj.player);
        this.applyFunc(LoginConst.LOGIN_RESP, obj);
    }
}
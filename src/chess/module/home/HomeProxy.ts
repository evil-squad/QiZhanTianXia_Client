class HomeProxy extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);

        this.receiveServerMsg(Cmd.ROOM_CREATE, this.createRoomSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_ENTER, this.enterRoomSuccess, this);
    }

    public createRoom(){
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.ROOM_CREATE, body);
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

        // var body = App.lookupProtoMessage(Msg.EnterRoomReq).create({ head: App.Head, ob:1, roomid: RoomManager.roomId});
        
        // var Message = App.lookupProtoMessage("cspb.EnterRoomReq");
        // Message.ob = false;
        // Message.head = App.Head;
        // Message.roomid = RoomManager.roomId;

        this.writeAndFlush(Cmd.ROOM_ENTER, body);
    }

    private createRoomSuccess(obj:any):void{
        RoomManager.setRoomInfo(obj.roomid);
        this.applyFunc(HomeConst.ROOM_CREATE_RESP, RoomManager.roomId);
    }

    private enterRoomSuccess(obj:any):void{
        this.applyFunc(HomeConst.ROOM_ENTER_RESP, obj);
    }
}
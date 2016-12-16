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
        this.sendSocketCBMsg(Cmd.ROOM_CREATE, body);
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
        this.sendSocketCBMsg(Cmd.ROOM_ENTER, body);
    }

    private createRoomSuccess(obj:any):void{
        RoomManager.setRoomInfo(obj.roomid, obj.seatid);
        this.applyFunc(HomeConst.ROOM_CREATE_RESP, RoomManager.roomId, RoomManager.seatId);
    }

    private enterRoomSuccess(obj:any):void{
        this.applyFunc(HomeConst.ROOM_ENTER_RESP, obj);
    }
}
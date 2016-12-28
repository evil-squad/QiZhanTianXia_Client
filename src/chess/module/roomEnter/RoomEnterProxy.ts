class RoomEnterProxy  extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);

        //注册从服务器返回消息的监听
       this.receiveServerMsg(Cmd.ROOM_ENTER, this.enterRoomSuccess, this);
    }

	public enterRoom(roomid:string){
        var body = {
            "head": App.Head,
            "ob": RoomManager.isOb,
            "roomid": roomid
        };
        this.writeAndFlush(Cmd.ROOM_ENTER, body);
    }

	private enterRoomSuccess(obj:any):void{
		this.applyFunc(HomeConst.ROOM_ENTER_RESP, obj);
	}
}
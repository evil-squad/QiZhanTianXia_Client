class RoomProxy  extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);

        //注册从服务器返回消息的监听
       this.receiveServerMsg(Cmd.ROOM_DISMISS, this.dismissRoomSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_LEAVE, this.leaveRoomSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_PLAYER_INFO_GET, this.getRoomPlayersInfoSuccess, this);
    }

	public dismissRoom(){
		var body = {
            "head": App.Head
        };
        RoomManager.clearRoomInfo();
        this.writeAndFlush(Cmd.ROOM_LEAVE, body);
	}

	public leaveRoom():void{
		var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.ROOM_LEAVE, body);
	}

	public getRoomPlayersInfo(uids:any){
		var body = {
            "head": App.Head,
            "uid": uids
        };
        this.writeAndFlush(Cmd.ROOM_PLAYER_INFO_GET, body);
	}

	public dismissRoomSuccess(obj:any){
		this.applyFunc(HomeConst.ROOM_DISMISS_RESP, obj);
	}

	public leaveRoomSuccess(obj:any){
		this.applyFunc(HomeConst.ROOM_LEAVE_RESP, obj);
	}

	public getRoomPlayersInfoSuccess(obj:any){
		this.applyFunc(HomeConst.ROOM_PLAYERS_GET_RESP, obj);
	}
}
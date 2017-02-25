class RoomProxy  extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);

        //注册从服务器返回消息的监听
        this.receiveServerMsg(Cmd.ROOM_DISMISS, this.dismissRoomSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_ASK_DISMISS, this.askDismissSuccess, this);        
        this.receiveServerMsg(Cmd.ROOM_LEAVE, this.leaveRoomSuccess, this);
        this.receiveServerMsg(Cmd.ROOM_PLAYER_INFO_GET, this.getRoomPlayersInfoSuccess, this);

        this.receiveServerMsg(Cmd.READY_FOR_START, this.onReadyForStart, this);
        this.receiveServerMsg(Cmd.BET, this.onBet, this);        
        this.receiveServerMsg(Cmd.HIT, this.onHit, this);
        this.receiveServerMsg(Cmd.STAND, this.onStand, this);
        this.receiveServerMsg(Cmd.GET_GAME_DATA, this.onGetGameData, this);
    }

	public dismissRoom(){
		var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.ROOM_DISMISS, body);
	}

    public askDismissRoom(){
		var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.ROOM_ASK_DISMISS, body);
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
        RoomManager.clearRoomInfo();
		this.applyFunc(RoomConst.ROOM_DISMISS_RESP, obj);
	}

    public askDismissSuccess(obj:any){
        this.applyFunc(RoomConst.ROOM_ASK_DISMISS_RESP, obj.waitSeconds);
    }

	public leaveRoomSuccess(obj:any){
		this.applyFunc(RoomConst.ROOM_LEAVE_RESP, obj);
	}

	public getRoomPlayersInfoSuccess(obj:any){
		this.applyFunc(RoomConst.ROOM_PLAYERS_GET_RESP, obj);
	}

    //
    public readyForStartReq(){
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.READY_FOR_START, body);
	} 

	public betReq(bet:number){
        var body = {
            "head": App.Head,
            "bet": bet
        };
        this.writeAndFlush(Cmd.BET, body);
	}

	public hitReq(){
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.HIT, body);
	}

	public standReq(){
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.STAND, body);
	}

	public getGameDataReq(){
        var body = {
            "head": App.Head
        };
        this.writeAndFlush(Cmd.GET_GAME_DATA, body);
	}

    //
    private onReadyForStart(obj:any){
        this.applyFunc(RoomConst.READY_FOR_START_RESP, obj);
    }

    private onBet(obj:any){
        this.applyFunc(RoomConst.BET_RESP, obj);
    }

    private onHit(obj:any){
        this.applyFunc(RoomConst.HIT_RESP, obj);
    }

    private onStand(obj:any){
        this.applyFunc(RoomConst.STAND_RESP, obj);
    }

    private onGetGameData(obj:any){
        this.applyFunc(RoomConst.GET_GAME_DATA_RESP, obj);
    }

    public gmReq(cmd:number,msg:string){
        var body = {
            "head":App.Head,
            "cmd":cmd,
            "text":msg
        };
        this.writeAndFlush(Cmd.GM, body);
    }
}
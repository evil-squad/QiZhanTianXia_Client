class ReplyDismissProxy  extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);

        //注册从服务器返回消息的监听
       this.receiveServerMsg(Cmd.ROOM_REPLY_DISMISS, this.replyDismissRoomSuccess, this);
    }

	public replyDismiss(agree:boolean){
        var body = {
            "head": App.Head,
            "agree": agree
        };
        this.writeAndFlush(Cmd.ROOM_REPLY_DISMISS, body);
    }

	private replyDismissRoomSuccess(obj:any):void{
		this.applyFunc(RoomConst.ROOM_REPLY_DISMISS_RESP, obj);
	}
}
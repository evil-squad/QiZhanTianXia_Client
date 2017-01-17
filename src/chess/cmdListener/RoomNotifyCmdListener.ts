class RoomNotifyCmdListener extends BaseProxy{

	public constructor($controller:BaseController){
		super($controller);
		this.receiveServerMsg(Cmd.ROOM_NOTIFY, this.onRoomNotify, this);
	}

	private onRoomNotify(obj:any):void{

		switch(obj.notify.type){
			case NotifyType.NOOP:
			break;
			case NotifyType.ROOM_CLOSE:
				this.closeRoom(obj.notify);
			break;
			case NotifyType.PLAYER_ENTER:// 进入通知: 房间所有人(不包括进入者自己)
				this.playerEnter(obj.notify);
			break;
			case NotifyType.PLAYER_LEAVE:// 离开通知: 房间所有人(不包括退出者自己)
				this.playerLeave(obj.notify);
			break;
			case NotifyType.ASK_DISMISS_ROOM:// 解散通知: 不包括解散者自己, 包括ob
				this.askDismissRoom(obj.notify);
			break;
			case NotifyType.ROOM_START:
				this.startRoom(obj.notify);
			break;
			case NotifyType.REPLY_DISMISS_ROOM:
				this.replyDismissRoom(obj.notify);
			break;
			case NotifyType.FAIL_DISMISS_ROOM:
				this.failDismissRoom(obj.notify);
			break;
			default:
				App.TipsUtils.showCenter("未知通知："+obj.notify.type)
			break;
		}
	}

	private closeRoom(obj:any):void{
		var roomCloseInfo = obj.roomClose;
		if(RoomManager.hasRoomInfo && roomCloseInfo.roomid == RoomManager.roomId){
			switch(roomCloseInfo.reason){
				case RoomCloseReason.EMPTY:
					App.TipsUtils.showCenter("房间无人");
				break;
				case RoomCloseReason.DISMISS:
					App.TipsUtils.showCenter("房间已解散");
				break;
				case RoomCloseReason.ROOMSRV_CLOSE:
					App.TipsUtils.showCenter("服务器停服");
				break;
			}
			if(App.SceneManager.getCurrScene() != SceneConsts.Home.valueOf()){
				App.SceneManager.runScene(SceneConsts.Home);//返回主页
			}
			App.SceneManager.runScene(SceneConsts.Home);//返回Home页
		}else{
			App.TipsUtils.showCenter("房间关闭数据有误"+roomCloseInfo.roomid);
		}
	}

	private playerEnter(obj:any):void{
		var playerEnterInfo = obj.playerEnter;
		if(RoomManager.hasRoomInfo){
			RoomManager.addPlayer(playerEnterInfo.enterer);
			if(App.SceneManager.getCurrScene() != SceneConsts.Room.valueOf()){
				App.SceneManager.runScene(SceneConsts.Room);//进入房间
			}else{//刷新房间
				App.MessageCenter.dispatch(NotifyConst.PLAYER_ENTER);
			}
		}else{
			Log.trace(obj);
			App.TipsUtils.showCenter("系统错误：无房间信息，玩家不可进入");
		}
	}

	private playerLeave(obj:any):void{
		var playerLeaveInfo = obj.playerLeave;
		var leaver = playerLeaveInfo.leaver;
		if(leaver != undefined && leaver != null){
			//移除相应玩家
			RoomManager.removePlayer(leaver.uid);//bool ob,int 32 idx
			//刷新房间
			App.MessageCenter.dispatch(NotifyConst.PLAYER_LEAVE);
		}
	}

	private askDismissRoom(obj:any):void{
		var askDismissInfo = obj.askDismiss;
		var dismisser = askDismissInfo.dismisser;
		if(dismisser != undefined && dismisser != null){
			var ask_second = askDismissInfo.askSecond;
			var wait_seconds = askDismissInfo.waitSeconds;
			var info = RoomManager.getPlayer(dismisser);
			if(info != null){
				App.TipsUtils.showCenter(info.nick+"发起解散，发起时间："+ask_second+"，剩余时间："+wait_seconds);

				//弹出同意/不同意对话框
				App.ViewManager.open(ViewConst.ReplyDismiss);
			}else{
				App.TipsUtils.showCenter("系统错误：该玩家不可发起解散请求，玩家id="+dismisser);
			}
		}
		App.ViewManager.open(ViewConst.ReplyDismiss);
	}

	private startRoom(obj:any):void{
		var roomStartInfo = obj.roomStart;
		var roomId = roomStartInfo.roomid;
		if(RoomManager.hasRoomInfo && RoomManager.roomId == roomId){
			//人齐了, 牌局开始
			App.MessageCenter.dispatch(NotifyConst.ROOM_START);
		}else{
			App.TipsUtils.showCenter("系统错误：游戏开始失败，不在此房间，roomid="+roomId);
		}
	}

	private replyDismissRoom(obj:any):void{
		var reply_dismiss = obj.replyDismiss;
		var replier:number = reply_dismiss.replier;
		var agree:boolean = reply_dismiss.agree;
		if(agree){
			App.TipsUtils.showCenter("同意解散");
		}else{
			App.TipsUtils.showCenter("不同意解散");
		}
	}

	private failDismissRoom(obj:any):void{
		var fail_dismiss = obj.failDismiss;
		var roomid:string = fail_dismiss.roomid;
		var reason:number = fail_dismiss.reason;
		if(reason == 0){
			App.TipsUtils.showCenter("解除失败，多数不同意");
		}else{
			App.TipsUtils.showCenter("解除失败，原因未知，reason="+reason);
		}
	}
}
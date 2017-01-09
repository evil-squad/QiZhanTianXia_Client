class RoomNotifyCmdListener extends BaseProxy{

	public constructor($controller:BaseController){
		super($controller);
		this.receiveServerMsg(Cmd.ROOM_NOTIFY, this.onRoomNotify, this);
	}

	private onRoomNotify(obj:any):void{

		switch(obj.type){
			case NotifyType.NOOP:
			break;
			case NotifyType.ROOM_CLOSE:
				this.closeRoom(obj);
			break;
			case NotifyType.PLAYER_ENTER:// 进入通知: 房间所有人(不包括进入者自己)
				this.playerEnter(obj);
			break;
			case NotifyType.PLAYER_LEAVE:// 离开通知: 房间所有人(不包括退出者自己)
				this.playerLeave(obj);
			break;
			case NotifyType.ROOM_DISMISS_REQ:// 解散通知: 不包括解散者自己, 包括ob
				this.reqDismissRoom(obj);
			break;
			case NotifyType.ROOM_START:
				this.startRoom(obj);
			break;
		}
	}

	private closeRoom(obj:any):void{
		var roomCloseInfo = obj.room_close;
		if(RoomManager.hasRoomInfo && roomCloseInfo.roomid == RoomManager.roomId){
			switch(roomCloseInfo.reason){
				case RoomCloseReqson.EMPTY:
					App.TipsUtils.showCenter("房间无人");
				break;
				case RoomCloseReqson.DISMISS:
					App.TipsUtils.showCenter("房间已解散");
				break;
				case RoomCloseReqson.ROOMSRV_CLOSE:
					App.TipsUtils.showCenter("服务器停服");
				break;
			}
			if(App.SceneManager.getCurrScene != SceneConsts.Home.valueOf){
				App.SceneManager.runScene(SceneConsts.Home);//返回主页
			}
			App.SceneManager.runScene(SceneConsts.Home);//返回Home页
		}else{
			App.TipsUtils.showCenter("房间关闭数据有误"+roomCloseInfo.roomid);
		}
	}

	private playerEnter(obj:any):void{
		var playerEnterInfo = obj.player_enter;
		RoomManager.addPlayer(playerEnterInfo);
		if(App.SceneManager.getCurrScene != SceneConsts.Room.valueOf){
			App.SceneManager.runScene(SceneConsts.Room);//进入房间
		}else{//刷新房间
			App.MessageCenter.dispatch(NotifyConst.PLAYER_ENTER);
		}
	}

	private playerLeave(obj:any):void{
		var playerLeaveInfo = obj.player_leave;
		var leaver = playerLeaveInfo.leaver;
		if(leaver != undefined && leaver != null){
			//移除相应玩家
			RoomManager.removePlayer(leaver.uid);//bool ob,int 32 idx
			//刷新房间
			App.MessageCenter.dispatch(NotifyConst.PLAYER_LEAVE);
		}
	}

	private reqDismissRoom(obj:any):void{
		var roomDismissInfo = obj.room_dismiss;
		var dismisser = roomDismissInfo.dismisser;
		if(dismisser != undefined && dismisser != null){
			var info = RoomManager.getPlayer(dismisser.uid);
			App.TipsUtils.showCenter(info.nick+"发起解散");
		}
	}

	private startRoom(obj:any):void{
		var roomStartInfo = obj.room_start;
		var roomId = roomStartInfo.roomid;
		if(RoomManager.hasRoomInfo && RoomManager.roomId == roomId){
			//人齐了, 牌局开始
			App.MessageCenter.dispatch(NotifyConst.ROOM_START);
		}
	}
}
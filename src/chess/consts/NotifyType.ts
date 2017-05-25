class NotifyType {
	
	public static NOOP:number = 0;
	public static ROOM_CLOSE:number = 1;
	public static PLAYER_ENTER:number = 2;
	public static PLAYER_LEAVE:number = 3;
	public static ASK_DISMISS_ROOM:number = 4;
	//public static ROOM_START:number = 5;
	public static REPLY_DISMISS_ROOM:number = 5;
	public static FAIL_DISMISS_ROOM:number = 6;

	// 玩家已准备(报名)
	public static PLAYER_READY:number = 7;
	// 游戏开始(意味着要扣房卡)
	public static ROOM_START:number = 8;
	// 切换到下一局
	public static GO_NEXT_ROUND:number = 9;
	// 一局开始, 开始倒计时, 接受其他参加者发起PLAYER_READY(报名)
	public static ROUND_START:number = 10;
	// 报名结束(倒计时结束或全部房间中的玩家已报名), 开始下注倒计时
	public static BETTING_START:number = 11;
	// 玩家下注
	public static PLAYER_BET:number = 12;
	// 下注结束, 开始要牌
	public static PLAYING_START:number = 13;
	// 更新当前可下注玩家
	public static UPDATE_CUR_BETTING_UID:number = 14;
	// 更新当前可要牌玩家
	public static UPDATE_CUR_PLAYING_UID:number = 15;
	// 玩家获得一张可见牌
	public static PLAYER_HIT:number= 16;
	// 玩家已经停牌
	public static PLAYER_STAND:number = 17;
	// 当所有人都停牌或倒计时结束, 一局结束(通知胜负和分数结算)
	public static ROUND_FINISH:number = 18;
	// 房卡用完, 最终结束(游戏过程被存储, 房间会被回收)
	public static GAME_FINISH:number = 19;

	public static getDesc(type:number):string{

		switch(type){
			case NotifyType.ROOM_CLOSE: return "房间关闭";
			case NotifyType.PLAYER_ENTER: return "玩家进入房间";
			case NotifyType.PLAYER_LEAVE: return "玩家离开房间";
			case NotifyType.ASK_DISMISS_ROOM: return "请求解散房间";
			case NotifyType.REPLY_DISMISS_ROOM: return "回复解散房间";
			case NotifyType.FAIL_DISMISS_ROOM: return "解散房间失败";

			case NotifyType.PLAYER_READY: return "有玩家已准备好了";
			case NotifyType.ROOM_START: return "游戏开始了";
			case NotifyType.GO_NEXT_ROUND: return "切换到下一局";
			case NotifyType.ROUND_START: return "一局开始了";
			case NotifyType.BETTING_START: return "报名结束，可以开始下注了";
			case NotifyType.PLAYER_BET: return "有玩家下注了";
			case NotifyType.UPDATE_CUR_BETTING_UID: return "更新当前可下注玩家";
			case NotifyType.UPDATE_CUR_PLAYING_UID: return "更新当前可要牌玩家";
			case NotifyType.PLAYER_HIT: return "玩家获得一张可见牌";
			case NotifyType.PLAYING_START: return "下注结束，可以要牌了";
			case NotifyType.PLAYER_STAND: return "有玩家已经停牌/爆牌了";
			case NotifyType.ROUND_FINISH: return "一局结束了";
			case NotifyType.GAME_FINISH: return "游戏结束了";

		}

		return "";
	}

}
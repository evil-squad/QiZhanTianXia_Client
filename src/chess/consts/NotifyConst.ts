class NotifyConst {
	
	public static NOOP:string = "NotifyType.NOOP";
	public static ROOM_CLOSE:string = "NotifyType.ROOM_CLOSE";
	public static PLAYER_ENTER:string = "NotifyType.PLAYER_ENTER";
	public static PLAYER_LEAVE:string = "NotifyType.PLAYER_LEAVE";
	public static ROOM_DISMISS_REQ:string = "NotifyType.ROOM_DISMISS_REQ";
	//public static ROOM_START:string = "NotifyType.ROOM_START";

	// 玩家已准备(报名)
	public static PLAYER_READY:string = "NotifyType.PLAYER_READY";
	// 游戏开始(意味着要扣房卡)
	public static ROOM_START:string = "NotifyType.ROOM_START";
	// 切换到下一局
	public static GO_NEXT_ROUND:string = "NotifyType.GO_NEXT_ROUND";
	// 一局开始, 开始倒计时, 接受其他参加者发起PLAYER_READY(报名)
	public static ROUND_START:string = "NotifyType.ROUND_START";
	// 报名结束(倒计时结束或全部房间中的玩家已报名), 开始下注倒计时
	public static BETTING_START:string = "NotifyType.BETTING_START";
	// 玩家下注
	public static PLAYER_BET:string = "NotifyType.PLAYER_BET";
	// 下注结束, 开始要牌
	public static PLAYING_START:string = "NotifyType.PLAYING_START";
	// 更新当前可下注玩家
	public static UPDATE_CUR_BETTING_UID:string = "NotifyType.UPDATE_CUR_BETTING_UID";
	// 更新当前可要牌玩家
	public static UPDATE_CUR_PLAYING_UID:string = "NotifyType.UPDATE_CUR_PLAYING_UID";
	// 玩家获得一张可见牌
	public static PLAYER_HIT:string= "PLAYER_HIT";
	// 玩家已经停牌
	public static PLAYER_STAND:string = "NotifyType.PLAYER_STAND";
	// 当所有人都停牌或倒计时结束, 一局结束(通知胜负和分数结算)
	public static ROUND_FINISH:string = "NotifyType.ROUND_FINISH";
	// 房卡用完, 最终结束(游戏过程被存储, 房间会被回收)
	public static GAME_FINISH:string = "NotifyType.GAME_FINISH";
}
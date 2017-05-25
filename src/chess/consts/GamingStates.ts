class GamingStates {
	/**
	 * 不在牌局/观看
	 */
	public static NONE:number = 0;
	/**
	 * 等待中
	 */
	public static WAITING:number = 1;
	/**
	 * 已准备
	 */
	public static PLAYER_READY:number = 2;
	/**
	 * 房间开始，意味着要扣房卡：8
	 */
	public static ROOM_START:number = 20;
	/**
	 * 一局开始, 开始倒计时, 接受其他参加者发起PLAYER_READY(报名)
	 */
	public static ROUND_START:number = 21;
	/**
	 * 已下注
	 */
	//public static BETTING:number = 3;//PLAYER_BET
	/**
	 * 开始下注：11
	 */
	public static BETTING_START:number = 30;
	/**
	 * 玩家下注：12
	 */
	public static PLAYER_BET:number = 31;
	/**
	 * 下注结束, 开始要牌：13
	 */
	public static PLAYING_START:number = 32;

	/**
	 * 要牌中：某玩家要牌，其他玩家等待
	 */
	public static SWITCH_BETTING:number = 33;
	/**
	 * 要牌中：某玩家要牌，其他玩家等待
	 */
	public static SWITCH_BET_WAITING:number = 34;
	/**
	 * 要牌中：某玩家要牌，其他玩家等待
	 */
	public static SWITCH_GETTING:number = 4;
	/**
	 * 要牌中：某玩家要牌，其他玩家等待
	 */
	public static SWITCH_GET_WAITING:number = 41;
	/**
	 * 游戏中/他人要牌中
	 */
	//public static GAMING:number = 5;
	/**
	 * 已停牌
	 */
	public static PLAYER_STAND:number = 6;
	/**
	 * 已爆牌
	 */
	public static BOOM:number = 7;
	/**
	 * 结算中
	 */
	public static SETTLEMENT:number = 8;
	/**
	 * 牌局结束
	 */
	public static ROUND_FINISH:number = 9;

	public static getName(type:number):string{
		switch(type){
			case GamingStates.WAITING:return "WAITING";
			case GamingStates.PLAYER_READY:return "PLAYER_READY";
			case GamingStates.ROOM_START:return "ROOM_START";
			case GamingStates.BETTING_START:return "BETTING_START";
			case GamingStates.PLAYER_BET:return "PLAYER_BET";
			case GamingStates.PLAYING_START:return "PLAYING_START";
			//case GamingStates.GETTING:return "GETTING";
			//case GamingStates.GAMING:return "GAMING";
			case GamingStates.PLAYER_STAND:return "PLAYER_STAND";
			case GamingStates.BOOM:return "BOOM";
			case GamingStates.SETTLEMENT:return "SETTLEMENT";
			case GamingStates.ROUND_FINISH:return "END";
		}
		return "";
	}
}
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
	public static READY_GET:number = 2;
	/**
	 * 已下注
	 */
	public static BETTING:number = 3;
	/**
	 * 要牌中
	 */
	public static GETTING:number = 4;
	/**
	 * 游戏中/他人要牌中
	 */
	public static GAMING:number = 5;
	/**
	 * 已停牌
	 */
	public static STOP:number = 6;
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
	public static END:number = 9;
}
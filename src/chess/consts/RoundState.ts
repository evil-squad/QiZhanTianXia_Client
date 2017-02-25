class RoundState {
	
	// 本局刚初始化, 接受报名
	public static INITED = 0;
	// 本局刚开始, 报名计时开始, 接受报名
	public static START = 1;
	// 本局开始下注
	public static BETTING = 2;
	// 本局开始玩牌(要牌/停牌)
	public static PLAYING = 3;
	// 本局完成(玩牌计时结束/全部停牌)
	public static FINISH = 4;

}
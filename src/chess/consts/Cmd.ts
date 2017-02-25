class Cmd {
	
    public static GM:number = 901;
	public static LOGIN:number = 1;
    public static ROOM_CREATE:number = 101;
    public static ROOM_DISMISS:number = 102;
    public static ROOM_ENTER:number = 103;
    public static ROOM_LEAVE:number = 104;
    public static ROOM_PLAYER_INFO_GET:number = 105;
    public static ROOM_NOTIFY:number = 106;
    public static ROOM_ASK_DISMISS:number = 107;
    public static ROOM_REPLY_DISMISS:number = 108;

    // game
	// 玩家点开始按钮, 表示准备好开局
	public static READY_FOR_START:number = 201;
	// 下注
	public static BET:number = 202;
	// 要牌
	public static HIT:number = 203;
	// 请求停牌
	public static STAND:number = 204;
	// 请求牌局数据(可能由于掉线需要重新拉取)
	public static GET_GAME_DATA:number = 205;
}
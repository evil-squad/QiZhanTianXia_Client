class MainManager {
	public constructor() {
	}

	public static logged:boolean = false;

	private static _userId:number;
	private static _userInfo:UserInfo;

	private static _bankerUid:number = 0;

	private static _openId:string = null;
	private static _nick:string;
	private static _code:number;

	public static setUserInfo(player:any){
		this._userInfo = new UserInfo(player);
		this._userId = this._userInfo.uid;
		App.Head.uid = player.uid;
	}

	public static get userId():number{
		return this._userId;
	}

	public static get userInfo():UserInfo{
		return this._userInfo;
	}

	public static get bankerUid():number{
		return this._bankerUid;
	}

	public static set bankerUid(value:number){
		this._bankerUid = value;
	}

	public static get bankerNick():string {
		if(this._bankerUid != 0){
			var banker = RoomManager.getPlayer(this._bankerUid);
			if(banker != null) return banker.nick;
		}
		return null;
	}

	public static initLoginInfo(openId:string,nick:string,code:number):void{
		this._openId = openId;
		this._nick = nick;
		this._code = code;
	}

	public static autologin():void{
		if(this._openId == null) return;
		var debug = App.lookupProtoMessage(Msg.DEBUG).create({ openid: this._openId, nick: this._nick });
        var wechat = App.lookupProtoMessage(Msg.WECHAT).create({ code: this._code });
        var body = {
            "head": App.Head,
            "debug": debug,
            "type":0//DEBUG:0,WECHAT:1
            //"wechat": wechat
        };
		App.Socket.writeAndFlush(Cmd.LOGIN, 0, body);
	}
}
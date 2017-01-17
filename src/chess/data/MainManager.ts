class MainManager {
	public constructor() {
	}

	private static _userId:number;
	private static _userInfo:UserInfo;

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
}
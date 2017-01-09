/**
 * storepb.Player
 */
class UserInfo {
	
	private _uid:number;
	private _nick:string;
	private _icon:egret.ByteArray;
	private _lastLoginTime:number;
	private _roomCard:number;

	public constructor(pbObj:any) {
		if (pbObj == null)
            return;
        this._uid = pbObj.uid;
        this._nick = pbObj.nick;
        this._icon = pbObj.icon;
        this._lastLoginTime = pbObj.last_login_time;
		this._roomCard = pbObj.room_card;
	}

	public get uid():number{
		return this._uid;
	}

	public get nick():string{
		return this._nick;
	}

	public get roomCard():number{
		return this._roomCard;
	}
}
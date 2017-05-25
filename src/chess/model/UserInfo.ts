/**
 * storepb.Player
 */
class UserInfo {
	
	private _uid:number;
	private _nick:string;
	private _icon:egret.ByteArray;
	private _lastLoginTime:number;
	private _roomCard:number = 0;

	public constructor(pbObj:any) {
		if (pbObj == null)
            return;
        this._uid = pbObj.uid;
        this._nick = pbObj.nick;
        this._icon = pbObj.icon;
        this._lastLoginTime = pbObj.lastLoginTime;
		this._roomCard = pbObj.roomCard;
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
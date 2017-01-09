/**
 * roompb.PleyerInfo
 */
class PlayerInfo {
	
	private _onlineId:number;
	private _uid:number;
	private _nick:string;

	private _seatId:number;

	private _obId:number;
	private _ob:boolean;

	private _icon:egret.ByteArray;
	private _ip:string;
	private _inRoom:boolean;
	

	public constructor(pbObj:any) {
		if (pbObj == null)
            return;
        this._onlineId = pbObj.role_time;
        this._uid = pbObj.uid;
        this._nick = pbObj.nick;

        this._seatId = pbObj.seatid;
		this._obId = pbObj.obid;
        this._ob = pbObj.ob;

		this._icon = pbObj.icon;
		this._ip = pbObj.ip;
		this._inRoom = pbObj.in_room;
	}

	public get uid():number{
		return this._uid;
	}

	public get nick():string{
		return this._nick;
	}

	public get seatId():number{
		return this._seatId;
	}

	public get obId():number{
		return this._obId;
	}

	public get isOb():boolean{
		return this._ob;
	}

	public get inRoom():boolean{
		return this._inRoom;
	}
}
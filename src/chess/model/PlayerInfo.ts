class PlayerInfo {
	
	private _uid:number;
	private _nick:string;
	private _onlineId:number;

	private _roomId:string;
	private _seatId:number;
	private _obId:number;
	private _ob:boolean;

	public constructor(pbObj:any) {
		if (pbObj == null)
            return;
        this._uid = pbObj.uid;
        this._nick = pbObj.nick;
        this._onlineId = pbObj.role_time;

        this._roomId = pbObj.roomid;
        this._seatId = pbObj.seatid;
		this._obId = pbObj.obid;
        this._ob = pbObj.ob;
	}

	

	public get uid():number{
		return this._uid;
	}

	public get nick():string{
		return this._nick;
	}

	public get roomId():string{
		return this._roomId;
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
}
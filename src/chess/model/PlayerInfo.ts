class PlayerInfo {
	
	private _id:string;
	private _uid:number;
	private _nick:string;
	private _roleTime:number;
	private _coins:number;
	private _lastLoginTime:number;

	public constructor(pbObj:any) {
		if (pbObj == null)
            return;
		this._id = pbObj.id;
        this._uid = pbObj.uid;
        this._nick = pbObj.nick;
        this._roleTime = pbObj.role_time;
        this._coins = pbObj.coins;
        this._lastLoginTime = pbObj.last_login_time;
	}

	public get id():string{
		return this._id;
	}

	public get uid():number{
		return this._uid;
	}

	public get nick():string{
		return this._nick;
	}

	public get coins():number{
		return this._coins;
	}
}
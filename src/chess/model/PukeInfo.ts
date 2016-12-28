class PukeInfo {
	private _id:number;
	private _pid:number;

	public set id(value:number){
		this._id = value;
	}

	public get id():number{
		return this._id;
	}

	public set pid(value:number){
		this._pid = value;
	}

	public get pid():number{
		return this._pid;
	}
}
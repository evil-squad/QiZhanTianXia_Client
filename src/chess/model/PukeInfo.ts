class PukeInfo {
	private _id:number;
	private _pid:number;
	private _points:number;

	public constructor(pid:number) {
		this._pid = pid;
	}

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

	public set points(value:number){
		this._points = value;
	}

	public get points():number{
		return this._points;
	}
}
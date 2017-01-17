class GamingManager {
	public constructor() {
	}

	private static _state:number = GamingStates.NONE;

	public static set state(value:number){
		this._state = value;
	}

	public static get state():number{
		return this._state;
	}

}
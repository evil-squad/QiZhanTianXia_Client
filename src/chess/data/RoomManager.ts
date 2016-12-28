class RoomManager {

	public static MAX_PLAYER_CNT:number = 4;

	private static _players:Array<PlayerInfo> = new Array<PlayerInfo>();

	private static _isOb:boolean = false;
	private static _roomId:string;
	private static _seatId:number;

	public constructor() {
	}

	public static get playerIds():Array<number>{
		var uids = new Array();
        for (var i = 0; i < RoomManager.playerCount; i++) {
            uids.push(this._players[i].uid);
        }
        return uids;
	}

	public static addPlayer(player):number{
		if (this._players.length > RoomManager.MAX_PLAYER_CNT) {
            return -1;
        }
        return this._players.push(player);
	}

	public static parsePlayers(players:any,source:string):void{
		Log.trace("parse",source);
        RoomManager.clearPlayers();
        for (var i = 0; i < players.length; i++) {
            RoomManager.addPlayer(new PlayerInfo(players[i]));
        }
	}

	public static setRoomInfo(roomId:string,seatId:number){
		this._roomId = roomId;
		this._seatId = seatId;
	}

	public static clearPlayers():void{
		this._players = [];
	}

	public static get playerCount():number{
		return this._players.length;
	}

	public static get players():Array<PlayerInfo>{
		return this._players;
	}

	public static set isOb(value:boolean){
		this._isOb = value;
	}

	public static get isOb():boolean{
		return this._isOb;
	}

	public static set roomId(value:string){
		this._roomId = value;
	}

	public static get roomId():string{
		return this._roomId;
	}

	public static set seatId(value:number){
		this._seatId = value;
	}

	public static get seatId():number{
		return this._seatId;
	}

	public static get hasRoomInfo():boolean{
		return this._roomId != null && this._roomId != "";
	}

	public static clearRoomInfo():void{
		this._roomId = null;
        this._seatId = 0;
	}
}
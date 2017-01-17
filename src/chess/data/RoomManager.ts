class RoomManager {

	public static MAX_PLAYER_CNT:number = 4;

	private static _players:Array<any> = new Array<any>();

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

	public static addPlayer(player:any):number{
		if (this._players.length > RoomManager.MAX_PLAYER_CNT) {
            return -1;
        }
        return this._players.push(player);
	}

	public static removePlayer(uid:number):boolean{
		var count:number = RoomManager.playerCount;
		for(var i=0; i<count; i++){
			if(this._players[i].uid == uid){
				this._players.splice(i,1);
				return true;
			}
		}
		return false;
	}

	public static getPlayer(uid:number):PlayerInfo{
		var count:number = RoomManager.playerCount;
		for(var i=0; i<count; i++){
			if(this._players[i].uid == uid){
				return this._players[i];
			}
		}
		return null;
	}

	public static parsePlayers(players:any,source:string):void{
		Log.trace("parse",source);
        RoomManager.clearPlayers();
        for (var i = 0; i < players.length; i++) {
            RoomManager.addPlayer(players[i]);
        }
	}

	public static setRoomInfo(roomId:string){
		this._roomId = roomId;
	}

	public static clearPlayers():void{
		this._players = [];
	}

	public static get playerCount():number{
		return this._players.length;
	}

	public static get players():Array<any>{
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
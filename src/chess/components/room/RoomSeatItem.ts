class RoomSeatItem extends eui.Component{

	private nickLbl:eui.Label;
	private betLbl:eui.Label;
	private stateLbl:eui.Label;

	private container:eui.Group;

	private _info:any;
	private _state:number;

	public constructor() {
		super();

		this.skinName = "resource/skins/RoomSeatItemSkin.exml";

		var sp:egret.Shape = new egret.Shape();
		sp.graphics.beginFill(0xcccccc,.9);
		sp.graphics.drawRect(0,0,120,120);
		sp.graphics.endFill();
		this.addChildAt(sp,0);
	}

	public set info(value:any){
		this._info = value;
		this.nickLbl.text = this._info.nick;
		this.state = GamingStates.NONE;
	}

	public get info():any{
		return this._info;
	}

	public set bet(value:number){
		this.betLbl.text = ""+value;
	}

	public set isBanker(value:boolean){
		if(value){
			this.nickLbl.text = "[庄]"+this._info.nick;
		}else{
			this.nickLbl.text = this._info.nick;
		}
	}

	public revert():void{
		this.isBanker = false;
	}

	public set state(value:number){
		this._state = value;
		switch(this._state){
			case GamingStates.NONE:
				this.stateLbl.text = "";
				this.betLbl.text = "";
				break;
			case GamingStates.ROUND_START:
				this.stateLbl.text = "正在准备";
				break;
			case GamingStates.PLAYER_READY:
				this.removeAllCards();
				this.stateLbl.text = "已准备";
				this.betLbl.text = "";
				break;
			case GamingStates.BETTING_START:
				this.stateLbl.text = "请下注";
				this.betLbl.text = "";
				break;
			case GamingStates.PLAYER_BET:
				this.stateLbl.text = "已下注";
				break;
			case GamingStates.PLAYING_START:
				this.stateLbl.text = "开始要牌";
				break;
			case GamingStates.BOOM:
				this.stateLbl.text = "已爆牌";
				break;
			case GamingStates.PLAYER_STAND:
				this.stateLbl.text = "已停牌";
				break;

		}
	}

	public addCards(cards:any){
		this.removeAllCards();
		for(var i=0; i<cards.length; i++){
			var item:PukeItem = new PukeItem(RoomSeatBar.PUKE_WIDTH,RoomSeatBar.PUKE_HEIGHT);
			item.info = new PukeInfo(cards[i].ID);
        	this.container.addChild(item);

			item.x = RoomSeatBar.PUKE_STACKED_WIDTH*i;
		}
	}

	private removeAllCards(){
		while(this.container.numChildren>0){
			this.container.removeChildAt(0);
		}
	}
}
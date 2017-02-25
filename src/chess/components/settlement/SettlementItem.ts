class SettlementItem  extends eui.Component{

	private nickLbl:eui.Label;
	private handcatLbl:eui.Label;
	private scoreLbl:eui.Label;

	private _info:any;

	public constructor() {
		super();

		this.skinName = "resource/skins/SettlementItemSkin.exml";

		var sp:egret.Shape = new egret.Shape();
		sp.graphics.beginFill(0xcccccc,.9);
		sp.graphics.drawRect(0,0,350,40);
		sp.graphics.endFill();
		this.addChildAt(sp,0);
	}

	public set info(value:any){
		this._info = value;

		var player = RoomManager.getPlayer(this._info.uid);
		if(player != null){
			this.nickLbl.text = player.nick;
		}else{
			this.nickLbl.text = "";
		}

		this.handcatLbl.text = HandCat.getName(this._info.handcat);
		this.scoreLbl.text = this._info.Score;
	}
}
class BetTile extends eui.Component{

	private tBtn:eui.Button;
	private fBtn:eui.Button;
	private ohBtn:eui.Button;
	private thBtn:eui.Button;

	public constructor() {
		super();

		this.skinName = "resource/skins/BetTileSkin.exml";

		this.tBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.fBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		this.ohBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.thBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
	}

	private clickHandler(e:egret.TouchEvent){
		switch(e.currentTarget){
			case this.tBtn:
				App.MessageCenter.dispatch(BetEvent.PLAYER_BET,0);
			break;
			case this.fBtn:
				App.MessageCenter.dispatch(BetEvent.PLAYER_BET,1);
			break;
			case this.ohBtn:
				App.MessageCenter.dispatch(BetEvent.PLAYER_BET,2);
			break;
			case this.thBtn:
				App.MessageCenter.dispatch(BetEvent.PLAYER_BET,3);
			break;
		}
	}
}
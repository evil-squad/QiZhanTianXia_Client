class BetPanel  extends BasePanelView {

	private tile:BetTile;

    public constructor(controller:BaseController, parent:eui.Group) {
        super(controller, parent);

        this.icon = "table_shop";
    }

 	public initData():void {
        super.initData();

		this.width = 350;
		this.height = 200;

		this.tile = new BetTile();
		this.contentGroup.addChild(this.tile);

		this.tile.x = 30;
		this.tile.y = 30;

		this.closeBtn.visible = false;
		App.MessageCenter.addListener(BetEvent.PLAYER_BET,this.onPlayerBet,this);
 	}

	 public open(...param:any[]):void{
        super.open(param);
    }

	private onPlayerBet(index:number){
		var bet = 0;
		switch(index){
			case 0:
				bet = 20;
			break;
			case 1:
				bet = 50;
			break;
			case 2:
				bet = 100;
			break;
			case 3:
				bet = 200;
			break;
		}
		if(bet != 0){
			this.applyFunc(BetConst.BET_REQ, bet);
			App.ViewManager.closeView(this);
		}
	}
}
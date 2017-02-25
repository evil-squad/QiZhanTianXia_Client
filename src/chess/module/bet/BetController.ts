class BetController  extends BaseController {

	private betView:BetPanel;
	private proxy:BetProxy;

	public constructor() {
		super();

		this.betView = new BetPanel(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Bet, this.betView);

		this.proxy = new BetProxy(this);
	}

	public addEvents(){
		this.registerFunc(BetConst.BET_REQ, this.betReq, this);
	}

	public removeEvents():void{
		this.removeFunc(BetConst.BET_REQ);
	}

	private betReq(bet:number){
		//this.roomUIView.state = GamingStates.PLAYER_BET;//点击下注就禁用
		this.proxy.betReq(bet);
	}

}
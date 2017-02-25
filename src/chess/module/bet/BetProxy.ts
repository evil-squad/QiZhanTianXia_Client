class BetProxy  extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);
    }

	public betReq(bet:number){
        var body = {
            "head": App.Head,
            "bet": bet
        };
        this.writeAndFlush(Cmd.BET, body);
	}
}
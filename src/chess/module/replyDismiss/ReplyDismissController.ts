class ReplyDismissController extends BaseController {

    private replyView:ReplyDismissPanel;
	private proxy:ReplyDismissProxy;

    public constructor() {
        super();

        this.replyView = new ReplyDismissPanel(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.ReplyDismiss, this.replyView);

		this.proxy = new ReplyDismissProxy(this);

		this.registerFunc(RoomConst.ROOM_REPLY_DISMISS_REQ, this.onReq, this);
		this.registerFunc(RoomConst.ROOM_REPLY_DISMISS_RESP, this.onResp, this);
    }

	private onReq(agree:boolean):void{
        this.proxy.replyDismiss(agree);
    }

	private onResp(obj:any):void{
		App.TipsUtils.showCenter("reply dismiss room resp");
    }
}
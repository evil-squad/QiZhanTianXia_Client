class ChatController  extends BaseController{

    private proxy:ChatProxy;
    private view:ChatPopView;
	private popView:BaseModelView;

    public constructor(){
        super();

        this.proxy = new HomeProxy(this);

        
		this.popView = new BaseModelView(this, LayerManager.UI_Popup);

		this.view = new ChatPopView();
		this.popView.view = this.view;

        App.ViewManager.register(ViewConst.Chat, this.popView);

        App.MessageCenter.addListener(ChatConst.EXPRESSION_ITEM_CLICK,this.onClickExpression,this);
        App.MessageCenter.addListener(ChatConst.MESSAGE_ITEM_CLICK,this.onClickMessage,this);
    }

    private onClickExpression(id:string):void{
        App.ViewManager.closeView(this.popView);
        Log.trace(id);
    }

    private onClickMessage(text:string):void{
        App.ViewManager.closeView(this.popView);
        Log.trace(text);
    }
}
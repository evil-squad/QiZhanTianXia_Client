class ServerChooseController extends BaseController {
	private chooseView:ServerChooseView;

    public constructor(){
        super();
        this.chooseView = new ServerChooseView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.ServerChoose, this.chooseView);
    }
}
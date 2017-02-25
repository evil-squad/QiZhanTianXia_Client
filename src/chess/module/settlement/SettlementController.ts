class SettlementController extends BaseController {

	private settlementView:SettlementPanel;
	public constructor() {
		super();

		this.settlementView = new SettlementPanel(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Settlement, this.settlementView);
	}
}
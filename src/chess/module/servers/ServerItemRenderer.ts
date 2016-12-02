class ServerItemRenderer extends eui.ItemRenderer{
	
	private nameLbl:eui.Label;
	private ipLbl:eui.Label;
	private portLbl:eui.Label;
	
	public constructor() {
		super();

		this.skinName = "resource/skins/ServerItemRendererSkin.exml";
		this.touchChildren = true;
	}

	public dataChanged():void{
		this.nameLbl.text = this.data.label;
		this.ipLbl.text = this.data.ip;
		this.portLbl.text = this.data.port;
	}
}
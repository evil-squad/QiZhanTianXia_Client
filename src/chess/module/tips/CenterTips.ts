class CenterTips implements BaseTips {

	private _container:egret.Sprite;
	private _txt:egret.TextField;
	private _status:number = 0;

	public constructor() {
		this._container = new egret.Sprite();
		this._txt = new egret.TextField();

		this._txt.x = this._txt.y = 10;
		this._txt.textColor = 0xffffff;
		this._txt.textAlign = egret.HorizontalAlign.CENTER;

		this._container.addChild(this._txt);
	}

	public getStatus():number{
		return this._status;
	}

	public show(message:string, parent:egret.DisplayObjectContainer, autoHide:boolean, delayHide:number):void{
		if(parent != null){
			this._status = 1;

			this._txt.text = message;

			var tw = this._txt.width;
			var th = this._txt.height;

			this._container.alpha = 1;
			this._container.graphics.clear();
			this._container.graphics.beginFill(0x0,.5);
			this._container.graphics.drawRoundRect(0,0,tw+20,th+20,5,5);
			this._container.graphics.endFill();

			this._container.x = (parent.width-this._container.width)*.5;
			this._container.y = (parent.height-this._container.height)*.5;
			parent.addChild(this._container);

			if(autoHide){
				this.hide(delayHide);
			}
		}else{
			Log.error("parent should not be null");
		}
	}

	public hide(delay:number):void{
		var startY = this._container.y;
		var endY = Math.max(this._container.y-Math.floor(Math.random()*100)-40,0);
		var tw = egret.Tween.get(this._container);
		tw.to({y:endY},1000).call(function(){
			
		}).wait(2)
		.to({alpha:.5},1000).call(function(){
			App.DisplayUtils.removeFromParent(this)
		});

		egret.setTimeout( function( arg:Function ){
        		arg();
    		}, this, 3000, this.reset);

		// setTimeout(function(arg:Function){
		// 	arg();
		// },3000, this.reset);
		
		//App.DisplayUtils.removeFromParent(this._container);
	}

	private reset(){
		this._status = 0;
	}
}
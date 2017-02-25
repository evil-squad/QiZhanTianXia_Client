interface BaseTips {

	getStatus():number;
	
	show(message:string, parent:egret.DisplayObjectContainer, autoHide:boolean, delayHide:number):void;
	showForDirection(message:string, parent:egret.DisplayObjectContainer, direction:number):void;

	hide(delay:number):void;
	
}
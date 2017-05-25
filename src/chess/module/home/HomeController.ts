class HomeController extends BaseController{

    private proxy:HomeProxy;
    private homeView:HomeView;

    public constructor(){
        super();

        this.proxy = new HomeProxy(this);

        this.homeView = new HomeView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Home, this.homeView);
    }

    public addEvents():void{
         //注册C2S消息
        this.registerFunc(HomeConst.ROOM_CREATE_REQ, this.onCreate, this);
        this.registerFunc(HomeConst.ROOM_ENTER_REQ, this.onEnter, this);
        //注册S2C消息
        this.registerFunc(HomeConst.ROOM_CREATE_RESP, this.createResp, this);
        this.registerFunc(HomeConst.ROOM_ENTER_RESP, this.enterResp, this);

        this.registerFunc(HomeConst.GM, this.gmReq, this);
    }

    public removeEvents():void{
        this.removeFunc(HomeConst.ROOM_CREATE_REQ);
        this.removeFunc(HomeConst.ROOM_ENTER_REQ);
        this.removeFunc(HomeConst.ROOM_CREATE_RESP);
        this.removeFunc(HomeConst.ROOM_ENTER_RESP);
        this.removeFunc(HomeConst.GM);
    }

    private onCreate():void{
        this.proxy.createRoom();
    }

    private onEnter():void{
        this.proxy.enterRoom();
    }

    private gmReq(cmd:number,body:string){
        this.proxy.gmReq(cmd,body);
    }

    private createResp(roomId:string):void{
        this.homeView.createRoomSuccess();
        App.TipsUtils.showCenter("创建成功");

        this.proxy.enterRoom();
    }

    private enterResp(obj:any):void{
        RoomManager.parsePlayers(obj.players,"home");
        RoomManager.parseGameInfo(obj.gameInfo);
        App.SceneManager.runScene(SceneConsts.Room);
    }

    
}

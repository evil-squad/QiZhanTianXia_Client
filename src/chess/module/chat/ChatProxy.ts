class ChatProxy extends BaseProxy{
    public constructor($controller:BaseController){
        super($controller);

        //this.receiveServerMsg(Cmd.ROOM_CREATE, this.createRoomSuccess, this);
        //this.receiveServerMsg(Cmd.ROOM_ENTER, this.enterRoomSuccess, this);
    }
}
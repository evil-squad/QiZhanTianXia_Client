class ByteArrayMsgByProtobuf extends ByteArrayMsg {
    private msgClass:any = null;
    private reqConfig:any = null;
    private respConfig:any = null;
    private reqConfigSymmetry:any = null;
    private respConfigSymmetry:any = null;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.msgClass = null;
        this.reqConfig = null;
        this.respConfig = null;
        this.reqConfigSymmetry = null; //cmd:msg 1:cspb.LoginReq
        this.respConfigSymmetry = null;
        this.msgClass = {};
        this.reqConfig = App.ReqConfig;
        this.respConfig = App.RespConfig;
        this.reqConfigSymmetry = {};
        this.respConfigSymmetry = {};
        var cmds = Object.keys(this.reqConfig);
        for (var i = 0, len = cmds.length; i < len; i++) {
            var cmd = cmds[i];
            var msg = this.reqConfig[cmd];
            this.reqConfigSymmetry[cmd] = msg;
        }
        cmds = Object.keys(this.respConfig);
        for (var i = 0, len = cmds.length; i < len; i++) {
            var cmd = cmds[i];
            var msg = this.respConfig[cmd];
            this.respConfigSymmetry[cmd] = msg;
        }
    }

    /**
     * 获取msgID对应的类
     * @param key
     * @returns {any}
     */
    private getMessage(msgName:string):any {
        var cls = this.msgClass[msgName];
        if (cls == null || cls == undefined) {
            cls = App.lookupProtoMessage(msgName);
            this.msgClass[msgName] = cls;
        }
        if (cls == null)
            throw new Error("不存在name=" + msgName + "的Message");
        return cls;
    }

    /**
     * 获取msgID
     * @param key
     * @returns {any}
     */
    private getReqMsg(msgId:string) {
        return this.reqConfig[msgId];
    }

    /**
     * 获取msgKey
     * @param msgId
     * @returns {any}
     */
    private getRespMsg(msgId:number) {
        return this.respConfig[msgId];
    }

    public receive(socket:egret.WebSocket){
        var head = socket.readHead();
        var body = socket.readBody();
        var len = head.readInt();
        var cmdId = head.readInt();
        var flag = head.readByte();
        var obj:any = {};
        obj.cmd = cmdId; //this.getRespMsg(cmdId);
        var Message = this.getMessage(this.getRespMsg(obj.cmd));
        obj.body = Message.decode(body);
        Log.trace(Message, obj.body, obj.body.head);
        if (obj.body != undefined
            && obj.body.head != undefined) {
            if (obj.body.head.err != undefined && obj.body.head.err != 0) {
                App.TipsUtils.showCenter("错误码：" + obj.body.head.err);
                return;
            }
        }
        else {
            App.TipsUtils.showCenter("数据错误:" + this.getErrMsg(obj));
            return;
        }
        if (obj) {
            App.MessageCenter.dispatch(obj.cmd, obj.body);
        }
        socket.clear();
    }

    private getErrMsg(obj):string{
        if (obj.body == undefined)
            return "pb解析错误";
        if (obj.body.head == undefined)
            return "pb缺少头部信息";
        return "pb解析失败";
    }

    /**
     * 消息解析
     * @param msg
     */
    public decode(msg:any):any {
        var data = msg;
        var len = data.readInt();
        var msgID = data.readInt();
        var flag = data.readByte();
        if (data.bytesAvailable >= len) {
            var bytes = new egret.ByteArray();
            data.readBytes(bytes, 0, len);
            var obj = {};
            //obj.cmd = this.getRespMsg(msgID);
            //Log.trace("收到数据：", "[" + msgID + " " + obj.cmd + "]", obj.body);
            return obj;
        }
        return null;
    }

    /**
     * 消息封装
     * @param msg
     */
    public encode(msg:any):any {
        var msgID = msg.cmd; //this.getReqID(msg.key);//cmd=msg
        //var msgBody = new (this.getMsgClass(msg.key))(msg.body);
        var Message = this.getMessage(this.getReqMsg(msg.cmd));
        var msgBody = Message.create(msg.body);
        App.DebugUtils.start("Protobuf Encode");
        //var bodyBytes:egret.ByteArray = new egret.ByteArray(msgBody.toArrayBuffer());
        var bodyBytes = Message.encode(msgBody).finish(); //new egret.ByteArray(Message.encode(msgBody).finish());
        App.DebugUtils.stop("Protobuf Encode");
        Log.trace("发送数据：", "[" + msgID + " " + msg.cmd + " " + bodyBytes.length + "]", msg.body);
        var sendMsg = new egret.ByteArray();
        sendMsg.writeInt(bodyBytes.length); //len
        sendMsg.writeInt(msgID); //cmd
        sendMsg.writeByte(0);
        sendMsg.writeBytes(bodyBytes); //body
        var result = Message.decode(bodyBytes);
        Log.trace(result);
        return sendMsg;
    }
}
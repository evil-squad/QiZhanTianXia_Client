var ProtoManager = (function () {
    function ProtoManager() {
    }
    var d = __define,c=ProtoManager,p=c.prototype;
    ProtoManager.getProtoContents = function () {
        var data = new Array();
        data.push(RES.getRes("cspb"));
        data.push(RES.getRes("errpb"));
        data.push(RES.getRes("roompb"));
        data.push(RES.getRes("srvmetapb"));
        data.push(RES.getRes("storepb"));
        data.push(RES.getRes("talkpb"));
        data.push(RES.getRes("gmpb"));
        return data;
    };
    return ProtoManager;
}());
egret.registerClass(ProtoManager,'ProtoManager');
//# sourceMappingURL=ProtoManager.js.map
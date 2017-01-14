class ProtoManager {
	public constructor() {
	}

	public static getProtoContents():Array<String>{
		var data:Array<String> = new Array<String>();

		data.push(RES.getRes("cspb"));
		data.push(RES.getRes("errpb"));
		data.push(RES.getRes("roompb"));
		data.push(RES.getRes("srvmetapb"));
		data.push(RES.getRes("storepb"));
		data.push(RES.getRes("talkpb"));
		data.push(RES.getRes("gmpb"));
		
		return data;
	}
}
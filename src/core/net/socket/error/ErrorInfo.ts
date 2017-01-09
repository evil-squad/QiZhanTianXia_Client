class ErrorInfo {

	public code:number = 0;
	public detail:string = "";

	public constructor(code:number, detail:string) {
		this.code = code;
		this.detail = detail;
	}
}
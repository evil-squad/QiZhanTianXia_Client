class HandCat {
	
	public static Init:number = 0;
	public static Burst:number = 1;
	public static Flat:number = 2;
	public static TenHalf:number = 3;
	public static FiveXiao:number = 4;
	public static RFiveXiao:number = 5;
	public static TianWang:number = 6;
	public static SixXiao:number = 7;
	public static SevenXiao:number = 8;
	public static EightXiao:number = 9;
	public static NineXiao:number = 10;
	public static DaTianWang:number = 11;

	public static getName(handcat:number):string{
		switch(handcat){
			case HandCat.Init:return "";
			case HandCat.Burst:return "爆牌";
			case HandCat.Flat:return "平牌";
			case HandCat.TenHalf:return "十点半";
			case HandCat.FiveXiao:return "五小";
			case HandCat.RFiveXiao:return "人五小";
			case HandCat.TianWang:return "天王";
			case HandCat.SixXiao:return "6小";
			case HandCat.SevenXiao:return "7小";
		}
		return "";
	}	

}
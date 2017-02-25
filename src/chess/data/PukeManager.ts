class PukeManager {
	public constructor() {
	}

	private static pids = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
        201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213,
        ,
        301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313,
        ,
        401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413,
        ,
        501, 502];

    private static points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0.5, 0.5, 0.5,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0.5, 0.5, 0.5,
        ,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0.5, 0.5, 0.5,
        ,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0.5, 0.5, 0.5,
        ,
        0.5, 0.5];

    private static PID_MIN = 101;
    private static PID_MAX = 502;

    // public static randomOne(index:number):PukeInfo{
    //     var pid = Math.floor(Math.random() * PukeManager.PID_MAX) + PukeManager.PID_MIN;
    //     while (PukeManager.pids.indexOf(pid) == -1) {
    //         pid = Math.floor(Math.random() * PukeManager.PID_MAX) + PukeManager.PID_MIN;
    //     }
    //     var info = new PukeInfo();
    //     info.id = index;
    //     info.pid = pid;
    //     info.points = PukeManager.points[PukeManager.pids.indexOf(pid)];
    //     return info;
    // }

	// public static random(count:number):Array<PukeInfo>{
	// 	var data = new Array();
    //     var info;
    //     var index = 1;
    //     while (data.length < count) {
    //         var pid = Math.floor(Math.random() * PukeManager.PID_MAX) + PukeManager.PID_MIN;
    //         while (PukeManager.pids.indexOf(pid) == -1) {
    //             pid = Math.floor(Math.random() * PukeManager.PID_MAX) + PukeManager.PID_MIN;
    //         }
    //         info = new PukeInfo();
    //         info.id = index;
    //         info.pid = pid;
    //         data.push(info);
    //         index++;
    //     }
    //     return data;
	// }
}
var RoundState = (function () {
    function RoundState() {
    }
    var d = __define,c=RoundState,p=c.prototype;
    // 本局刚初始化, 接受报名
    RoundState.INITED = 0;
    // 本局刚开始, 报名计时开始, 接受报名
    RoundState.START = 1;
    // 本局开始下注
    RoundState.BETTING = 2;
    // 本局开始玩牌(要牌/停牌)
    RoundState.PLAYING = 3;
    // 本局完成(玩牌计时结束/全部停牌)
    RoundState.FINISH = 4;
    return RoundState;
}());
egret.registerClass(RoundState,'RoundState');
//# sourceMappingURL=RoundState.js.map
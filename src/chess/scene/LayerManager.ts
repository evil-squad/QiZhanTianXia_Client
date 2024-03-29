class LayerManager{
    /**
     * 游戏背景层
     * @type {BaseSpriteLayer}
     */
    public static Game_Bg:BaseSpriteLayer = new BaseSpriteLayer();
    /**
     * 主游戏层
     * @type {BaseSpriteLayer}
     */
    public static Room_Main:BaseEuiLayer = new BaseEuiLayer();

    /**
     * UI主界面
     * @type {BaseEuiLayer}
     */
    public static UI_Main:BaseEuiLayer = new BaseEuiLayer();
    /**
     * UI弹出框层
     * @type {BaseEuiLayer}
     */
    public static UI_Popup:BaseEuiLayer = new BaseEuiLayer();
    /**
     * UI警告消息层
     * @type {BaseEuiLayer}
     */
    public static UI_Message:BaseEuiLayer = new BaseEuiLayer();
    /**
     * UITips层
     * @type {BaseEuiLayer}
     */
    public static UI_Tips:BaseEuiLayer = new BaseEuiLayer();
}
# zhouhang

功能：
    1.实现了搜索功能：
            （1）当前城市显示
            （2）添加记录：搜索城市后或者点击热搜城市后可添加记录，点击删除可以删除全部记录
            （3）热搜城市：通过接口显示当前热门城市的前10的城市。点击后可加载当前城市的天气
    2.疫情资讯、安全出行：按键的显示，点击能跳转至相应页面
    3.天气的显示：阴晴，温度，风力，湿度，空气质量等（都采用接口显示实时数据）
    4.今天，明天模块：显示今天\明天天气的最低温/最高温，天气状况，小图标（这里的小图标采用的是图标库，根据接口的icon的数字显示相应天气的图标）
    5.日落：采用的时间是接口的实时日落时间
    6.温度/风力折现：显示的是最近8个小时的实时数据曲线
    7.一周的温度曲线：显示当天温度至未来一周的温度的最高最低温度，以及天气情况，风力情况，级数。由于这里七天温度采用的是另一个接口所以图片没法直接接入，七天温度折现这儿放的是静态图片。
    8.约会，美发，舒适度等共31个模块复原了原天气的，但没有找到相应的接口，所以显示的是静态的数据。
    9.广告：采用的flex定位，点击叉可以关闭。

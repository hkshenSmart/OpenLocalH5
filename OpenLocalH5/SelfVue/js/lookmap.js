
$(function () {
    $(".back_btn").on("click", function () {
        window.history.back(-1);
    });

    var map = new AMap.Map('map_div', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom:11, //初始化地图层级
        center: [116.397428, 39.90923] //初始化地图中心点
    });
});
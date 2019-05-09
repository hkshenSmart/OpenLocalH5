$(function () {
    $(".cancel_btn").on("click", function () {
        window.history.back(-1);
    })

    var rideMark = localStorage.rideplace;
    if (rideMark == "upride") {
        $(".left_text_div input").attr("placeholder", "请输入上车点");
    }
    else {
        $(".left_text_div input").attr("placeholder", "请输入下车点");
    }
    // 地图选点
    $(".right_select_div").on("click", function () {
        $(location).attr('href', 'choosepoint.html');
    });

    var chooseplaceVM = new Vue({
        el: "#listContent_div",
        data: {
            AddressModel: [{
                name: "贵州师范附中1",
                address: "贵州省云岩区黔东社区宝山北路1"
            }, {
                name: "贵州师范附中2",
                address: "贵州省云岩区黔东社区宝山北路2"
            }, {
                name: "贵州师范附中3",
                address: "贵州省云岩区黔东社区宝山北路3"
            }, {
                name: "贵州师范附中4",
                address: "贵州省云岩区黔东社区宝山北路4"
            }, {
                name: "贵州师范附中5",
                address: "贵州省云岩区黔东社区宝山北路5"
            }, {
                name: "贵州师范附中6",
                address: "贵州省云岩区黔东社区宝山北路6"
            }, {
                name: "贵州师范附中7",
                address: "贵州省云岩区黔东社区宝山北路7"
            }, {
                name: "贵州师范附中8",
                address: "贵州省云岩区黔东社区宝山北路8"
            }, {
                name: "贵州师范附中9",
                address: "贵州省云岩区黔东社区宝山北路9"
            }, {
                name: "贵州师范附中10",
                address: "贵州省云岩区黔东社区宝山北路10"
            }, {
                name: "贵州师范附中11",
                address: "贵州省云岩区黔东社区宝山北路11"
            }, {
                name: "贵州师范附中12",
                address: "贵州省云岩区黔东社区宝山北路12"
            }, {
                name: "贵州师范附中13",
                address: "贵州省云岩区黔东社区宝山北路13"
            }]
        },
        methods: {
            selectli: function (index) {
                alert("选中了:"+index);
            }
        }
    });
})
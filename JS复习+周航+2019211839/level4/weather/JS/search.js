var Location = '101040100';
// 删除记录
var jilu = document.querySelector('.jilu');
var Delete = document.querySelector('.delete');
Delete.onclick = () => {
    var child = jilu.lastElementChild;
    while (child) {
        jilu.removeChild(child);
        child = jilu.lastElementChild;
    }
}

// 热搜城市
var ul = document.querySelector('.hot');
var jilu = document.querySelector('.jilu');

$.ajax({
    url: "https://geoapi.qweather.com/v2/city/top",
    data: {
        key: '3bd7adb173e2402b8ea1120cdf230a67',
    },
    type: 'GET',
    dataType: 'json',
    success: (e) => {
        for (var i = 0; i < e.topCityList.length; i++) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerHTML = e.topCityList[i]['adm1'];
            li.appendChild(a);
            ul.appendChild(li);
        }
        for (let j = 0; j < e.topCityList.length; j++) {
            ul.children[j].addEventListener('click', () => {
                Location = e.topCityList[j]['id'];

                var lli = document.createElement('li');
                var aaaa = document.createElement('a');
                aaaa.innerHTML = e.topCityList[j]['adm1'];
                lli.appendChild(aaaa);
                jilu.appendChild(lli);

                var cq = document.querySelector('.cq');
                cq.innerHTML = e.topCityList[j]['adm1']
                // 温度下面的小文字
                var tpr = document.querySelector('.tpr');
                var tempa = document.querySelector('.tempa')
                var wind = document.querySelector('.wind')
                var wenzi = document.querySelector('.wenzi')

                $.ajax({
                    url: "https://devapi.qweather.com/v7/weather/now",
                    data: {
                        key: '3bd7adb173e2402b8ea1120cdf230a67',
                        location: Location
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: (e) => {
                        tpr.innerHTML = e.now.text;
                        tempa.innerHTML = e.now.temp;
                        wind.innerHTML = e.now.windDir + e.now.windScale + '级' + '&nbsp湿度' + e.now.humidity + '%';
                    },
                })
                // 日落时间
                var ri = document.querySelector('.ri');
                var mydate = new Date();
                var date = mydate.getFullYear() + '' + mydate.getMonth() + 1 + '' + mydate.getDate();

                $.ajax({
                    url: "https://devapi.qweather.com/v7/astronomy/sun",
                    data: {
                        key: '3bd7adb173e2402b8ea1120cdf230a67',
                        location: Location,
                        date,
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: (e) => {
                        ri.innerHTML = '日落' + ' ' + e.sunset.substring(11, 16);
                    },
                })

                // 今天、明天
                var today = document.querySelector('.today');
                var tomo = document.querySelector('.tomo');
                var statod = document.querySelector('#statod');
                var statom = document.querySelector('#statom');
                var nanle1 = document.querySelector('#nanle1');
                var nanle2 = document.querySelector('#nanle2');

                $.ajax({
                    url: "https://devapi.qweather.com/v7/weather/3d",
                    data: {
                        key: '3bd7adb173e2402b8ea1120cdf230a67',
                        location: Location
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: (e) => {
                        // console.log(e);
                        today.innerHTML = e.daily[0]['tempMin'] + '/' + e.daily[0]['tempMax'] + '°';
                        tomo.innerHTML = e.daily[1]['tempMin'] + '/' + e.daily[1]['tempMax'] + '°';

                        statod.innerHTML = e.daily[0]['textDay'];
                        statom.innerHTML = e.daily[1]['textDay'];

                        nanle1.src = 'icons/' + e.daily[0]['iconDay'] + '.svg';

                        nanle2.src = 'icons/' + e.daily[1]['iconDay'] + '.svg';
                    },
                })

                // 空气图标------------------------------
                var airqul = document.querySelector('.airqul');
                var pi = document.querySelector('#pi');
                var rig_pit = document.querySelector('.rig_pit');

                $.ajax({
                    url: "https://devapi.qweather.com/v7/air/now",
                    data: {
                        key: '3bd7adb173e2402b8ea1120cdf230a67',
                        location: Location
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: (e) => {
                        // console.log(e);
                        airqul.innerHTML = e.now.aqi + ' ' + e.now.category;
                        if (e.now.aqi <= 50) {
                            pi.style.backgroundColor = '#8fc31f';
                            rig_pit.style.backgroundColor = '#8fc31f';

                        }
                        else if (e.now.aqi > 50 && e.now.aqi <= 100) {
                            pi.style.backgroundColor = '#d7af0e';
                            rig_pit.style.backgroundColor = '#d7af0e';
                        }
                        else {
                            pi.style.backgroundColor = '#f39800';
                            rig_pit.style.backgroundColor = '#f39800';
                        }
                        pi.innerHTML = e.now.category;
                    },
                })

                // 温度/风力折现

                $.ajax({
                    url: "https://www.yiketianqi.com/api",
                    data: {
                        appid: '29916872',
                        appsecret: "jq5PUp48 ",
                        version: 'v9',
                        cityid: Location
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: (e) => {
                        var myChart1 = echarts.init(document.querySelector('.chart1'));
                        var myChart2 = echarts.init(document.querySelector('.chart2'));
                        var data = [e.data[0]['hours'][0]['tem'], e.data[0]['hours'][1]['tem'], e.data[0]['hours'][2]['tem'], e.data[0]['hours'][3]['tem'], e.data[0]['hours'][4]['tem'], e.data[0]['hours'][5]['tem'], e.data[0]['hours'][6]['tem'], e.data[0]['hours'][7]['tem']];
                        var option1 = {
                            grid: {
                                left: '0%',
                                right: '3%',
                                bottom: '0%',
                                containLabel: true
                            },
                            xAxis: {
                                axisLine: {
                                    lineStyle: {
                                        type: 'solid',
                                        color: '#fff',//左边线的颜色
                                        width: '2'//坐标线的宽度
                                    }
                                },
                                type: 'category',
                                boundaryGap: false,
                                data: [e.data[0]['hours'][0]['hours'], e.data[0]['hours'][1]['hours'], e.data[0]['hours'][2]['hours'], e.data[0]['hours'][3]['hours'], e.data[0]['hours'][4]['hours'], e.data[0]['hours'][5]['hours'], e.data[0]['hours'][6]['hours'], e.data[0]['hours'][7]['hours']]
                            },
                            yAxis: {
                                type: 'value',
                                show: false
                            },

                            series: [
                                {
                                    lineStyle: { color: 'rgba(255,255,255,.1)' },
                                    itemStyle: {
                                        normal: {
                                            color: '#fff',
                                        }
                                    },
                                    type: 'line',
                                    data,
                                },
                            ]
                        };
                        var option2 = {
                            grid: {
                                left: '0%',
                                right: '3%',
                                bottom: '0%',
                                containLabel: true
                            },
                            xAxis: {
                                axisLine: {
                                    lineStyle: {
                                        type: 'solid',
                                        color: '#fff',//左边线的颜色
                                        width: '2'//坐标线的宽度
                                    }
                                },
                                type: 'category',
                                boundaryGap: false,
                                data: [e.data[0]['hours'][0]['hours'], e.data[0]['hours'][1]['hours'], e.data[0]['hours'][2]['hours'], e.data[0]['hours'][3]['hours'], e.data[0]['hours'][4]['hours'], e.data[0]['hours'][5]['hours'], e.data[0]['hours'][6]['hours'], e.data[0]['hours'][7]['hours']]
                            },
                            yAxis: {
                                type: 'value',
                                show: false
                            },

                            series: [
                                {
                                    lineStyle: { color: 'rgba(255,255,255,.1)' },
                                    itemStyle: {
                                        normal: {
                                            color: '#fff',
                                        }
                                    },
                                    type: 'line',
                                    data: [e.data[0]['hours'][0]['win_speed'].substring(1, 2), e.data[0]['hours'][1]['win_speed'].substring(1, 2), e.data[0]['hours'][2]['win_speed'].substring(1, 2), e.data[0]['hours'][3]['win_speed'].substring(1, 2), e.data[0]['hours'][4]['win_speed'].substring(1, 2), e.data[0]['hours'][5]['win_speed'].substring(1, 2), e.data[0]['hours'][6]['win_speed'].substring(1, 2), e.data[0]['hours'][7]['win_speed'].substring(1, 2)]
                                },
                            ]
                        };
                        myChart1.setOption(option1);
                        myChart2.setOption(option2);
                        // -----------------------
                        var pi2 = document.querySelector('#pi2');
                        if (e.data[1]['air'] <= 50) {
                            pi2.style.backgroundColor = '#8fc31f';
                        }
                        else if (e.data[1]['air'] > 50 && e.data[1]['air'] <= 100) {
                            pi2.style.backgroundColor = '#d7af0e';
                        }
                        else {
                            pi2.style.backgroundColor = '#f39800';
                        }
                        pi2.innerHTML = e.data[1]['air_level'];

                    },
                })

                // 温度折线
                var num1 = document.querySelector('.num1');
                var num2 = document.querySelector('.num2');
                var num3 = document.querySelector('.num3');
                var num4 = document.querySelector('.num4');
                var num5 = document.querySelector('.num5');
                var num6 = document.querySelector('.num6');
                var num7 = document.querySelector('.num7');

                var q1 = document.querySelector('#q1');
                var q2 = document.querySelector('#q2');
                var q3 = document.querySelector('#q3');
                var q4 = document.querySelector('#q4');
                var q5 = document.querySelector('#q5');
                var q6 = document.querySelector('#q6');
                var q7 = document.querySelector('#q7');

                var qq1 = document.querySelector('#qq1');
                var qq2 = document.querySelector('#qq2');
                var qq3 = document.querySelector('#qq3');
                var qq4 = document.querySelector('#qq4');
                var qq5 = document.querySelector('#qq5');
                var qq6 = document.querySelector('#qq6');
                var qq7 = document.querySelector('#qq7');

                var y1 = document.querySelector('#y1');
                var y2 = document.querySelector('#y2');
                var y3 = document.querySelector('#y3');
                var y4 = document.querySelector('#y4');
                var y5 = document.querySelector('#y5');
                var y6 = document.querySelector('#y6');
                var y7 = document.querySelector('#y7');

                var x1 = document.querySelector('#x1');
                var x2 = document.querySelector('#x2');
                var x3 = document.querySelector('#x3');
                var x4 = document.querySelector('#x4');
                var x5 = document.querySelector('#x5');
                var x6 = document.querySelector('#x6');
                var x7 = document.querySelector('#x7');

                var z1 = document.querySelector('#z1');
                var z2 = document.querySelector('#z2');
                var z3 = document.querySelector('#z3');
                var z4 = document.querySelector('#z4');
                var z5 = document.querySelector('#z5');
                var z6 = document.querySelector('#z6');
                var z7 = document.querySelector('#z7');
                $.ajax({
                    url: "https://www.yiketianqi.com/api",
                    data: {
                        appid: '29916872',
                        appsecret: "jq5PUp48 ",
                        version: 'v9',
                        cityid: Location
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: (e) => {
                        num1.innerHTML = e.data[0]['week'];
                        num2.innerHTML = e.data[1]['week'];
                        num3.innerHTML = e.data[2]['week'];
                        num4.innerHTML = e.data[3]['week'];
                        num5.innerHTML = e.data[4]['week'];
                        num6.innerHTML = e.data[5]['week'];
                        num7.innerHTML = e.data[6]['week'];

                        q1.innerHTML = e.data[0]['wea_day'];
                        q2.innerHTML = e.data[1]['wea_day'];
                        q3.innerHTML = e.data[2]['wea_day'];
                        q4.innerHTML = e.data[3]['wea_day'];
                        q5.innerHTML = e.data[4]['wea_day'];
                        q6.innerHTML = e.data[5]['wea_day'];
                        q7.innerHTML = e.data[6]['wea_day'];

                        qq1.innerHTML = e.data[0]['wea_night'];
                        qq2.innerHTML = e.data[1]['wea_night'];
                        qq3.innerHTML = e.data[2]['wea_night'];
                        qq4.innerHTML = e.data[3]['wea_night'];
                        qq5.innerHTML = e.data[4]['wea_night'];
                        qq6.innerHTML = e.data[5]['wea_night'];
                        qq7.innerHTML = e.data[6]['wea_night'];

                        y1.innerHTML = e.data[0]['air_level'];
                        y2.innerHTML = e.data[1]['air_level'];
                        y3.innerHTML = e.data[2]['air_level'];
                        y4.innerHTML = e.data[3]['air_level'];
                        y5.innerHTML = e.data[4]['air_level'];
                        y6.innerHTML = e.data[5]['air_level'];
                        y7.innerHTML = e.data[6]['air_level'];

                        x1.innerHTML = e.data[0]['win'][0];
                        x2.innerHTML = e.data[1]['win'][0];
                        x3.innerHTML = e.data[2]['win'][0];
                        x4.innerHTML = e.data[3]['win'][0];
                        x5.innerHTML = e.data[4]['win'][0];
                        x6.innerHTML = e.data[5]['win'][0];
                        x7.innerHTML = e.data[6]['win'][0];

                        z1.innerHTML = e.data[0]['win_speed'];
                        z2.innerHTML = e.data[1]['win_speed'];
                        z3.innerHTML = e.data[2]['win_speed'];
                        z4.innerHTML = e.data[3]['win_speed'];
                        z5.innerHTML = e.data[4]['win_speed'];
                        z6.innerHTML = e.data[5]['win_speed'];
                        z7.innerHTML = e.data[6]['win_speed'];
                        // 星期一
                        if (e.data[0]['air'] <= 50) {
                            y1.style.backgroundColor = '#8fc31f';
                        }
                        else if (e.data[0]['air'] > 50 && e.data[0]['air'] <= 100) {
                            y1.style.backgroundColor = '#d7af0e';
                        }
                        else {
                            y1.style.backgroundColor = '#f39800';
                        }
                        // 星期二
                        if (e.data[1]['air'] <= 50) {
                            y2.style.backgroundColor = '#8fc31f';
                        }
                        else if (e.data[1]['air'] > 50 && e.data[1]['air'] <= 100) {
                            y2.style.backgroundColor = '#d7af0e';
                        }
                        else {
                            y2.style.backgroundColor = '#f39800';
                        }

                        // 星期三
                        if (e.data[2]['air'] <= 50) {
                            y3.style.backgroundColor = '#8fc31f';
                        }
                        else if (e.data[2]['air'] > 50 && e.data[2]['air'] <= 100) {
                            y3.style.backgroundColor = '#d7af0e';
                        }
                        else {
                            y3.style.backgroundColor = '#f39800';
                        }
                        // 星期四
                        if (e.data[3]['air'] <= 50) {
                            y4.style.backgroundColor = '#8fc31f';
                        }
                        else if (e.data[3]['air'] > 50 && e.data[3]['air'] <= 100) {
                            y4.style.backgroundColor = '#d7af0e';
                        }
                        else {
                            y4.style.backgroundColor = '#f39800';
                        }
                        // 星期五
                        if (e.data[4]['air'] <= 50) {
                            y5.style.backgroundColor = '#8fc31f';
                        }
                        else if (e.data[4]['air'] > 50 && e.data[4]['air'] <= 100) {
                            y5.style.backgroundColor = '#d7af0e';
                        }
                        else {
                            y5.style.backgroundColor = '#f39800';
                        }
                        // 星期六
                        if (e.data[5]['air'] <= 50) {
                            y6.style.backgroundColor = '#8fc31f';
                        }
                        else if (e.data[5]['air'] > 50 && e.data[5]['air'] <= 100) {
                            y6.style.backgroundColor = '#d7af0e';
                        }
                        else {
                            y6.style.backgroundColor = '#f39800';
                        }
                        // 星期天
                        if (e.data[6]['air'] <= 50) {
                            y7.style.backgroundColor = '#8fc31f';
                        }
                        else if (e.data[6]['air'] > 50 && e.data[6]['air'] <= 100) {
                            y7.style.backgroundColor = '#d7af0e';
                        }
                        else {
                            y7.style.backgroundColor = '#f39800';
                        }

                        var myChart = echarts.init(document.querySelector('.charts'));
                        var option = {
                            tooltip: {
                                trigger: 'axis'
                            },
                            color: ['white'],
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                show: false
                            },
                            yAxis: {
                                type: 'value',
                                show: false
                            },
                            series: [
                                {
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true, color: 'white', position: 'bottom',

                                            }
                                        }
                                    },
                                    name: 'Direct',
                                    type: 'line',
                                    data: [e.data[0]['tem2'], e.data[1]['tem2'], e.data[2]['tem2'], e.data[3]['tem2'], e.data[4]['tem2'], e.data[5]['tem2'], e.data[6]['tem2']]
                                },
                                {
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true, color: 'white',
                                            }
                                        }
                                    },
                                    name: 'Search Engine',
                                    type: 'line',
                                    data: [e.data[0]['tem1'], e.data[1]['tem1'], e.data[2]['tem1'], e.data[3]['tem1'], e.data[4]['tem1'], e.data[5]['tem1'], e.data[6]['tem1']]
                                }
                            ]
                        };
                        myChart.setOption(option);
                    },
                })

                // 展现
                var search = document.querySelector('.search');
                search.style.display = 'none';

            })
        }
    },
})
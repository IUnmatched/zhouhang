// 折叠部分的js
var jian = document.querySelector('.jian');
var ri = document.querySelector('.ri');
var act1 = document.querySelector('.act1');
var act2 = document.querySelector('.act2');
var down = document.querySelector('.down');
var chart1 = document.querySelector('.chart1');
var chart2 = document.querySelector('.chart2');

var flag = 1;
act1.onclick = () => {
    act1.className = 'actbottom';
    act2.className = 'ri';
    chart1.style.visibility = 'visible';
    chart2.style.visibility = 'hidden';
}
act2.onclick = () => {
    act2.className = 'actbottom';
    act1.className = 'ri';
    chart1.style.visibility = 'hidden';
    chart2.style.visibility = 'visible';
}
jian.onclick = function () {
    if (flag == 1) {
        ri.style.display = 'none';
        act1.style.display = 'inline-block';
        act2.style.display = 'inline-block';
        jian.style.backgroundPosition = 'right bottom';
        flag = 0;
        down.style.height = '137px';
        chart1.style.visibility = 'visible';
        chart2.style.visibility = 'hidden';

    }
    else {
        ri.style.display = 'inline-block';
        act1.style.display = 'none';
        act2.style.display = 'none';
        jian.style.backgroundPosition = 'right top';
        down.style.height = '2.4rem';
        flag = 1;
        chart1.style.visibility = 'hidden';
        chart2.style.visibility = 'hidden';
    }

}



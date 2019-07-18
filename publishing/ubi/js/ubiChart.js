/**
 * 
 * ubiChart.js
 * 
 * UBI 그래프 관련
 * 
 * @version 1.0
 * @author sh.yu
 * @since 2016.03.14
 */

var chartOptions = {
	doughnut : {
		responsive : false,
		animateRotate : false,
		percentageInnerCutout : 80,
		segmentShowStroke : false,
		animationEasing : 'easeOutQuart',
		showTooltips : false
	},
	line : {
	    width: '100%',
	    height: 200,
	    legend: { position: 'none' },
	    enableInteractivity: false,
	    chartArea: {
	        width: '100%',
	        height: '80%',
	        top: 16,
	        left: 6
	    },
	    hAxis: {
	        format: 'M/d',
	        textStyle: {
	        	fontSize: 12,
	            color: '#a5a5a6'
	        },
	        gridlines: { color: '#fff' },
	        viewWindow: {},
	        ticks: []
	    },
	    vAxis: {
	        textStyle: { color: '#fff' },
	        gridlines: { color: '#fff' },
	        baselineColor : '#ebebeb',
	        ticks: [0, 20, 40, 60, 80, 100]
	    },
	    annotations: {
	        textStyle: {
	            fontSize: 14,
	            color: '#404040',
	            opacity: 0.9
	        },
	        datum: {
	            stem: { color: '#fff', length: 8 }
	        }
	    },
	    animation: {
	        startup: true,
	        duration: 500,
	        easing: 'inAndOut'
	    },
		pointSize: 10,
		colors: ['#1081ed', '#9aa5b3'],
	    seriesType: 'area',
	    series: {1: {type: 'line'}}
	},
	customPoint : 'point { size: 6; stroke-color: #777; stroke-width:2; fill-color: #fff; }'
		
};

var doughnutData = [ {
	value : 0,
	color : "#7bb8f1"
		/*
		 * #17ae87 녹
		 * #b7d167 연
		 * #e5d208 노
		 * #f28d4f 주
		 * #e84c35 빨
		 * 
		 */
}, {
	value : 100,
	color : "#dbdbdb"
	//color : "#2d7eeb"
} ];

/**
 * 도넛 차트 생성
 * 
 * @param canvasId String
 * @param data Array
 */
function drawDoughnutChart(canvasId, data) {
	doughnutData[0].value = data[0];
	doughnutData[1].value = data[1];
	var ctx = document.getElementById(canvasId).getContext("2d");
	return new Chart(ctx).Doughnut(doughnutData, chartOptions.doughnut);
}
/**
 * 라인 차트 생성
 * 
 * @param divId {String}
 * @param data {google.visualization.DataTable} 
 */
function drawLineChart(divId, datasrc) {
	var chart = new google.visualization.AreaChart(document.getElementById(divId));
	var data = new google.visualization.DataTable(datasrc);
	chart.draw(data, chartOptions.line);
}

/**
 * 구글 차트 데이터테이블 초기화
 * 
 * @returns {google.visualization.DataTable}
 */
function chartDataTable(){
	var dt = new google.visualization.DataTable();
	dt.addColumn('date', '날짜');
	dt.addColumn('number', '점수');
	dt.addColumn({type:'string', role:'annotation'});
	/*
	dt.addColumn('number', '종합점수');
	dt.addColumn({type:'string', role:'style'});
	*/
    return dt;
}
/**
 * 데이터를 구글 차트 형태로 변환 
 * 
 * @param list
 * @returns object
 */
function getLineChartDataList(list) {
	var charDataList = {
			speedAccelData : chartDataTable(),
			speedReduceData : chartDataTable(),
			overSpeedData : chartDataTable()
	};
	for (var i=0;i<list.length;i++) {
		var row = list[i];
		var sDate = row.weekDate;
		/*
		charDataList.speedAccelData.addRow([convertToDate(sDate), row.speedAccelCntScore, row.speedAccelCntScore+'점', row.safeDrivingScore, chartOptions.customPoint]);
		charDataList.speedReduceData.addRow([convertToDate(sDate), row.speedReduceCntScore, row.speedReduceCntScore+'점', row.safeDrivingScore, chartOptions.customPoint]);
		charDataList.overSpeedData.addRow([convertToDate(sDate), row.overSpeedRateScore, row.overSpeedRateScore+'점', row.safeDrivingScore, chartOptions.customPoint]);
		*/
		charDataList.speedAccelData.addRow([convertToDate(sDate), row.speedAccelCntScore, row.speedAccelCntScore+'점']);
		charDataList.speedReduceData.addRow([convertToDate(sDate), row.speedReduceCntScore, row.speedReduceCntScore+'점']);
		charDataList.overSpeedData.addRow([convertToDate(sDate), row.overSpeedRateScore, row.overSpeedRateScore+'점']);
	}
	return charDataList;
}

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}
/**
 * X축 보여지는 범위
 */
function getViewWindow(sDate) {
	var date = convertToDate(sDate);
	/*
	var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1), // 이전 달 1일
		lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); // 이번 달 말일
	*/
	
	var today = new Date();
	var firstDay = today.addDays(-56), // 8주 전
		sunday = firstDay.addDays(7-firstDay.getDay()), // 첫 일요일
		lastDay = today.addDays(2);
	firstDay = sunday.addDays(-2);
	
	var obj = {
		min : firstDay,
		max : lastDay
	};
	return obj;
}
/**
 * X축 기준점
 */
function getHAxisTicks(sDate) {
	var dateArray = new Array();
	var area = getViewWindow(sDate), 
		firstDay = area.min, 
		lastDay = area.max, 
		sunday = firstDay.addDays(7-firstDay.getDay()); // 이전달 첫 일요일
	
	while (sunday <= lastDay) {
        dateArray.push( sunday );
        sunday = sunday.addDays(7);
    }
	
	return dateArray;
}
/**
 * 문자형을 날짜형으로 변환
 * 
 * @param sDate
 * @returns {Date}
 */
function convertToDate(sDate) {
	var year = sDate.substr(0,4),
		month = sDate.substr(4,2),
		day = 1;
	if (sDate.length==8) day = sDate.substr(6,2);
	var date = new Date(year, parseInt(month)-1, day);
	return date;
}
// EOF
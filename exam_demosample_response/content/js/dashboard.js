/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 95.51020408163265, "KoPercent": 4.489795918367347};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.656, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9, 500, 1500, "https://sampleapp.tricentis.com/101-19"], "isController": false}, {"data": [0.4, 500, 1500, "https://sampleapp.tricentis.com/101-12"], "isController": false}, {"data": [0.95, 500, 1500, "https://sampleapp.tricentis.com/101-11"], "isController": false}, {"data": [0.55, 500, 1500, "https://sampleapp.tricentis.com/101-14"], "isController": false}, {"data": [0.95, 500, 1500, "https://sampleapp.tricentis.com/101-13"], "isController": false}, {"data": [0.75, 500, 1500, "https://sampleapp.tricentis.com/101-16"], "isController": false}, {"data": [0.5, 500, 1500, "https://sampleapp.tricentis.com/101-15"], "isController": false}, {"data": [0.95, 500, 1500, "https://sampleapp.tricentis.com/101-18"], "isController": false}, {"data": [0.35, 500, 1500, "https://sampleapp.tricentis.com/101-17"], "isController": false}, {"data": [0.95, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-20"], "isController": false}, {"data": [0.0, 500, 1500, "https://sampleapp.tricentis.com/101/app.php"], "isController": false}, {"data": [1.0, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-21"], "isController": false}, {"data": [0.9, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-24"], "isController": false}, {"data": [0.65, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-25"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.8, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-22"], "isController": false}, {"data": [0.85, 500, 1500, "https://sampleapp.tricentis.com/101-20"], "isController": false}, {"data": [1.0, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-23"], "isController": false}, {"data": [0.6, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-10"], "isController": false}, {"data": [0.65, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-13"], "isController": false}, {"data": [0.75, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-14"], "isController": false}, {"data": [0.75, 500, 1500, "https://sampleapp.tricentis.com/101-10"], "isController": false}, {"data": [0.6, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-11"], "isController": false}, {"data": [0.25, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-12"], "isController": false}, {"data": [0.85, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-17"], "isController": false}, {"data": [0.7, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-18"], "isController": false}, {"data": [0.6, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-15"], "isController": false}, {"data": [0.75, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-16"], "isController": false}, {"data": [0.85, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-19"], "isController": false}, {"data": [0.5, 500, 1500, "https://sampleapp.tricentis.com/101-8"], "isController": false}, {"data": [0.85, 500, 1500, "https://sampleapp.tricentis.com/101-9"], "isController": false}, {"data": [0.8, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-2"], "isController": false}, {"data": [0.65, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-3"], "isController": false}, {"data": [0.75, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-0"], "isController": false}, {"data": [0.8, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-1"], "isController": false}, {"data": [0.45, 500, 1500, "https://sampleapp.tricentis.com/101-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://sampleapp.tricentis.com/101-1"], "isController": false}, {"data": [0.95, 500, 1500, "https://sampleapp.tricentis.com/101-2"], "isController": false}, {"data": [0.7, 500, 1500, "https://sampleapp.tricentis.com/101-3"], "isController": false}, {"data": [0.55, 500, 1500, "https://sampleapp.tricentis.com/101-4"], "isController": false}, {"data": [0.7, 500, 1500, "https://sampleapp.tricentis.com/101-5"], "isController": false}, {"data": [0.45, 500, 1500, "https://sampleapp.tricentis.com/101-6"], "isController": false}, {"data": [0.5, 500, 1500, "https://sampleapp.tricentis.com/101-7"], "isController": false}, {"data": [0.65, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-6"], "isController": false}, {"data": [0.4, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-7"], "isController": false}, {"data": [0.6, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-4"], "isController": false}, {"data": [0.0, 500, 1500, "https://sampleapp.tricentis.com/101"], "isController": false}, {"data": [0.6, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-5"], "isController": false}, {"data": [0.55, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-8"], "isController": false}, {"data": [0.55, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-9"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 490, 22, 4.489795918367347, 863.495918367347, 1, 8784, 684.5, 1482.9000000000003, 2714.8999999999996, 5186.299999999998, 32.156450977818615, 1760.1939846108414, 31.996489040556504], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://sampleapp.tricentis.com/101-19", 10, 1, 10.0, 737.9, 223, 5250, 235.0, 4750.9000000000015, 5250.0, 5250.0, 1.8885741265344667, 6.296107766761096, 0.8830559490084986], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-12", 10, 0, 0.0, 1055.3000000000002, 861, 1595, 944.0, 1594.2, 1595.0, 1595.0, 4.187604690117253, 884.9586474036852, 2.1592336683417086], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-11", 10, 0, 0.0, 313.1, 224, 972, 231.5, 902.8000000000003, 972.0, 972.0, 5.743825387708214, 9.889027498564044, 2.9953151924181505], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-14", 10, 0, 0.0, 771.7, 443, 983, 770.0, 979.7, 983.0, 983.0, 4.666355576294913, 543.6623235534298, 2.4152035697620162], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-13", 10, 0, 0.0, 475.70000000000005, 233, 1154, 450.0, 1088.1000000000004, 1154.0, 1154.0, 5.288207297726071, 142.32714172395558, 2.7422246827075623], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-16", 10, 0, 0.0, 772.2, 455, 1469, 492.0, 1465.8, 1469.0, 1469.0, 5.032712632108707, 480.6633744338198, 2.6293957599396074], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-15", 10, 0, 0.0, 845.4, 489, 1507, 729.5, 1486.1000000000001, 1507.0, 1507.0, 4.653327128897161, 453.4267391810144, 2.4039160656119125], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-18", 10, 0, 0.0, 307.1, 219, 871, 242.0, 811.8000000000002, 871.0, 871.0, 6.071645415907711, 8.372229811778992, 3.106974802671524], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-17", 10, 0, 0.0, 1181.9, 666, 1927, 1112.5, 1918.6, 1927.0, 1927.0, 3.8819875776397517, 901.2314695749224, 2.066096904114907], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-20", 10, 0, 0.0, 314.3, 223, 907, 252.0, 842.8000000000002, 907.0, 907.0, 1.3931457230426303, 3.7631260448592925, 0.7319457021454444], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php", 10, 7, 70.0, 4073.8, 2696, 6045, 3986.5, 5915.8, 6045.0, 6045.0, 0.9202171712524155, 409.04695695684177, 12.50596703321984], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-21", 10, 0, 0.0, 238.4, 224, 257, 235.5, 256.8, 257.0, 257.0, 1.4094432699083863, 7.084379404510218, 0.7308734143763214], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-24", 10, 0, 0.0, 416.3, 219, 1982, 242.0, 1810.7000000000005, 1982.0, 1982.0, 1.4194464158978, 0.24951206529453512, 0.8497272001419447], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-25", 10, 3, 30.0, 293.5, 99, 917, 235.5, 855.4000000000002, 917.0, 917.0, 1.4048890137679122, 2.921730120820455, 0.5186016085979207], "isController": false}, {"data": ["Test", 10, 8, 80.0, 9264.7, 6735, 14829, 9015.5, 14357.000000000002, 14829.0, 14829.0, 0.6525711302531976, 875.1577896600104, 15.908460584703732], "isController": true}, {"data": ["https://sampleapp.tricentis.com/101/app.php-22", 10, 1, 10.0, 463.90000000000003, 163, 1665, 338.5, 1548.1000000000004, 1665.0, 1665.0, 1.3533631073216945, 20.94131162031398, 0.6387503806333739], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-20", 10, 0, 0.0, 444.79999999999995, 222, 989, 238.0, 981.0, 989.0, 989.0, 4.1963911036508605, 2.163764162819975, 2.180156315568611], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-23", 10, 0, 0.0, 237.39999999999998, 222, 272, 235.0, 269.9, 272.0, 272.0, 1.4150275930380642, 0.6925896773737088, 0.8358888584264893], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-10", 10, 0, 0.0, 766.0, 238, 926, 887.5, 925.5, 926.0, 926.0, 1.3003901170351106, 0.2298541124837451, 0.7682968953185956], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-13", 10, 0, 0.0, 779.7, 221, 1706, 867.0, 1675.3000000000002, 1706.0, 1706.0, 1.3197835554968984, 6.401723554837007, 0.6882465025735779], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-14", 10, 1, 10.0, 559.9, 222, 1929, 250.0, 1841.1000000000004, 1929.0, 1929.0, 1.3486176668914363, 0.6666701786918409, 0.7171116402562373], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-10", 10, 0, 0.0, 588.9000000000001, 218, 976, 580.0, 973.9, 976.0, 976.0, 4.5004500450045, 6.1353791629162915, 2.342519408190819], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-11", 10, 0, 0.0, 865.5999999999999, 220, 2429, 896.0, 2283.9000000000005, 2429.0, 2429.0, 1.2904890953671442, 0.22936427280939478, 0.7788303329461866], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-12", 10, 3, 30.0, 1144.6999999999998, 668, 1801, 976.5, 1799.8, 1801.0, 1801.0, 1.1208249271463797, 176.00574335210715, 0.4122096362923111], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-17", 10, 1, 10.0, 280.2, 1, 937, 229.0, 868.5000000000002, 937.0, 937.0, 1.3783597518952446, 1.2506191850447967, 0.6566053583735355], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-18", 10, 0, 0.0, 637.5, 221, 1544, 511.5, 1488.9, 1544.0, 1544.0, 1.3954786491766675, 0.6827488312866313, 0.739985260256768], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-15", 10, 1, 10.0, 805.6999999999999, 279, 1436, 695.0, 1435.6, 1436.0, 1436.0, 1.2934937265554263, 104.0830443183288, 0.6150411088474971], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-16", 10, 1, 10.0, 558.4, 31, 2957, 234.0, 2757.500000000001, 2957.0, 2957.0, 1.3683634373289546, 3.182781284209086, 0.6542487684729065], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-19", 10, 0, 0.0, 491.0999999999999, 222, 1473, 243.0, 1423.2000000000003, 1473.0, 1473.0, 1.2903225806451613, 15.10836693548387, 0.6842237903225806], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-8", 10, 0, 0.0, 946.3, 907, 994, 943.5, 992.6, 994.0, 994.0, 4.2087542087542085, 7.1844749579124585, 2.178359111952862], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-9", 10, 0, 0.0, 444.09999999999997, 221, 945, 250.5, 943.0, 945.0, 945.0, 6.157635467980296, 9.164293411330048, 3.193070735837438], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-2", 10, 0, 0.0, 546.2, 223, 1796, 244.5, 1719.0000000000002, 1796.0, 1796.0, 1.6147263038914905, 0.2854154892620701, 0.9950120095268853], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-3", 10, 0, 0.0, 756.5, 230, 1095, 920.5, 1094.8, 1095.0, 1095.0, 1.4513788098693758, 0.2565425435413643, 0.8759297895500726], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-0", 10, 0, 0.0, 585.9, 248, 1484, 578.5, 1407.7000000000003, 1484.0, 1484.0, 1.585791309863622, 100.6300732932921, 0.797541527909927], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-1", 10, 0, 0.0, 560.2, 235, 2034, 254.0, 1923.5000000000005, 2034.0, 2034.0, 1.4532771399505886, 0.25545887225693936, 0.8586256539747129], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-0", 10, 0, 0.0, 1174.4000000000003, 870, 2327, 998.5, 2228.9000000000005, 2327.0, 2327.0, 4.297378599054577, 1.59053368070477, 2.1277060055865924], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-1", 10, 0, 0.0, 454.29999999999995, 430, 475, 455.0, 474.4, 475.0, 475.0, 7.037297677691766, 2.968859957776214, 3.4911593947924], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-2", 10, 0, 0.0, 290.7, 220, 770, 238.5, 718.2000000000002, 770.0, 770.0, 5.820721769499419, 80.98761277648428, 2.887623690337602], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-3", 10, 0, 0.0, 764.5, 223, 2738, 580.0, 2559.4000000000005, 2738.0, 2738.0, 3.624501631025734, 4.927056904675608, 1.8547254440014498], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-4", 10, 0, 0.0, 1062.4, 221, 1218, 1138.5, 1216.7, 1218.0, 1218.0, 3.9047247169074577, 105.44282018742679, 2.093451044513862], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-5", 10, 0, 0.0, 647.6, 226, 1014, 869.0, 1012.1, 1014.0, 1014.0, 6.042296072507553, 71.89978285498489, 3.162764350453172], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-6", 10, 0, 0.0, 1373.1000000000001, 1289, 1501, 1365.0, 1495.4, 1501.0, 1501.0, 3.671071953010279, 165.0261563876652, 1.9036515693832599], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-7", 10, 0, 0.0, 946.9, 896, 1004, 943.0, 1003.0, 1004.0, 1004.0, 4.212299915754001, 22.30379896798652, 2.1513992733782645], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-6", 10, 0, 0.0, 844.3, 231, 1557, 894.0, 1537.2, 1557.0, 1557.0, 1.4140271493212668, 31.924700844881222, 0.7373930641968326], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-7", 10, 2, 20.0, 1297.5, 258, 3252, 1111.0, 3151.7000000000003, 3252.0, 3252.0, 1.2198097096852891, 32.54843025737985, 0.5012655525737985], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-4", 10, 0, 0.0, 1123.1, 226, 4556, 922.0, 4221.500000000002, 4556.0, 4556.0, 0.9517464547444561, 3.3218181926334824, 0.49353258541924433], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101", 10, 1, 10.0, 5190.900000000001, 3656, 8784, 4959.5, 8538.300000000001, 8784.0, 8784.0, 1.0877841836179702, 975.2860532470359, 11.73489679647558], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-5", 10, 0, 0.0, 880.0, 238, 1527, 922.5, 1517.7, 1527.0, 1527.0, 1.3995801259622112, 26.385638995801262, 0.736693054583625], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-8", 10, 0, 0.0, 852.0999999999999, 227, 1020, 911.0, 1012.7, 1020.0, 1020.0, 1.3301409949454641, 0.23511281258313382, 0.7962660448257516], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-9", 10, 0, 0.0, 1149.8999999999999, 470, 2425, 1134.5, 2307.3, 2425.0, 2425.0, 1.278935925310142, 30.910532437012407, 0.6656961408108454], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, 4.545454545454546, 0.20408163265306123], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 13, 59.09090909090909, 2.6530612244897958], "isController": false}, {"data": ["Assertion failed", 8, 36.36363636363637, 1.6326530612244898], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 490, 22, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 13, "Assertion failed", 8, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["https://sampleapp.tricentis.com/101-19", 10, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php", 10, 7, "Assertion failed", 7, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-25", 10, 3, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-22", 10, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-14", 10, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-12", 10, 3, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-17", 10, 1, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-15", 10, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-16", 10, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-7", 10, 2, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101", 10, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});

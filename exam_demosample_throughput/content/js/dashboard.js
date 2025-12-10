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

    var data = {"OkPercent": 97.04081632653062, "KoPercent": 2.9591836734693877};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.458, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.65, 500, 1500, "https://sampleapp.tricentis.com/101-19"], "isController": false}, {"data": [0.0, 500, 1500, "https://sampleapp.tricentis.com/101-12"], "isController": false}, {"data": [0.275, 500, 1500, "https://sampleapp.tricentis.com/101-11"], "isController": false}, {"data": [0.0, 500, 1500, "https://sampleapp.tricentis.com/101-14"], "isController": false}, {"data": [0.05, 500, 1500, "https://sampleapp.tricentis.com/101-13"], "isController": false}, {"data": [0.25, 500, 1500, "https://sampleapp.tricentis.com/101-16"], "isController": false}, {"data": [0.05, 500, 1500, "https://sampleapp.tricentis.com/101-15"], "isController": false}, {"data": [0.575, 500, 1500, "https://sampleapp.tricentis.com/101-18"], "isController": false}, {"data": [0.1, 500, 1500, "https://sampleapp.tricentis.com/101-17"], "isController": false}, {"data": [0.95, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-20"], "isController": false}, {"data": [0.0, 500, 1500, "https://sampleapp.tricentis.com/101/app.php"], "isController": false}, {"data": [0.95, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-21"], "isController": false}, {"data": [0.8, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-24"], "isController": false}, {"data": [0.85, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-25"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.75, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-22"], "isController": false}, {"data": [0.6, 500, 1500, "https://sampleapp.tricentis.com/101-20"], "isController": false}, {"data": [0.975, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-23"], "isController": false}, {"data": [0.375, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-10"], "isController": false}, {"data": [0.65, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-13"], "isController": false}, {"data": [0.725, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-14"], "isController": false}, {"data": [0.325, 500, 1500, "https://sampleapp.tricentis.com/101-10"], "isController": false}, {"data": [0.45, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-11"], "isController": false}, {"data": [0.15, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-12"], "isController": false}, {"data": [0.875, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-17"], "isController": false}, {"data": [0.9, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-18"], "isController": false}, {"data": [0.475, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-15"], "isController": false}, {"data": [0.9, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-16"], "isController": false}, {"data": [0.9, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-19"], "isController": false}, {"data": [0.075, 500, 1500, "https://sampleapp.tricentis.com/101-8"], "isController": false}, {"data": [0.275, 500, 1500, "https://sampleapp.tricentis.com/101-9"], "isController": false}, {"data": [0.725, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-2"], "isController": false}, {"data": [0.725, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-3"], "isController": false}, {"data": [0.4, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-0"], "isController": false}, {"data": [0.8, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-1"], "isController": false}, {"data": [0.325, 500, 1500, "https://sampleapp.tricentis.com/101-0"], "isController": false}, {"data": [0.975, 500, 1500, "https://sampleapp.tricentis.com/101-1"], "isController": false}, {"data": [0.5, 500, 1500, "https://sampleapp.tricentis.com/101-2"], "isController": false}, {"data": [0.425, 500, 1500, "https://sampleapp.tricentis.com/101-3"], "isController": false}, {"data": [0.175, 500, 1500, "https://sampleapp.tricentis.com/101-4"], "isController": false}, {"data": [0.2, 500, 1500, "https://sampleapp.tricentis.com/101-5"], "isController": false}, {"data": [0.0, 500, 1500, "https://sampleapp.tricentis.com/101-6"], "isController": false}, {"data": [0.05, 500, 1500, "https://sampleapp.tricentis.com/101-7"], "isController": false}, {"data": [0.475, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-6"], "isController": false}, {"data": [0.45, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-7"], "isController": false}, {"data": [0.475, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-4"], "isController": false}, {"data": [0.0, 500, 1500, "https://sampleapp.tricentis.com/101"], "isController": false}, {"data": [0.5, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-5"], "isController": false}, {"data": [0.45, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-8"], "isController": false}, {"data": [0.35, 500, 1500, "https://sampleapp.tricentis.com/101/app.php-9"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 980, 29, 2.9591836734693877, 1594.5785714285712, 0, 27926, 1108.5, 2441.9, 4242.9, 13324.88999999995, 22.75365683770606, 1277.8805759519387, 22.84290109124681], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://sampleapp.tricentis.com/101-19", 20, 0, 0.0, 945.25, 236, 1382, 1124.0, 1371.2, 1381.5, 1382.0, 5.657708628005658, 18.74115983026874, 2.9393564356435644], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-12", 20, 1, 5.0, 2882.4999999999995, 1672, 9902, 2208.0, 6570.000000000008, 9754.549999999997, 9902.0, 1.889644746787604, 379.62566211380386, 0.9256306689342404], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-11", 20, 0, 0.0, 1777.25, 884, 3778, 1392.0, 2619.400000000001, 3722.0999999999995, 3778.0, 3.5650623885918002, 6.137895499108734, 1.859124331550802], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-14", 20, 0, 0.0, 2093.2000000000003, 1523, 2731, 2087.5, 2635.6000000000013, 2728.85, 2731.0, 3.644979041370512, 424.66497516858027, 1.886561417896847], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-13", 20, 0, 0.0, 1758.5, 1233, 2919, 1628.0, 2342.6, 2890.2, 2919.0, 3.73761913660998, 100.59451504391703, 1.9381599233788076], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-16", 20, 0, 0.0, 1898.8999999999999, 1224, 7976, 1503.0, 2064.5, 7680.749999999995, 7976.0, 2.147535702781059, 205.10643723826908, 1.1220035165897133], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-15", 20, 0, 0.0, 2112.1, 681, 8863, 1790.5, 2389.400000000001, 8541.899999999994, 8863.0, 2.025111381125962, 197.32970078979346, 1.046175703726205], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-18", 20, 0, 0.0, 982.2500000000001, 254, 2524, 996.0, 1377.9, 2466.699999999999, 2524.0, 5.032712632108707, 6.939638902868646, 2.575333417211877], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-17", 20, 0, 0.0, 2787.65, 461, 21215, 1943.0, 2914.9000000000015, 20303.599999999988, 21215.0, 0.9085127646043427, 210.91780372717363, 0.48353462569274097], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-20", 20, 0, 0.0, 308.24999999999994, 221, 874, 237.0, 670.9000000000005, 864.9999999999999, 874.0, 0.66000066000066, 1.7827752202752203, 0.3467581592581592], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php", 20, 9, 45.0, 8045.249999999999, 3650, 24106, 4899.0, 23162.20000000002, 24103.9, 24106.0, 0.5703042573212809, 279.3509258087627, 7.859951096409934], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-21", 20, 1, 5.0, 254.65000000000003, 223, 427, 240.5, 290.90000000000003, 420.2499999999999, 427.0, 0.6602185323342026, 3.261215204420163, 0.3252414439804575], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-24", 20, 3, 15.0, 281.75, 0, 940, 241.0, 513.9000000000004, 919.7499999999998, 940.0, 0.651508241579256, 0.3659643950745977, 0.33151207936999155], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-25", 20, 1, 5.0, 368.05, 0, 974, 265.5, 940.5, 972.4499999999999, 974.0, 0.6452861844227915, 1.0103391987158805, 0.32327325450087113], "isController": false}, {"data": ["Test", 20, 10, 50.0, 18429.6, 12024, 42972, 13438.0, 32926.3, 42475.549999999996, 42972.0, 0.4633920296570899, 637.6079287100325, 11.397633804448564], "isController": true}, {"data": ["https://sampleapp.tricentis.com/101/app.php-22", 20, 2, 10.0, 535.0500000000001, 161, 2297, 451.0, 1146.6000000000006, 2240.949999999999, 2297.0, 0.659152330103487, 10.19941675318041, 0.3111018761123196], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-20", 20, 0, 0.0, 1052.1999999999998, 223, 2177, 1206.5, 1395.0, 2137.9499999999994, 2177.0, 4.206983592763988, 2.1692259150189317, 2.185659444678166], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-23", 20, 0, 0.0, 281.9, 220, 661, 245.5, 417.8000000000002, 649.1999999999998, 661.0, 0.6591957811470006, 0.11587425840474622, 0.39461622445616346], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-10", 20, 2, 10.0, 1115.05, 274, 2091, 984.0, 1781.7000000000005, 2076.7, 2091.0, 0.6293464237389471, 0.311661690896504, 0.3346475856697819], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-13", 20, 0, 0.0, 690.3500000000001, 230, 2078, 671.5, 1072.8000000000002, 2028.1499999999992, 2078.0, 0.6522093592043046, 3.1635975460622863, 0.3401169900538073], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-14", 20, 0, 0.0, 588.9, 231, 1147, 593.0, 1042.4, 1142.0, 1147.0, 0.6514657980456027, 0.11451547231270359, 0.38489922638436486], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-10", 20, 0, 0.0, 1620.1499999999999, 685, 3262, 1385.5, 2205.0, 3209.499999999999, 3262.0, 2.5214321734745333, 3.4374212052445787, 1.3124251449823499], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-11", 20, 3, 15.0, 1025.15, 79, 2528, 992.0, 1997.4000000000015, 2505.0999999999995, 2528.0, 0.6482982171799027, 0.39223941450567257, 0.3325693881685575], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-12", 20, 3, 15.0, 1682.6000000000001, 508, 3092, 1839.5, 2410.0000000000005, 3059.0999999999995, 3092.0, 0.6129892420388022, 116.44709399998467, 0.27374998084408614], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-17", 20, 0, 0.0, 442.65, 226, 1792, 257.0, 956.7, 1750.2999999999993, 1792.0, 0.6605019815059445, 0.5437530961030382, 0.3496016347424042], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-18", 20, 0, 0.0, 392.85, 223, 1805, 256.0, 942.1000000000005, 1762.9999999999995, 1805.0, 0.6603057215490773, 0.3230597329063356, 0.350142584766747], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-15", 20, 0, 0.0, 1022.3000000000002, 446, 1998, 751.0, 1827.1000000000006, 1991.0, 1998.0, 0.6439357352136257, 57.3203419298754, 0.34020432885797997], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-16", 20, 0, 0.0, 370.25, 221, 972, 250.5, 933.5000000000001, 970.4499999999999, 972.0, 0.6509357200976403, 1.4442636289666395, 0.34580960130187144], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-19", 20, 1, 5.0, 361.65000000000003, 220, 929, 261.0, 905.2, 927.85, 929.0, 0.6588483331137173, 7.437136603966267, 0.3319012818717881], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-8", 20, 0, 0.0, 2060.05, 1006, 3573, 1965.5, 2754.8, 3532.4999999999995, 3573.0, 3.3250207813798838, 5.67591438071488, 1.7209580216126352], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-9", 20, 0, 0.0, 1468.4499999999998, 632, 2419, 1365.0, 2319.2000000000003, 2415.1, 2419.0, 3.562522265764161, 5.302035090844318, 1.8473626202351265], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-2", 20, 0, 0.0, 674.0499999999998, 222, 1757, 609.0, 1279.9, 1733.4499999999996, 1757.0, 0.6338340622425049, 0.11203512232997402, 0.39057548171388734], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-3", 20, 0, 0.0, 646.9999999999999, 228, 1291, 865.5, 1096.7000000000003, 1282.05, 1291.0, 0.6468932949509978, 0.11434344373645566, 0.3904102112106608], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-0", 20, 0, 0.0, 2785.9999999999995, 500, 13112, 840.0, 11446.900000000005, 13041.5, 13112.0, 0.6304176516942475, 40.00594094759653, 0.3170557525610717], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-1", 20, 0, 0.0, 625.3, 223, 2421, 255.5, 2109.3, 2406.35, 2421.0, 0.6054734802615644, 0.10643088520222815, 0.35772603081860016], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-0", 20, 0, 0.0, 1394.0499999999995, 957, 2850, 1354.5, 1703.7, 2792.699999999999, 2850.0, 6.127450980392156, 2.267874923406863, 3.0338062959558827], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-1", 20, 0, 0.0, 508.3, 436, 1468, 457.5, 489.9, 1419.0999999999995, 1468.0, 9.074410163339383, 3.828266787658802, 4.501758166969147], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-2", 20, 0, 0.0, 842.5, 367, 3544, 682.0, 1249.5000000000011, 3431.7999999999984, 3544.0, 3.787878787878788, 52.707371567234844, 1.8791429924242424], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-3", 20, 0, 0.0, 1085.4, 285, 2162, 538.5, 2092.7000000000003, 2159.0, 2162.0, 4.120313143798929, 5.601050679851669, 2.108441491553358], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-4", 20, 0, 0.0, 1971.25, 500, 5226, 2087.5, 2839.7000000000003, 5107.199999999999, 5226.0, 3.3545790003354576, 90.58673683327743, 1.7984998742032876], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-5", 20, 0, 0.0, 1739.85, 386, 2640, 1856.5, 2633.7000000000003, 2639.8, 2640.0, 3.5254715318173804, 41.95104552265116, 1.84536400493566], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-6", 20, 0, 0.0, 2533.8, 1537, 3094, 2698.0, 2988.3, 3089.2, 3094.0, 3.2743942370661427, 147.19425343811395, 1.6979524803536348], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-7", 20, 0, 0.0, 2140.0499999999997, 1315, 4241, 2051.5, 3023.2000000000016, 4183.599999999999, 4241.0, 3.4002040122407347, 18.003814603876233, 1.7366276351581096], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-6", 20, 0, 0.0, 1150.6, 458, 2162, 1170.5, 2068.900000000002, 2161.75, 2162.0, 0.628140703517588, 14.18162590295226, 0.32756556218592964], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-7", 20, 1, 5.0, 1618.25, 242, 10103, 1178.5, 2077.0000000000005, 9702.599999999995, 10103.0, 0.6285355122564426, 19.52811959852294, 0.30671796433060966], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-4", 20, 0, 0.0, 2183.75, 239, 23368, 959.5, 2731.200000000001, 22338.749999999985, 23368.0, 0.64246707356248, 2.2423606649534213, 0.3331543125602313], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101", 20, 1, 5.0, 10384.3, 7756, 27926, 8704.5, 14823.4, 27271.94999999999, 27926.0, 0.7138013490845498, 632.520810376441, 7.719092401584639], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-5", 20, 0, 0.0, 1741.5500000000002, 490, 12933, 1134.5, 3590.1000000000054, 12478.299999999994, 12933.0, 0.629504894400554, 11.867765611721381, 0.33135072078310407], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-8", 20, 1, 5.0, 1087.65, 232, 2067, 1000.5, 1890.5000000000005, 2059.1, 2067.0, 0.6463915193432662, 0.21717871311528394, 0.3676036145405772], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-9", 20, 0, 0.0, 1815.6, 1109, 8202, 1270.5, 2375.5, 7910.849999999996, 8202.0, 0.6042843762274527, 14.604916042239477, 0.31453473879807836], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 2, 6.896551724137931, 0.20408163265306123], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 17, 58.62068965517241, 1.7346938775510203], "isController": false}, {"data": ["Assertion failed", 10, 34.48275862068966, 1.0204081632653061], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 980, 29, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 17, "Assertion failed", 10, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 2, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101-12", 20, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php", 20, 9, "Assertion failed", 9, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-21", 20, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-24", 20, 3, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 2, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-25", 20, 1, "Non HTTP response code: java.lang.IllegalStateException/Non HTTP response message: Connection pool shut down", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-22", 20, 2, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-10", 20, 2, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-11", 20, 3, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-12", 20, 3, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-19", 20, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-7", 20, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101", 20, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://sampleapp.tricentis.com/101/app.php-8", 20, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});

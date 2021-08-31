//Could have just used ".fetch" if I didn't care about internet explorer 11
JSC.fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
    .then((res) => {
        return res.text();
    })
    .then((text) => {
        let lifeExpectancyDataMaleFemale = csvToSeriesMaleFemale(text);
        renderChartMaleFemale(lifeExpectancyDataMaleFemale);
        
        let lifeExpectancyDataBlackWhite = csvToSeriesBlackWhite(text);
        renderChartBlackWhite(lifeExpectancyDataBlackWhite);
    })
    .catch((error) => {
        console.log(`ERROR LOADING DATA FROM FETCH: ${error}`);
    });

function csvToSeriesMaleFemale(text) {
    const lifeExp = 'average_life_expectancy';
    let dataAsJSON = JSC.csv2Json(text);
    let male = [], female = [];
    dataAsJSON.forEach((row) => {
        if (row.race === "All Races") {
            if (row.sex === "Male") {
                male.push({ x: row.year, y: row[lifeExp] });
            } else if (row.sex === "Female") {
                female.push({ x: row.year, y: row[lifeExp] });
            }
        }
    });
    return [
        { name: "Male", points: male },
        { name: "Female", points: female }
    ];
}

function csvToSeriesBlackWhite(text) {
    const lifeExp = 'average_life_expectancy';
    let dataAsJSON = JSC.csv2Json(text);
    let black = [], white = [];
    dataAsJSON.forEach(row => {
        if (row.race === "Black" && row.sex === "Both Sexes") {
            black.push({ x: row.year, y: row[lifeExp] });
        } else if (row.race === "White" && row.sex === "Both Sexes") {
            white.push({ x: row.year, y: row[lifeExp] });
        }
    });
    return [
        { name: "Black", points: black },
        { name: "White", points: white }
    ];
}

function renderChartMaleFemale(series) {
    JSC.Chart('maleFemaleChart', {
        title_label_text: "Life Expectancy in the US by Gender",
        annotations: [
            {
                label_text: "Source: National Center for Health Statistics",
                position: "bottom center"
            }, {
                label_text: "Year",
                position: "left"
            }],
        legend_visible: false,
        defaultSeries_lastPoint_label_text: "<b>%seriesName</b>",
        xAxis: { crosshair: { enabled: true } },
        defaultPoint_tooltip: '%seriesName: <b>%yValue</b> years',
        series: series
    });
}

function renderChartBlackWhite(series) {
    JSC.Chart("blackWhiteChart", {
        title_label_text: "Life Expectancy in the US by Race",
        annotations: [
            {
                label_text: "Source: National Center for Health Statistics",
                position: "bottom center"
            }],
        legend_visible: false,
        defaultSeries_firstPoint_label_text: "<b>%seriesName</b>",
        xAxis: {crosshair: {enabled:true}},
        defaultPoint_tooltip: '%seriesName: <b>%yValue</b> years',
        series: series
    });
}
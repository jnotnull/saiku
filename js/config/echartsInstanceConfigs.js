(function echartsInstanceConfigs(root, config) {
		root["echartsInstanceConfigs"] = config;
})(this, {
	'/homes/home:admin/sample_reports/yoy_average_depth_vs_max_depth.saiku': {
        type: "bar",
        title: "average depth \r\n vs max depth",
        legendData: ["Average Depth", "Max Depth"],
        xAxis: ["Year"],
        xConnecter : "~",
        yAxis: ["Average Depth", "Max Depth"]
    },

    '/homes/home:admin/sample_reports/average_magnitude_with_quakes.saiku': {
        type: "pie",
        title: "average magnitude with quakes",
        legendDataFields: ["Year"],
        radius: ['50%', '70%'],
        seriesName: "average magnitude with quakes",
        seriesFields: ["Average Magnitude"],
        seriesDataNameFields: ["Year"]
    },

    '/homes/home:admin/sample_reports/average_mag_and_depth_over_time.saiku': {
        type: "pie",
        title: "average mag and depth over time",
        legendDataFields: ["Year", "Quarter"],
        radius: ['50%', '70%'],
        xConnecter: "~",
        seriesName: "average magnitude with quakes",
        seriesFields: ["Average Magnitude"],
        seriesDataNameFields: ["Year", "Quarter"]
    },

    '/homes/home:admin/sample_reports/number_of_quakes_over_time.saiku': {
        type: "line", 
        title: "number of quakes",
        legendDataFields: ["Number of quakes"],
        xAxis: ["Year", "Quarter"],
        xConnecter : "~",
        seriesFields: ["Number of quakes"],
        seriesStack: "总量"
    }
})
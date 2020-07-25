if (this.simpleDatatables) simpleDatatables.helpers = {

	locatedLabels: {
		"placeholder": "搜索...",
		"perPage": "每页条目数量：{select}",
		"noRows": "暂无条目",
		"info": "共 {rows} 个条目，目前显示第 {start} 到 {end} 个"
	},

	createDataTable: (element, options) => new simpleDatatables.DataTable(
		element, Object.assign(
			options, {
				labels: simpleDatatables.helpers.locatedLabels
			}
		)
	),

	// 对象数组：[ {...}, {...}, ... ]
	objArray: {

		// 将对象数组直接处理为 simple-datatables 的 data 格式
		parse: rawData => {

			if ( Array.isArray(rawData) && rawData.length > 0 ) {
				const keys = Object.keys(rawData[0]);
				return {
					headings: keys,
					data: rawData.map(
						entry => keys.map( key => entry[key] )
					)
				};
			} else {
				return [];
			}

		},
	
	}

};


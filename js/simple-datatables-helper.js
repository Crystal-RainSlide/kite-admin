if (this.simpleDatatables) simpleDatatables.helpers = {

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


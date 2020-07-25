const {
	objArray,
	createDataTable
} = simpleDatatables.helpers;

const checkingTable = document.getElementById("checking-table");
const checkingDialog = document.getElementById("checking-dialog");

const headingsMap = new Map([
	[ "id"           , "记录ID" ],
	[ "uid"          , "用户ID" ],
	[ "studentId"    , "学号" ],
	[ "name"         , "姓名" ],
	[ "approvedTime" , "时间" ],
	[ "college"      , "学院" ],
	[ "major"        , "专业" ],
	[ "certStatus"   , "状态" ],
]);

const checkingEntryProcessor = entry => {

	if ( entry.hasOwnProperty("id") ) {
		entry.id = `<span data-id="${ entry.id }">${ entry.id }</span>`;
	}

	if ( entry.hasOwnProperty("uid") ) {
		entry.uid = String(entry.uid);
	}

	if ( entry.hasOwnProperty("approvedTime") ) {
		entry.approvedTime = `<time datetime="${ entry.approvedTime }">${
			new Date(entry.approvedTime).toLocaleString()
		}</time>`;
	}

	// if ( entry.hasOwnProperty("certStatus") ) {
	// 	entry.certStatus = entry.certStatus ? "" : ""
	// }

	
	return entry;

};

const dataTable = createDataTable(
	document.getElementById("checking-table"), {
		ajax: {
			url: debug ? "../data/checking.json": getPrefixedUrl("/checking"),
			load: xhr => {
	
				const data = objArray.parse(
					responseProcesser.json(xhr.responseText).map(checkingEntryProcessor)
				);
	
				data.headings = data.headings.map(
					heading => headingsMap.get(heading) || heading
				);
	
				return data;
	
			}
		}
	}
);

const addClickEventToRow = tr => {

	const id = checkIdByElement(
		tr.querySelector('[data-id]'), "id"
	);

	if ( id !== false ) {

		tr.addEventListener(
			"click", () => {
				// fetch(
				// 	"/checking/" + String(uid), getSafeRequest({
				// 		method: "GET"
				// 	})
				// ).then()
				// checkingDialog.main
				checkingDialog.show();
			}
		);

	}

}

dataTable.on(
	'datatable.update',
	() => dataTable.activeRows.forEach( addClickEventToRow )
);

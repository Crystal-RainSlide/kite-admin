const {
	objArray,
	createDataTable
} = simpleDatatables.helpers;

const userTable = document.getElementById("user-table");
const userDialog = document.getElementById("user-dialog");

const headingsMap = new Map([
	[ "uid"         , "ID"   ],
	[ "nick_name"   , "昵称" ],
	[ "avatar"      , "头像" ],
	[ "is_disabled" , "状态" ],
	[ "is_admin"    , "身份" ],
	[ "country"     , "国家" ],
	[ "province"    , "省份" ],
	[ "city"        , "城市" ],
	[ "location"    , "位置" ],
	[ "language"    , "语言" ],
	[ "create_time" , "创建时间" ],
]);

const userEntryProcessor = entry => {

	if ( entry.hasOwnProperty("uid") ) {
		entry.uid = `<span data-uid="${ entry.uid }">${ entry.uid }</span>`;
	}

	if ( entry.hasOwnProperty("avatar") ) {
		entry.avatar =
			`<img class="avatar" src="${ entry.avatar }" alt="头像">`;
	}

	if ( entry.hasOwnProperty("is_disabled") ) {
		entry.is_disabled = entry.is_disabled ? "禁用" : "正常"
	}
	if ( entry.hasOwnProperty("is_admin") ) {
		entry.is_admin = entry.is_admin ? "管理员" : "用户"
	}

	const keys = [ "country", "province", "city" ];

	if (
		keys.every( key => entry.hasOwnProperty(key) )
	) {
		entry.location = keys.map(key => entry[key]).join(" ");
		keys.forEach( key => delete entry[key] );
	}

	return entry;

};

const dataTable = createDataTable(
	document.getElementById("user-table"), {
		ajax: {
			url: debug ? "../data/user.json": getPrefixedUrl("/user"),
			load: xhr => {
	
				const data = objArray.parse(
					responseProcesser.json(xhr.responseText).map(userEntryProcessor)
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

	const uid = checkIdByElement(
		tr.querySelector('[data-uid]'), "uid"
	);

	if ( uid !== false ) {

		tr.addEventListener(
			"click", () => {
				// fetch(
				// 	"/user/" + String(uid), getSafeRequest({
				// 		method: "GET"
				// 	})
				// ).then()
				// userDialog.main
				userDialog.show();
			}
		);

	}

}

dataTable.on(
	'datatable.update',
	() => dataTable.activeRows.forEach( addClickEventToRow )
);

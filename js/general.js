const debug = true;

const logError = debug
	? error => (console.error(error), alert(error), error)
	: error => (console.log(error), error);

const safeRequest = {
	mode: "same-origin",
	credentials: "same-origin",
	cache: "no-store"
};

const getSafeRequest = request => Object.assign(request, safeRequest);


// const getResponseCode = response => response.json().code;

const responseProcesser = Object.assign(
	obj => {

		const { code, msg, data } = obj;
	
		return code === 0
			? data
			: logError( new Error( msg || "未知错误" ) );
	
	}, {
		obj: response => response.json().then(responseProcesser),
		json: json => responseProcesser( JSON.parse(json) )
	}
);

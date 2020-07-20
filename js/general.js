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

const responseProcesser = obj => {

	const { code, msg, data } = obj;

	return code === 0
		? data
		: logError( new Error( msg || "未知错误" ) );

};

const responseObjProcesser = response => response.json().then(responseProcesser);
const responseJsonProcesser = json => responseProcesser( JSON.parse(json) );

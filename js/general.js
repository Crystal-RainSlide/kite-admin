const debug = true;
const logError = debug
	? error => (console.error(error), alert(error), error)
	: error => (console.log(error), error);



const apiPrefix = "/api/v1";

const getPrefixedUrl = url => apiPrefix + url;

const safeRequest = {
	mode: "same-origin",
	credentials: "same-origin",
	cache: "no-store"
};

const getSafeRequest = request => Object.assign(request, safeRequest);

const $fetch  = ( url, request ) => fetch(
	apiPrefix + url,  Object.assign(request, safeRequest)
).then(
	response => response.json()
)

const responseProcesser = Object.assign(
	obj => {

		const { code, msg, data } = obj;

		return code === 0
			? data
			: logError( new Error( msg || "未知错误" ) );

	}, {
		fetch: response => response.json().then(responseProcesser),
		json: json => responseProcesser( JSON.parse(json) )
	}
);

const checkIdByElement = (element, idName) => {
	if (
		element &&
		element.dataset &&
		element.dataset[idName]
	) {

		const id = Number(element.dataset[idName]);

		return Number.isInteger(id) && id >= 0 ? id : false;

	}
}


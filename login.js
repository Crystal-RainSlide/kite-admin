const loginForm = this.login || window.login;

loginForm.addEventListener(
	"submit", event => {

		// event.stopImmediatePropagation();
		event.preventDefault();

		$fetch(
			"/session", {
				method: "POST",
				redirect: "error",
				headers: { "Content-Type" : "application/x-www-form-urlencoded" },
				body: new URLSearchParams( new FormData(loginForm) ).toString()
			}
		).then(
			obj => {
				switch (obj.code) {

					case 0:
						if (obj.data && obj.data.token) {
							localStorage.setItem("token", obj.data.token);
							location.assign("./admin.html");
						} else {
							throw new Error("登录成功，但服务器未返回 token");
						}
						break;

					case 5:
						alert("登录失败，凭据无效或找不到用户");
						break;

					default:
						alert("登录失败，其他错误");
						break;

				}
			}
		).catch(logError);

	}
);

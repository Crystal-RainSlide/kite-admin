document.addEventListener(
	"DOMContentLoaded",
	() => document.querySelectorAll('.dialog').forEach(
		dialog => dialog.querySelectorAll(':scope .dialog-close').forEach(
			closeButton => closeButton.addEventListener(
				"click", () => dialog.classList.remove("open")
			)
		)
	)
);

document.addEventListener(
	"DOMContentLoaded", () => document.querySelectorAll('.dialog').forEach(
		dialog => {

			dialog.show = () => dialog.classList.add("open");
			dialog.hide = () => dialog.classList.remove("open");

			dialog.querySelectorAll(':scope .dialog-close').forEach(
				closeButton => closeButton.addEventListener( "click", dialog.hide )
			);

		}
	)
);

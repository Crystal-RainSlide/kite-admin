const setupDialog = Object.assign(
	function (dialog) {

		Object.assign(dialog, {

			show: () => dialog.classList.add(setupDialog.open),
			hide: () => dialog.classList.remove(setupDialog.open),

			clear: (...components) => [
				components.length > 0 ? components : Dialog.defaultComponents
			].forEach(
				component => component.innerHTML = ""
			),

			setComponent: component => dialog[component] =
				dialog.querySelector( ':scope > .dialog-' + component )

		});

		setupDialog.defaultComponents.forEach(dialog.setComponent);

		dialog.querySelectorAll(':scope .dialog-' + setupDialog.close).forEach(
			closeButton => closeButton.addEventListener(
				"click", dialog.hide
			)
		);

		return dialog;

	}, {
		defaultComponents: [ "header", "main", "footer" ],
		open: "open",
		close: "close"
	}
);

document.addEventListener(
	"DOMContentLoaded",
	() => document.querySelectorAll('.dialog').forEach(setupDialog)
);

const mobileMenuSelector = ".mob-header__link--menu";
const menuButtons = document.querySelectorAll(mobileMenuSelector);
menuButtons.forEach(function (btn) {
	btn.addEventListener("click", function (e) {
		if (e.target.matches(mobileMenuSelector)) {
			e.target.classList
				.toggle("open");
		} else {
			e.target.closest(mobileMenuSelector).classList
				.toggle("open");
		}
		document.querySelector('.mob-sidebar').classList
			.toggle("open")
	});
});

function closeSidebar() {
	console.log('a');
	document.querySelector('.mob-sidebar').classList
		.remove("open")
}

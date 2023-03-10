var arts = [
	{src : "adesivos.jpg", tags : ["FanArts"]},
	{src : "BrttQuadrado.jpg", tags : ["FanArts"]},
	{src : "DannyThinkingPNG.png", tags : ["FanArts"]},
	{src : "Fabao Quadrado INSTA 1.png", tags : ["FanArts"]},
	{src : "Luhestilo2.png", tags : ["Auto Retrato"]},
	{src : "LuhPirataRUIDO.jpg", tags : ["Giz", "Auto Retrato"]},
	{src : "miguel niverCOMPLETO.png", tags : []},
	{src : "MiguelInivLuan.jpg", tags : ["Auto Retrato"]},
	{src : "MiguelZoeComFundo.png", tags : []},
	{src : "MiiEditado.png", tags : []},
	{src : "N Fanart-.png", tags : ["FanArts"]},
	{src : "OcoTropical.png", tags : ["FanArts"]},
	{src : "Steven Artboard 1@4x.png", tags : ["FanArts"]},
	{src : "LiraHelio.jpg", tags : ["Lápis e Papel", "FanArts"]},
	{src : "YUUMIpng.png", tags : [ "FanArts"]},
	{src : "CeciRiotEditado.png", tags : ["Glitch"]},
	{src : "Rioter-LuhEditado.png", tags : ["Glitch", "Auto Retrato"]},
	{src : "Rioter-DannyEditado.png", tags : ["Glitch"]}
];

arts.tagged = function(tag) {
	return this.filter(art => { return art.tags.includes(tag) });
};

arts.notTagged = function(tag) {
	return this.filter(art => { return !art.tags.includes(tag) });
};



$(document).ready( () => {
	for(let i = 0; i < arts.length; i++) {
		document.getElementsByClassName("gallery")[0].innerHTML += '<div class="gallery-item"><img class="img-modal-trigger" src="img/' + arts[i].src + '"></div>';
	}

	$(".section-button").click(function(){
		$(".section-button").removeClass("active");
		$(".section-all").removeClass("active");

		this.classList.add("active");

		arts.tagged(this.innerHTML).forEach(art => {
			$("img[src = 'img/" + art.src + "']").parent().show();
		})

		arts.notTagged(this.innerHTML).forEach(art => {
			$("img[src = 'img/" + art.src + "']").parent().hide();
		})
	});

	$(".section-all").click(function() {
		$(".section-button").removeClass("active");
		$(".section-all").removeClass("active");

		this.classList.add("active");

		$(".gallery-item").show();
	})

	L.modal(); // Inicializate Lune modal

});

const navbar = $(".navbar"); // Stores the navar refference
var navbarOffset = navbar.offset().top; // Stores the navbar distance from top of the page
const user = $(".user"); // Profile image and user's name wrapper refference
const profile = $(".profile.large"); // Main profile image refference

var scroll = $(document).scrollTop(); // Get the scroll value

// Document scroll event
$(document).scroll(() => {
	// Get the scroll value
	scroll = $(document).scrollTop();

	// Try to turn navbar into fixed
	fixNavbar();
});

// Try to turn navbar into fixed
fixNavbar();

// Set the navbar position to fixed when it is scrolled up
function fixNavbar() {
	
	if(scroll >= navbarOffset) {
		// Verifies if navbar isn't already fixed
		if(!navbar.hasClass("fixed")) {
			if($(".gallery").height() < viewHeight + navbar.height()) // Prevent bug when the gallery is too small
				$(".header").css("marginBottom", "180px");
			navbar.addClass("fixed"); // If itsn't, turns it fixed
		}
	} else {
		// Verifies if navbar is already fixed
		if(navbar.hasClass("fixed")) {
			if($(".gallery").height() < viewHeight + navbar.height()) // Prevent bug when the gallery is too small
				$(".header").css("marginBottom", "0");
			navbar.removeClass("fixed");
			user.addClass("hide");
		}
	}

	// Show hide user's profile image and name
	if(scroll >= profile.offset().top + profile.height()) 
		user.removeClass("hide");
	else
		user.addClass("hide");
}
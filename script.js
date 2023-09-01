document.addEventListener('DOMContentLoaded', function() {
    // Get the fixed navbar
    const navbar = document.querySelector('.navbar.fixed-top');

    // Get all navbar links within the fixed top navbar
    const navbarLinks = navbar.querySelectorAll('.navbar-nav a.nav-link');

    // Get the height of the fixed navbar
    const navbarHeight = navbar.clientHeight;

    // Add click event listeners to navbar links
    navbarLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior

            navbarLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");

            // Get the target section's ID from the link's href
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Calculate the scroll position, accounting for the navbar height
            if (targetSection) {
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                const adjustedPosition = targetPosition - navbarHeight;

                window.scrollTo({
                    top: adjustedPosition,
                    behavior: 'smooth',
                });
            }
        });
    });

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");
    const lastItem = navLinks[navLinks.length - 1];
    function changeActiveLink() {
        sections.forEach((section, index) => {
            const bounding = section.getBoundingClientRect();

            if (bounding.top <= navbarHeight && bounding.bottom >= navbarHeight) {
                navLinks.forEach(link => link.classList.remove("active"));
                navLinks[index].classList.add("active");
            }
        });
        const scrollPosition = window.scrollY;
        const pageHeight = document.body.scrollHeight - window.innerHeight;

        if (scrollPosition+5 >= pageHeight) {
            navLinks.forEach(link => link.classList.remove("active"));
            lastItem.classList.add("active");
        }
    }

    document.addEventListener("scroll", changeActiveLink);

    const cardContainer = document.getElementById("projectContainer");
    const cardTemplate = document.getElementById("cardTemplate");

    for (i=0; i<4; i++){
        const cardClone = document.importNode(cardTemplate.content, true);
        cardClone.querySelector(".card-title").textContent = "Project number " + i;
        cardClone.querySelector(".card-text").textContent = "Bla blo description";

        cardContainer.appendChild(cardClone);
    }
    $('#downloadPage').click(function () {
        domtoimage.toPng(document.querySelector('.body'))
            .then(function (blob) {
                var pdf = new jsPDF('l', 'pt', [$('.body').width(), $('.body').height()]);
                pdf.addImage(blob, 'PNG', 0, 0, $('.body').width(), $('.body').height());
                pdf.save("test.pdf");
                that.options.api.optionsChanged();
            });
    });
});




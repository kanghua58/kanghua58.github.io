document.addEventListener('DOMContentLoaded', (event) => {

  
    // Code related to navigation links and sections
    const navItems = document.querySelectorAll('.nav-item a');
    const internalLinks = document.querySelectorAll('.nav-item a[href^="#"]');
    const sections = document.querySelectorAll('section');
    const aboutSection = document.getElementById('about');
    const workSection = document.getElementById('work');

    function removeActiveClasses() {
        navItems.forEach(navItem => {
            navItem.classList.remove('active-nav-item');
        });
    }

    function addActiveClass(hash) {
        removeActiveClasses();
        const navItem = document.querySelector(`.nav-item a[href="${hash}"]`);
        if (navItem) {
            navItem.classList.add('active-nav-item');
        }
    }

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                addActiveClass(targetId);
            }
        });
    });

    
    function setActiveNavLink() {
        const scrollPosition = window.scrollY;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-item a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Add active class
                navLink.classList.add('active-nav-item');
            } else {
                // Remove active class
                navLink.classList.remove('active-nav-item');
            }
        });
    }

    // Scroll event to update the navigation links
    window.addEventListener('scroll', setActiveNavLink);

    // Click event for internal navigation links
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the clicked link is an internal link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Scroll to the target section
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    // Set active navigation link after scrolling
                    setTimeout(setActiveNavLink, 500); // Timeout for scroll to complete
                }
            }
        });
    });

    window.addEventListener('scroll', () => {
        let inSection = false;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                addActiveClass(`#${sectionId}`);
                inSection = true;
            }
        });
        if (!inSection) removeActiveClasses();
    });

    if (window.scrollY >= aboutSection.offsetTop && window.scrollY < workSection.offsetTop) {
        addActiveClass('#about');
    } else if (window.scrollY >= workSection.offsetTop) {
        addActiveClass('#work');
    }

    // Set the current year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    console.log("success");
});

const mediaQuery = window.matchMedia("(max-width: 580px)");

function handleMediaQueryChange(mediaQuery) {
  if (mediaQuery.matches) {
    // 小屏幕设备,直接显示section1,不使用IntersectionObserver
    sections.forEach((section) => {
      section.classList.remove("fade-out");
      section.classList.add("fade-in");
    });
  } else {
    // 非小屏幕设备,使用IntersectionObserver
    sections.forEach((section) => {
      observer.observe(section);
      section.classList.add("fade-out");
    });
  }
}

mediaQuery.addListener(handleMediaQueryChange);
handleMediaQueryChange(mediaQuery);


const sections = document.querySelectorAll("section");

const options = {
  root: null,
  threshold: 0.1,
  rootMargin: "0px 0px -20% 0px",
};

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("fade-out"); // 移除fade-out类
      entry.target.classList.add("fade-in"); // 添加fade-in类
      observer.unobserve(entry.target);
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
  section.classList.add("fade-out"); // 初始状态为fade-out
});



(function(){
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
        history.replaceState(null, null, redirect);
    }
})();




document.addEventListener('DOMContentLoaded', (event) => {


    // 获取侧边目录元素
    const tableOfContents = document.getElementById('table-of-contents');
    // 获取侧边目录中的所有链接
    const tocLinks = tableOfContents.querySelectorAll('a');

    function updateActiveSection() {
        const scrollPosition = window.pageYOffset;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
                // 移除所有链接的 'active' 类
                tocLinks.forEach(link => link.classList.remove('active'));

                // 为当前活动部分的链接添加 'active' 类
                tocLinks[index].classList.add('active');
            }
        });
    }

    // 添加滚动事件监听器,以更新活动部分
    window.addEventListener('scroll', updateActiveSection);

  
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



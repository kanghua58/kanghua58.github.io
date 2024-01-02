document.addEventListener('DOMContentLoaded', (event) => {
    // 获取所有导航链接
    const navItems = document.querySelectorAll('.nav-item a');
    const internalLinks = document.querySelectorAll('.nav-item a[href^="#"]'); // Select only internal links
    const sections = document.querySelectorAll('section');
    const aboutSection = document.getElementById('about');
    const workSection = document.getElementById('work');

    // 移除活跃类
    function removeActiveClasses() {
        navItems.forEach(navItem => {
            navItem.classList.remove('active-nav-item');
        });
    }

    // 添加活跃类
    function addActiveClass(hash) {
        removeActiveClasses();
        const navItem = document.querySelector(`.nav-item a[href="${hash}"]`);
        if (navItem) {
            navItem.classList.add('active-nav-item');
        }
    }

    // 添加平滑滚动
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Add active class when clicked
                addActiveClass(targetId);
            }
        });
    });

    // 滚动时更新导航项状态
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        let inSection = false;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50; // 50px offset for better activation timing
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                addActiveClass(`#${sectionId}`);
                inSection = true;
            }
        });

        // 如果当前滚动位置不在任何区域内，则移除活跃类
        if (!inSection) {
            removeActiveClasses();
        }
    });

    // 初始激活检查
    if (window.scrollY >= aboutSection.offsetTop && window.scrollY < workSection.offsetTop) {
        addActiveClass('#about');
    } else if (window.scrollY >= workSection.offsetTop) {
        addActiveClass('#work');
    }
});

document.getElementById('current-year').textContent = new Date().getFullYear();

console.log("success");

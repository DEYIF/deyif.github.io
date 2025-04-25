// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', () => {
    // 平滑滚动功能
    const navLinks = document.querySelectorAll('.nav-local');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 计算目标位置，考虑到固定定位的元素
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时高亮当前导航项
    const sections = document.querySelectorAll('section');
    
    function highlightNavOnScroll() {
        let scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-local[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // 初始化页面时调用一次，确保正确高亮
    highlightNavOnScroll();
    
    // 微信公众号二维码弹窗功能
    const modal = document.getElementById('wechat-modal');
    const btnWechat = document.getElementById('wechat-btn');
    const closeBtn = document.querySelector('.close-modal');
    
    // 点击微信公众号按钮时显示弹窗
    btnWechat.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });
    
    // 点击关闭按钮关闭弹窗
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复背景滚动
    });
    
    // 点击弹窗外部区域关闭弹窗
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // 按ESC键关闭弹窗
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // 移动端导航菜单按钮（如果存在）
    const menuButton = document.querySelector('.menu-button');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }
}); 
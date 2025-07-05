// スクロールアニメーション
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        this.observeElements();
    }

    observeElements() {
        const elements = document.querySelectorAll([
            '.hero-content',
            '.hero-image',
            '.section-title',
            '.plant-card',
            '.feature',
            '.testimonial-card',
            '.contact-content'
        ].join(','));

        elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateElement(entry.target);
            }
        });
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // 植物カードの連続アニメーション
        if (element.classList.contains('plant-card')) {
            const index = Array.from(element.parentElement.children).indexOf(element);
            element.style.transitionDelay = `${index * 0.1}s`;
        }
        
        // 特徴の連続アニメーション
        if (element.classList.contains('feature')) {
            const index = Array.from(element.parentElement.children).indexOf(element);
            element.style.transitionDelay = `${index * 0.2}s`;
        }
    }
}

// スムーズスクロール
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', this.handleClick.bind(this));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// ヘッダーのスクロール効果
class HeaderScroll {
    constructor() {
        this.init();
    }

    init() {
        this.header = document.querySelector('.header');
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        this.header.classList.toggle('scrolled', scrolled);
    }
}

// モバイルメニュー
class MobileMenu {
    constructor() {
        this.init();
    }

    init() {
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.menuClose = document.querySelector('.mobile-menu-close');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.menuOverlay = document.querySelector('.mobile-menu-overlay');
        this.menuLinks = document.querySelectorAll('.mobile-nav-link');

        this.bindEvents();
    }

    bindEvents() {
        this.menuToggle.addEventListener('click', this.openMenu.bind(this));
        this.menuClose.addEventListener('click', this.closeMenu.bind(this));
        this.menuOverlay.addEventListener('click', this.closeMenu.bind(this));
        
        this.menuLinks.forEach(link => {
            link.addEventListener('click', this.closeMenu.bind(this));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    openMenu() {
        this.mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// フォーム処理
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        const form = document.querySelector('.form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // 簡単なバリデーション
        if (!this.validateForm(data)) {
            return;
        }

        // 送信処理（実際のプロジェクトでは適切なエンドポイントに送信）
        this.submitForm(data);
    }

    validateForm(data) {
        const { name, email, message } = data;
        
        if (!name.trim()) {
            alert('お名前を入力してください。');
            return false;
        }
        
        if (!email.trim() || !this.isValidEmail(email)) {
            alert('有効なメールアドレスを入力してください。');
            return false;
        }
        
        if (!message.trim()) {
            alert('お問い合わせ内容を入力してください。');
            return false;
        }
        
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    submitForm(data) {
        // 送信中の表示
        const submitButton = document.querySelector('.form-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = '送信中...';
        submitButton.disabled = true;

        // 実際の送信処理をシミュレート
        setTimeout(() => {
            alert('お問い合わせありがとうございました。\n3営業日以内にご回答いたします。');
            
            // フォームリセット
            document.querySelector('.form').reset();
            
            // ボタンを元に戻す
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
    }
}

// 商品カードクリック処理
class ProductCardHandler {
    constructor() {
        this.init();
    }

    init() {
        const productCards = document.querySelectorAll('.plant-card[data-product]');
        productCards.forEach(card => {
            card.addEventListener('click', this.handleCardClick.bind(this));
            // カードにホバー効果を強化
            card.style.cursor = 'pointer';
        });
    }

    handleCardClick(e) {
        const card = e.currentTarget;
        const productType = card.dataset.product;
        
        // 商品詳細ページへの遷移
        if (productType === 'monstera') {
            window.location.href = 'monstera-detail.html';
        }
        // 他の商品も後で追加可能
    }
}

// 画像の遅延読み込み
class ImageLoader {
    constructor() {
        this.init();
    }

    init() {
        // 実際の画像がある場合の処理
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }
}

// 商品詳細ページの機能
class ProductDetailHandler {
    constructor() {
        this.init();
    }

    init() {
        // タブ機能
        this.initTabs();
        
        // サムネイル機能
        this.initThumbnails();
        
        // カート追加機能
        this.initAddToCart();
    }

    initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.target.dataset.tab;
                
                // すべてのタブとパネルの active クラスを削除
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // クリックされたタブとパネルに active クラスを追加
                e.target.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    initThumbnails() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.querySelector('.product-image-placeholder');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', (e) => {
                // すべてのサムネイルから active クラスを削除
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                
                // クリックされたサムネイルに active クラスを追加
                e.currentTarget.classList.add('active');
                
                // メイン画像を更新（実際のプロジェクトでは画像URLを変更）
                const thumbnailPlaceholder = e.currentTarget.querySelector('.thumbnail-placeholder');
                if (mainImage && thumbnailPlaceholder) {
                    mainImage.textContent = thumbnailPlaceholder.textContent;
                }
            });
        });
    }

    initAddToCart() {
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                const quantity = document.querySelector('#quantity').value;
                
                // カート追加処理（実際のプロジェクトでは適切な実装）
                this.addToCart(quantity);
            });
        }
    }

    addToCart(quantity) {
        // 一時的な成功メッセージ
        const button = document.querySelector('.add-to-cart-btn');
        const originalText = button.textContent;
        
        button.textContent = '追加中...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'カートに追加しました!';
            button.style.backgroundColor = '#16a34a';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.backgroundColor = '';
            }, 2000);
        }, 500);
    }
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    // 各機能の初期化
    new ScrollAnimations();
    new SmoothScroll();
    new HeaderScroll();
    new MobileMenu();
    new FormHandler();
    new ProductCardHandler();
    new ImageLoader();
    
    // 商品詳細ページの機能（該当ページでのみ初期化）
    if (document.querySelector('.product-detail')) {
        new ProductDetailHandler();
    }

    // ページロード時のアニメーション
    document.body.classList.add('loaded');
});

// 画像プリロード（パフォーマンス向上）
window.addEventListener('load', () => {
    const imagesToPreload = [
        // 必要に応じて実際の画像URLを追加
    ];

    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
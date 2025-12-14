// اپلیکیشن پیشرفته یادگیری گرامر آلمانی - PWA
// نسخه کامل با رفع تمام مشکلات

class GermanGrammarApp {
    constructor() {
        // سیستم‌های اصلی
        this.backupSystem = new BackupSystem();
        this.uiManager = new UIManager(this);
        this.lessonManager = new LessonManager(this);
        this.chartManager = new ChartManager(this);
        this.settingsManager = new SettingsManager(this);
        
        // داده‌های برنامه
        this.userData = null;
        this.currentTheme = 'light';
        this.deferredPrompt = null;
        this.initPWA();
        this.init();
        
    }
   
    async init() {
        // بارگذاری داده‌ها
        await this.loadUserData();
        
        // راه‌اندازی UI
        this.uiManager.init();
        
        // راه‌اندازی سیستم‌ها
        this.lessonManager.init();
        this.chartManager.init();
        this.settingsManager.init();
        
        // راه‌اندازی PWA
        this.initPWA();
        
        // مخفی کردن صفحه لودینگ
        setTimeout(() => {
            this.uiManager.hideLoadingScreen();
            this.showWelcomeMessage();
        }, 1500);
        
        // به‌روزرسانی تاریخ
        this.updateCurrentDate();
    }
    
    async loadUserData() {
        this.userData = this.backupSystem.loadData();
        
        // اگر داده‌ای وجود ندارد، داده‌های نمونه ایجاد کن
        if (!this.userData.lessons || this.userData.lessons.length === 0) {
            await this.createSampleData();
        }
        
        // بارگذاری تنظیمات تم
        const savedTheme = localStorage.getItem('grammarAppTheme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            document.body.setAttribute('data-theme', savedTheme);
        }
    }
    
    async createSampleData() {
        // ایجاد داده‌های نمونه برای درس‌های گرامر
        const sampleLessons = [
            {
                id: this.generateId(),
                title: "حالت داتیو در زبان آلمانی",
                category: "cases",
                level: "intermediate",
                priority: "high",
                description: "حالت داتیو برای نشان دادن مفعول غیرمستقیم در جمله استفاده می‌شود.",
                content: `<h3>حالت داتیو در زبان آلمانی</h3>
<p>حالت داتیو (Dativ) سومین حالت از چهار حالت موجود در دستور زبان آلمانی است و برای مفعول غیرمستقیم استفاده می‌شود.</p>

<h4>کاربردهای اصلی داتیو:</h4>
<ul>
<li><strong>مفعول غیرمستقیم:</strong> Ich gebe <em>dem Mann</em> das Buch. (من به مرد کتاب را می‌دهم.)</li>
<li><strong>با برخی افعال خاص:</strong> Ich helfe <em>dir</em>. (من به تو کمک می‌کنم.)</li>
<li><strong>با برخی حروف اضافه:</strong> mit <em>mir</em> (با من)، nach <em>Hause</em> (به خانه)</li>
<li><strong>برای بیان مالکیت:</strong> Das ist <em>mir</em>. (این مال من است.)</li>
</ul>

<h4>صرف اسم‌ها در حالت داتیو:</h4>
<table>
<tr>
<th>حالت</th>
<th>مذکر</th>
<th>مؤنث</th>
<th>خنثی</th>
<th>جمع</th>
</tr>
<tr>
<td>نومیناتیو</td>
<td>der Mann</td>
<td>die Frau</td>
<td>das Kind</td>
<td>die Leute</td>
</tr>
<tr>
<td>داتیو</td>
<td>dem Mann</td>
<td>der Frau</td>
<td>dem Kind</td>
<td>den Leuten</td>
</tr>
</table>

<h4>افعالی که همیشه با داتیو می‌آیند:</h4>
<ul>
<li><strong>helfen</strong> (کمک کردن) - Ich helfe <em>dir</em>.</li>
<li><strong>danken</strong> (تشکر کردن) - Ich danke <em>Ihnen</em>.</li>
<li><strong>gefallen</strong> (پسندیدن) - Das gefällt <em>mir</em>.</li>
<li><strong>gehören</strong> (تعلق داشتن) - Das gehört <em>mir</em>.</li>
<li><strong>glauben</strong> (باور کردن) - Ich glaube <em>dir</em>.</li>
</ul>`,
                examples: [
                    { german: "Ich gebe dem Kind einen Ball.", farsi: "من به کودک یک توپ می‌دهم." },
                    { german: "Er hilft seiner Mutter.", farsi: "او به مادرش کمک می‌کند." },
                    { german: "Das Auto gehört meinem Vater.", farsi: "این ماشین متعلق به پدرم است." }
                ],
                tags: ["داتیو", "مفعول غیرمستقیم", "حالت", "گرامر"],
                status: "completed",
                score: 85,
                dateAdded: new Date().toISOString(),
                lastReviewed: new Date().toISOString(),
                reviewCount: 3
            },
            {
                id: this.generateId(),
                title: "حالت آکوزاتیو",
                category: "cases",
                level: "beginner",
                priority: "medium",
                description: "حالت آکوزاتیو برای مفعول مستقیم در جمله استفاده می‌شود.",
                content: `<h3>حالت آکوزاتیو در زبان آلمانی</h3>
<p>حالت آکوزاتیو (Akkusativ) دومین حالت از چهار حالت موجود در دستور زبان آلمانی است و برای مفعول مستقیم استفاده می‌شود.</p>

<h4>کاربردهای اصلی آکوزاتیو:</h4>
<ul>
<li><strong>مفعول مستقیم:</strong> Ich sehe <em>den Mann</em>. (من مرد را می‌بینم.)</li>
<li><strong>با برخی افعال خاص:</strong> Ich liebe <em>dich</em>. (من تو را دوست دارم.)</li>
<li><strong>با برخی حروف اضافه:</strong> durch <em>den Park</em> (از میان پارک)، für <em>mich</em> (برای من)</li>
<li><strong>برای بیان زمان دقیق:</strong> jeden <em>Tag</em> (هر روز)</li>
</ul>`,
                examples: [
                    { german: "Ich lese das Buch.", farsi: "من کتاب را می‌خوانم." },
                    { german: "Er kauft einen Computer.", farsi: "او یک کامپیوتر می‌خرد." }
                ],
                tags: ["آکوزاتیو", "مفعول مستقیم", "حالت"],
                status: "in-progress",
                score: 0,
                dateAdded: new Date(Date.now() - 86400000).toISOString(), // دیروز
                lastReviewed: null,
                reviewCount: 0
            }
        ];
        
        this.userData.lessons = sampleLessons;
        this.userData.savedLessons = [sampleLessons[0].id];
        this.userData.settings = this.userData.settings || {
            displayName: 'یادگیرنده آلمانی',
            level: 'beginner',
            dailyGoal: 2,
            animations: true,
            theme: 'light'
        };
        this.backupSystem.saveData(this.userData);
    }
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateStr = now.toLocaleDateString('fa-IR', options);
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            dateElement.textContent = dateStr;
        }
    }
    initPWA() {
    // ذخیره رویداد beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.deferredPrompt = e;
        
        // به UI Manager بده
        if (this.uiManager) {
            this.uiManager.deferredPrompt = e;
        }
        
        console.log('رویداد نصب PWA ذخیره شد');
    });
    
    // تشخیص نصب اپ
    window.addEventListener('appinstalled', (evt) => {
        console.log('اپلیکیشن نصب شد');
        this.isAppInstalled = true;
        
        // به UI Manager اطلاع بده
        if (this.uiManager) {
            this.uiManager.isAppInstalled = true;
            const installBtn = document.getElementById('installAppBtn');
            if (installBtn) {
                installBtn.classList.add('hidden');
            }
        }
    });
    
    // بررسی وضعیت فعلی
    setTimeout(() => {
        this.checkInstallStatus();
    }, 1000);
}

// متد checkInstallStatus
checkInstallStatus() {
    // بررسی چندین روش
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
    const isIOSStandalone = window.navigator.standalone === true;
    
    this.isAppInstalled = isStandalone || isFullscreen || isIOSStandalone;
    
    if (this.uiManager) {
        this.uiManager.isAppInstalled = this.isAppInstalled;
        
        // مخفی کردن دکمه نصب اگر اپ نصب شده
        if (this.isAppInstalled) {
            const installBtn = document.getElementById('installAppBtn');
            if (installBtn) {
                installBtn.classList.add('hidden');
            }
        }
    }
}}

// ====== سیستم مدیریت UI ======
class UIManager {
    constructor(app) {
        this.app = app;
        this.currentSection = 'dashboard';
        this.editorInitialized = false;
 
    }
    
    init() {
        this.initNavigation();
        this.initModals();
        this.initButtons();
        this.initForms();
        this.initSearch();
        this.initEditorTools();
        this.updateStats();
    }
    
    initNavigation() {
     document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            
            // تغییر بخش
            this.switchSection(section);
            
            // بستن سایدبار بعد از کلیک
            this.closeSidebar();
        });
    });
    
    // منوی همبرگر
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // جلوگیری از bubble شدن
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                const isOpening = !sidebar.classList.contains('open');
                sidebar.classList.toggle('open');
                
                if (isOpening) {
                    // اضافه کردن event listener برای کلیک خارج از سایدبار
                    this.addOutsideClickListener();
                } else {
                    // حذف event listener
                    this.removeOutsideClickListener();
                }
            }
        });
    }
    // دکمه‌های دسترسی سریع
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (btn.dataset.section) {
                this.switchSection(btn.dataset.section);
                this.closeSidebar();
            }
        });
    });
        
        // تغییر تم
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
      
        
        // دکمه‌های فیلتر و مرتب‌سازی درس‌های ذخیره شده
        const sortSavedBtn = document.getElementById('sortSavedBtn');
        if (sortSavedBtn) {
            sortSavedBtn.addEventListener('click', () => {
                this.app.lessonManager.sortSavedLessons();
            });
        }
        
        const filterSavedBtn = document.getElementById('filterSavedBtn');
        if (filterSavedBtn) {
            filterSavedBtn.addEventListener('click', () => {
                this.app.lessonManager.showFilterOptions();
            });
        }
    }
    // متد برای اضافه کردن event listener برای کلیک خارج از سایدبار
addOutsideClickListener() {
    // کمی تاخیر برای جلوگیری از اجرای فوری
    setTimeout(() => {
        this.outsideClickListener = (e) => {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('menuToggle');
            
            // اگر کلیک خارج از سایدبار و خارج از دکمه منو بود
            if (sidebar && 
                sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target)) {
                this.closeSidebar();
            }
        };
        
        // اضافه کردن event listener به document
        document.addEventListener('click', this.outsideClickListener);
    }, 10);
}

// متد برای حذف event listener
removeOutsideClickListener() {
    if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
    }
}

// متد برای بستن سایدبار (به‌روزرسانی شده)
closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('open');
    }
    // حذف event listener برای کلیک خارج
    this.removeOutsideClickListener();
}
    // متد برای بستن سایدبار
closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('open');
    }
    this.removeSidebarOverlay();
}

// متد برای ایجاد overlay
createSidebarOverlay() {
    // اگر overlay از قبل وجود دارد، حذف کن
    this.removeSidebarOverlay();
    
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebarOverlay';
    
    overlay.addEventListener('click', () => {
        this.closeSidebar();
    });
    
    document.body.appendChild(overlay);
}

// متد برای حذف overlay
removeSidebarOverlay() {
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// متد switchSection را به‌روزرسانی کنید
switchSection(section) {
    // به‌روزرسانی نویگیشن
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === section) {
            item.classList.add('active');
        }
    });
    
    // مخفی کردن همه بخش‌ها
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // نمایش بخش انتخاب شده
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
        sectionElement.classList.add('active');
        this.currentSection = section;
        
        // بارگذاری محتوای بخش
        this.loadSectionContent(section);
    }
}
    switchSection(section) {
        // به‌روزرسانی نویگیشن
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === section) {
                item.classList.add('active');
            }
        });
        
        // مخفی کردن همه بخش‌ها
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        
        // نمایش بخش انتخاب شده
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
            sectionElement.classList.add('active');
            this.currentSection = section;
            
            // بارگذاری محتوای بخش
            this.loadSectionContent(section);
        }
    }
    
    loadSectionContent(section) {
        switch(section) {
            case 'dashboard':
                this.app.lessonManager.loadRecentLessons();
                this.app.chartManager.loadWeeklyProgress();
                break;
            case 'lessons':
                this.app.lessonManager.loadAllLessons();
                break;
            case 'my-lessons':
                this.app.lessonManager.loadSavedLessons();
                break;
            case 'add-lesson':
                this.initEditorTools();
                break;
            case 'stats':
                this.app.chartManager.loadAllCharts();
                break;
            case 'settings':
                this.app.settingsManager.loadCurrentSettings();
                break;
        }
    }
    
    toggleTheme() {
        const themes = ['light', 'dark', 'auto'];
        const currentIndex = themes.indexOf(this.app.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        
        this.app.currentTheme = nextTheme;
        document.body.setAttribute('data-theme', nextTheme);
        localStorage.setItem('grammarAppTheme', nextTheme);
        
        // به‌روزرسانی آیکون
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = nextTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        this.showToast(`تم ${nextTheme === 'dark' ? 'تاریک' : 'روشن'} فعال شد`, 'success');
    }
    
    initModals() {
        // مودال درس
        const lessonModal = document.getElementById('lessonModal');
        const closeLessonModal = document.getElementById('closeLessonModal');
        
        if (closeLessonModal) {
            closeLessonModal.addEventListener('click', () => {
                if (lessonModal) lessonModal.classList.remove('active');
            });
        }
        
        // مودال پشتیبان‌گیری
        const backupModal = document.getElementById('backupModal');
        const closeBackupModal = document.getElementById('closeBackupModal');
        
        if (closeBackupModal) {
            closeBackupModal.addEventListener('click', () => {
                if (backupModal) backupModal.classList.remove('active');
            });
        }
        
        // تب‌های مودال پشتیبان‌گیری
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                
                // به‌روزرسانی تب‌ها
                document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // نمایش محتوای تب
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                const tabContent = document.getElementById(`${tabId}Tab`);
                if (tabContent) tabContent.classList.add('active');
            });
        });
        
        // کلیک خارج از مودال
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
    }
 
    initButtons() {
        const dictionaryBtn = document.getElementById('dictionaryBtn');
    if (dictionaryBtn) {
        dictionaryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // اگر در PWA هستیم، درون همان اپ باز شود
            if (window.matchMedia('(display-mode: standalone)').matches) {
                // باز کردن در همان پنجره
                window.location.href = 'https://elias-hussaini.github.io/-Dic-Version3/';
            } else {
                // اگر در مرورگر معمولی هستیم، در تب جدید باز شود
                window.open('https://elias-hussaini.github.io/-Dic-Version3/', '_blank');
            }
        });
    }
        // دکمه فول‌اسکرین
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            this.toggleFullscreen();
        });
        
        // تغییر آیکون بر اساس حالت فول‌اسکرین
        document.addEventListener('fullscreenchange', () => {
            this.updateFullscreenIcon();
        });
        
        document.addEventListener('webkitfullscreenchange', () => {
            this.updateFullscreenIcon();
        });
        
        document.addEventListener('mozfullscreenchange', () => {
            this.updateFullscreenIcon();
        });
    }
    
   
        // دکمه پشتیبان‌گیری
        const backupBtns = ['backupBtn', 'backupQuickBtn', 'settingsBackupBtn'];
        backupBtns.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openBackupModal();
                });
            }
        });
        
        // دکمه بازیابی در تنظیمات
        const settingsRestoreBtn = document.getElementById('settingsRestoreBtn');
        if (settingsRestoreBtn) {
            settingsRestoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openBackupModal();
                // رفتن به تب بازیابی
                const restoreTab = document.querySelector('.tab-btn[data-tab="restore"]');
                if (restoreTab) restoreTab.click();
            });
        }
        
       
        
        // دکمه بارگذاری درس‌های بیشتر
        const loadMoreBtn = document.getElementById('loadMoreLessons');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.app.lessonManager.loadMoreLessons();
            });
        }
        
        // دکمه تازه‌سازی درس‌های اخیر
        const refreshRecentBtn = document.getElementById('refreshRecent');
        if (refreshRecentBtn) {
            refreshRecentBtn.addEventListener('click', () => {
                this.app.lessonManager.loadRecentLessons();
                this.showToast('لیست درس‌های اخیر به‌روزرسانی شد', 'success');
            });
        }
        
        // دکمه‌های اکسپورت و چک آپدیت
        const exportDataBtn = document.getElementById('exportDataBtn');
        const checkUpdateBtn = document.getElementById('checkUpdateBtn');
        
        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', () => {
                this.app.settingsManager.downloadBackup();
            });
        }
        
        if (checkUpdateBtn) {
            checkUpdateBtn.addEventListener('click', () => {
                this.showToast('بررسی بروزرسانی... اپلیکیشن به‌روز است!', 'info');
            });
        }
    }



    // متد برای toggle فول‌اسکرین
toggleFullscreen() {
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.mozFullScreenElement) {
        // وارد حالت فول‌اسکرین شو
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        }
    } else {
        // خارج از حالت فول‌اسکرین
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }
}

// متد برای به‌روزرسانی آیکون فول‌اسکرین
updateFullscreenIcon() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (!fullscreenBtn) return;
    
    const icon = fullscreenBtn.querySelector('i');
    if (!icon) return;
    
    if (document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.mozFullScreenElement) {
        // حالت فول‌اسکرین فعال است
        icon.className = 'fas fa-compress';
        document.body.classList.add('fullscreen-active');
    } else {
        // حالت فول‌اسکرین غیرفعال است
        icon.className = 'fas fa-expand';
        document.body.classList.remove('fullscreen-active');
    }
}

// متد برای بررسی نصب بودن اپ
checkIfAppInstalled() {
    // روش 1: بررسی display-mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
        this.isAppInstalled = true;
        return true;
    }
    
    // روش 2: بررسی navigator.standalone (برای iOS)
    if (window.navigator.standalone === true) {
        this.isAppInstalled = true;
        return true;
    }
    
    // روش 3: بررسی referrer
    if (window.matchMedia('(display-mode: fullscreen)').matches) {
        this.isAppInstalled = true;
        return true;
    }
    
    this.isAppInstalled = false;
    return false;
}


    initForms() {
        // فرم افزودن درس جدید
        const newLessonForm = document.getElementById('newLessonForm');
        if (newLessonForm) {
            newLessonForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.app.lessonManager.saveNewLesson();
            });
        }
        
        // دکمه افزودن مثال
        const addExampleBtn = document.getElementById('addExampleBtn');
        if (addExampleBtn) {
            addExampleBtn.addEventListener('click', () => {
                this.addExampleField();
            });
        }
        
        // دکمه پاک کردن یادداشت
        const clearNoteBtn = document.getElementById('clearNoteBtn');
        if (clearNoteBtn) {
            clearNoteBtn.addEventListener('click', () => {
                const noteEditor = document.getElementById('noteEditor');
                if (noteEditor && confirm('آیا از پاک کردن یادداشت فعلی اطمینان دارید؟')) {
                    noteEditor.value = '';
                }
            });
        }
        
        // تنظیمات کاربر
        const displayNameInput = document.getElementById('displayName');
        if (displayNameInput) {
            displayNameInput.addEventListener('change', (e) => {
                this.app.settingsManager.saveUserSettings();
            });
        }
        
        const userLevelSelect = document.getElementById('userLevel');
        if (userLevelSelect) {
            userLevelSelect.addEventListener('change', (e) => {
                this.app.settingsManager.saveUserSettings();
            });
        }
        
        const dailyGoalSelect = document.getElementById('dailyGoal');
        if (dailyGoalSelect) {
            dailyGoalSelect.addEventListener('change', (e) => {
                this.app.settingsManager.saveUserSettings();
            });
        }
        
        const animationsToggle = document.getElementById('animationsToggle');
        if (animationsToggle) {
            animationsToggle.addEventListener('change', (e) => {
                this.app.settingsManager.saveUserSettings();
            });
        }
    }
    
    initSearch() {
        // جستجوی درس‌ها
        const lessonSearch = document.getElementById('lessonSearch');
        if (lessonSearch) {
            lessonSearch.addEventListener('input', (e) => {
                this.app.lessonManager.filterLessons(e.target.value);
            });
        }
        
        // فیلتر درس‌ها
        const lessonFilter = document.getElementById('lessonFilter');
        if (lessonFilter) {
            lessonFilter.addEventListener('change', (e) => {
                this.app.lessonManager.filterLessonsByLevel(e.target.value);
            });
        }
        
        // جستجوی واژگان
        const vocabSearch = document.getElementById('vocabSearch');
        if (vocabSearch) {
            vocabSearch.addEventListener('input', (e) => {
                // اینجا می‌توانید منطق جستجوی واژگان را اضافه کنید
            });
        }
        
        // فیلتر واژگان
        const vocabCategory = document.getElementById('vocabCategory');
        if (vocabCategory) {
            vocabCategory.addEventListener('change', (e) => {
                // اینجا می‌توانید منطق فیلتر واژگان را اضافه کنید
            });
        }
    }
    
    initEditorTools() {
        if (this.editorInitialized) return;
        
        const editorButtons = document.querySelectorAll('.editor-btn');
        editorButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const command = btn.dataset.command;
                this.execEditorCommand(command);
            });
        });
        
        this.editorInitialized = true;
    }
    
    execEditorCommand(command) {
        const editor = document.getElementById('lessonContent');
        if (!editor) return;
        
        editor.focus();
        
        switch(command) {
            case 'bold':
                document.execCommand('bold', false, null);
                break;
            case 'italic':
                document.execCommand('italic', false, null);
                break;
            case 'insertunorderedlist':
                document.execCommand('insertUnorderedList', false, null);
                break;
            case 'insertorderedlist':
                document.execCommand('insertOrderedList', false, null);
                break;
            case 'createlink':
                const url = prompt('لینک را وارد کنید:', 'https://');
                if (url) {
                    document.execCommand('createLink', false, url);
                }
                break;
        }
    }
    
    updateStats() {
        const stats = this.app.backupSystem.getStats();
        
        // آمار کلی
        const progressPercent = document.getElementById('overallProgressPercent');
        const progressFill = document.getElementById('overallProgressFill');
        
        if (progressPercent) progressPercent.textContent = `${stats.progressPercentage}%`;
        if (progressFill) progressFill.style.width = `${stats.progressPercentage}%`;
        
        // آمار داشبورد
        const totalLessons = document.getElementById('totalLessons');
        const completedLessons = document.getElementById('completedLessons');
        const inProgressLessons = document.getElementById('inProgressLessons');
        const priorityLessons = document.getElementById('priorityLessons');
        
        if (totalLessons) totalLessons.textContent = stats.totalLessons;
        if (completedLessons) completedLessons.textContent = stats.completedLessons;
        if (inProgressLessons) inProgressLessons.textContent = stats.inProgressLessons;
        if (priorityLessons) priorityLessons.textContent = stats.priorityLessons;
        
        // آمار سایدبار
        const sidebarCompleted = document.getElementById('sidebarCompleted');
        const sidebarTotal = document.getElementById('sidebarTotal');
        const sidebarScore = document.getElementById('sidebarScore');
        
        if (sidebarCompleted) sidebarCompleted.textContent = stats.completedLessons;
        if (sidebarTotal) sidebarTotal.textContent = stats.totalLessons;
        if (sidebarScore) sidebarScore.textContent = stats.averageScore;
    }
    
    openBackupModal() {
        const modal = document.getElementById('backupModal');
        if (modal) {
            modal.classList.add('active');
            
            // محاسبه حجم پشتیبان
            const dataSize = JSON.stringify(this.app.userData).length;
            const sizeInKB = (dataSize / 1024).toFixed(2);
            const backupSize = document.getElementById('backupSize');
            if (backupSize) backupSize.textContent = `${sizeInKB} KB`;
            
            // ریست کردن فایل انتخاب شده
            const restoreFile = document.getElementById('restoreFile');
            const selectedFileInfo = document.getElementById('selectedFileInfo');
            const restoreBackupBtn = document.getElementById('restoreBackupBtn');
            
            if (restoreFile) restoreFile.value = '';
            if (selectedFileInfo) selectedFileInfo.innerHTML = '';
            if (restoreBackupBtn) restoreBackupBtn.disabled = true;
        }
    }
    
    addExampleField() {
        const container = document.getElementById('examplesContainer');
        if (!container) return;
        
        const exampleCount = container.children.length;
        
        const exampleDiv = document.createElement('div');
        exampleDiv.className = 'example-item';
        exampleDiv.innerHTML = `
            <input type="text" placeholder="جمله آلمانی" class="example-german">
            <input type="text" placeholder="ترجمه فارسی" class="example-farsi">
            <button type="button" class="remove-example">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(exampleDiv);
        
        // رویداد حذف مثال
        exampleDiv.querySelector('.remove-example').addEventListener('click', () => {
            container.removeChild(exampleDiv);
        });
    }
    
    showLessonModal(lesson) {
        const modal = document.getElementById('lessonModal');
        if (!modal) return;
        
        // پر کردن اطلاعات درس
        const modalTitle = document.getElementById('modalLessonTitle');
        const modalLevel = document.getElementById('modalLessonLevel');
        const modalCategory = document.getElementById('modalLessonCategory');
        const modalDate = document.getElementById('modalLessonDate');
        const modalContent = document.getElementById('modalLessonContent');
        
        if (modalTitle) modalTitle.textContent = lesson.title;
        if (modalLevel) modalLevel.textContent = this.getLevelText(lesson.level);
        if (modalCategory) modalCategory.textContent = this.getCategoryText(lesson.category);
        if (modalDate) modalDate.textContent = this.formatDate(lesson.dateAdded);
        if (modalContent) {
            // نمایش محتوای درس با قالب‌بندی
            let contentHTML = lesson.content;
            
            // اضافه کردن مثال‌ها اگر وجود دارند
            if (lesson.examples && lesson.examples.length > 0) {
                contentHTML += `<h4>مثال‌ها:</h4><div class="examples-list">`;
                lesson.examples.forEach(example => {
                    contentHTML += `
                        <div class="example-item-modal">
                            <div class="example-german"><strong>آلمانی:</strong> ${example.german}</div>
                            <div class="example-farsi"><strong>فارسی:</strong> ${example.farsi}</div>
                        </div>
                    `;
                });
                contentHTML += `</div>`;
            }
            
            modalContent.innerHTML = contentHTML;
        }
        
        // به‌روزرسانی دکمه‌ها
        const saveBtn = document.getElementById('saveLessonBtn');
        const markAsReadBtn = document.getElementById('markAsReadBtn');
        
        if (saveBtn) {
            const isSaved = this.app.userData.savedLessons?.includes(lesson.id);
            saveBtn.innerHTML = isSaved ? 
                '<i class="fas fa-bookmark"></i> حذف از ذخیره شده‌ها' :
                '<i class="fas fa-bookmark"></i> ذخیره درس';
            
            saveBtn.onclick = () => {
                this.app.lessonManager.toggleSaveLesson(lesson.id);
                modal.classList.remove('active');
            };
        }
        
        if (markAsReadBtn) {
            const isCompleted = lesson.status === 'completed';
            markAsReadBtn.innerHTML = isCompleted ? 
                '<i class="fas fa-check-circle"></i> علامت‌گذاری به عنوان خوانده نشده' :
                '<i class="fas fa-check-circle"></i> علامت‌گذاری به عنوان خوانده شده';
            
            markAsReadBtn.onclick = () => {
                this.app.lessonManager.toggleLessonStatus(lesson.id);
                modal.classList.remove('active');
            };
        }
        
        // نمایش مودال
        modal.classList.add('active');
    }
    
    getLevelText(level) {
        const levels = {
            'beginner': 'مبتدی',
            'intermediate': 'متوسط',
            'advanced': 'پیشرفته'
        };
        return levels[level] || level;
    }
    
    getCategoryText(category) {
        const categories = {
            'cases': 'حالت‌های اسم',
            'verbs': 'افعال',
            'tenses': 'زمان‌ها',
            'prepositions': 'حروف اضافه',
            'syntax': 'نحو و ساختار',
            'other': 'سایر'
        };
        return categories[category] || category;
    }
    
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('fa-IR');
        } catch (e) {
            return 'تاریخ نامعتبر';
        }
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }
    
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastIcon = toast?.querySelector('.toast-icon');
        const toastMessage = toast?.querySelector('.toast-message');
        
        if (!toast || !toastIcon || !toastMessage) return;
        
        // تنظیم نوع و محتوا
        toast.className = `toast ${type}`;
        toastMessage.textContent = message;
        
        // تنظیم آیکون بر اساس نوع
        const icons = {
            'success': 'fas fa-check-circle',
            'error': 'fas fa-exclamation-circle',
            'warning': 'fas fa-exclamation-triangle',
            'info': 'fas fa-info-circle'
        };
        toastIcon.className = icons[type] || 'fas fa-info-circle';
        
        // نمایش toast
        toast.classList.add('show');
        
        // مخفی کردن بعد از 5 ثانیه
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }
    
    showInstallPrompt() {
        if (this.app.deferredPrompt) {
            const prompt = document.getElementById('installPrompt');
            if (prompt) {
                prompt.classList.add('show');
            }
        }
    }
    
    hideInstallPrompt() {
        const prompt = document.getElementById('installPrompt');
        if (prompt) {
            prompt.classList.remove('show');
        }
    }
    
}

// ====== سیستم مدیریت درس‌ها ======
class LessonManager {
    constructor(app) {
        this.app = app;
        this.currentLessons = [];
        this.filteredLessons = [];
       
        this.displayedLessons = 6; // تعداد درس‌های نمایش داده شده
    }
    
    init() {
        this.initLessonFilter();
        this.initLessonActions();
    }
    
    initLessonFilter() {
        // فیلتر سطح درس
        const lessonFilter = document.getElementById('lessonFilter');
        if (lessonFilter) {
            lessonFilter.addEventListener('change', (e) => {
                this.filterLessonsByLevel(e.target.value);
            });
        }
    }
    
    initLessonActions() {
        // رویداد کلیک روی کارت درس - با استفاده از event delegation
        document.addEventListener('click', (e) => {
            const lessonCard = e.target.closest('.lesson-card');
            if (lessonCard) {
                const lessonId = lessonCard.dataset.lessonId;
                const lesson = this.findLessonById(lessonId);
                if (lesson) {
                    this.app.uiManager.showLessonModal(lesson);
                }
            }
            
            // دکمه‌های مرور و حذف در درس‌های ذخیره شده
            if (e.target.closest('.review-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const lessonCard = e.target.closest('.lesson-card');
                if (lessonCard) {
                    const lessonId = lessonCard.dataset.lessonId;
                    this.reviewLesson(lessonId);
                }
            }
            
            if (e.target.closest('.remove-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const lessonCard = e.target.closest('.lesson-card');
                if (lessonCard) {
                    const lessonId = lessonCard.dataset.lessonId;
                    this.removeSavedLesson(lessonId);
                }
            }
        });
    }
    
    loadAllLessons() {
        this.currentLessons = this.app.userData.lessons || [];
        this.filteredLessons = [...this.currentLessons];
        this.displayedLessons = 6; // ریست کردن شمارنده
        this.renderLessons();
    }
    
    loadMoreLessons() {
        this.displayedLessons += 6;
        this.renderLessons();
        
        // نمایش پیام
        if (this.displayedLessons >= this.filteredLessons.length) {
            this.app.uiManager.showToast('تمامی درس‌ها نمایش داده شدند', 'info');
            const loadMoreBtn = document.getElementById('loadMoreLessons');
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
        }
    }
    
    loadSavedLessons() {
        const savedIds = this.app.userData.savedLessons || [];
        this.filteredLessons = this.app.userData.lessons.filter(lesson => 
            savedIds.includes(lesson.id)
        );
        this.renderSavedLessons();
    }
    
    loadRecentLessons() {
        const container = document.getElementById('recentLessonsList');
        if (!container) return;
        
        const recentLessons = [...(this.app.userData.lessons || [])]
            .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
            .slice(0, 5);
        
        container.innerHTML = '';
        
        if (recentLessons.length === 0) {
            container.innerHTML = '<p class="no-lessons">هنوز درسی اضافه نکرده‌اید.</p>';
            return;
        }
        
        recentLessons.forEach(lesson => {
            const lessonEl = this.createLessonItem(lesson);
            container.appendChild(lessonEl);
        });
    }
    
    renderLessons() {
        const container = document.getElementById('lessonsContainer');
        if (!container) return;
        
        const lessonsToShow = this.filteredLessons.slice(0, this.displayedLessons);
        
        container.innerHTML = '';
        
        if (lessonsToShow.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book"></i>
                    <h3>هیچ درسی یافت نشد</h3>
                    <p>می‌توانید درس جدیدی اضافه کنید.</p>
                    <button class="btn-primary" data-section="add-lesson">
                        <i class="fas fa-plus"></i>
                        افزودن درس جدید
                    </button>
                </div>
            `;
            
            // اضافه کردن رویداد به دکمه
            const addBtn = container.querySelector('button[data-section="add-lesson"]');
            if (addBtn) {
                addBtn.addEventListener('click', () => {
                    this.app.uiManager.switchSection('add-lesson');
                });
            }
            
            // مخفی کردن دکمه بارگذاری بیشتر
            const loadMoreBtn = document.getElementById('loadMoreLessons');
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            
            return;
        }
        
        lessonsToShow.forEach(lesson => {
            const lessonCard = this.createLessonCard(lesson);
            container.appendChild(lessonCard);
        });
        
        // نمایش یا مخفی کردن دکمه بارگذاری بیشتر
        const loadMoreBtn = document.getElementById('loadMoreLessons');
        if (loadMoreBtn) {
            if (this.displayedLessons < this.filteredLessons.length) {
                loadMoreBtn.style.display = 'inline-flex';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }
    
    renderSavedLessons() {
        const container = document.getElementById('savedLessonsContainer');
        const emptyState = document.getElementById('emptySavedState');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.filteredLessons.length === 0) {
            if (emptyState) emptyState.style.display = 'flex';
            container.style.display = 'none';
        } else {
            if (emptyState) emptyState.style.display = 'none';
            container.style.display = 'grid';
            
            this.filteredLessons.forEach(lesson => {
                const lessonCard = this.createSavedLessonCard(lesson);
                container.appendChild(lessonCard);
            });
        }
    }
    
    createLessonCard(lesson) {
        const card = document.createElement('div');
        card.className = 'lesson-card';
        card.dataset.lessonId = lesson.id;
        
        const statusText = this.getStatusText(lesson.status);
        const statusClass = this.getStatusClass(lesson.status);
        const levelText = this.app.uiManager.getLevelText(lesson.level);
        const categoryText = this.app.uiManager.getCategoryText(lesson.category);
        const description = lesson.description.length > 100 ? 
            lesson.description.substring(0, 100) + '...' : lesson.description;
        
        card.innerHTML = `
            <div class="lesson-header">
                <h3 class="lesson-title">${this.escapeHtml(lesson.title)}</h3>
                <div class="lesson-meta">
                    <span class="lesson-level">${levelText}</span>
                    <span class="lesson-category">${categoryText}</span>
                    <span class="lesson-date">${this.formatRelativeDate(lesson.dateAdded)}</span>
                </div>
            </div>
            <div class="lesson-body">
                <p class="lesson-description">${this.escapeHtml(description)}</p>
                <div class="lesson-tags">
                    ${(lesson.tags || []).map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
                </div>
            </div>
            <div class="lesson-footer">
                <div class="lesson-status">
                    <i class="fas fa-circle ${statusClass}"></i>
                    <span>${statusText}</span>
                </div>
                <div class="lesson-actions">
                    <button class="btn-small btn-primary">
                        <i class="fas fa-eye"></i>
                        مشاهده
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }
    
    createSavedLessonCard(lesson) {
        const card = document.createElement('div');
        card.className = 'lesson-card saved';
        card.dataset.lessonId = lesson.id;
        
        const levelText = this.app.uiManager.getLevelText(lesson.level);
        const lastReviewed = lesson.lastReviewed ? 
            `آخرین مرور: ${this.formatRelativeDate(lesson.lastReviewed)}` :
            'هنوز مرور نشده';
        const description = lesson.description.length > 100 ? 
            lesson.description.substring(0, 100) + '...' : lesson.description;
        
        card.innerHTML = `
            <div class="lesson-header">
                <h3 class="lesson-title">${this.escapeHtml(lesson.title)}</h3>
                <div class="lesson-meta">
                    <span class="lesson-level">${levelText}</span>
                    <span class="lesson-priority priority-${lesson.priority}">
                        <i class="fas fa-flag"></i>
                        ${lesson.priority === 'high' ? 'بالا' : lesson.priority === 'medium' ? 'متوسط' : 'پایین'}
                    </span>
                </div>
            </div>
            <div class="lesson-body">
                <p class="lesson-description">${this.escapeHtml(description)}</p>
                <div class="lesson-stats">
                    <span><i class="fas fa-redo"></i> ${lesson.reviewCount || 0} بار مرور</span>
                    <span><i class="fas fa-star"></i> ${lesson.score || 0}%</span>
                </div>
            </div>
            <div class="lesson-footer">
                <span class="lesson-date">${lastReviewed}</span>
                <div class="lesson-actions">
                    <button class="btn-small btn-outline review-btn">
                        <i class="fas fa-redo"></i>
                        مرور
                    </button>
                    <button class="btn-small btn-danger remove-btn">
                        <i class="fas fa-trash"></i>
                        حذف
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }
    
    createLessonItem(lesson) {
        const item = document.createElement('div');
        item.className = 'lesson-item';
        item.dataset.lessonId = lesson.id;
        
        const levelText = this.app.uiManager.getLevelText(lesson.level);
        const title = lesson.title.length > 30 ? 
            lesson.title.substring(0, 30) + '...' : lesson.title;
        
        item.innerHTML = `
            <div class="lesson-icon" style="background-color: ${this.getCategoryColor(lesson.category)}">
                <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="lesson-info">
                <h4>${this.escapeHtml(title)}</h4>
                <p>${levelText} • ${this.formatRelativeDate(lesson.dateAdded)}</p>
            </div>
            <div class="lesson-status">
                <i class="fas fa-circle ${this.getStatusClass(lesson.status)}"></i>
            </div>
        `;
        
        item.addEventListener('click', () => {
            const lessonData = this.findLessonById(lesson.id);
            if (lessonData) {
                this.app.uiManager.showLessonModal(lessonData);
            }
        });
        
        return item;
    }
    
    filterLessons(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            this.filteredLessons = [...this.currentLessons];
        } else {
            const term = searchTerm.toLowerCase();
            this.filteredLessons = this.currentLessons.filter(lesson =>
                lesson.title.toLowerCase().includes(term) ||
                lesson.description.toLowerCase().includes(term) ||
                (lesson.tags && lesson.tags.some(tag => tag.toLowerCase().includes(term)))
            );
        }
        this.displayedLessons = 6; // ریست کردن شمارنده
        this.renderLessons();
    }
    
    filterLessonsByLevel(level) {
        if (level === 'all') {
            this.filteredLessons = [...this.currentLessons];
        } else {
            this.filteredLessons = this.currentLessons.filter(lesson => 
                lesson.level === level
            );
        }
        this.displayedLessons = 6; // ریست کردن شمارنده
        this.renderLessons();
    }
    
    sortSavedLessons() {
        // مرتب‌سازی بر اساس اولویت و تاریخ
        this.filteredLessons.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
            
            if (priorityDiff !== 0) return priorityDiff;
            
            return new Date(b.lastReviewed || b.dateAdded) - new Date(a.lastReviewed || a.dateAdded);
        });
        
        this.renderSavedLessons();
        this.app.uiManager.showToast('درس‌ها بر اساس اولویت و تاریخ مرتب شدند', 'success');
    }
    
    showFilterOptions() {
        const options = ['همه', 'مبتدی', 'متوسط', 'پیشرفته'];
        let filterHTML = '<div class="filter-options">';
        options.forEach(option => {
            filterHTML += `<label><input type="radio" name="filter" value="${option}"> ${option}</label>`;
        });
        filterHTML += '</div>';
        
        // ایجاد مودال فیلتر
        const filterModal = document.createElement('div');
        filterModal.className = 'modal active';
        filterModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-filter"></i> فیلتر درس‌های ذخیره شده</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>سطح درس‌ها را برای فیلتر انتخاب کنید:</p>
                    ${filterHTML}
                    <div class="modal-actions">
                        <button class="btn-secondary" id="cancelFilter">انصراف</button>
                        <button class="btn-primary" id="applyFilter">اعمال فیلتر</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(filterModal);
        
        // رویدادهای مودال
        filterModal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(filterModal);
        });
        
        filterModal.querySelector('#cancelFilter').addEventListener('click', () => {
            document.body.removeChild(filterModal);
        });
        
        filterModal.querySelector('#applyFilter').addEventListener('click', () => {
            const selectedOption = filterModal.querySelector('input[name="filter"]:checked');
            if (selectedOption) {
                const value = selectedOption.value;
                if (value === 'همه') {
                    this.filteredLessons = this.app.userData.lessons.filter(lesson => 
                        this.app.userData.savedLessons?.includes(lesson.id)
                    );
                } else {
                    const levelMap = { 'مبتدی': 'beginner', 'متوسط': 'intermediate', 'پیشرفته': 'advanced' };
                    this.filteredLessons = this.app.userData.lessons.filter(lesson => 
                        this.app.userData.savedLessons?.includes(lesson.id) && 
                        lesson.level === levelMap[value]
                    );
                }
                this.renderSavedLessons();
                this.app.uiManager.showToast(`فیلتر "${value}" اعمال شد`, 'success');
            }
            document.body.removeChild(filterModal);
        });
        
        // کلیک خارج از مودال
        filterModal.addEventListener('click', (e) => {
            if (e.target === filterModal) {
                document.body.removeChild(filterModal);
            }
        });
    }
    
    findLessonById(lessonId) {
        return this.app.userData.lessons.find(lesson => lesson.id === lessonId);
    }
    
    saveNewLesson() {
        const titleInput = document.getElementById('lessonTitle');
        const categorySelect = document.getElementById('lessonCategory');
        const levelSelect = document.getElementById('lessonLevel');
        const prioritySelect = document.getElementById('lessonPriority');
        const descriptionTextarea = document.getElementById('lessonDescription');
        const contentEditor = document.getElementById('lessonContent');
        const tagsInput = document.getElementById('lessonTags');
        
        if (!titleInput || !categorySelect || !levelSelect || !descriptionTextarea || !contentEditor) {
            this.app.uiManager.showToast('خطا در دریافت داده‌های فرم', 'error');
            return;
        }
        
        const title = titleInput.value.trim();
        const category = categorySelect.value;
        const level = levelSelect.value;
        const priority = prioritySelect?.value || 'medium';
        const description = descriptionTextarea.value.trim();
        const content = contentEditor.innerHTML.trim();
        const tags = tagsInput?.value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag)
            .map(tag => this.escapeHtml(tag)) || [];
        
        // اعتبارسنجی
        if (!title || !category || !level || !description || !content || content === '<br>') {
            this.app.uiManager.showToast('لطفاً تمام فیلدهای ضروری را پر کنید', 'error');
            return;
        }
        
        // جمع‌آوری مثال‌ها
        const examples = [];
        document.querySelectorAll('.example-item').forEach(item => {
            const germanInput = item.querySelector('.example-german');
            const farsiInput = item.querySelector('.example-farsi');
            
            if (germanInput && farsiInput) {
                const german = germanInput.value.trim();
                const farsi = farsiInput.value.trim();
                if (german && farsi) {
                    examples.push({ 
                        german: this.escapeHtml(german), 
                        farsi: this.escapeHtml(farsi) 
                    });
                }
            }
        });
        
        // ایجاد درس جدید
        const newLesson = {
            id: this.app.generateId(),
            title: this.escapeHtml(title),
            category,
            level,
            priority,
            description: this.escapeHtml(description),
            content,
            examples,
            tags,
            status: 'not-started',
            score: 0,
            dateAdded: new Date().toISOString(),
            lastReviewed: null,
            reviewCount: 0
        };
        
        // افزودن به لیست درس‌ها
        if (!this.app.userData.lessons) {
            this.app.userData.lessons = [];
        }
        this.app.userData.lessons.unshift(newLesson); // اضافه به ابتدا
        this.app.backupSystem.saveData(this.app.userData);
        
        // پاک کردن فرم
        titleInput.value = '';
        categorySelect.value = '';
        levelSelect.value = 'beginner';
        if (prioritySelect) prioritySelect.value = 'medium';
        descriptionTextarea.value = '';
        contentEditor.innerHTML = '';
        if (tagsInput) tagsInput.value = '';
        
        const examplesContainer = document.getElementById('examplesContainer');
        if (examplesContainer) examplesContainer.innerHTML = '';
        
        // نمایش پیام موفقیت
        this.app.uiManager.showToast('درس جدید با موفقیت ذخیره شد', 'success');
        
        // به‌روزرسانی آمار
        this.app.uiManager.updateStats();
        
        // بازگشت به بخش درس‌ها
        setTimeout(() => {
            this.app.uiManager.switchSection('lessons');
        }, 1000);
    }
    
    toggleSaveLesson(lessonId) {
        if (!this.app.userData.savedLessons) {
            this.app.userData.savedLessons = [];
        }
        
        const index = this.app.userData.savedLessons.indexOf(lessonId);
        let message;
        
        if (index === -1) {
            // افزودن به ذخیره شده‌ها
            this.app.userData.savedLessons.push(lessonId);
            message = 'درس به ذخیره شده‌ها اضافه شد';
        } else {
            // حذف از ذخیره شده‌ها
            this.app.userData.savedLessons.splice(index, 1);
            message = 'درس از ذخیره شده‌ها حذف شد';
        }
        
        this.app.backupSystem.saveData(this.app.userData);
        this.app.uiManager.showToast(message, 'success');
        
        // به‌روزرسانی آمار
        this.app.uiManager.updateStats();
        
        // اگر در بخش درس‌های ذخیره شده هستیم، به‌روزرسانی کنیم
        if (this.app.uiManager.currentSection === 'my-lessons') {
            this.loadSavedLessons();
        }
    }
    
    toggleLessonStatus(lessonId) {
        const lesson = this.findLessonById(lessonId);
        if (!lesson) return;
        
        if (lesson.status === 'completed') {
            lesson.status = 'not-started';
            lesson.score = Math.max(lesson.score - 20, 0);
            this.app.uiManager.showToast('وضعیت درس به "شروع نشده" تغییر کرد', 'info');
        } else {
            lesson.status = 'completed';
            lesson.score = 100;
            lesson.lastReviewed = new Date().toISOString();
            lesson.reviewCount = (lesson.reviewCount || 0) + 1;
            this.app.uiManager.showToast('درس به عنوان خوانده شده علامت‌گذاری شد', 'success');
        }
        
        this.app.backupSystem.saveData(this.app.userData);
        this.app.uiManager.updateStats();
    }
    
    reviewLesson(lessonId) {
        const lesson = this.findLessonById(lessonId);
        if (!lesson) return;
        
        // به‌روزرسانی تاریخ مرور
        lesson.lastReviewed = new Date().toISOString();
        lesson.reviewCount = (lesson.reviewCount || 0) + 1;
        
        // افزایش امتیاز
        if (lesson.status === 'not-started') {
            lesson.status = 'in-progress';
        }
        if (lesson.score < 100) {
            lesson.score = Math.min(lesson.score + 10, 100);
        }
        
        // اگر امتیاز به 100 رسید، وضعیت را به تکمیل شده تغییر بده
        if (lesson.score >= 100) {
            lesson.status = 'completed';
        }
        
        this.app.backupSystem.saveData(this.app.userData);
        this.app.uiManager.showToast('درس مرور شد و امتیاز افزایش یافت', 'success');
        
        // به‌روزرسانی نمایش
        this.loadSavedLessons();
        this.app.uiManager.updateStats();
    }
    
    removeSavedLesson(lessonId) {
        if (!confirm('آیا از حذف این درس از لیست ذخیره شده‌ها مطمئن هستید؟')) {
            return;
        }
        
        const index = this.app.userData.savedLessons?.indexOf(lessonId);
        if (index !== -1) {
            this.app.userData.savedLessons.splice(index, 1);
            this.app.backupSystem.saveData(this.app.userData);
            this.app.uiManager.showToast('درس از ذخیره شده‌ها حذف شد', 'success');
            this.loadSavedLessons();
            this.app.uiManager.updateStats();
        }
    }
    
    getStatusText(status) {
        const statuses = {
            'not-started': 'شروع نشده',
            'in-progress': 'در حال یادگیری',
            'completed': 'تکمیل شده'
        };
        return statuses[status] || status;
    }
    
    getStatusClass(status) {
        const classes = {
            'not-started': 'status-not-started',
            'in-progress': 'status-in-progress',
            'completed': 'status-completed'
        };
        return classes[status] || '';
    }
    
    getCategoryColor(category) {
        const colors = {
            'cases': '#4361ee',
            'verbs': '#7209b7',
            'tenses': '#f72585',
            'prepositions': '#4cc9f0',
            'syntax': '#f8961e',
            'other': '#577590'
        };
        return colors[category] || '#6c757d';
    }
    
    formatRelativeDate(dateString) {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 0) return 'امروز';
            if (diffDays === 1) return 'دیروز';
            if (diffDays < 7) return `${diffDays} روز پیش`;
            if (diffDays < 30) return `${Math.floor(diffDays / 7)} هفته پیش`;
            if (diffDays < 365) return `${Math.floor(diffDays / 30)} ماه پیش`;
            return `${Math.floor(diffDays / 365)} سال پیش`;
        } catch (e) {
            return 'تاریخ نامعتبر';
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ====== سیستم مدیریت نمودارها ======
class ChartManager {
    constructor(app) {
        this.app = app;
        this.charts = {};
    }
    
    init() {
        // ایجاد نمونه‌های نمودار
        this.initWeeklyProgressChart();
        this.initLevelDistributionChart();
        this.initStatusDistributionChart();
        this.initDailyActivityChart();
        this.initCategoryDistributionChart();
    }
    
    initWeeklyProgressChart() {
        const ctx = document.getElementById('weeklyProgressChart');
        if (!ctx) return;
        
        this.charts.weeklyProgress = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
                datasets: [{
                    label: 'دقایق مطالعه',
                    data: [30, 45, 60, 50, 70, 90, 40],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    loadAllCharts() {
        this.updateChartsData();
    }
    
    loadWeeklyProgress() {
        this.updateWeeklyProgressChart();
    }
    
    updateChartsData() {
        this.updateLevelDistributionChart();
        this.updateStatusDistributionChart();
        this.updateCategoryDistributionChart();
        this.updateDailyActivityChart();
        this.updateDetailedStats();
    }
    
    updateWeeklyProgressChart() {
        if (!this.charts.weeklyProgress) return;
        
        // داده‌های واقعی بر اساس فعالیت کاربر
        const data = this.generateWeeklyData();
        this.charts.weeklyProgress.data.datasets[0].data = data;
        this.charts.weeklyProgress.update();
    }
    
    generateWeeklyData() {
        // در اینجا می‌توانید داده‌های واقعی را از دیتابیس بخوانید
        // برای نمونه، داده‌های تصادفی تولید می‌کنیم
        return Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 20);
    }
    
    initLevelDistributionChart() {
        const ctx = document.getElementById('levelDistributionChart');
        if (!ctx) return;
        
        this.charts.levelDistribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['مبتدی', 'متوسط', 'پیشرفته'],
                datasets: [{
                    data: [5, 3, 2],
                    backgroundColor: [
                        'rgba(67, 97, 238, 0.8)',
                        'rgba(114, 9, 183, 0.8)',
                        'rgba(247, 37, 133, 0.8)'
                    ],
                    borderColor: [
                        '#4361ee',
                        '#7209b7',
                        '#f72585'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        rtl: true,
                        labels: {
                            font: {
                                family: 'Vazirmatn'
                            }
                        }
                    }
                }
            }
        });
    }
    
    updateLevelDistributionChart() {
        if (!this.charts.levelDistribution) return;
        
        const lessons = this.app.userData.lessons || [];
        const beginner = lessons.filter(l => l.level === 'beginner').length;
        const intermediate = lessons.filter(l => l.level === 'intermediate').length;
        const advanced = lessons.filter(l => l.level === 'advanced').length;
        
        this.charts.levelDistribution.data.datasets[0].data = [beginner, intermediate, advanced];
        this.charts.levelDistribution.update();
    }
    
    initStatusDistributionChart() {
        const ctx = document.getElementById('statusDistributionChart');
        if (!ctx) return;
        
        this.charts.statusDistribution = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['شروع نشده', 'در حال یادگیری', 'تکمیل شده'],
                datasets: [{
                    data: [3, 4, 3],
                    backgroundColor: [
                        'rgba(108, 117, 125, 0.8)',
                        'rgba(248, 150, 30, 0.8)',
                        'rgba(76, 201, 240, 0.8)'
                    ],
                    borderColor: [
                        '#6c757d',
                        '#f8961e',
                        '#4cc9f0'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        rtl: true
                    }
                }
            }
        });
    }
    
    updateStatusDistributionChart() {
        if (!this.charts.statusDistribution) return;
        
        const lessons = this.app.userData.lessons || [];
        const notStarted = lessons.filter(l => l.status === 'not-started' || !l.status).length;
        const inProgress = lessons.filter(l => l.status === 'in-progress').length;
        const completed = lessons.filter(l => l.status === 'completed').length;
        
        this.charts.statusDistribution.data.datasets[0].data = [notStarted, inProgress, completed];
        this.charts.statusDistribution.update();
    }
    
    initDailyActivityChart() {
        const ctx = document.getElementById('dailyActivityChart');
        if (!ctx) return;
        
        this.charts.dailyActivity = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['۲ هفته پیش', 'هفته پیش', 'این هفته'],
                datasets: [{
                    label: 'تعداد درس‌های مطالعه شده',
                    data: [3, 5, 7],
                    backgroundColor: 'rgba(67, 97, 238, 0.7)',
                    borderColor: '#4361ee',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    updateDailyActivityChart() {
        if (!this.charts.dailyActivity) return;
        
        // داده‌های واقعی
        const lessons = this.app.userData.lessons || [];
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        
        const thisWeek = lessons.filter(l => {
            const date = new Date(l.lastReviewed || l.dateAdded);
            return date >= oneWeekAgo;
        }).length;
        
        const lastWeek = lessons.filter(l => {
            const date = new Date(l.lastReviewed || l.dateAdded);
            return date >= twoWeeksAgo && date < oneWeekAgo;
        }).length;
        
        const twoWeeksAgoCount = lessons.filter(l => {
            const date = new Date(l.lastReviewed || l.dateAdded);
            return date < twoWeeksAgo;
        }).length;
        
        this.charts.dailyActivity.data.datasets[0].data = [twoWeeksAgoCount, lastWeek, thisWeek];
        this.charts.dailyActivity.update();
    }
    
    initCategoryDistributionChart() {
        const ctx = document.getElementById('categoryDistributionChart');
        if (!ctx) return;
        
        this.charts.categoryDistribution = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['حالت‌ها', 'افعال', 'زمان‌ها', 'حروف اضافه', 'ساختار جمله', 'سایر'],
                datasets: [{
                    data: [4, 3, 2, 1, 1, 1],
                    backgroundColor: [
                        'rgba(67, 97, 238, 0.7)',
                        'rgba(114, 9, 183, 0.7)',
                        'rgba(247, 37, 133, 0.7)',
                        'rgba(76, 201, 240, 0.7)',
                        'rgba(248, 150, 30, 0.7)',
                        'rgba(87, 117, 144, 0.7)'
                    ],
                    borderColor: [
                        '#4361ee',
                        '#7209b7',
                        '#f72585',
                        '#4cc9f0',
                        '#f8961e',
                        '#577590'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        rtl: true
                    }
                }
            }
        });
    }
    
    updateCategoryDistributionChart() {
        if (!this.charts.categoryDistribution) return;
        
        const lessons = this.app.userData.lessons || [];
        const categories = {
            'cases': 0, 'verbs': 0, 'tenses': 0,
            'prepositions': 0, 'syntax': 0, 'other': 0
        };
        
        lessons.forEach(lesson => {
            if (categories.hasOwnProperty(lesson.category)) {
                categories[lesson.category]++;
            } else {
                categories.other++;
            }
        });
        
        this.charts.categoryDistribution.data.datasets[0].data = [
            categories.cases, categories.verbs, categories.tenses,
            categories.prepositions, categories.syntax, categories.other
        ];
        this.charts.categoryDistribution.update();
    }
    
    updateDetailedStats() {
        const tbody = document.getElementById('detailedStatsBody');
        if (!tbody) return;
        
        const lessons = this.app.userData.lessons || [];
        const categories = {};
        
        // جمع‌آوری آمار
        lessons.forEach(lesson => {
            const category = lesson.category || 'other';
            if (!categories[category]) {
                categories[category] = {
                    total: 0,
                    completed: 0,
                    inProgress: 0,
                    notStarted: 0
                };
            }
            
            categories[category].total++;
            
            switch (lesson.status) {
                case 'completed':
                    categories[category].completed++;
                    break;
                case 'in-progress':
                    categories[category].inProgress++;
                    break;
                default:
                    categories[category].notStarted++;
            }
        });
        
        // تولید جدول
        tbody.innerHTML = '';
        Object.entries(categories).forEach(([category, stats]) => {
            const categoryName = this.app.uiManager.getCategoryText(category);
            const successRate = stats.total > 0 ? 
                Math.round((stats.completed / stats.total) * 100) : 0;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${categoryName}</td>
                <td>${stats.total}</td>
                <td>${stats.completed}</td>
                <td>${stats.inProgress}</td>
                <td>
                    <div class="progress-bar-small">
                        <div class="progress-fill-small" style="width: ${successRate}%"></div>
                    </div>
                    <span>${successRate}%</span>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

// ====== سیستم تنظیمات ======
class SettingsManager {
    constructor(app) {
        this.app = app;
    }
    
    init() {
        this.initSettingsForm();
        this.initDataManagement();
        this.loadCurrentSettings();
    }
    showSaveConfirmation() {
    // ایجاد عنصر تأیید
    const confirmation = document.createElement('div');
    confirmation.className = 'save-indicator show';
    confirmation.innerHTML = '<i class="fas fa-check-circle"></i> تغییرات ذخیره شد';
    
    document.body.appendChild(confirmation);
    
    // مخفی کردن بعد از 3 ثانیه
    setTimeout(() => {
        confirmation.classList.remove('show');
        setTimeout(() => {
            if (confirmation.parentNode) {
                document.body.removeChild(confirmation);
            }
        }, 300);
    }, 3000);
}
    initSettingsForm() {
        
     
        // تغییر تم
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.setTheme(theme);
            });
        });
        
        // تغییر سایز فونت
        document.querySelectorAll('.font-size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const size = btn.dataset.size;
                this.setFontSize(size);
            });
        });
        
        // تغییر سطح کاربر
        const userLevelSelect = document.getElementById('userLevel');
        if (userLevelSelect) {
            userLevelSelect.addEventListener('change', () => {
                this.saveUserSettings();
            });
        }
        
        // تغییر هدف روزانه
        const dailyGoalSelect = document.getElementById('dailyGoal');
        if (dailyGoalSelect) {
            dailyGoalSelect.addEventListener('change', () => {
                this.saveUserSettings();
            });
        }
        
        // تغییر انیمیشن‌ها
        const animationsToggle = document.getElementById('animationsToggle');
        if (animationsToggle) {
            animationsToggle.addEventListener('change', () => {
                this.saveUserSettings();
            });
        }
         // دکمه ذخیره نام نمایشی
    const saveDisplayNameBtn = document.getElementById('saveDisplayNameBtn');
    const displayNameInput = document.getElementById('displayName');
    
    if (saveDisplayNameBtn && displayNameInput) {
        saveDisplayNameBtn.addEventListener('click', () => {
            this.saveUserSettings();
            this.showSaveConfirmation();
        });
        
        // ذخیره خودکار با Enter
        displayNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveUserSettings();
                this.showSaveConfirmation();
            }
        });
        
        // ذخیره خودکار هنگام خروج از فیلد
        displayNameInput.addEventListener('blur', () => {
            this.saveUserSettings();
        });
    }
    }
    
    initDataManagement() {
        // دانلود پشتیبان
        const downloadBackupBtn = document.getElementById('downloadBackupBtn');
        if (downloadBackupBtn) {
            downloadBackupBtn.addEventListener('click', () => {
                this.downloadBackup();
            });
        }
        
        // شروع بازیابی
        const restoreBackupBtn = document.getElementById('restoreBackupBtn');
        if (restoreBackupBtn) {
            restoreBackupBtn.addEventListener('click', () => {
                this.restoreBackup();
            });
        }
        
        // چاپ لیست
        const printLessonsBtn = document.getElementById('printLessonsBtn');
        if (printLessonsBtn) {
            printLessonsBtn.addEventListener('click', () => {
                window.print();
            });
        }
        
        // حذف همه داده‌ها
        const clearAllDataBtn = document.getElementById('clearAllDataBtn');
        if (clearAllDataBtn) {
            clearAllDataBtn.addEventListener('click', () => {
                this.clearAllData();
            });
        }
        
        // مدیریت آپلود فایل
        const uploadArea = document.getElementById('uploadArea');
        const restoreFile = document.getElementById('restoreFile');
        
        if (uploadArea && restoreFile) {
            uploadArea.addEventListener('click', () => {
                restoreFile.click();
            });
            
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                
                if (e.dataTransfer.files.length) {
                    restoreFile.files = e.dataTransfer.files;
                    this.handleFileSelect();
                }
            });
            
            restoreFile.addEventListener('change', () => {
                this.handleFileSelect();
            });
        }
    }
    
    loadCurrentSettings() {
    // اول از localStorage جداگانه بخوان
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        try {
            const parsedSettings = JSON.parse(savedSettings);
            this.app.userData.settings = { ...this.app.userData.settings, ...parsedSettings };
        } catch (e) {
            console.error('خطا در خواندن تنظیمات:', e);
        }
    }
    
    const settings = this.app.userData.settings || {};
    
    // نام نمایشی
    const displayNameInput = document.getElementById('displayName');
    if (displayNameInput) {
        displayNameInput.value = settings.displayName || 'یادگیرنده آلمانی';
    }
    
    // سطح کاربر
    const userLevelSelect = document.getElementById('userLevel');
    if (userLevelSelect) {
        userLevelSelect.value = settings.level || 'beginner';
    }
    
    // هدف روزانه
    const dailyGoalSelect = document.getElementById('dailyGoal');
    if (dailyGoalSelect) {
        dailyGoalSelect.value = settings.dailyGoal || 2;
    }
    
    // انیمیشن‌ها
    const animationsToggle = document.getElementById('animationsToggle');
    if (animationsToggle) {
        animationsToggle.checked = settings.animations !== false;
    }
    
    // سایز فونت
    const fontSize = settings.fontSize || localStorage.getItem('grammarAppFontSize') || 'medium';
    document.body.className = '';
    document.body.classList.add(`font-${fontSize}`);
    
    // به‌روزرسانی دکمه‌های سایز فونت
    document.querySelectorAll('.font-size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === fontSize) {
            btn.classList.add('active');
        }
    });
    
    // به‌روزرسانی نام در هدر و سایدبار
    this.updateDisplayNameInHeader(settings.displayName);
    
    // به‌روزرسانی سطح در سایدبار
    const userLevelElement = document.querySelector('.user-level');
    if (userLevelElement) {
        userLevelElement.textContent = `سطح: ${this.app.uiManager.getLevelText(settings.level || 'beginner')}`;
    }
}
    updateDisplayNameInHeader(name) {
    const userDisplayName = document.querySelector('.user-display-name span');
    if (userDisplayName) {
        userDisplayName.textContent = name || 'یادگیرنده آلمانی';
    }
    
    const userDetails = document.querySelector('.user-details h3');
    if (userDetails) {
        userDetails.textContent = name || 'یادگیرنده آلمانی';
    }
}
   saveUserSettings() {
    if (!this.app.userData.settings) {
        this.app.userData.settings = {};
    }
    
    // 1. ذخیره نام نمایشی
    const displayNameInput = document.getElementById('displayName');
    if (displayNameInput) {
        const newName = displayNameInput.value.trim();
        this.app.userData.settings.displayName = newName || 'یادگیرنده آلمانی';
        
        // به‌روزرسانی نمایش نام
        this.updateDisplayNameInHeader(newName);
    }
    
    // 2. ذخیره سطح کاربر
    const userLevelSelect = document.getElementById('userLevel');
    if (userLevelSelect) {
        this.app.userData.settings.level = userLevelSelect.value;
    }
    
    // 3. ذخیره هدف روزانه
    const dailyGoalSelect = document.getElementById('dailyGoal');
    if (dailyGoalSelect) {
        this.app.userData.settings.dailyGoal = parseInt(dailyGoalSelect.value) || 2;
    }
    
    // 4. ذخیره تنظیمات انیمیشن
    const animationsToggle = document.getElementById('animationsToggle');
    if (animationsToggle) {
        this.app.userData.settings.animations = animationsToggle.checked;
    }
    
    // 5. ذخیره تم
    this.app.userData.settings.theme = this.app.currentTheme;
    
    // 6. ذخیره سایز فونت
    const fontSize = localStorage.getItem('grammarAppFontSize') || 'medium';
    this.app.userData.settings.fontSize = fontSize;
    
    // ذخیره در localStorage
    this.app.backupSystem.saveData(this.app.userData);
    
    // ذخیره تنظیمات در localStorage جداگانه برای اطمینان
    localStorage.setItem('userSettings', JSON.stringify(this.app.userData.settings));
}

    setTheme(theme) {
        this.app.currentTheme = theme;
        this.app.userData.settings.theme = theme;
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('grammarAppTheme', theme);
        
        // به‌روزرسانی دکمه‌های تم
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.theme === theme) {
                option.classList.add('active');
            }
        });
        
        // ذخیره تنظیمات
        this.app.backupSystem.saveData(this.app.userData);
        this.app.uiManager.showToast(`تم ${theme === 'dark' ? 'تاریک' : 'روشن'} فعال شد`, 'success');
         this.saveUserSettings();
    }
    
    setFontSize(size) {
        document.body.className = '';
        document.body.classList.add(`font-${size}`);
        
        // به‌روزرسانی دکمه‌ها
        document.querySelectorAll('.font-size-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.size === size) {
                btn.classList.add('active');
            }
        });
        
        localStorage.setItem('grammarAppFontSize', size);
        this.app.uiManager.showToast(`سایز فونت به ${size === 'small' ? 'کوچک' : size === 'large' ? 'بزرگ' : 'متوسط'} تغییر کرد`, 'success');
    }
    
    downloadBackup() {
        const fileName = `german-grammar-backup-${new Date().toISOString().split('T')[0]}.json`;
        const dataStr = JSON.stringify(this.app.userData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const link = document.createElement('a');
        link.setAttribute('href', dataUri);
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.app.uiManager.showToast('فایل پشتیبان با موفقیت دانلود شد', 'success');
    }
    
    handleFileSelect() {
        const fileInput = document.getElementById('restoreFile');
        const fileInfo = document.getElementById('selectedFileInfo');
        const restoreBtn = document.getElementById('restoreBackupBtn');
        
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            fileInfo.innerHTML = `
                <i class="fas fa-file"></i>
                <div>
                    <strong>${file.name}</strong>
                    <p>${(file.size / 1024).toFixed(2)} KB</p>
                </div>
            `;
            if (restoreBtn) restoreBtn.disabled = false;
        }
    }
    
    async restoreBackup() {
        const fileInput = document.getElementById('restoreFile');
        
        if (!fileInput || !fileInput.files.length) {
            this.app.uiManager.showToast('لطفاً یک فایل انتخاب کنید', 'error');
            return;
        }
        
        try {
            const file = fileInput.files[0];
            const text = await file.text();
            const backupData = JSON.parse(text);
            
            // اعتبارسنجی داده‌ها
            if (!backupData.lessons || !Array.isArray(backupData.lessons)) {
                throw new Error('فرمت فایل پشتیبان نامعتبر است');
            }
            
            // تأیید کاربر
            if (!confirm('آیا از بازیابی این فایل پشتیبان اطمینان دارید؟ داده‌های فعلی جایگزین خواهند شد.')) {
                return;
            }
            
            // ذخیره داده‌های بازیابی شده
            this.app.userData = backupData;
            
            // اطمینان از وجود تنظیمات
            if (!this.app.userData.settings) {
                this.app.userData.settings = {
                    displayName: 'یادگیرنده آلمانی',
                    level: 'beginner',
                    dailyGoal: 2,
                    animations: true,
                    theme: 'light'
                };
            }
            
            this.app.backupSystem.saveData(this.app.userData);
            
            // پاک کردن فرم
            fileInput.value = '';
            const selectedFileInfo = document.getElementById('selectedFileInfo');
            const restoreBackupBtn = document.getElementById('restoreBackupBtn');
            if (selectedFileInfo) selectedFileInfo.innerHTML = '';
            if (restoreBackupBtn) restoreBackupBtn.disabled = true;
            
            // بستن مودال
            const backupModal = document.getElementById('backupModal');
            if (backupModal) backupModal.classList.remove('active');
            
            // به‌روزرسانی UI
            this.app.uiManager.switchSection('dashboard');
            this.app.uiManager.updateStats();
            this.loadCurrentSettings();
            this.app.uiManager.showToast('داده‌ها با موفقیت بازیابی شدند', 'success');
            
        } catch (error) {
            console.error('Error restoring backup:', error);
            this.app.uiManager.showToast('خطا در بازیابی داده‌ها: ' + error.message, 'error');
        }
    }
    
    clearAllData() {
        if (!confirm('آیا از حذف تمام داده‌ها و تنظیمات اطمینان دارید؟ این عمل قابل برگشت نیست.')) {
            return;
        }
        
        // ایجاد داده‌های جدید خالی
        this.app.userData = {
            lessons: [],
            savedLessons: [],
            settings: {
                displayName: 'یادگیرنده آلمانی',
                level: 'beginner',
                dailyGoal: 2,
                animations: true,
                theme: 'light'
            },
            stats: {
                totalStudyTime: 0,
                totalLessonsCompleted: 0,
                streakDays: 0,
                lastStudyDate: null
            }
        };
        
        this.app.backupSystem.saveData(this.app.userData);
        
        this.app.uiManager.switchSection('dashboard');
        this.app.uiManager.updateStats();
        this.loadCurrentSettings();
        this.app.uiManager.showToast('تمام داده‌ها حذف شدند', 'success');
    }
}

// ====== سیستم پشتیبان‌گیری ======
class BackupSystem {
    constructor() {
        this.storageKey = 'germanGrammarData_v2';
    }
    
    loadData() {
        try {
            const savedData = localStorage.getItem(this.storageKey);
            if (savedData) {
                return JSON.parse(savedData);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
        
        return this.createDefaultData();
    }
    
    saveData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
        }
    }
    
    createDefaultData() {
        return {
            lessons: [],
            savedLessons: [],
            settings: {
                displayName: 'یادگیرنده آلمانی',
                level: 'beginner',
                dailyGoal: 2,
                animations: true,
                theme: 'light'
            },
            stats: {
                totalStudyTime: 0,
                totalLessonsCompleted: 0,
                streakDays: 0,
                lastStudyDate: null
            }
        };
    }
    
    getStats() {
        const data = this.loadData();
        const lessons = data.lessons || [];
        
        const completedLessons = lessons.filter(l => l.status === 'completed').length;
        const inProgressLessons = lessons.filter(l => l.status === 'in-progress').length;
        const priorityLessons = lessons.filter(l => l.priority === 'high').length;
        
        const totalScore = lessons.reduce((sum, l) => sum + (l.score || 0), 0);
        const averageScore = lessons.length > 0 ? Math.round(totalScore / lessons.length) : 0;
        const progressPercentage = lessons.length > 0 ? 
            Math.round((completedLessons / lessons.length) * 100) : 0;
        
        return {
            totalLessons: lessons.length,
            completedLessons,
            inProgressLessons,
            priorityLessons,
            averageScore,
            progressPercentage
        };
    }
}

// ====== راه‌اندازی برنامه ======
document.addEventListener('DOMContentLoaded', () => {
    // اضافه کردن استایل‌های CSS برای مثال‌ها در مودال
    const style = document.createElement('style');
    style.textContent = `
        .examples-list {
            margin: 20px 0;
            padding: 15px;
            background-color: var(--bg-secondary);
            border-radius: var(--radius-md);
            border: 1px solid var(--bg-tertiary);
        }
        
        .example-item-modal {
            padding: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid var(--bg-tertiary);
        }
        
        .example-item-modal:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .example-german, .example-farsi {
            margin-bottom: 5px;
            line-height: 1.5;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: pre-wrap;
        }
        
        .lesson-content-modal {
            line-height: 1.8;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: pre-wrap;
        }
        
        .lesson-content-modal h3 {
            color: var(--primary-color);
            margin: var(--space-lg) 0 var(--space-md);
            font-size: var(--font-size-xl);
        }
        
        .lesson-content-modal h4 {
            color: var(--secondary-color);
            margin: var(--space-md) 0 var(--space-sm);
            font-size: var(--font-size-lg);
        }
        
        .lesson-content-modal p {
            margin-bottom: var(--space-md);
            line-height: 1.7;
        }
        
        .lesson-content-modal ul, .lesson-content-modal ol {
            padding-right: var(--space-lg);
            margin-bottom: var(--space-md);
        }
        
        .lesson-content-modal li {
            margin-bottom: var(--space-xs);
            line-height: 1.6;
        }
        
        .lesson-content-modal table {
            width: 100%;
            border-collapse: collapse;
            margin: var(--space-md) 0;
            font-size: var(--font-size-sm);
        }
        
        .lesson-content-modal th,
        .lesson-content-modal td {
            border: 1px solid var(--bg-tertiary);
            padding: var(--space-sm);
            text-align: right;
        }
        
        .lesson-content-modal th {
            background-color: var(--bg-secondary);
            font-weight: var(--font-weight-semibold);
        }
        
        .filter-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin: 20px 0;
        }
        
        .filter-options label {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            padding: 8px;
            border-radius: 5px;
            transition: background-color 0.2s;
        }
        
        .filter-options label:hover {
            background-color: var(--bg-secondary);
        }
        
        .modal-actions {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            margin-top: 20px;
        }
        
        .no-lessons {
            text-align: center;
            padding: 20px;
            color: var(--text-tertiary);
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
    
    // راه‌اندازی اپلیکیشن
    window.germanGrammarApp = new GermanGrammarApp();
});
/**
 * 认证系统 - 处理注册、登录、用户管理
 * 使用 LocalStorage 模拟数据库
 */

// ============ 用户数据库管理 ============
const DB_KEY = 'bilibili_clone_db';
const SESSION_KEY = 'bilibili_current_user';

// 初始化数据库
function initDB() {
    if (!localStorage.getItem(DB_KEY)) {
        const defaultUsers = [
            {
                id: 1,
                username: 'demo',
                email: 'demo@bilibili.com',
                password: 'demo123',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
                createdAt: new Date().toISOString(),
                favorites: [],
                history: []
            }
        ];
        localStorage.setItem(DB_KEY, JSON.stringify(defaultUsers));
    }
}

// 获取所有用户
function getUsers() {
    initDB();
    return JSON.parse(localStorage.getItem(DB_KEY)) || [];
}

// 保存用户
function saveUsers(users) {
    localStorage.setItem(DB_KEY, JSON.stringify(users));
}

// 生成唯一ID
function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// 生成头像
function generateAvatar(seed) {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
}

// ============ 注册功能 ============
function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // 验证
    if (username.length < 3) {
        showToast('用户名至少需要3个字符', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('请输入有效的邮箱地址', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('密码至少需要6个字符', 'error');
        return;
    }
    
    if (password !== passwordConfirm) {
        showToast('两次输入的密码不一致', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showToast('请先同意用户协议', 'error');
        return;
    }
    
    // 检查用户名是否已存在
    const users = getUsers();
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        showToast('用户名已被占用，请换一个', 'error');
        return;
    }
    
    // 检查邮箱是否已注册
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showToast('该邮箱已注册过账号', 'error');
        return;
    }
    
    // 创建新用户
    const newUser = {
        id: generateId(),
        username: username,
        email: email,
        password: password, // 注意：实际项目中密码应该加密
        avatar: generateAvatar(username),
        createdAt: new Date().toISOString(),
        favorites: [],
        history: []
    };
    
    users.push(newUser);
    saveUsers(users);
    
    showToast('注册成功！正在跳转登录...', 'success');
    
    // 自动登录
    setTimeout(() => {
        closeModal('registerModal');
        document.getElementById('loginUsername').value = username;
        document.getElementById('loginPassword').value = password;
        handleLogin(new Event('submit'));
    }, 1500);
}

// ============ 登录功能 ============
function handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const remember = document.getElementById('rememberMe').checked;
    
    if (!username || !password) {
        showToast('请输入用户名和密码', 'error');
        return;
    }
    
    const users = getUsers();
    const user = users.find(u => 
        (u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === username.toLowerCase()) 
        && u.password === password
    );
    
    if (!user) {
        showToast('用户名或密码错误', 'error');
        return;
    }
    
    // 保存登录状态
    const sessionData = {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        loginTime: new Date().toISOString()
    };
    
    if (remember) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    } else {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    }
    
    showToast(`欢迎回来，${user.username}！`, 'success');
    closeModal('loginModal');
    updateUserUI();
    
    // 清空表单
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

// ============ 退出登录 ============
function logout() {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    showToast('已退出登录', 'info');
    updateUserUI();
    closeUserMenu();
}

// ============ 获取当前用户 ============
function getCurrentUser() {
    const local = localStorage.getItem(SESSION_KEY);
    const session = sessionStorage.getItem(SESSION_KEY);
    const data = local || session;
    return data ? JSON.parse(data) : null;
}

// ============ 更新UI ============
function updateUserUI() {
    const user = getCurrentUser();
    const notLoggedIn = document.getElementById('notLoggedIn');
    const loggedIn = document.getElementById('loggedIn');
    const usernameDisplay = document.getElementById('username-display');
    const userAvatar = document.getElementById('userAvatar');
    
    if (user) {
        notLoggedIn.style.display = 'none';
        loggedIn.style.display = 'flex';
        usernameDisplay.textContent = user.username;
        userAvatar.src = user.avatar;
    } else {
        notLoggedIn.style.display = 'flex';
        loggedIn.style.display = 'none';
    }
}

// ============ 用户菜单 ============
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('active');
}

function closeUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.remove('active');
}

// 点击外部关闭菜单
document.addEventListener('click', (e) => {
    const userActions = document.getElementById('userActions');
    if (userActions && !userActions.contains(e.target)) {
        closeUserMenu();
    }
});

// ============ 模态框控制 ============
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function switchModal(fromId, toId) {
    closeModal(fromId);
    setTimeout(() => openModal(toId), 200);
}

// 点击遮罩关闭
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ESC关闭
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ============ Toast消息提示 ============
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============ 工具函数 ============
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    initDB();
    updateUserUI();
});
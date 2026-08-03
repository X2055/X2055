/**
 * 主页功能 - 轮播图、视频数据、排行榜
 */

// ============ 模拟视频数据 ============
const videoData = [
    { id: 1, title: '【官方MV】周杰伦 - 最伟大的作品', author: '杰威尔音乐', views: '528万', danmaku: '12.3万', duration: '4:32', cover: 'https://picsum.photos/seed/music1/400/225', category: 'music' },
    { id: 2, title: '【2026年7月新番】7月新番导视合集', author: '哔哩哔哩番剧', views: '892万', danmaku: '8.7万', duration: '15:20', cover: 'https://picsum.photos/seed/anime1/400/225', category: 'anime' },
    { id: 3, title: '【4K60帧】中国航拍 - 壮美山河', author: '旅行者联盟', views: '326万', danmaku: '5.2万', duration: '8:45', cover: 'https://picsum.photos/seed/travel1/400/225', category: 'life' },
    { id: 4, title: '【游戏实况】黑神话：悟空 - 终极Boss战', author: '游戏风云', views: '1206万', danmaku: '23.1万', duration: '22:18', cover: 'https://picsum.photos/seed/game1/400/225', category: 'game' },
    { id: 5, title: '【编程教程】从零开始学Python - 第1集', author: '技术UP主', views: '156万', danmaku: '3.8万', duration: '18:30', cover: 'https://picsum.photos/seed/code1/400/225', category: 'tech' },
    { id: 6, title: '【美食】自制深夜食堂 - 日式拉面', author: '美食探索家', views: '289万', danmaku: '4.5万', duration: '12:05', cover: 'https://picsum.photos/seed/food1/400/225', category: 'food' },
    { id: 7, title: '【舞蹈】BTS - Dynamite 翻跳', author: '舞社小姐姐', views: '678万', danmaku: '9.2万', duration: '3:58', cover: 'https://picsum.photos/seed/dance1/400/225', category: 'dance' },
    { id: 8, title: '【科普】量子力学入门 - 薛定谔的猫', author: '科学探索', views: '445万', danmaku: '6.7万', duration: '14:22', cover: 'https://picsum.photos/seed/science1/400/225', category: 'tech' },
    { id: 9, title: '【影视解说】2026年必看电影TOP10', author: '电影达人', views: '567万', danmaku: '7.8万', duration: '20:15', cover: 'https://picsum.photos/seed/movie1/400/225', category: 'movie' },
    { id: 10, title: '【NBA】精彩扣篮集锦 2025-26赛季', author: '篮球之家', views: '723万', danmaku: '11.2万', duration: '6:30', cover: 'https://picsum.photos/seed/sports1/400/225', category: 'sports' },
    { id: 11, title: '【汽车】2026年新能源SUV横评', author: '汽车评测', views: '198万', danmaku: '2.9万', duration: '25:40', cover: 'https://picsum.photos/seed/car1/400/225', category: 'car' },
    { id: 12, title: '【动画】原创手书 - 相遇', author: '动画创作', views: '134万', danmaku: '3.1万', duration: '5:12', cover: 'https://picsum.photos/seed/animation1/400/225', category: 'animation' },
    { id: 13, title: '【时尚】夏日穿搭指南 - 女生篇', author: '时尚博主', views: '356万', danmaku: '4.8万', duration: '10:25', cover: 'https://picsum.photos/seed/fashion1/400/225', category: 'fashion' },
    { id: 14, title: '【学习】高考数学满分技巧分享', author: '学霸笔记', views: '423万', danmaku: '5.6万', duration: '16:40', cover: 'https://picsum.photos/seed/study1/400/225', category: 'study' },
    { id: 15, title: '【创意】用代码画一幅画 - 生成艺术', author: '创意工坊', views: '267万', danmaku: '3.4万', duration: '11:18', cover: 'https://picsum.photos/seed/creative1/400/225', category: 'creative' },
    { id: 16, title: '【生活】独居青年的一天Vlog', author: '生活记录者', views: '189万', danmaku: '2.7万', duration: '13:50', cover: 'https://picsum.photos/seed/vlog1/400/225', category: 'life' },
];

// ============ 轮播图功能 ============
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function initCarousel() {
    const dotsContainer = document.getElementById('carouselDots');
    if (!dotsContainer) return;
    
    // 生成指示点
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
    
    // 设置第一个slide为active
    if (slides[0]) {
        slides[0].classList.add('active-slide');
    }
    
    // 自动轮播
    setInterval(() => changeSlide(1), 5000);
}

function changeSlide(direction) {
    goToSlide(currentSlide + direction);
}

function goToSlide(index) {
    const dots = document.querySelectorAll('.dot');
    
    currentSlide = (index + totalSlides) % totalSlides;
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active-slide', i === currentSlide);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// ============ 渲染视频卡片 ============
function renderVideos(videos) {
    const grid = document.getElementById('videoGrid');
    if (!grid) return;
    
    grid.innerHTML = videos.map((video, index) => `
        <div class="video-card" style="animation-delay: ${index * 0.05}s" onclick="playVideo(${video.id})">
            <div class="video-cover">
                <img src="${video.cover}" alt="${video.title}" loading="lazy">
                <span class="video-duration">${video.duration}</span>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="video-meta">
                    <span class="video-author">
                        <i class="fas fa-user-circle"></i> ${video.author}
                    </span>
                    <div class="video-stats">
                        <span><i class="fas fa-play"></i> ${video.views}</span>
                        <span><i class="fas fa-comment"></i> ${video.danmaku}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ============ 排行榜功能 ============
const rankingData = {
    'all': [
        { title: '【黑神话：悟空】终极Boss战 全程无伤通关', author: '游戏风云', score: 9.8, views: '1206万' },
        { title: '2026年7月新番导视合集 - 不容错过', author: '哔哩哔哩番剧', score: 9.6, views: '892万' },
        { title: '周杰伦 最伟大的作品 官方MV', author: '杰威尔音乐', score: 9.5, views: '528万' },
        { title: 'NBA精彩扣篮集锦 2025-26赛季', author: '篮球之家', score: 9.3, views: '723万' },
        { title: '2026年必看电影TOP10 影视解说', author: '电影达人', score: 9.2, views: '567万' },
        { title: 'BTS Dynamite 舞蹈翻跳', author: '舞社小姐姐', score: 9.0, views: '678万' },
        { title: '量子力学入门 - 薛定谔的猫', author: '科学探索', score: 8.9, views: '445万' },
        { title: '中国航拍 壮美山河 4K60帧', author: '旅行者联盟', score: 8.8, views: '326万' },
        { title: '自制深夜食堂 日式拉面', author: '美食探索家', score: 8.7, views: '289万' },
        { title: '用代码画一幅画 生成艺术', author: '创意工坊', score: 8.6, views: '267万' },
    ],
    'animation': [
        { title: '原创手书动画 - 相遇', author: '动画创作', score: 9.7, views: '134万' },
        { title: '【MMD】精美舞蹈动画合集', author: 'MMD爱好者', score: 9.4, views: '298万' },
        { title: '【手绘】30天速写挑战', author: '画师日常', score: 9.1, views: '87万' },
        { title: '动画专业学生毕设作品', author: '动画学院', score: 8.8, views: '56万' },
        { title: '【PV】原创角色动画短片', author: '独立动画人', score: 8.5, views: '43万' },
    ],
    'game': [
        { title: '【黑神话：悟空】终极Boss战', author: '游戏风云', score: 9.8, views: '1206万' },
        { title: '2026年最期待游戏TOP10', author: '游戏前瞻', score: 9.5, views: '634万' },
        { title: '【速通】超级马里奥 世界纪录', author: '速通大神', score: 9.3, views: '289万' },
        { title: '【攻略】艾尔登法环DLC全收集', author: '攻略组', score: 9.0, views: '456万' },
        { title: '【搞笑】游戏中的离谱bug合集', author: '搞笑游戏', score: 8.7, views: '378万' },
    ],
    'music': [
        { title: '周杰伦 最伟大的作品 官方MV', author: '杰威尔音乐', score: 9.5, views: '528万' },
        { title: '【翻唱】周深 - 大鱼', author: '音乐人小A', score: 9.3, views: '234万' },
        { title: '2026年夏日流行歌曲盘点', author: '音乐推荐', score: 9.0, views: '167万' },
        { title: '【钢琴】久石让名曲合集', author: '钢琴家', score: 8.8, views: '98万' },
        { title: '【原创】写给你的歌', author: '独立音乐人', score: 8.5, views: '76万' },
    ]
};

function renderRanking(category) {
    const list = document.getElementById('rankingList');
    if (!list) return;
    
    const data = rankingData[category] || rankingData['all'];
    
    list.innerHTML = data.map((item, index) => `
        <div class="rank-item" onclick="playVideo(${index + 1})">
            <div class="rank-number ${index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : 'normal'}">
                ${index + 1}
            </div>
            <div class="rank-info">
                <div class="rank-title">${item.title}</div>
                <div class="rank-detail">
                    <span><i class="fas fa-user"></i> ${item.author}</span>
                    <span><i class="fas fa-play"></i> ${item.views}</span>
                </div>
            </div>
            <div class="rank-score">${item.score}</div>
        </div>
    `).join('');
}

function switchRankTab(category, btn) {
    document.querySelectorAll('.rank-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderRanking(category);
}

// ============ 搜索功能 ============
function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        showToast('请输入搜索内容', 'warning');
        return;
    }
    
    const results = videoData.filter(v => 
        v.title.toLowerCase().includes(query.toLowerCase()) ||
        v.author.toLowerCase().includes(query.toLowerCase())
    );
    
    if (results.length === 0) {
        showToast(`没有找到与"${query}"相关的内容`, 'info');
        return;
    }
    
    showToast(`找到 ${results.length} 条与"${query}"相关的结果`, 'success');
    renderVideos(results);
    
    // 滚动到视频区域
    document.querySelector('.recommend-section').scrollIntoView({ behavior: 'smooth' });
}

// 搜索框回车
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }
});

// ============ 视频播放模拟 ============
function playVideo(id) {
    const user = getCurrentUser();
    if (!user) {
        showToast('请先登录后再观看视频', 'warning');
        openModal('loginModal');
        return;
    }
    
    const video = videoData.find(v => v.id === id);
    const title = video ? video.title : '视频';
    showToast(`正在播放: ${title}`, 'info');
}

// ============ 页面初始化 ============
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    renderVideos(videoData);
    renderRanking('all');
    updateUserUI();
});
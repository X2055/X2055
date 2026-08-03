/**
 * 分区页面共用功能
 */

function renderZoneVideos(videos) {
    const grid = document.getElementById('zoneVideoGrid');
    if (!grid) return;
    
    grid.innerHTML = videos.map((video, index) => `
        <div class="video-card" style="animation-delay: ${index * 0.05}s" onclick="playVideo(0)">
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

function switchZoneTab(tabName, btn) {
    document.querySelectorAll('.zone-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    
    // 模拟不同tab的数据变化
    const currentData = window.zoneVideoData || [];
    const shuffled = [...currentData].sort(() => Math.random() - 0.5);
    renderZoneVideos(shuffled.slice(0, 8));
    
    showToast(`已切换到「${tabName}」标签`, 'info');
}
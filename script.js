// 显示当前网址
document.addEventListener('DOMContentLoaded', function() {
    const urlDisplay = document.getElementById('current-url');
    urlDisplay.textContent = window.location.href;
    urlDisplay.style.color = '#666';
    urlDisplay.style.fontSize = '0.9em';
    urlDisplay.style.marginTop = '10px';
}); 
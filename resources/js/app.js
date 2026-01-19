import './bootstrap';
import '../less/app.less';

document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video-portada");

    if (!video) return;

    video.addEventListener("ended", () => {
        video.pause();
        video.currentTime = video.duration;
    });
});

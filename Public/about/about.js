document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("videoPlayer");
    const thumbnail = document.getElementById("videoThumbnail");
    const playButton = document.getElementById("playButton");

    if (video && thumbnail && playButton) {
        playButton.addEventListener("click", () => {
            thumbnail.style.display = "none";
            playButton.style.display = "none";
            video.style.display = "block";
            video.play();
        });

        video.addEventListener("ended", () => {
            thumbnail.style.display = "block";
            playButton.style.display = "flex";
            video.style.display = "none";
        });

        video.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }
});

// Read More Toggle
function toggleText() {
    var moreText = document.querySelector(".more-text");
    var btn = document.querySelector(".read-more-btn");

    if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "inline";
        btn.textContent = "Read Less";
    } else {
        moreText.style.display = "none";
        btn.textContent = "Read More";
    }
}

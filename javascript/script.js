const url = document.getElementById("videoUrl");

import warning from "./warning.js";
import shwoDownload from "./download.js";
export const btnDownload = document.getElementById("btnDownload");

btnDownload.addEventListener("click", () => {
  const valueUrl = url.value;

  if (!valueUrl) {
    warning();
  } else {
    btnDownload.textContent = "Processing";
    downloadVideo();
  }
});

async function downloadVideo() {
  const url = document.getElementById("videoUrl").value;
  const btn = document.getElementById("btnDownload");
  const resultDiv = document.getElementById("result");
  const loading = document.getElementById("loading");

  // if (!url) {
  //   // alert("Masukkan URL TikTok terlebih dahulu!");
  //   warning();
  //   return;
  // }

  // Reset tampilan & Loading state
  // resultDiv.classList.add("hidden");
  // loading.classList.remove("hidden");
  // btn.disabled = true;
  // btn.innerText = "Memproses...";

  try {
    // 1. Ambil data dari API Tikwm
    const response = await fetch(
      `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`,
    );
    const data = await response.json();

    // console.log(data);

    if (data.code === 0) {
      shwoDownload();

      const videoData = data.data;
      const videoUrl = videoData.play;
      const fileName = `tiktok_video_${videoData.id}.mp4`;

      document.getElementById("thumbnail").src = videoData.cover;

      // 2. Logika "Force Download"
      const downloadBtn = document.getElementById("downloadLink");

      downloadBtn.onclick = async (e) => {
        e.preventDefault();

        downloadBtn.textContent = "Wait...";

        try {
          // Fetch video sebagai blob
          const res = await fetch(videoUrl);
          const blob = await res.blob();
          const blobUrl = window.URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = blobUrl;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();

          window.URL.revokeObjectURL(blobUrl);
          document.body.removeChild(a);
        } catch (err) {
          window.open(videoUrl, "_blank");
        } finally {
        }
      };

      // resultDiv.classList.remove("hidden");
    } else {
      alert("Gagal mengambil video. Pastikan link benar.");
    }
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan koneksi.");
  } finally {
    // loading.classList.add("hidden");
    btn.disabled = false;
    // btn.innerText = "Ambil Video";
  }
}

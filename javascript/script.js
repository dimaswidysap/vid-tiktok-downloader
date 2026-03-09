import warning from "./warning.js";
import shwoDownload from "./download.js";
const btnDownload = document.getElementById("btnDownload");

btnDownload.addEventListener("click", () => {
  downloadVideo();
});

async function downloadVideo() {
  const url = document.getElementById("videoUrl").value;
  const btn = document.getElementById("btnDownload");
  const resultDiv = document.getElementById("result");
  const loading = document.getElementById("loading");

  if (!url) {
    // alert("Masukkan URL TikTok terlebih dahulu!");
    warning();
    return;
  }

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

    console.log(data);

    if (data.code === 0) {
      shwoDownload();

      const videoData = data.data;
      const videoUrl = videoData.play; // Ini adalah link video tanpa watermark
      const fileName = `tiktok_video_${videoData.id}.mp4`;

      // Update UI (Thumbnail dan Judul)
      document.getElementById("thumbnail").src = videoData.cover;

      // 2. Logika "Force Download"
      const downloadBtn = document.getElementById("downloadLink");

      // Kita ubah fungsi klik pada tombol download
      downloadBtn.onclick = async (e) => {
        e.preventDefault(); // Mencegah buka tab baru
        downloadBtn.innerText = "Downloading...";
        downloadBtn.style.backgroundColor = "#6b7280"; // Warna abu-abu saat proses

        try {
          // Fetch video sebagai blob
          const res = await fetch(videoUrl);
          const blob = await res.blob();
          const blobUrl = window.URL.createObjectURL(blob);

          // Buat elemen link sementara untuk memicu download
          const a = document.createElement("a");
          a.href = blobUrl;
          a.download = fileName; // Nama file saat disimpan
          document.body.appendChild(a);
          a.click();

          // Bersihkan memory
          window.URL.revokeObjectURL(blobUrl);
          document.body.removeChild(a);
        } catch (err) {
          // Jika kena blokir CORS, kita buka di tab baru sebagai fallback
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
    btn.innerText = "Ambil Video";
  }
}

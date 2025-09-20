// ----------------------
// Read Aloud Function
// ----------------------
function readAloud(btn) {
  const fig = btn.closest('figcaption');
  const lesson = btn.closest('.lesson');
  let text = '';

  if (fig) text = fig.textContent.replace('🔊','').trim();
  else if (lesson) text = lesson.textContent.replace('🔊','').trim();
  else text = btn.textContent.trim();

  if (!('speechSynthesis' in window)) {
    alert('Speech not supported in this browser.');
    return;
  }

  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

// ----------------------
// Manual Slider Controls
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".scene-slider").forEach(slider => {
    const track = slider.querySelector(".tom");
    const slides = track.children;
    let currentIndex = 0;

    // create buttons
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "⟨ Prev";
    prevBtn.className = "slider-btn prev-btn";

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next ⟩";
    nextBtn.className = "slider-btn next-btn";

    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);

    // function to show current slide
    function updateSlide() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // button events
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlide();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide();
    });

    // initial state
    track.style.transition = "transform 0.6s ease";
    updateSlide();
  });
});

function setTextSize(size) {
  const body = document.body;
  body.classList.remove("text-small", "text-medium", "text-large");
  body.classList.add("text-" + size);
}


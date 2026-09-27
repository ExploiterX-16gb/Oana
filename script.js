
document.addEventListener("DOMContentLoaded", () => {
    // Animațiile secțiunilor la scroll
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // Butonul care duce la poveste
    const startButton = document.getElementById("start-story");

    startButton.addEventListener("click", () => {
        document.querySelector(".story-section").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    // Inimioare și steluțe care plutesc
    const floatingContainer =
        document.getElementById("floating-elements");

    const symbols = ["♡", "✦", "♥", "✧", "⋆", "💗"];
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function createFloatingElement() {
        if (reducedMotion) return;

        const element = document.createElement("span");
        element.className = "floating-item";

        element.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        element.style.left = Math.random() * 100 + "%";
        element.style.fontSize =
            (Math.random() * 16 + 12) + "px";

        const duration = Math.random() * 7 + 8;

        element.style.animationDuration = duration + "s";

        floatingContainer.appendChild(element);

        element.addEventListener("animationend", () => {
            element.remove();
        });
    }

    if (!reducedMotion) {
        for (let i = 0; i < 12; i++) {
            setTimeout(createFloatingElement, i * 250);
        }

        setInterval(() => {
            if (floatingContainer.childElementCount < 24) {
                createFloatingElement();
            }
        }, 900);
    }

    // Surpriza de la final
    const surpriseButton =
        document.getElementById("surprise-button");

    const surpriseMessage =
        document.getElementById("surprise-message");

    surpriseButton.addEventListener("click", () => {
        const isHidden = surpriseMessage.hidden;

        surpriseMessage.hidden = !isHidden;

        surpriseButton.textContent = isHidden
            ? "Ascunde surpriza 💗"
            : "Apasă pentru o surpriză 💌";

        if (isHidden) {
            surpriseMessage.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    });

    // Playerul muzical
    const music = document.getElementById("birthday-music");
    const musicButton = document.getElementById("music-button");
    const musicIcon = document.getElementById("music-icon");
    const musicLabel = document.getElementById("music-label");

    musicButton.addEventListener("click", async () => {
        if (music.paused) {
            try {
                await music.play();

                musicIcon.textContent = "♫";
                musicLabel.textContent = "Oprește muzica";
                musicButton.setAttribute(
                    "aria-label",
                    "Oprește muzica"
                );
            } catch (error) {
                musicLabel.textContent = "Nu s-a putut reda";
                console.error("Eroare la redarea muzicii:", error);
            }
        } else {
            music.pause();

            musicIcon.textContent = "♫";
            musicLabel.textContent = "Pornește muzica";
            musicButton.setAttribute(
                "aria-label",
                "Pornește muzica"
            );
        }
    });

    music.addEventListener("error", () => {
        musicLabel.textContent = "Adaugă fișierul bff.mp3";
    });
});

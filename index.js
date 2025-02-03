document.addEventListener("DOMContentLoaded", function () {
    const openLabels = document.querySelectorAll("label[for^='open']");
    const openRadios = document.querySelectorAll("input.open");
    const yesNoLabels = document.querySelectorAll("label.yes, label.no");
    const yesNoRadios = document.querySelectorAll("input.yesCheck, input.noCheck");

    const navSound = document.getElementById("navSound");
    const clickSound = document.getElementById("clickSound");
    const yesNoSound = document.getElementById("yesNoSound");

    let currentIndex = 0;
    let inYesNoSection = false;
    let allowYesNoEnter = false;

    openLabels[currentIndex].classList.add("focused");
    openLabels[currentIndex].focus();

    document.addEventListener("keydown", function (event) {
        if (!inYesNoSection) {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                openLabels[currentIndex].classList.remove("focused");

                if (event.key === "ArrowRight") {
                    currentIndex = (currentIndex + 1) % openLabels.length;
                } else if (event.key === "ArrowLeft") {
                    currentIndex = (currentIndex - 1 + openLabels.length) % openLabels.length;
                }

                openLabels[currentIndex].classList.add("focused");
                openLabels[currentIndex].focus();
                navSound.currentTime = 0;
                navSound.play();
            } else if (event.key === "Enter") {
                openRadios[currentIndex].checked = true;
                openRadios[currentIndex].dispatchEvent(new Event("change", { bubbles: true }));
                clickSound.currentTime = 0;
                clickSound.play();

                setTimeout(() => {
                    inYesNoSection = true;
                    allowYesNoEnter = false;
                    currentIndex = 1;
                    yesNoLabels[currentIndex].classList.add("focused");
                    yesNoLabels[currentIndex].focus();

                    setTimeout(() => { allowYesNoEnter = true; }, 200);
                }, 100);
            }
        } else {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                yesNoLabels[currentIndex].classList.remove("focused");

                if (event.key === "ArrowRight") {
                    currentIndex = (currentIndex + 1) % yesNoLabels.length;
                } else if (event.key === "ArrowLeft") {
                    currentIndex = (currentIndex - 1 + yesNoLabels.length) % yesNoLabels.length;
                }

                yesNoLabels[currentIndex].classList.add("focused");
                yesNoLabels[currentIndex].focus();
                navSound.currentTime = 0;
                navSound.play();
            } else if (event.key === "Enter" && allowYesNoEnter) {
                yesNoRadios[currentIndex].checked = true;
                yesNoRadios[currentIndex].dispatchEvent(new Event("change", { bubbles: true }));
                yesNoSound.currentTime = 0;
                yesNoSound.play();

                setTimeout(() => {
                    inYesNoSection = false;
                    currentIndex = 0;
                    openLabels[currentIndex].classList.add("focused");
                    openLabels[currentIndex].focus();
                }, 100);
            }
        }
    });

    openRadios.forEach((radio, index) => {
        radio.addEventListener("change", function () {
            inYesNoSection = true;
            allowYesNoEnter = false;
            currentIndex = 1;
            yesNoLabels[currentIndex].classList.add("focused");
            yesNoLabels[currentIndex].focus();

            setTimeout(() => { allowYesNoEnter = true; }, 200);
        });
    });

    yesNoLabels.forEach((label, index) => {
        label.addEventListener("click", function () {
            yesNoRadios[index].checked = true;
            yesNoRadios[index].dispatchEvent(new Event("change", { bubbles: true }));
            yesNoSound.currentTime = 0;
            yesNoSound.play();

            setTimeout(() => {
                inYesNoSection = false;
                currentIndex = 0;
                openLabels[currentIndex].classList.add("focused");
                openLabels[currentIndex].focus();
            }, 100);
        });
    });

    openLabels.forEach((label, index) => {
        label.addEventListener("click", function () {
            openRadios[index].checked = true;
            openRadios[index].dispatchEvent(new Event("change", { bubbles: true }));
            clickSound.currentTime = 0;
            clickSound.play();

            setTimeout(() => {
                inYesNoSection = true;
                allowYesNoEnter = false;
                currentIndex = 1;
                yesNoLabels[currentIndex].classList.add("focused");
                yesNoLabels[currentIndex].focus();

                setTimeout(() => { allowYesNoEnter = true; }, 200);
            }, 100);
        });
        });
    });
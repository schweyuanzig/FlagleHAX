// ==UserScript==
// @name         FlagleHAX
// @namespace    http://tampermonkey.net/
// @version      v8.0
// @description  A hack tool for flagleunlimited.fun
// @author       schweyuanzig
// @match        https://flagleunlimited.fun/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes rainbow-cycle {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        .rainbow-active {
            animation: rainbow-cycle 4s linear infinite !important;
        }
    `;
    document.head.appendChild(style);

    let history = [];
    let lastDetectedCountry = "";
    let isBgActive = false;
    let isRainbowActive = false;
    const CHAMPION_TITLE = "ÇAĞAN MATEMATİKTE DÜNYA 1'İNCİSİ OLDU";
    const MY_IMAGE = 'https://server2.projectlambda.net/cagan1.jpg';

    const displayBox = document.createElement('div');
    displayBox.id = 'tm-main-panel';
    displayBox.style.cssText = `
        position: fixed; top: 10px; right: 10px; padding: 15px;
        background: rgba(0, 0, 0, 0.95); color: #00ff00;
        font-family: 'Verdana', sans-serif; z-index: 10000;
        border-radius: 12px; border: 2px solid #444;
        display: flex; flex-direction: column; align-items: center;
        gap: 8px; pointer-events: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        min-width: 190px;
    `;

    const countryLabel = document.createElement('div');
    countryLabel.style.fontWeight = 'bold';
    countryLabel.innerText = "Bekleniyor...";
    displayBox.appendChild(countryLabel);

    function styleBtn(btn) {
        btn.style.cssText = `
            width: 100%; padding: 6px; cursor: pointer;
            background: #222; color: #fff; border: 1px solid #00ff00;
            border-radius: 5px; font-size: 11px; transition: 0.2s;
            font-weight: bold;
        `;
    }

    const bgBtn = document.createElement('button');
    bgBtn.innerText = "Background: OFF";
    styleBtn(bgBtn);

    const rainbowBtn = document.createElement('button');
    rainbowBtn.innerText = "Rainbow Mode: OFF";
    styleBtn(rainbowBtn);

    const historyBtn = document.createElement('button');
    historyBtn.innerText = "Show History (0)";
    styleBtn(historyBtn);

    [bgBtn, rainbowBtn, historyBtn].forEach(btn => displayBox.appendChild(btn));
    document.body.appendChild(displayBox);

    const historyModal = document.createElement('div');
    historyModal.style.cssText = `
        position: fixed; top: 190px; right: 10px; width: 220px;
        max-height: 250px; background: rgba(10, 10, 10, 0.95);
        border: 1px solid #00ff00; border-radius: 8px;
        display: none; flex-direction: column; overflow-y: auto;
        padding: 10px; z-index: 9999; color: #fff; font-size: 13px;
    `;
    const historyList = document.createElement('div');
    historyModal.innerHTML = `<div style="color:#00ff00; text-align:center; font-weight:bold; border-bottom:1px solid #444; margin-bottom:5px;">GEÇMİŞ</div>`;
    historyModal.appendChild(historyList);
    document.body.appendChild(historyModal);

    rainbowBtn.addEventListener('click', () => {
        isRainbowActive = !isRainbowActive;
        if (isRainbowActive) {
            document.documentElement.classList.add('rainbow-active');
            rainbowBtn.innerText = "Rainbow Mode: ON";
            rainbowBtn.style.background = "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)";
            rainbowBtn.style.color = "#000";
        } else {
            document.documentElement.classList.remove('rainbow-active');
            rainbowBtn.innerText = "Rainbow Mode: OFF";
            rainbowBtn.style.background = "#222";
            rainbowBtn.style.color = "#fff";
        }
    });

    bgBtn.addEventListener('click', () => {
        isBgActive = !isBgActive;
        document.body.style.backgroundImage = isBgActive ? `url('${MY_IMAGE}')` : "";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
        bgBtn.innerText = isBgActive ? "Background: OFF" : "Background: ON";
        bgBtn.style.background = isBgActive ? "#00ff00" : "#222";
        bgBtn.style.color = isBgActive ? "#000" : "#fff";
    });

    historyBtn.addEventListener('click', () => {
        historyModal.style.display = historyModal.style.display === 'none' ? 'flex' : 'none';
    });

    setInterval(() => {
        /*
        if (document.title !== CHAMPION_TITLE) {
            document.title = CHAMPION_TITLE;
        }
        */

        /*
        if (window.location.pathname.includes('/about')) {
            const tutorialImages = document.querySelectorAll('.tutorial-image');
            tutorialImages.forEach(img => {
                if (img.src !== MY_IMAGE) {
                    img.src = MY_IMAGE;
                }
            });
        }
        */
        /*
        const logoImg = document.getElementById('game-logo');
        if (logoImg) {
            const tribute = document.createElement('div');
            tribute.innerText = "ASLAN KARDESLERIM CINAR VE YEKTA'YA ITHAFEN...";
            tribute.style.cssText = "color: #00ff00; font-family: Verdana; font-weight: bold; font-size: 16px; text-align: center; padding: 10px;";
            logoImg.parentNode.replaceChild(tribute, logoImg);
        }
        */

        const countrySpan = document.getElementById('win-toast-country');
        if (countrySpan && countrySpan.textContent.trim() !== "") {
            const countryName = countrySpan.textContent.trim();
            countryLabel.innerText = countryName;
            countryLabel.style.color = "#00ff00";

            if (countryName !== lastDetectedCountry) {
                lastDetectedCountry = countryName;
                if (!history.includes(countryName)) {
                    history.push(countryName);
                    historyBtn.innerText = `Show History (${history.length})`;
                    const item = document.createElement('div');
                    item.innerText = `• ${countryName}`;
                    item.style.padding = "2px 0";
                    historyList.prepend(item);
                }
            }
        } else {
            countryLabel.innerText = "Loading...";
            countryLabel.style.color = "#ccc";
            lastDetectedCountry = "";
        }
    }, 500);

})();

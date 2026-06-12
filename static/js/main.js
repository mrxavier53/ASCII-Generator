const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const generateBtn = document.getElementById('generateBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const outputSection = document.getElementById('outputSection');
const asciiOutput = document.getElementById('asciiOutput');
const saveBtn = document.getElementById('saveBtn');
const copyBtn = document.getElementById('copyBtn');
const fontSelect = document.getElementById('fontSelect');


let currentArt = '';
let isTyping = false;

class SoundFX {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.init();
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

   
    playBeep(frequency, duration, type = 'sine') {
        if (!this.enabled || !this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = type;
            oscillator.frequency.value = frequency;
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + duration);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.warn('Failed to play sound:', e);
        }
    }

    
    typeSound() {
        this.playBeep(800 + Math.random() * 200, 0.03, 'sine');
    }

   
    generateSound() {
        this.playBeep(440, 0.1, 'sine');
        setTimeout(() => this.playBeep(880, 0.15, 'sine'), 50);
    }

    
    saveSound() {
        this.playBeep(523.25, 0.1, 'sine'); 
        setTimeout(() => this.playBeep(659.25, 0.1, 'sine'), 100); 
        setTimeout(() => this.playBeep(783.99, 0.2, 'sine'), 200); 
    }

    
    copySound() {
        this.playBeep(987.77, 0.08, 'sine'); 
        setTimeout(() => this.playBeep(1318.52, 0.08, 'sine'), 80); 
    }

    
    errorSound() {
        this.playBeep(220, 0.2, 'sawtooth');
        setTimeout(() => this.playBeep(196, 0.2, 'sawtooth'), 150);
    }

    
    successSound() {
        this.playBeep(523.25, 0.1, 'sine');
        setTimeout(() => this.playBeep(659.25, 0.1, 'sine'), 80);
        setTimeout(() => this.playBeep(783.99, 0.15, 'sine'), 160);
    }

    
    bootSound() {
        this.playBeep(330, 0.1, 'sine');
        setTimeout(() => this.playBeep(440, 0.1, 'sine'), 100);
        setTimeout(() => this.playBeep(554.37, 0.1, 'sine'), 200);
        setTimeout(() => this.playBeep(659.25, 0.3, 'sine'), 300);
    }

    
    completeSound() {
        this.playBeep(1046.50, 0.2, 'sine');
        setTimeout(() => this.playBeep(1318.52, 0.3, 'sine'), 100);
    }

   
    hoverSound() {
        this.playBeep(1200, 0.02, 'sine');
    }
}


const soundFX = new SoundFX();


function enableAudio() {
    if (soundFX.audioContext && soundFX.audioContext.state === 'suspended') {
        soundFX.audioContext.resume();
    }
    soundFX.bootSound();
}


document.body.addEventListener('click', enableAudio, { once: true });

async function typewriterEffect(text, element, speed = 15) {
    if (isTyping) return;
    isTyping = true;
    element.textContent = '';
    
    const lines = text.split('\n');
    let currentLine = 0;
    let currentChar = 0;
    
    for (let line of lines) {
        for (let char of line) {
            element.textContent += char;
            soundFX.typeSound(); 
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        element.textContent += '\n';
        await new Promise(resolve => setTimeout(resolve, speed * 2));
        currentLine++;
    }
    
    isTyping = false;
    soundFX.completeSound(); 
}

class MatrixRainText {
    constructor(element) {
        this.element = element;
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.interval = null;
    }
    
    start() {
        const originalText = this.element.textContent;
        let iterations = 0;
        
        this.interval = setInterval(() => {
            if (iterations > 15) {
                clearInterval(this.interval);
                this.element.textContent = originalText;
                return;
            }
            
            let newText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (originalText[i] === ' ') {
                    newText += ' ';
                } else if (Math.random() > 0.7) {
                    newText += this.chars[Math.floor(Math.random() * this.chars.length)];
                } else {
                    newText += originalText[i];
                }
            }
            this.element.textContent = newText;
            iterations++;
        }, 50);
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

textInput.addEventListener('input', () => {
    const count = textInput.value.length;
    charCount.textContent = count;
    
    if (count === 500) {
        charCount.style.color = '#ff4444';
        soundFX.errorSound();
    } else {
        charCount.style.color = 'var(--lime-green)';
    }
});


async function loadFonts() {
    try {
        const response = await fetch('/fonts');
        const data = await response.json();
        
        if (data.fonts) {
            data.fonts.forEach(font => {
                const option = document.createElement('option');
                option.value = font;
                option.textContent = font;
                fontSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Failed to load fonts:', error);
    }
}

function showLoading() {
    loadingOverlay.classList.remove('hidden');
    
   
    const loadingBar = document.querySelector('.loading-bar');
    if (loadingBar) {
        loadingBar.style.animation = 'none';
        loadingBar.offsetHeight; 
        loadingBar.style.animation = 'loadingProgress 2s ease-in-out infinite';
    }
}

function hideLoading() {
    loadingOverlay.classList.add('hidden');
}

async function generateArt() {
    const text = textInput.value.trim();
    
    if (!text) {
        soundFX.errorSound();
        showNotification('Please enter some text first!', 'error');
        return;
    }
    
    if (text.length > 500) {
        soundFX.errorSound();
        showNotification('Text exceeds 500 character limit!', 'error');
        return;
    }
    
    const font = fontSelect.value;
    
   
    soundFX.generateSound();
    showLoading();
    
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                text: text,
                font: font || null
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentArt = data.art;
            
            
            hideLoading();
            
            
            outputSection.classList.remove('hidden');
            asciiOutput.textContent = '';
            asciiOutput.style.opacity = '1';
            
           
            await new Promise(resolve => setTimeout(resolve, 200));
            
           
            await typewriterEffect(data.art, asciiOutput, 8);
            
            soundFX.successSound();
            showNotification('ASCII art generated successfully!', 'success');
        } else {
            hideLoading();
            soundFX.errorSound();
            showNotification(data.error || 'Generation failed', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        hideLoading();
        soundFX.errorSound();
        showNotification('Network error. Please try again.', 'error');
    }
}


async function saveToTxt() {
    if (!currentArt) {
        soundFX.errorSound();
        showNotification('No art to save!', 'error');
        return;
    }
    
    let filename = textInput.value.trim().slice(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    filename = filename || 'ascii_art';
    filename = `${filename}_${Date.now()}.txt`;
    
    showLoading();
    soundFX.saveSound();
    
    try {
        const response = await fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                art: currentArt,
                filename: filename
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            const link = document.createElement('a');
            link.href = data.download_url;
            link.download = data.filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            soundFX.successSound();
            showNotification('File saved successfully!', 'success');
        } else {
            soundFX.errorSound();
            showNotification(data.error || 'Save failed', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        soundFX.errorSound();
        showNotification('Failed to save file', 'error');
    } finally {
        hideLoading();
    }
}


async function copyToClipboard() {
    if (!currentArt) {
        soundFX.errorSound();
        showNotification('No art to copy!', 'error');
        return;
    }
    
    soundFX.copySound();
    
    try {
        await navigator.clipboard.writeText(currentArt);
        soundFX.successSound();
        showNotification('Copied to clipboard!', 'success');
        
        asciiOutput.style.transform = 'scale(1.01)';
        setTimeout(() => {
            asciiOutput.style.transform = 'scale(1)';
        }, 200);
    } catch (err) {
        console.error('Failed to copy:', err);
        soundFX.errorSound();
        showNotification('Failed to copy', 'error');
    }
}


function addHoverSounds() {
    const buttons = [generateBtn, saveBtn, copyBtn, fontSelect];
    buttons.forEach(btn => {
        if (btn) {
            btn.addEventListener('mouseenter', () => {
                soundFX.hoverSound();
            });
        }
    });
}


function showNotification(message, type = 'info') {
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--black-dark);
        border: 1px solid ${type === 'success' ? 'var(--lime-green)' : type === 'error' ? '#ff4444' : 'var(--lime-green)'};
        color: ${type === 'success' ? 'var(--lime-green)' : type === 'error' ? '#ff4444' : 'var(--lime-green)'};
        padding: 0.8rem 1.5rem;
        border-radius: 4px;
        font-family: var(--terminal-font);
        font-size: 0.9rem;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}


const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes crtFlicker {
        0% { opacity: 0.8; }
        100% { opacity: 1; }
    }
    
    .ascii-art {
        transition: transform 0.2s ease;
    }
    
    .cyber-button:hover .button-text {
        animation: textGlitch 0.2s infinite;
    }
    
    @keyframes textGlitch {
        0% { transform: skew(0deg); }
        20% { transform: skew(2deg); text-shadow: -2px 0 red; }
        40% { transform: skew(-2deg); text-shadow: 2px 0 blue; }
        60% { transform: skew(1deg); text-shadow: -1px 0 lime; }
        80% { transform: skew(-1deg); text-shadow: 1px 0 cyan; }
        100% { transform: skew(0deg); }
    }
`;

document.head.appendChild(style);


generateBtn.addEventListener('click', generateArt);
saveBtn.addEventListener('click', saveToTxt);
copyBtn.addEventListener('click', copyToClipboard);
addHoverSounds();


textInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        generateArt();
    }
});


const tagline = document.querySelector('.tagline');
if (tagline) {
    const originalText = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            tagline.textContent += originalText.charAt(i);
            soundFX.typeSound();
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    setTimeout(typeWriter, 500);
}


loadFonts();


console.log("%c[ASCII GENERATOR] System online. Audio ready.", "color: #00ff41; font-size: 14px; font-family: monospace;");
console.log("%c[SOUND FX] Enabled. Click anywhere to activate audio.", "color: #00ff41;");
console.log("%c[TYPEWRITER] Mode: ACTIVE", "color: #00ff41;");
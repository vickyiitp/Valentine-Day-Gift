import { WishFormData } from "../types";

export const generateGiftHtml = (data: WishFormData, aiMessage: string): string => {
  const { senderName, receiverName, promises, images, selectedGift, links } = data;

  // Generate Carousel Slides HTML
  const slidesHtml = images.map((img, idx) => 
    `<div class="min-w-full flex-shrink-0 h-full relative group/slide overflow-hidden">
       <img src="${img}" alt="Memory ${idx + 1}" class="w-full h-full object-cover transition-transform duration-700 group-hover/slide:scale-110" />
       <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/slide:opacity-100 transition-all duration-500 flex items-end justify-center p-8">
         <p class="text-white font-serif text-xl italic tracking-wide translate-y-4 group-hover/slide:translate-y-0 transition-transform duration-500 drop-shadow-lg">
            Memory ${idx + 1}
         </p>
       </div>
     </div>`
  ).join('');

  // Generate Dots HTML
  const dotsHtml = images.map((_, idx) => 
    `<button onclick="goToSlide(${idx})" class="w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white transition-all duration-300 carousel-dot shadow-sm" aria-label="Go to slide ${idx + 1}"></button>`
  ).join('');

  // Generate Promises HTML
  const promisesHtml = promises.map(promise =>
    `<div class="flex items-start gap-3 text-left p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-rose-100 hover:bg-white/90 transition-all hover:shadow-md group">
       <span class="text-2xl group-hover:scale-125 transition-transform">🤞</span>
       <span class="text-rose-900 font-medium text-lg pt-1">${promise}</span>
     </div>`
  ).join('');

  // Generate Links HTML
  const linksHtml = links.map(link =>
    `<a href="${link.url}" target="_blank" class="flex items-center justify-center gap-2 bg-white text-rose-600 px-6 py-3 rounded-full font-bold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-rose-100">
       <span class="text-xl">🔗</span>
       <span>${link.label}</span>
     </a>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A Gift for ${receiverName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #fff0f3; overflow-x: hidden; margin: 0; min-height: 100vh; }
        .font-cursive { font-family: 'Great Vibes', cursive; }
        .font-serif { font-family: 'Playfair Display', serif; }
        
        /* Animations */
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .animate-pulse-slow { animation: pulse-slow 3s infinite; }
        @keyframes sway { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
        .animate-sway { animation: sway 3s ease-in-out infinite; }
        
        /* Glass Effect */
        .glass { background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.6); }
        .paper-texture { background-color: #fff; background-image: radial-gradient(#f0f0f0 1px, transparent 1px); background-size: 20px 20px; }

        /* Welcome Screen Styles */
        #welcome-overlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #2a020d; /* Dark background to prevent pink flash if curtains delay */
            transition: opacity 1s, visibility 1s;
        }
        
        /* Velvet Curtains */
        .curtain {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 50%;
            background: linear-gradient(90deg, #660a26 0%, #a81c43 25%, #660a26 50%, #a81c43 75%, #660a26 100%);
            background-size: 200% 100%;
            z-index: 10;
            transition: transform 2.5s cubic-bezier(0.7, 0, 0.3, 1);
            box-shadow: inset 0 0 100px rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .curtain-left { left: 0; transform-origin: left; border-right: 4px solid #4a0418; }
        .curtain-right { right: 0; transform-origin: right; border-left: 4px solid #4a0418; }
        
        /* Welcome Stage Content */
        .welcome-content {
            z-index: 20;
            text-align: center;
            color: white;
            transition: opacity 0.5s;
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .stage-floor {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30%;
            background: linear-gradient(to bottom, #4a0418, #2a020d);
            z-index: -1;
        }
        
        .red-carpet {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            top: 0;
            background: #d11e48;
            border-left: 10px solid #f43f5e;
            border-right: 10px solid #f43f5e;
            box-shadow: 0 0 50px rgba(0,0,0,0.5);
            clip-path: polygon(20% 0, 80% 0, 100% 100%, 0% 100%);
        }

        .spotlight {
            position: absolute;
            top: -20%;
            left: 50%;
            transform: translateX(-50%);
            width: 400px;
            height: 100vh;
            background: radial-gradient(ellipse at top, rgba(255,255,255,0.4) 0%, transparent 70%);
            z-index: 0;
            pointer-events: none;
            mix-blend-mode: overlay;
        }

        .avatar-stage {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            position: relative;
            z-index: 10;
        }

        .main-couple {
            display: flex;
            gap: 1rem;
            transform: scale(1.5);
            z-index: 20;
            filter: drop-shadow(0 20px 30px rgba(0,0,0,0.6));
        }

        .guest-group {
            display: flex;
            gap: 0.5rem;
            opacity: 0.8;
            transform: scale(0.9);
            filter: blur(0.5px);
        }

        .avatar {
            font-size: 5rem;
            /* Default bounce for guests/generic avatars */
            animation: bounce 2s infinite ease-in-out;
            transform-origin: bottom;
        }

        /* Groom Animation: Polite Bow */
        .groom { 
            animation: bow 3s infinite ease-in-out; 
            transform-origin: bottom right;
        }
        
        /* Bride Animation: Graceful Curtsy */
        .bride { 
            animation: curtsy 3s infinite ease-in-out; 
            animation-delay: 0.5s; /* Offset from groom */
            transform-origin: bottom center;
        }
        
        .guest { font-size: 3.5rem; animation: sway 3s infinite ease-in-out; }

        @keyframes bounce {
            0%, 100% { transform: translateY(0) scaleY(1); }
            50% { transform: translateY(-15px) scaleY(1.05); }
        }

        @keyframes bow {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(5px) rotate(-15deg); }
        }

        @keyframes curtsy {
            0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
            50% { transform: translateY(10px) scale(1.1, 0.85) rotate(5deg); }
        }

        /* Open State */
        .open .curtain-left { transform: translateX(-100%); }
        .open .curtain-right { transform: translateX(100%); }
        .open .welcome-content { opacity: 0; pointer-events: none; }
        .open#welcome-overlay { pointer-events: none; }
        
        /* Confetti */
        .confetti {
            position: fixed;
            width: 10px;
            height: 10px;
            z-index: 50;
            pointer-events: none;
        }
        
        /* Main Content Transition */
        #main-container {
            opacity: 0;
            transform: scale(0.95);
            transition: opacity 1s 0.8s, transform 1s 0.8s;
        }
        .revealed #main-container {
            opacity: 1;
            transform: scale(1);
        }
        
        /* Fallback for JS disabled */
        noscript .main-container { opacity: 1 !important; transform: none !important; }
        noscript #welcome-overlay { display: none !important; }
    </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 selection:bg-rose-200">

    <noscript>
        <style>#welcome-overlay { display: none; } #main-container { opacity: 1; transform: scale(1); }</style>
        <div class="p-4 text-center bg-red-100 text-red-800">Please enable JavaScript to view the animation!</div>
    </noscript>

    <!-- Grand Celebration Welcome Overlay -->
    <div id="welcome-overlay">
        <div class="curtain curtain-left"></div>
        <div class="curtain curtain-right"></div>
        
        <div class="welcome-content">
            <div class="stage-floor">
                <div class="red-carpet"></div>
            </div>
            <div class="spotlight"></div>

            <div class="absolute top-10 w-full text-center z-30">
                 <div class="inline-block animate-bounce text-6xl drop-shadow-lg">🎵</div>
                 <div class="inline-block animate-sway text-6xl drop-shadow-lg" style="animation-delay: 0.5s">🎺</div>
                 <div class="inline-block animate-bounce text-6xl drop-shadow-lg" style="animation-delay: 1s">🎻</div>
            </div>

            <div class="avatar-stage">
                <!-- Guests Left -->
                <div class="guest-group">
                    <div class="guest" style="animation-delay: 0.1s">🥳</div>
                    <div class="guest" style="animation-delay: 0.3s">👯‍♀️</div>
                    <div class="guest" style="animation-delay: 0.5s">🎩</div>
                </div>

                <!-- Main Couple -->
                <div class="main-couple">
                    <div class="avatar groom">🤵</div>
                    <div class="avatar bride">💃</div>
                </div>

                <!-- Guests Right -->
                <div class="guest-group">
                    <div class="guest" style="animation-delay: 0.2s">👗</div>
                    <div class="guest" style="animation-delay: 0.4s">👯‍♂️</div>
                    <div class="guest" style="animation-delay: 0.6s">🎊</div>
                </div>
            </div>

            <div class="relative z-30 bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl text-center max-w-lg mx-4">
                <h1 class="font-cursive text-5xl md:text-7xl mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Welcome!</h1>
                <p class="font-serif text-xl md:text-2xl mb-8 text-rose-100 drop-shadow-md">
                    To the Celebration of Love for<br/><span class="text-yellow-300 font-bold text-3xl mt-2 block">${receiverName}</span>
                </p>
                
                <button onclick="revealGift()" class="group relative px-10 py-5 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-full font-bold text-xl shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-all hover:scale-110 hover:shadow-[0_0_50px_rgba(225,29,72,0.8)] border-2 border-white/50">
                    <span class="relative z-10 flex items-center gap-3">
                        <span>Enter the Ceremony</span>
                        <span class="text-2xl group-hover:rotate-12 transition-transform">✨</span>
                    </span>
                </button>
            </div>
        </div>
    </div>

    <!-- Main Application Content -->
    <div id="main-container" class="container mx-auto px-4 py-12 relative z-10 max-w-4xl">
        
        <!-- Floating Elements -->
        <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            <div class="absolute top-10 left-10 text-4xl opacity-30 animate-float">☁️</div>
            <div class="absolute top-40 right-20 text-5xl opacity-20 animate-float" style="animation-delay: 1s;">🕊️</div>
            <div class="absolute bottom-20 left-1/4 text-6xl opacity-10 animate-float" style="animation-delay: 2s;">💖</div>
        </div>

        <!-- Hero Section -->
        <header class="text-center mb-16 relative">
            <div class="inline-block relative">
                <div class="absolute -inset-8 bg-rose-200 blur-2xl opacity-40 rounded-full animate-pulse-slow"></div>
                <h1 class="relative text-6xl md:text-8xl font-cursive text-rose-600 mb-4 drop-shadow-sm">Happy Valentine's Day</h1>
            </div>
            <h2 class="text-2xl md:text-4xl font-serif text-rose-900 mt-4 italic">For my dearest ${receiverName}</h2>
        </header>

        <!-- The Love Letter -->
        <div class="bg-white paper-texture p-8 md:p-16 rounded-xl shadow-2xl rotate-1 transform hover:rotate-0 transition-transform duration-500 mb-20 mx-auto max-w-3xl border border-rose-100 relative group">
            <div class="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform">💌</div>
            <p class="font-serif text-lg md:text-2xl leading-relaxed text-gray-800 italic text-center text-rose-900/80">
                "${aiMessage.replace(/\n/g, '<br/>')}"
            </p>
            <div class="mt-12 text-right border-t border-rose-100 pt-6">
                <p class="font-cursive text-4xl text-rose-500">Forever yours,</p>
                <p class="font-serif text-xl text-gray-600 mt-2">${senderName}</p>
            </div>
        </div>

        <!-- The Promise Box -->
        ${promises.length > 0 ? `
        <div class="mb-20">
            <div class="glass rounded-[2rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
                <div class="absolute top-0 right-0 p-40 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
                <div class="absolute -bottom-8 -left-8 p-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style="animation-delay: 1s"></div>
                
                <div class="relative z-10">
                    <div class="flex items-center justify-center gap-3 mb-8">
                        <span class="text-3xl">🤝</span>
                        <h3 class="text-3xl md:text-4xl font-serif text-rose-800">My Promises to You</h3>
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                        ${promisesHtml}
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        <!-- Our Memories Carousel -->
        ${images.length > 0 ? `
        <div class="mb-20">
            <div class="text-center mb-10">
                <h3 class="text-4xl md:text-5xl font-cursive text-rose-700 mb-2">Our Memories Gallery</h3>
                <p class="text-rose-400 font-serif">Moments I cherish forever</p>
            </div>
            
            <div id="carousel-container" class="relative max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white/50 group aspect-[4/3] md:aspect-video" style="touch-action: pan-y;">
                
                <!-- Slides Track -->
                <div id="carousel-track" class="flex h-full transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing">
                    ${slidesHtml}
                </div>

                <!-- Navigation Arrows -->
                <button onclick="moveSlide(-1)" class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110 shadow-lg z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button onclick="moveSlide(1)" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110 shadow-lg z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>

                <!-- Dots Indicators -->
                <div class="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                    ${dotsHtml}
                </div>
                
                <!-- Overlay Gradient for better text readability if needed -->
                <div class="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.1)]"></div>
            </div>
        </div>
        ` : ''}

        <!-- The Gift Box -->
        <div class="text-center mb-20">
            <h3 class="text-3xl font-serif text-rose-800 mb-10">A Special Gift For You</h3>
            <div class="inline-block relative group cursor-pointer" onclick="this.querySelector('.gift-content').classList.toggle('scale-0')">
                <!-- The Bubble/Box -->
                <div class="w-64 h-64 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full shadow-[0_20px_50px_rgba(244,63,94,0.4)] flex items-center justify-center animate-float relative z-10 transform group-hover:scale-105 transition-all duration-500">
                    <span class="gift-content text-9xl filter drop-shadow-lg transform transition-transform duration-500 group-hover:rotate-[360deg]">${selectedGift}</span>
                </div>
                <!-- Sparkles -->
                <div class="absolute inset-0 z-20 pointer-events-none">
                    <div class="absolute top-0 left-1/2 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
                    <div class="absolute bottom-8 right-8 w-4 h-4 bg-white rounded-full animate-pulse"></div>
                    <div class="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping" style="animation-delay: 0.5s"></div>
                </div>
                <p class="mt-8 text-rose-500 font-medium font-serif italic text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                    (Hover or tap to accept my love)
                </p>
            </div>
        </div>

        <!-- Special Links -->
        ${links.length > 0 ? `
        <div class="flex flex-wrap justify-center gap-6 mb-20">
            ${linksHtml}
        </div>
        ` : ''}

        <!-- Reply / CTA Section -->
        <div class="text-center mb-16 px-4">
            <div class="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-rose-200 max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300">
                <h3 class="text-2xl font-serif text-rose-800 mb-4">Touched by this gift?</h3>
                <p class="text-rose-600 mb-6 italic">Send a magical reply back to ${senderName} or create your own surprise!</p>
                <a href="https://valentine-day-gift-inky.vercel.app/" target="_blank" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-rose-300/50 transition-all hover:-translate-y-1 w-full sm:w-auto">
                    <span>✨ Create Your Own Gift</span>
                </a>
            </div>
        </div>

        <footer class="text-center text-rose-800/40 pb-12 font-serif">
            <p class="text-lg mb-2">Made with infinite love by ${senderName}</p>
            <p class="text-sm italic">"To love and be loved is to feel the sun from both sides."</p>
            <div class="mt-8 text-xs font-sans text-rose-300 flex items-center justify-center gap-1">
                <span>Powered by Cupid's Whisper &</span>
                <span class="font-bold text-rose-400">vickyiitp</span>
            </div>
        </footer>

    </div>

    <script>
        // Carousel Logic
        let currentSlide = 0;
        const totalSlides = ${images.length};
        let autoPlayInterval;

        function updateCarousel() {
            const track = document.getElementById('carousel-track');
            if(!track) return;
            
            track.style.transform = \`translateX(-\${currentSlide * 100}%)\`;
            
            // Update dots
            document.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
                if (idx === currentSlide) {
                    dot.classList.add('bg-white', 'scale-125', 'opacity-100');
                    dot.classList.remove('bg-white/40');
                } else {
                    dot.classList.remove('bg-white', 'scale-125', 'opacity-100');
                    dot.classList.add('bg-white/40');
                }
            });
        }

        function moveSlide(direction) {
            currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
            updateCarousel();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }
        
        // Auto-play Setup
        function startAutoPlay() {
            if(totalSlides > 1) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = setInterval(() => moveSlide(1), 5000);
            }
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Initialize Carousel Event Listeners
        const carouselContainer = document.getElementById('carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
            // Touch support
            let touchStartX = 0;
            let touchEndX = 0;
            carouselContainer.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
            carouselContainer.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 50) moveSlide(1);
                if (touchEndX - touchStartX > 50) moveSlide(-1);
            });
        }
        
        // Initialize
        if(totalSlides > 0) {
            updateCarousel();
            startAutoPlay();
        }

        // ---------------------------------------------------------
        
        function revealGift() {
            // Open Curtains
            const overlay = document.getElementById('welcome-overlay');
            if(overlay) overlay.classList.add('open');
            document.body.classList.add('revealed');
            
            // Remove Overlay Logic
            setTimeout(() => {
                if(overlay) overlay.style.display = 'none';
            }, 2500); // Wait for curtain animation

            // Confetti Explosion
            // Initial Burst
            spawnConfettiBatch(50);
            
            // Continuous Celebration (Rain effect)
            let count = 0;
            const interval = setInterval(() => {
                spawnConfettiBatch(10);
                count++;
                if(count > 25) clearInterval(interval);
            }, 200);
        }

        function spawnConfettiBatch(amount) {
            for(let i=0; i<amount; i++) {
                createConfetti();
            }
        }

        function createConfetti() {
            // Extended distinct colors
            const colors = ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#3b82f6', '#10b981', '#fbbf24', '#f59e0b', '#ef4444', '#ffffff'];
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random Properties
            const bg = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100; // 0-100vw
            const sizeBase = Math.random() * 10 + 5; // 5-15px base size
            
            confetti.style.backgroundColor = bg;
            confetti.style.left = left + 'vw';
            confetti.style.top = '-5vh'; // Start slightly above viewport
            confetti.style.opacity = Math.random() * 0.4 + 0.6;
            
            // Shapes
            const type = Math.random();
            if(type < 0.3) {
                // Circle
                confetti.style.width = sizeBase + 'px';
                confetti.style.height = sizeBase + 'px';
                confetti.style.borderRadius = '50%';
            } else if (type < 0.6) {
                // Square
                confetti.style.width = sizeBase + 'px';
                confetti.style.height = sizeBase + 'px';
                confetti.style.borderRadius = '2px';
            } else {
                // Rectangle
                confetti.style.width = (sizeBase * 0.6) + 'px';
                confetti.style.height = (sizeBase * 1.5) + 'px';
                confetti.style.borderRadius = '1px';
            }

            // Animation Physics
            const duration = Math.random() * 2000 + 2500; // 2.5-4.5s fall duration
            const driftX = (Math.random() - 0.5) * 60; // Wide horizontal drift
            const rotateX = Math.random() * 720 - 360;
            const rotateY = Math.random() * 720 - 360;
            const rotateZ = Math.random() * 360;

            // Use Web Animation API for smooth, composited animations
            confetti.animate([
                { transform: \`translate3d(0,0,0) rotateX(0) rotateY(0) rotateZ(0)\`, opacity: 1 },
                { transform: \`translate3d(\${driftX}vw, 105vh, 0) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) rotateZ(\${rotateZ}deg)\`, opacity: 0 }
            ], {
                duration: duration,
                delay: Math.random() * 500, // Slight start delay for randomness
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fill: 'forwards'
            });

            document.body.appendChild(confetti);
            
            // Cleanup DOM
            setTimeout(() => confetti.remove(), duration + 1000);
        }
    </script>
</body>
</html>`;
}
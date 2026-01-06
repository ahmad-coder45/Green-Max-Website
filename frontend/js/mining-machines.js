// Mining Machine SVG Generator
const MiningMachines = {
    // Starter Mining Rig (Plan 01)
    starter: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Base -->
            <rect x="40" y="120" width="120" height="60" fill="#1a1f3a" stroke="#00ff88" stroke-width="2" rx="5"/>
            
            <!-- Fans -->
            <circle cx="70" cy="150" r="15" fill="#0a0e27" stroke="#00ff88" stroke-width="2"/>
            <circle cx="100" cy="150" r="15" fill="#0a0e27" stroke="#00ff88" stroke-width="2"/>
            <circle cx="130" cy="150" r="15" fill="#0a0e27" stroke="#00ff88" stroke-width="2"/>
            
            <!-- Fan Blades (Animated) -->
            <g class="fan-blades" transform-origin="70 150">
                <line x1="70" y1="140" x2="70" y2="160" stroke="#00ff88" stroke-width="2"/>
                <line x1="60" y1="150" x2="80" y2="150" stroke="#00ff88" stroke-width="2"/>
            </g>
            <g class="fan-blades" transform-origin="100 150">
                <line x1="100" y1="140" x2="100" y2="160" stroke="#00ff88" stroke-width="2"/>
                <line x1="90" y1="150" x2="110" y2="150" stroke="#00ff88" stroke-width="2"/>
            </g>
            <g class="fan-blades" transform-origin="130 150">
                <line x1="130" y1="140" x2="130" y2="160" stroke="#00ff88" stroke-width="2"/>
                <line x1="120" y1="150" x2="140" y2="150" stroke="#00ff88" stroke-width="2"/>
            </g>
            
            <!-- LED Indicators -->
            <circle cx="50" cy="130" r="3" fill="#00ff88">
                <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
            </circle>
            <circle cx="60" cy="130" r="3" fill="#00d4ff">
                <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Heatsink -->
            <rect x="50" y="80" width="100" height="30" fill="#2a2f4a" stroke="#00ff88" stroke-width="1"/>
            <line x1="60" y1="80" x2="60" y2="110" stroke="#00ff88" stroke-width="1"/>
            <line x1="70" y1="80" x2="70" y2="110" stroke="#00ff88" stroke-width="1"/>
            <line x1="80" y1="80" x2="80" y2="110" stroke="#00ff88" stroke-width="1"/>
            <line x1="90" y1="80" x2="90" y2="110" stroke="#00ff88" stroke-width="1"/>
            <line x1="100" y1="80" x2="100" y2="110" stroke="#00ff88" stroke-width="1"/>
            <line x1="110" y1="80" x2="110" y2="110" stroke="#00ff88" stroke-width="1"/>
            <line x1="120" y1="80" x2="120" y2="110" stroke="#00ff88" stroke-width="1"/>
            <line x1="130" y1="80" x2="130" y2="110" stroke="#00ff88" stroke-width="1"/>
            <line x1="140" y1="80" x2="140" y2="110" stroke="#00ff88" stroke-width="1"/>
            
            <!-- Power Supply -->
            <rect x="60" y="40" width="80" height="30" fill="#1a1f3a" stroke="#00ff88" stroke-width="2" rx="3"/>
            <text x="100" y="60" text-anchor="middle" fill="#00ff88" font-size="12" font-weight="bold">PSU</text>
        </svg>
    `,

    // Basic Mining Rig (Plan 02)
    basic: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Frame -->
            <rect x="30" y="50" width="140" height="120" fill="none" stroke="#00d4ff" stroke-width="3" rx="5"/>
            
            <!-- GPU Cards -->
            <rect x="40" y="70" width="120" height="25" fill="#1a1f3a" stroke="#00d4ff" stroke-width="2" rx="3"/>
            <rect x="40" y="100" width="120" height="25" fill="#1a1f3a" stroke="#00d4ff" stroke-width="2" rx="3"/>
            <rect x="40" y="130" width="120" height="25" fill="#1a1f3a" stroke="#00d4ff" stroke-width="2" rx="3"/>
            
            <!-- GPU Fans -->
            <circle cx="60" cy="82" r="8" fill="#0a0e27" stroke="#00d4ff" stroke-width="1.5"/>
            <circle cx="80" cy="82" r="8" fill="#0a0e27" stroke="#00d4ff" stroke-width="1.5"/>
            <circle cx="60" cy="112" r="8" fill="#0a0e27" stroke="#00d4ff" stroke-width="1.5"/>
            <circle cx="80" cy="112" r="8" fill="#0a0e27" stroke="#00d4ff" stroke-width="1.5"/>
            <circle cx="60" cy="142" r="8" fill="#0a0e27" stroke="#00d4ff" stroke-width="1.5"/>
            <circle cx="80" cy="142" r="8" fill="#0a0e27" stroke="#00d4ff" stroke-width="1.5"/>
            
            <!-- LED Strip -->
            <rect x="35" y="160" width="130" height="5" fill="#00d4ff" opacity="0.7">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
            </rect>
            
            <!-- Motherboard -->
            <rect x="50" y="30" width="100" height="15" fill="#2a2f4a" stroke="#00d4ff" stroke-width="1.5"/>
            <circle cx="60" cy="37" r="2" fill="#00ff88"/>
            <circle cx="70" cy="37" r="2" fill="#ffa502"/>
            <circle cx="80" cy="37" r="2" fill="#00d4ff"/>
        </svg>
    `,

    // Standard Mining Rig (Plan 03)
    standard: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Advanced Frame -->
            <rect x="20" y="40" width="160" height="140" fill="none" stroke="#667eea" stroke-width="3" rx="8"/>
            <rect x="25" y="45" width="150" height="130" fill="rgba(102, 126, 234, 0.1)" rx="5"/>
            
            <!-- Multiple GPU Stack -->
            <g class="gpu-stack">
                <rect x="35" y="60" width="130" height="20" fill="#1a1f3a" stroke="#667eea" stroke-width="2" rx="3"/>
                <rect x="35" y="85" width="130" height="20" fill="#1a1f3a" stroke="#667eea" stroke-width="2" rx="3"/>
                <rect x="35" y="110" width="130" height="20" fill="#1a1f3a" stroke="#667eea" stroke-width="2" rx="3"/>
                <rect x="35" y="135" width="130" height="20" fill="#1a1f3a" stroke="#667eea" stroke-width="2" rx="3"/>
            </g>
            
            <!-- Cooling Fans -->
            <circle cx="50" cy="70" r="7" fill="#0a0e27" stroke="#667eea" stroke-width="1.5">
                <animateTransform attributeName="transform" type="rotate" from="0 50 70" to="360 50 70" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="70" cy="70" r="7" fill="#0a0e27" stroke="#667eea" stroke-width="1.5">
                <animateTransform attributeName="transform" type="rotate" from="0 70 70" to="360 70 70" dur="1.8s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Power Cables -->
            <path d="M 165 70 Q 175 70 175 80" stroke="#ffa502" stroke-width="2" fill="none"/>
            <path d="M 165 95 Q 175 95 175 105" stroke="#ffa502" stroke-width="2" fill="none"/>
            <path d="M 165 120 Q 175 120 175 130" stroke="#ffa502" stroke-width="2" fill="none"/>
            
            <!-- Status Display -->
            <rect x="40" y="160" width="120" height="10" fill="#0a0e27" stroke="#667eea" stroke-width="1"/>
            <rect x="42" y="162" width="80" height="6" fill="#667eea">
                <animate attributeName="width" values="0;80;0" dur="3s" repeatCount="indefinite"/>
            </rect>
        </svg>
    `,

    // Premium Mining Rig (Plan 04)
    premium: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Premium Chassis -->
            <defs>
                <linearGradient id="premiumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ffa502;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#ff6348;stop-opacity:1" />
                </linearGradient>
            </defs>
            
            <rect x="30" y="50" width="140" height="120" fill="#1a1f3a" stroke="url(#premiumGrad)" stroke-width="3" rx="10"/>
            
            <!-- High-End GPUs -->
            <rect x="40" y="70" width="120" height="22" fill="#2a2f4a" stroke="#ffa502" stroke-width="2" rx="4"/>
            <rect x="40" y="97" width="120" height="22" fill="#2a2f4a" stroke="#ffa502" stroke-width="2" rx="4"/>
            <rect x="40" y="124" width="120" height="22" fill="#2a2f4a" stroke="#ffa502" stroke-width="2" rx="4"/>
            
            <!-- RGB Fans -->
            <circle cx="55" cy="81" r="8" fill="#0a0e27" stroke="#ffa502" stroke-width="2">
                <animate attributeName="stroke" values="#ffa502;#ff6348;#00ff88;#00d4ff;#ffa502" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="75" cy="81" r="8" fill="#0a0e27" stroke="#ff6348" stroke-width="2">
                <animate attributeName="stroke" values="#ff6348;#00ff88;#00d4ff;#ffa502;#ff6348" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="95" cy="81" r="8" fill="#0a0e27" stroke="#00ff88" stroke-width="2">
                <animate attributeName="stroke" values="#00ff88;#00d4ff;#ffa502;#ff6348;#00ff88" dur="3s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Liquid Cooling -->
            <rect x="45" y="155" width="110" height="8" fill="#00d4ff" opacity="0.5" rx="4">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
            </rect>
            
            <!-- Power Display -->
            <text x="100" y="45" text-anchor="middle" fill="#ffa502" font-size="10" font-weight="bold">1200W</text>
        </svg>
    `,

    // Gold Lock Mining Farm (Plan 05)
    gold: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Mining Farm Rack -->
            <rect x="20" y="30" width="160" height="150" fill="#1a1f3a" stroke="#ffd700" stroke-width="4" rx="10"/>
            
            <!-- Server Racks -->
            <rect x="30" y="45" width="140" height="18" fill="#2a2f4a" stroke="#ffd700" stroke-width="2" rx="3"/>
            <rect x="30" y="68" width="140" height="18" fill="#2a2f4a" stroke="#ffd700" stroke-width="2" rx="3"/>
            <rect x="30" y="91" width="140" height="18" fill="#2a2f4a" stroke="#ffd700" stroke-width="2" rx="3"/>
            <rect x="30" y="114" width="140" height="18" fill="#2a2f4a" stroke="#ffd700" stroke-width="2" rx="3"/>
            <rect x="30" y="137" width="140" height="18" fill="#2a2f4a" stroke="#ffd700" stroke-width="2" rx="3"/>
            <rect x="30" y="160" width="140" height="18" fill="#2a2f4a" stroke="#ffd700" stroke-width="2" rx="3"/>
            
            <!-- Status LEDs -->
            <circle cx="40" cy="54" r="3" fill="#00ff88">
                <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
            </circle>
            <circle cx="50" cy="54" r="3" fill="#00ff88">
                <animate attributeName="opacity" values="1;0.3;1" dur="1.1s" repeatCount="indefinite"/>
            </circle>
            <circle cx="60" cy="54" r="3" fill="#00ff88">
                <animate attributeName="opacity" values="1;0.3;1" dur="0.9s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Lock Symbol -->
            <rect x="85" y="10" width="30" height="20" fill="none" stroke="#ffd700" stroke-width="3" rx="15" ry="10"/>
            <rect x="90" y="20" width="20" height="15" fill="#ffd700" rx="2"/>
            <circle cx="100" cy="27" r="3" fill="#1a1f3a"/>
        </svg>
    `,

    // Platinum Lock Mining Farm (Plan 06)
    platinum: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="platinumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#e5e4e2;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#ffffff;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#c0c0c0;stop-opacity:1" />
                </linearGradient>
            </defs>
            
            <!-- Enterprise Rack -->
            <rect x="15" y="25" width="170" height="160" fill="#1a1f3a" stroke="url(#platinumGrad)" stroke-width="4" rx="12"/>
            
            <!-- ASIC Miners -->
            <g class="asic-row">
                <rect x="25" y="40" width="150" height="16" fill="#2a2f4a" stroke="#e5e4e2" stroke-width="2" rx="3"/>
                <rect x="25" y="60" width="150" height="16" fill="#2a2f4a" stroke="#e5e4e2" stroke-width="2" rx="3"/>
                <rect x="25" y="80" width="150" height="16" fill="#2a2f4a" stroke="#e5e4e2" stroke-width="2" rx="3"/>
                <rect x="25" y="100" width="150" height="16" fill="#2a2f4a" stroke="#e5e4e2" stroke-width="2" rx="3"/>
                <rect x="25" y="120" width="150" height="16" fill="#2a2f4a" stroke="#e5e4e2" stroke-width="2" rx="3"/>
                <rect x="25" y="140" width="150" height="16" fill="#2a2f4a" stroke="#e5e4e2" stroke-width="2" rx="3"/>
                <rect x="25" y="160" width="150" height="16" fill="#2a2f4a" stroke="#e5e4e2" stroke-width="2" rx="3"/>
            </g>
            
            <!-- Cooling System -->
            <circle cx="100" cy="48" r="5" fill="#00d4ff" opacity="0.7">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Lock Symbol -->
            <rect x="80" y="5" width="40" height="25" fill="none" stroke="url(#platinumGrad)" stroke-width="4" rx="20" ry="12"/>
            <rect x="87" y="18" width="26" height="18" fill="url(#platinumGrad)" rx="3"/>
            <circle cx="100" cy="27" r="4" fill="#1a1f3a"/>
        </svg>
    `,

    // Diamond Lock Mining Farm (Plan 07)
    diamond: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#b9f2ff;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#ffffff;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#00d4ff;stop-opacity:1" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            <!-- Premium Data Center -->
            <rect x="10" y="20" width="180" height="170" fill="#1a1f3a" stroke="url(#diamondGrad)" stroke-width="5" rx="15" filter="url(#glow)"/>
            
            <!-- High-Density ASIC Array -->
            <g class="asic-array">
                <rect x="20" y="50" width="160" height="14" fill="#2a2f4a" stroke="#b9f2ff" stroke-width="2" rx="3"/>
                <rect x="20" y="68" width="160" height="14" fill="#2a2f4a" stroke="#b9f2ff" stroke-width="2" rx="3"/>
                <rect x="20" y="86" width="160" height="14" fill="#2a2f4a" stroke="#b9f2ff" stroke-width="2" rx="3"/>
                <rect x="20" y="104" width="160" height="14" fill="#2a2f4a" stroke="#b9f2ff" stroke-width="2" rx="3"/>
                <rect x="20" y="122" width="160" height="14" fill="#2a2f4a" stroke="#b9f2ff" stroke-width="2" rx="3"/>
                <rect x="20" y="140" width="160" height="14" fill="#2a2f4a" stroke="#b9f2ff" stroke-width="2" rx="3"/>
                <rect x="20" y="158" width="160" height="14" fill="#2a2f4a" stroke="#b9f2ff" stroke-width="2" rx="3"/>
                <rect x="20" y="176" width="160" height="14" fill="#2a2f4a" stroke="#b9f2ff" stroke-width="2" rx="3"/>
            </g>
            
            <!-- Advanced Cooling -->
            <circle cx="30" cy="57" r="4" fill="#00d4ff">
                <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite"/>
            </circle>
            <circle cx="45" cy="57" r="4" fill="#00d4ff">
                <animate attributeName="opacity" values="1;0.5;1" dur="1.2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="60" cy="57" r="4" fill="#00d4ff">
                <animate attributeName="opacity" values="1;0.5;1" dur="0.8s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Diamond Lock Symbol -->
            <polygon points="100,5 110,15 100,30 90,15" fill="url(#diamondGrad)" stroke="#b9f2ff" stroke-width="3" filter="url(#glow)"/>
            <rect x="85" y="25" width="30" height="20" fill="url(#diamondGrad)" stroke="#b9f2ff" stroke-width="3" rx="3"/>
            <circle cx="100" cy="35" r="4" fill="#1a1f3a"/>
            
            <!-- Hashrate Display -->
            <text x="100" y="45" text-anchor="middle" fill="#b9f2ff" font-size="8" font-weight="bold">550 TH/s</text>
        </svg>
    `
};

// Function to inject mining machines into plan cards
function initMiningMachines() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach((card, index) => {
        const iconContainer = card.querySelector('.plan-icon');
        if (!iconContainer) return;
        
        // Determine which machine to use based on plan
        let machineType;
        const planNumber = index + 1;
        
        switch(planNumber) {
            case 1: machineType = 'starter'; break;
            case 2: machineType = 'basic'; break;
            case 3: machineType = 'standard'; break;
            case 4: machineType = 'premium'; break;
            case 5: machineType = 'gold'; break;
            case 6: machineType = 'platinum'; break;
            case 7: machineType = 'diamond'; break;
            default: machineType = 'starter';
        }
        
        // Clear existing icon and add mining machine
        iconContainer.innerHTML = `
            <div class="mining-machine mining-machine-3d ${machineType}">
                ${MiningMachines[machineType]}
                <div class="mining-status"></div>
                <div class="mining-particles">
                    ${generateParticles()}
                </div>
            </div>
        `;
    });
}

// Generate floating particles
function generateParticles() {
    let particles = '';
    for (let i = 0; i < 5; i++) {
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        particles += `<div class="particle" style="left: ${left}%; animation-delay: ${delay}s;"></div>`;
    }
    return particles;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initMiningMachines);

// Re-initialize when switching between Regular and Lock plans
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setTimeout(initMiningMachines, 100);
    });
});

console.log('Mining machines initialized ⛏️');

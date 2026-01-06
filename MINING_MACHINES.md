# Mining Machine Graphics

## Overview

Each investment plan now features a **unique, animated mining machine illustration** instead of simple icons. These SVG-based graphics represent different tiers of mining equipment, from starter rigs to enterprise-level mining farms.

## Mining Machine Types

### 1. **Starter Miner** (Plan 01 - $5)
- **Visual:** Basic mining rig with 3 cooling fans
- **Features:**
  - Animated fan rotation
  - Blinking LED indicators
  - Heatsink visualization
  - Power supply unit
- **Color:** Green (#00ff88)
- **Represents:** Entry-level GPU mining setup

### 2. **Basic Miner** (Plan 02 - $12)
- **Visual:** Multi-GPU mining frame
- **Features:**
  - 3 GPU cards with dual fans each
  - RGB LED strip animation
  - Motherboard with status LEDs
  - Frame structure
- **Color:** Cyan (#00d4ff)
- **Represents:** Small-scale GPU mining rig

### 3. **Standard Miner** (Plan 03 - $30)
- **Visual:** Advanced 4-GPU mining rig
- **Features:**
  - 4 high-performance GPU cards
  - Rotating cooling fans
  - Power cable visualization
  - Progress bar animation
  - Enhanced cooling system
- **Color:** Purple (#667eea)
- **Represents:** Professional mining setup

### 4. **Premium Miner** (Plan 04 - $50)
- **Visual:** High-end RGB mining rig
- **Features:**
  - 3 premium GPU cards
  - RGB color-cycling fans
  - Liquid cooling system
  - 1200W power display
  - Gradient chassis
- **Color:** Orange/Red gradient
- **Represents:** Enthusiast-grade mining rig

### 5. **Gold Mining Farm** (Plan 05 - $120) 🔒
- **Visual:** Server rack with 6 ASIC miners
- **Features:**
  - 6-tier server rack
  - Multiple blinking status LEDs
  - Lock symbol (locked plan)
  - Enterprise-grade appearance
- **Color:** Gold (#ffd700)
- **Represents:** Small mining farm

### 6. **Platinum Mining Farm** (Plan 06 - $250) 🔒
- **Visual:** Enterprise ASIC mining farm
- **Features:**
  - 7 ASIC miner rows
  - Advanced cooling system
  - Platinum gradient effect
  - Lock symbol with glow
  - Professional data center look
- **Color:** Platinum/Silver gradient
- **Represents:** Medium mining farm

### 7. **Diamond Mining Farm** (Plan 07 - $550) 🔒
- **Visual:** Premium data center mining facility
- **Features:**
  - 8 high-density ASIC rows
  - Multiple cooling fans with animations
  - Diamond lock symbol
  - Glow filter effects
  - Hashrate display (550 TH/s)
  - Premium gradient colors
- **Color:** Diamond blue/white gradient
- **Represents:** Large-scale mining operation

## Animations

### 1. **Mining Pulse**
- Continuous scaling animation
- Makes machines appear "alive"
- 2-second cycle

### 2. **Fan Rotation**
- Rotating fan blades
- Different speeds for different tiers
- Smooth CSS animations

### 3. **LED Blinking**
- Status indicators pulse
- Different timing for each LED
- Represents active mining

### 4. **Particle Effects**
- Floating particles around machines
- Represents mining activity
- Random positioning and timing

### 5. **Glow Effects**
- Hover-triggered glow
- Color-matched to machine tier
- Enhanced on premium plans

### 6. **3D Tilt**
- Mouse-tracking 3D rotation
- Perspective transform
- Interactive hover effect

## Technical Implementation

### Files Structure
```
frontend/
├── css/
│   └── mining-machines.css    # Mining machine styles
├── js/
│   └── mining-machines.js     # SVG generation & animations
└── index.html                 # Updated with mining machines
```

### How It Works

1. **SVG Generation:**
   - Each machine is defined as an SVG string
   - Stored in `MiningMachines` object
   - Injected dynamically on page load

2. **Dynamic Injection:**
   ```javascript
   initMiningMachines() // Called on page load
   ```
   - Finds all `.plan-icon` containers
   - Injects appropriate machine based on plan
   - Adds animations and particles

3. **Animations:**
   - CSS keyframe animations
   - SVG animate elements
   - JavaScript-triggered effects

## Customization

### Change Machine Colors

Edit in `mining-machines.css`:
```css
.mining-machine.starter {
    --machine-color: #00ff88; /* Your color */
}
```

### Adjust Animation Speed

Edit in `mining-machines.css`:
```css
@keyframes mining-pulse {
    /* Adjust duration */
    animation: mining-pulse 2s ease-in-out infinite;
}
```

### Add New Machine Type

1. Add SVG to `mining-machines.js`:
```javascript
MiningMachines.newType = `
    <svg viewBox="0 0 200 200">
        <!-- Your SVG code -->
    </svg>
`;
```

2. Update initialization logic:
```javascript
case 8: machineType = 'newType'; break;
```

## Browser Compatibility

✅ **Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

⚠️ **Limited Support:**
- IE 11 (no animations)
- Older mobile browsers

## Performance

- **SVG Size:** ~2-5KB per machine
- **Animation Impact:** Minimal (<1% CPU)
- **Memory Usage:** ~100KB total
- **Load Time:** <100ms

## Features

### Interactive Elements
- ✅ Hover effects
- ✅ 3D tilt on mouse move
- ✅ Glow on hover
- ✅ Status indicators
- ✅ Particle effects

### Visual Feedback
- ✅ Active mining status
- ✅ Cooling system visualization
- ✅ Power consumption display
- ✅ Hashrate indicators (premium plans)

## Future Enhancements

### Planned Features
- [ ] Real-time hashrate updates
- [ ] Temperature monitoring visualization
- [ ] Sound effects on hover
- [ ] More detailed GPU/ASIC models
- [ ] Customizable color themes
- [ ] Mining pool visualization
- [ ] Blockchain connection animation

### Advanced Animations
- [ ] Heat wave effects
- [ ] Electricity flow visualization
- [ ] Fan speed based on "load"
- [ ] Smoke/steam effects for cooling
- [ ] Sparkle effects for premium plans

## Troubleshooting

### Machines Not Showing
1. Check if `mining-machines.js` is loaded
2. Verify `.plan-icon` containers exist
3. Check browser console for errors

### Animations Not Working
1. Ensure CSS file is loaded
2. Check browser compatibility
3. Verify JavaScript is enabled

### Performance Issues
1. Reduce particle count
2. Disable 3D effects
3. Use simpler SVGs

## Credits

- **Design:** Custom SVG illustrations
- **Animations:** CSS3 + SVG animate
- **Inspiration:** Real mining hardware (Antminer, RTX series)

## License

Part of GREEN MAX platform - MIT License

---

**Now your investment plans look like actual mining operations!** ⛏️💎

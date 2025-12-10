document.addEventListener("DOMContentLoaded", function() {
    
    // --- Variables ---
    const sunSlider = document.getElementById("sun-slider");
    const windSlider = document.getElementById("wind-slider");
    
    const sunValDisplay = document.getElementById("sun-val");
    const windValDisplay = document.getElementById("wind-val");
    
    const solarOutputDisplay = document.getElementById("solar-output");
    const windOutputDisplay = document.getElementById("wind-output");
    const totalPowerDisplay = document.getElementById("total-power");
    
    const batteryBar = document.getElementById("battery-level");
    const batteryPercentDisplay = document.getElementById("battery-percent");
    const systemStatus = document.getElementById("system-status");
    
    const optimizeBtn = document.getElementById("optimize-btn");
    const aiMessage = document.getElementById("ai-message");

    let batteryCharge = 0; // Current battery %
    let chargingInterval;
    
    // AI Variables
    let isAiActive = false;
    let aiInterval;

    // --- Constants ---
    const MAX_SOLAR_OUTPUT = 50; // kW
    const MAX_WIND_OUTPUT = 80;  // kW

    // --- Functions ---

    // 1. Calculate Power Output
    function updateSystem() {
        const sunIntensity = parseInt(sunSlider.value);
        const windSpeed = parseInt(windSlider.value);

        sunValDisplay.textContent = sunIntensity;
        windValDisplay.textContent = windSpeed;

        const solarKw = (sunIntensity / 100) * MAX_SOLAR_OUTPUT;
        
        let windKw = 0;
        if (windSpeed > 3) { 
            windKw = (windSpeed / 30) * MAX_WIND_OUTPUT;
        }

        solarOutputDisplay.textContent = solarKw.toFixed(1);
        windOutputDisplay.textContent = windKw.toFixed(1);

        const totalKw = solarKw + windKw;
        totalPowerDisplay.textContent = totalKw.toFixed(1);

        updateStatus(totalKw);
    }

    // 2. Update Status & Battery
    function updateStatus(power) {
        if (power <= 0) {
            systemStatus.textContent = "System Standby";
            systemStatus.style.backgroundColor = "#333";
            systemStatus.style.color = "#aaa";
            stopCharging();
        } else if (power < 30) {
            systemStatus.textContent = "Low Production";
            systemStatus.style.backgroundColor = "#f0a500"; 
            systemStatus.style.color = "#000";
            startCharging(0.2); // Slow charge
        } else {
            systemStatus.textContent = "Optimal Production";
            systemStatus.style.backgroundColor = "#4cc9f0"; 
            systemStatus.style.color = "#000";
            startCharging(1.5); // Fast charge
        }
    }

    // 3. Battery Simulation
    function startCharging(rate) {
        if (!chargingInterval) {
            chargingInterval = setInterval(() => {
                if (batteryCharge < 100) {
                    batteryCharge += rate;
                    if (batteryCharge > 100) batteryCharge = 100;
                    batteryBar.style.width = batteryCharge + "%";
                    batteryPercentDisplay.textContent = Math.floor(batteryCharge);
                }
            }, 500);
        }
    }

    function stopCharging() {
        clearInterval(chargingInterval);
        chargingInterval = null;
    }

    // 4. AI Optimization Logic (Improved)
    optimizeBtn.addEventListener("click", function() {
        if (!isAiActive) {
            // Start AI Mode
            isAiActive = true;
            optimizeBtn.textContent = "Stop AI Optimization";
            optimizeBtn.style.backgroundColor = "#4cc9f0"; // Blue for active
            aiMessage.textContent = "AI Active: Automatically balancing load...";
            
            // Disable manual sliders while AI is running
            sunSlider.disabled = true;
            windSlider.disabled = true;

            // Start continuous optimization loop
            aiInterval = setInterval(() => {
                simulateAiAdjustment();
            }, 2000); // Adjust every 2 seconds

        } else {
            // Stop AI Mode
            isAiActive = false;
            optimizeBtn.textContent = "Activate AI Optimization";
            optimizeBtn.style.backgroundColor = "#e94560"; // Red for inactive
            aiMessage.textContent = "AI Deactivated. Manual control restored.";
            
            // Re-enable manual sliders
            sunSlider.disabled = false;
            windSlider.disabled = false;
            
            clearInterval(aiInterval);
        }
    });

    function simulateAiAdjustment() {
        // Simulate AI "finding" the best settings based on fluctuating weather
        // It randomly adjusts the sliders to simulate changing conditions
        // and the "AI" reacting to keep power high.
        
        const targetSun = Math.floor(Math.random() * 40) + 60; // Keep sun high (60-100)
        const targetWind = Math.floor(Math.random() * 15) + 10; // Keep wind optimal (10-25)

        // Smoothly update UI values
        sunSlider.value = targetSun;
        windSlider.value = targetWind;
        
        updateSystem();
        
        // Flash a message
        aiMessage.textContent = `AI Adjusted: Sun ${targetSun}%, Wind ${targetWind} m/s`;
    }

    // --- Event Listeners ---
    sunSlider.addEventListener("input", updateSystem);
    windSlider.addEventListener("input", updateSystem);

    // Initial call
    updateSystem();
});
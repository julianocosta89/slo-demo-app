// SLO Interactive Guide - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavigation();
    initConceptCards();
    initSLOCalculator();
    initCaseStudyTabs();
    initErrorBudgetSimulator();
    initSLOComparison();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Concept cards interactive functionality
function initConceptCards() {
    const conceptCards = document.querySelectorAll('.concept-card');
    
    conceptCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            conceptCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Animate the details section
            const details = this.querySelector('.concept-details');
            if (details) {
                details.style.maxHeight = details.scrollHeight + 'px';
            }
        });
    });
}

// SLO Calculator functionality
function initSLOCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    const sloTargetInput = document.getElementById('slo-target');
    const timePeriodSelect = document.getElementById('time-period');
    
    // Calculate on button click
    calculateBtn.addEventListener('click', calculateSLO);
    
    // Calculate on input change
    sloTargetInput.addEventListener('input', calculateSLO);
    timePeriodSelect.addEventListener('change', calculateSLO);
    
    // Initial calculation
    calculateSLO();
}

function calculateSLO() {
    const sloTarget = parseFloat(document.getElementById('slo-target').value);
    const timePeriod = parseInt(document.getElementById('time-period').value);
    
    if (isNaN(sloTarget) || sloTarget < 90 || sloTarget > 99.999) {
        return;
    }
    
    // Calculate error budget percentage
    const errorBudgetPercent = 100 - sloTarget;
    
    // Calculate allowed downtime in minutes
    const totalMinutes = timePeriod * 24 * 60;
    const allowedDowntimeMinutes = (errorBudgetPercent / 100) * totalMinutes;
    
    // Calculate required uptime hours
    const requiredUptimeHours = (sloTarget / 100) * (timePeriod * 24);
    
    // Update result cards
    document.getElementById('error-budget-percent').textContent = errorBudgetPercent.toFixed(1) + '%';
    document.getElementById('allowed-downtime').textContent = formatTime(allowedDowntimeMinutes);
    document.getElementById('uptime-hours').textContent = requiredUptimeHours.toFixed(1) + ' hrs';
    
    // Update error budget visualization
    updateErrorBudgetVisualization(0); // Start with 0% used
    
    // Update SLO comparison
    updateSLOComparison();
}

function formatTime(minutes) {
    if (minutes < 1) {
        return Math.round(minutes * 60) + ' sec';
    } else if (minutes < 60) {
        return Math.round(minutes) + ' min';
    } else if (minutes < 1440) {
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return hours + 'h ' + mins + 'm';
    } else {
        const days = Math.floor(minutes / 1440);
        const hours = Math.floor((minutes % 1440) / 60);
        return days + 'd ' + hours + 'h';
    }
}

function updateErrorBudgetVisualization(usedPercent) {
    const remainingPercent = Math.max(0, 100 - usedPercent);
    
    document.getElementById('budget-used').style.width = usedPercent + '%';
    document.getElementById('budget-remaining').style.width = remainingPercent + '%';
    document.getElementById('used-percent').textContent = usedPercent.toFixed(1) + '%';
    document.getElementById('remaining-percent').textContent = remainingPercent.toFixed(1) + '%';
}

function updateSLOComparison() {
    const comparisonGrid = document.getElementById('slo-comparison-grid');
    const timePeriod = parseInt(document.getElementById('time-period').value);
    
    const sloTargets = [
        { target: 99, name: 'Two Nines' },
        { target: 99.9, name: 'Three Nines' },
        { target: 99.99, name: 'Four Nines' },
        { target: 99.999, name: 'Five Nines' }
    ];
    
    comparisonGrid.innerHTML = '';
    
    sloTargets.forEach(slo => {
        const errorBudget = 100 - slo.target;
        const totalMinutes = timePeriod * 24 * 60;
        const allowedDowntime = (errorBudget / 100) * totalMinutes;
        
        const item = document.createElement('div');
        item.className = 'comparison-item';
        item.innerHTML = `
            <div class="slo-target">${slo.target}%</div>
            <div class="downtime">${formatTime(allowedDowntime)}</div>
            <div class="description">${slo.name}</div>
        `;
        
        comparisonGrid.appendChild(item);
    });
}

// Case study tabs functionality
function initCaseStudyTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Error budget simulator functionality
function initErrorBudgetSimulator() {
    const simulateBtn = document.getElementById('simulate-incident');
    const resetBtn = document.getElementById('reset-simulation');
    const incidentDuration = document.getElementById('incident-duration');
    const incidentFrequency = document.getElementById('incident-frequency');
    const freezeThreshold = document.getElementById('freeze-threshold');
    const criticalThreshold = document.getElementById('critical-threshold');
    
    let simulationData = {
        currentDay: 1,
        totalDays: 30,
        incidents: [],
        budgetUsed: 0,
        totalBudget: 0.1 // 0.1% for 99.9% SLO
    };
    
    simulateBtn.addEventListener('click', function() {
        runSimulation();
    });
    
    resetBtn.addEventListener('click', function() {
        resetSimulation();
    });
    
    function runSimulation() {
        const duration = parseInt(incidentDuration.value);
        const frequency = parseInt(incidentFrequency.value);
        
        // Calculate incident impact
        const incidentImpact = (duration / (30 * 24 * 60)) * 100; // Convert to percentage of month
        const totalImpact = incidentImpact * frequency;
        
        simulationData.budgetUsed = Math.min(100, simulationData.budgetUsed + totalImpact);
        
        // Add incidents to timeline
        for (let i = 0; i < frequency; i++) {
            const day = Math.floor(Math.random() * 30) + 1;
            simulationData.incidents.push({
                day: day,
                duration: duration,
                impact: incidentImpact
            });
        }
        
        updateSimulationDisplay();
    }
    
    function resetSimulation() {
        simulationData = {
            currentDay: 1,
            totalDays: 30,
            incidents: [],
            budgetUsed: 0,
            totalBudget: 0.1
        };
        updateSimulationDisplay();
    }
    
    function updateSimulationDisplay() {
        // Update timeline
        const timelineProgress = document.getElementById('timeline-progress');
        const timelineIncidents = document.getElementById('timeline-incidents');
        const currentDay = document.getElementById('current-day');
        
        const progressPercent = (simulationData.currentDay / simulationData.totalDays) * 100;
        timelineProgress.style.width = progressPercent + '%';
        currentDay.textContent = `Day ${simulationData.currentDay}`;
        
        // Clear existing incident markers
        timelineIncidents.innerHTML = '';
        
        // Add incident markers
        simulationData.incidents.forEach(incident => {
            const marker = document.createElement('div');
            marker.className = 'incident-marker';
            marker.style.left = (incident.day / simulationData.totalDays) * 100 + '%';
            timelineIncidents.appendChild(marker);
        });
        
        // Update budget status
        updateBudgetStatus();
        
        // Update error budget visualization
        updateErrorBudgetVisualization(simulationData.budgetUsed);
    }
    
    function updateBudgetStatus() {
        const statusCard = document.getElementById('budget-status-card');
        const statusIcon = statusCard.querySelector('.status-icon i');
        const statusTitle = statusCard.querySelector('.status-title');
        const statusSubtitle = statusCard.querySelector('.status-subtitle');
        const policyActions = document.getElementById('policy-actions');
        
        const freezeThresholdValue = parseInt(document.getElementById('freeze-threshold').value);
        const criticalThresholdValue = parseInt(document.getElementById('critical-threshold').value);
        
        if (simulationData.budgetUsed >= criticalThresholdValue) {
            // Critical status
            statusCard.className = 'status-card critical';
            statusIcon.className = 'fas fa-times-circle';
            statusTitle.textContent = 'Budget Critical';
            statusSubtitle.textContent = 'Immediate action required';
            
            policyActions.innerHTML = `
                <h4>Recommended Actions</h4>
                <div class="action-list">
                    <div class="action-item">
                        <i class="fas fa-times-circle text-danger"></i>
                        <span>Stop all feature development</span>
                    </div>
                    <div class="action-item">
                        <i class="fas fa-tools text-danger"></i>
                        <span>Focus on stability fixes only</span>
                    </div>
                    <div class="action-item">
                        <i class="fas fa-users text-danger"></i>
                        <span>Mobilize incident response team</span>
                    </div>
                </div>
            `;
        } else if (simulationData.budgetUsed >= freezeThresholdValue) {
            // Warning status
            statusCard.className = 'status-card warning';
            statusIcon.className = 'fas fa-exclamation-triangle';
            statusTitle.textContent = 'Budget Warning';
            statusSubtitle.textContent = 'Consider reducing feature velocity';
            
            policyActions.innerHTML = `
                <h4>Recommended Actions</h4>
                <div class="action-list">
                    <div class="action-item">
                        <i class="fas fa-exclamation-triangle text-warning"></i>
                        <span>Reduce feature development pace</span>
                    </div>
                    <div class="action-item">
                        <i class="fas fa-chart-line text-warning"></i>
                        <span>Monitor error budget closely</span>
                    </div>
                    <div class="action-item">
                        <i class="fas fa-shield-alt text-warning"></i>
                        <span>Prioritize stability improvements</span>
                    </div>
                </div>
            `;
        } else {
            // Healthy status
            statusCard.className = 'status-card healthy';
            statusIcon.className = 'fas fa-check-circle';
            statusTitle.textContent = 'Budget Healthy';
            statusSubtitle.textContent = 'Continue normal operations';
            
            policyActions.innerHTML = `
                <h4>Recommended Actions</h4>
                <div class="action-list">
                    <div class="action-item">
                        <i class="fas fa-check text-success"></i>
                        <span>Continue feature development</span>
                    </div>
                    <div class="action-item">
                        <i class="fas fa-eye text-success"></i>
                        <span>Monitor error budget trends</span>
                    </div>
                </div>
            `;
        }
    }
    
    // Initialize display
    updateSimulationDisplay();
}

// Initialize SLO comparison on page load
function initSLOComparison() {
    updateSLOComparison();
}

// Utility function for smooth scrolling
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add some interactive animations
function addInteractiveAnimations() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.concept-card, .journey-card, .comparison-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', addInteractiveAnimations);

// Add scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Add keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Tab navigation for case study tabs
        if (e.key === 'Tab' && e.target.classList.contains('tab-btn')) {
            e.preventDefault();
            const currentTab = document.querySelector('.tab-btn.active');
            const tabs = Array.from(document.querySelectorAll('.tab-btn'));
            const currentIndex = tabs.indexOf(currentTab);
            
            if (e.shiftKey) {
                // Shift + Tab: go to previous tab
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                tabs[prevIndex].click();
            } else {
                // Tab: go to next tab
                const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                tabs[nextIndex].click();
            }
        }
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', initKeyboardNavigation);

// Add tooltip functionality
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #2d3748;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 0.9rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            this.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                setTimeout(() => document.body.removeChild(tooltip), 300);
            });
        });
    });
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', initTooltips);

// Add data export functionality
function initDataExport() {
    // Add export button for calculator results
    const calculatorResults = document.querySelector('.calculator-results');
    if (calculatorResults) {
        const exportBtn = document.createElement('button');
        exportBtn.className = 'btn-outline';
        exportBtn.innerHTML = '<i class="fas fa-download"></i> Export Results';
        exportBtn.style.marginTop = '20px';
        
        exportBtn.addEventListener('click', function() {
            const sloTarget = document.getElementById('slo-target').value;
            const timePeriod = document.getElementById('time-period').value;
            const errorBudget = document.getElementById('error-budget-percent').textContent;
            const allowedDowntime = document.getElementById('allowed-downtime').textContent;
            const requiredUptime = document.getElementById('uptime-hours').textContent;
            
            const data = {
                sloTarget: sloTarget + '%',
                timePeriod: timePeriod + ' days',
                errorBudget: errorBudget,
                allowedDowntime: allowedDowntime,
                requiredUptime: requiredUptime,
                timestamp: new Date().toISOString()
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'slo-calculator-results.json';
            a.click();
            URL.revokeObjectURL(url);
        });
        
        calculatorResults.appendChild(exportBtn);
    }
}

// Initialize data export
document.addEventListener('DOMContentLoaded', initDataExport);

// Add accessibility improvements
function initAccessibility() {
    // Add ARIA labels to interactive elements
    const interactiveElements = document.querySelectorAll('button, input, select');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
            const label = element.textContent || element.placeholder || element.title;
            if (label) {
                element.setAttribute('aria-label', label);
            }
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, input, select, a');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

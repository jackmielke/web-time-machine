class WebTimeCollector {
    constructor() {
        this.timeline = null;
        this.items = new vis.DataSet([]);
        this.logCount = 0;
        this.screenshotCount = 0;
        this.initializeTimeline();
        this.setupDemoData();
        this.updateStatusIndicators();
    }

    initializeTimeline() {
        const container = document.getElementById('timeline');
        const options = {
            height: '100%',
            min: new Date(Date.now() - 24 * 60 * 60 * 1000),
            max: new Date(),
            zoomMin: 1000 * 60,
            zoomMax: 1000 * 60 * 60 * 24
        };

        this.timeline = new vis.Timeline(container, this.items, options);
    }

    updateStatusIndicators() {
        // Simulate server connection
        const serverStatus = document.getElementById('serverStatus');
        serverStatus.className = 'w-3 h-3 rounded-full bg-green-500 mr-2';
        
        // Simulate events tracking
        const eventsStatus = document.getElementById('eventsStatus');
        eventsStatus.className = 'w-3 h-3 rounded-full bg-green-500 mr-2';
        
        // Simulate screenshot capability
        const screenshotStatus = document.getElementById('screenshotStatus');
        screenshotStatus.className = 'w-3 h-3 rounded-full bg-green-500 mr-2';
    }

    setupDemoData() {
        // Add initial events
        this.addLog('✨ Application initialized');
        this.addLog('📡 Local server connected');
        this.simulateNetworkRequest();
        
        // Setup periodic events
        setInterval(() => {
            const events = [
                '🔍 User interaction tracked',
                '💾 Cache updated',
                '📊 Analytics event recorded',
                '🔐 Security check completed'
            ];
            
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            this.addLog(randomEvent);
        }, 5000);
    }

    addLog(message) {
        // Update console logs
        const consoleLogsDiv = document.getElementById('console-logs');
        const logEntry = document.createElement('div');
        logEntry.className = 'py-1 border-b border-gray-200';
        logEntry.textContent = message;
        consoleLogsDiv.appendChild(logEntry);
        consoleLogsDiv.scrollTop = consoleLogsDiv.scrollHeight;

        // Update timeline
        this.addTimelineItem({
            content: `🟦 ${message}`,
            type: 'log'
        });

        // Update counter
        this.logCount++;
        document.getElementById('logCount').textContent = `${this.logCount} logs`;
    }

    triggerSampleError() {
        const error = '❌ Simulated error occurred: Connection timeout';
        this.addTimelineItem({
            content: error,
            type: 'error'
        });
        this.addLog(error);
    }

    simulateNetworkRequest() {
        const startTime = new Date();
        const requestId = Math.random().toString(36).substring(7);
        
        this.addTimelineItem({
            content: `🌐 Starting API request (${requestId})`,
            type: 'network'
        });
        
        setTimeout(() => {
            const duration = new Date() - startTime;
            this.addTimelineItem({
                content: `✅ API request completed in ${duration}ms (${requestId})`,
                type: 'network'
            });
            this.addLog(`API request ${requestId} completed successfully`);
        }, 1500);
    }

    takeScreenshot() {
        const timestamp = new Date().toLocaleTimeString();
        
        // Add screenshot to the timeline
        this.addTimelineItem({
            content: `📸 Screenshot captured at ${timestamp}`,
            type: 'screenshot'
        });

        // Create a sample screenshot
        const screenshotsDiv = document.getElementById('screenshots');
        const img = document.createElement('img');
        img.src = `https://picsum.photos/300/200?random=${Date.now()}`;
        img.className = 'w-full mb-4 rounded shadow';
        screenshotsDiv.appendChild(img);

        // Update counter
        this.screenshotCount++;
        document.getElementById('screenshotCount').textContent = `${this.screenshotCount} screenshots`;
    }

    addTimelineItem(data) {
        const item = {
            id: Date.now() + Math.random(),
            content: data.content,
            start: new Date(),
            type: data.type,
            className: `timeline-item-${data.type}`
        };
        this.items.add(item);
    }
}

// Add some styling
const style = document.createElement('style');
style.textContent = `
    .timeline-item-error { color: #ef4444; font-weight: bold; }
    .timeline-item-network { color: #3b82f6; }
    .timeline-item-screenshot { color: #10b981; }
    .timeline-item-log { color: #6b7280; }
`;
document.head.appendChild(style);

// Initialize the collector
const collector = new WebTimeCollector();
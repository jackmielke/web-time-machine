class WebTimeCollector {
    constructor() {
        this.timeline = null;
        this.items = new vis.DataSet([]);
        this.initializeTimeline();
        this.setupDemoData(); // Added demo data
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

    setupDemoData() {
        // Add some sample console logs
        this.addTimelineItem({
            content: '🟦 Console: User clicked login button',
            type: 'log'
        });

        // Add sample network request
        this.addTimelineItem({
            content: '🌐 Network: GET /api/user/profile - 200 OK',
            type: 'network'
        });

        // Add sample error
        setTimeout(() => {
            this.addTimelineItem({
                content: '❌ Error: Failed to load user preferences',
                type: 'error'
            });
        }, 2000);

        // Add sample screenshot event
        setTimeout(() => {
            this.addTimelineItem({
                content: '📸 Screenshot: Homepage loaded',
                type: 'screenshot'
            });
            
            // Add a sample screenshot
            const screenshotsDiv = document.getElementById('screenshots');
            const img = document.createElement('img');
            img.src = 'https://via.placeholder.com/300x200?text=Sample+Screenshot';
            img.className = 'w-full mb-4 rounded shadow';
            screenshotsDiv.appendChild(img);
        }, 3000);

        // Add sample console logs
        const consoleLogsDiv = document.getElementById('console-logs');
        const logs = [
            '✨ App initialized',
            '📡 WebSocket connected',
            '⚠️ Cache miss for user preferences',
            '🔄 Retrying API call...',
            '✅ Data synchronized'
        ];

        logs.forEach((log, index) => {
            setTimeout(() => {
                const logEntry = document.createElement('div');
                logEntry.className = 'py-1 border-b border-gray-200';
                logEntry.textContent = log;
                consoleLogsDiv.appendChild(logEntry);

                this.addTimelineItem({
                    content: `🟦 Console: ${log}`,
                    type: 'log'
                });
            }, index * 1500);
        });

        // Simulate real-time updates
        setInterval(() => {
            const events = [
                '🔍 User search performed',
                '💾 Data saved to cache',
                '📊 Analytics event tracked',
                '🔐 Security check passed'
            ];
            
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            this.addTimelineItem({
                content: `🟦 Console: ${randomEvent}`,
                type: 'log'
            });

            const logEntry = document.createElement('div');
            logEntry.className = 'py-1 border-b border-gray-200';
            logEntry.textContent = randomEvent;
            consoleLogsDiv.appendChild(logEntry);
        }, 5000);
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
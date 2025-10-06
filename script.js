// Public holidays data for Brazil and Colombia 2025 & 2026
const holidaysData = [
    // Brazil Holidays 2025
    { country: 'brazil', name: 'New Year\'s Day', date: '2025-01-01', month: 1, day: 1, year: 2025 },
    { country: 'brazil', name: 'Carnival', date: '2025-03-03', month: 3, day: 3, year: 2025 },
    { country: 'brazil', name: 'Carnival', date: '2025-03-04', month: 3, day: 4, year: 2025 },
    { country: 'brazil', name: 'Good Friday', date: '2025-04-18', month: 4, day: 18, year: 2025 },
    { country: 'brazil', name: 'Tiradentes Day', date: '2025-04-21', month: 4, day: 21, year: 2025 },
    { country: 'brazil', name: 'Labour Day', date: '2025-05-01', month: 5, day: 1, year: 2025 },
    { country: 'brazil', name: 'Corpus Christi', date: '2025-06-19', month: 6, day: 19, year: 2025 },
    { country: 'brazil', name: 'Independence Day', date: '2025-09-07', month: 9, day: 7, year: 2025 },
    { country: 'brazil', name: 'Lady of Aparecida', date: '2025-10-12', month: 10, day: 12, year: 2025 },
    { country: 'brazil', name: 'All Souls\' Day', date: '2025-11-02', month: 11, day: 2, year: 2025 },
    { country: 'brazil', name: 'Republic Day', date: '2025-11-15', month: 11, day: 15, year: 2025 },
    { country: 'brazil', name: 'Black Awareness Day', date: '2025-11-20', month: 11, day: 20, year: 2025 },
    { country: 'brazil', name: 'Christmas Day', date: '2025-12-25', month: 12, day: 25, year: 2025 },
    
    // Colombia Holidays 2025
    { country: 'colombia', name: 'New Year\'s Day', date: '2025-01-01', month: 1, day: 1, year: 2025 },
    { country: 'colombia', name: 'Epiphany Holiday', date: '2025-01-06', month: 1, day: 6, year: 2025 },
    { country: 'colombia', name: 'St Joseph\'s Day', date: '2025-03-24', month: 3, day: 24, year: 2025 },
    { country: 'colombia', name: 'Maundy Thursday', date: '2025-04-17', month: 4, day: 17, year: 2025 },
    { country: 'colombia', name: 'Good Friday', date: '2025-04-18', month: 4, day: 18, year: 2025 },
    { country: 'colombia', name: 'Labour Day', date: '2025-05-01', month: 5, day: 1, year: 2025 },
    { country: 'colombia', name: 'Ascension Day Holiday', date: '2025-06-02', month: 6, day: 2, year: 2025 },
    { country: 'colombia', name: 'Corpus Christi Holiday', date: '2025-06-23', month: 6, day: 23, year: 2025 },
    { country: 'colombia', name: 'Feast of St Peter and St Paul', date: '2025-06-30', month: 6, day: 30, year: 2025 },
    { country: 'colombia', name: 'Independence Day', date: '2025-07-20', month: 7, day: 20, year: 2025 },
    { country: 'colombia', name: 'Battle of Boyacá', date: '2025-08-07', month: 8, day: 7, year: 2025 },
    { country: 'colombia', name: 'Assumption of Mary Holiday', date: '2025-08-18', month: 8, day: 18, year: 2025 },
    { country: 'colombia', name: 'Columbus Day Holiday', date: '2025-10-13', month: 10, day: 13, year: 2025 },
    { country: 'colombia', name: 'All Saints\' Day Holiday', date: '2025-11-03', month: 11, day: 3, year: 2025 },
    { country: 'colombia', name: 'Independence of Cartagena', date: '2025-11-17', month: 11, day: 17, year: 2025 },
    { country: 'colombia', name: 'Immaculate Conception', date: '2025-12-08', month: 12, day: 8, year: 2025 },
    { country: 'colombia', name: 'Christmas Day', date: '2025-12-25', month: 12, day: 25, year: 2025 },

    // Brazil Holidays 2026
    { country: 'brazil', name: 'New Year\'s Day', date: '2026-01-01', month: 1, day: 1, year: 2026 },
    { country: 'brazil', name: 'Carnival', date: '2026-02-16', month: 2, day: 16, year: 2026 },
    { country: 'brazil', name: 'Carnival', date: '2026-02-17', month: 2, day: 17, year: 2026 },
    { country: 'brazil', name: 'Good Friday', date: '2026-04-03', month: 4, day: 3, year: 2026 },
    { country: 'brazil', name: 'Tiradentes Day', date: '2026-04-21', month: 4, day: 21, year: 2026 },
    { country: 'brazil', name: 'Labour Day', date: '2026-05-01', month: 5, day: 1, year: 2026 },
    { country: 'brazil', name: 'Corpus Christi', date: '2026-06-04', month: 6, day: 4, year: 2026 },
    { country: 'brazil', name: 'Independence Day', date: '2026-09-07', month: 9, day: 7, year: 2026 },
    { country: 'brazil', name: 'Lady of Aparecida', date: '2026-10-12', month: 10, day: 12, year: 2026 },
    { country: 'brazil', name: 'All Souls\' Day', date: '2026-11-02', month: 11, day: 2, year: 2026 },
    { country: 'brazil', name: 'Republic Day', date: '2026-11-15', month: 11, day: 15, year: 2026 },
    { country: 'brazil', name: 'Black Awareness Day', date: '2026-11-20', month: 11, day: 20, year: 2026 },
    { country: 'brazil', name: 'Christmas Day', date: '2026-12-25', month: 12, day: 25, year: 2026 },
    
    // Colombia Holidays 2026
    { country: 'colombia', name: 'New Year\'s Day', date: '2026-01-01', month: 1, day: 1, year: 2026 },
    { country: 'colombia', name: 'Epiphany Holiday', date: '2026-01-06', month: 1, day: 6, year: 2026 },
    { country: 'colombia', name: 'St Joseph\'s Day', date: '2026-03-23', month: 3, day: 23, year: 2026 },
    { country: 'colombia', name: 'Maundy Thursday', date: '2026-04-02', month: 4, day: 2, year: 2026 },
    { country: 'colombia', name: 'Good Friday', date: '2026-04-03', month: 4, day: 3, year: 2026 },
    { country: 'colombia', name: 'Labour Day', date: '2026-05-01', month: 5, day: 1, year: 2026 },
    { country: 'colombia', name: 'Ascension Day Holiday', date: '2026-05-18', month: 5, day: 18, year: 2026 },
    { country: 'colombia', name: 'Corpus Christi Holiday', date: '2026-06-08', month: 6, day: 8, year: 2026 },
    { country: 'colombia', name: 'Feast of St Peter and St Paul', date: '2026-06-29', month: 6, day: 29, year: 2026 },
    { country: 'colombia', name: 'Independence Day', date: '2026-07-20', month: 7, day: 20, year: 2026 },
    { country: 'colombia', name: 'Battle of Boyacá', date: '2026-08-07', month: 8, day: 7, year: 2026 },
    { country: 'colombia', name: 'Assumption of Mary Holiday', date: '2026-08-17', month: 8, day: 17, year: 2026 },
    { country: 'colombia', name: 'Columbus Day Holiday', date: '2026-10-12', month: 10, day: 12, year: 2026 },
    { country: 'colombia', name: 'All Saints\' Day Holiday', date: '2026-11-02', month: 11, day: 2, year: 2026 },
    { country: 'colombia', name: 'Independence of Cartagena', date: '2026-11-16', month: 11, day: 16, year: 2026 },
    { country: 'colombia', name: 'Immaculate Conception', date: '2026-12-08', month: 12, day: 8, year: 2026 },
    { country: 'colombia', name: 'Christmas Day', date: '2026-12-25', month: 12, day: 25, year: 2026 }
];

// Calendar state
let currentCalendarMonth = 1; // January
let currentCalendarYear = 2025;

// Add week numbers to holidays data
function addWeekNumbers() {
    holidaysData.forEach(holiday => {
        const date = new Date(holiday.date);
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
        const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
        holiday.week = weekNumber;
    });
}

// Get week number for a specific date
function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

// Get weeks in a month
function getWeeksInMonth(month) {
    const year = parseInt(document.getElementById('year-select').value);
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    
    const weeks = new Set();
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month - 1, day);
        weeks.add(getWeekNumber(date));
    }
    
    return Array.from(weeks).sort((a, b) => a - b);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Get selected countries from checkboxes
function getSelectedCountries() {
    const brazilChecked = document.getElementById('brazil-checkbox').checked;
    const colombiaChecked = document.getElementById('colombia-checkbox').checked;
    
    const selectedCountries = [];
    if (brazilChecked) selectedCountries.push('brazil');
    if (colombiaChecked) selectedCountries.push('colombia');
    
    return selectedCountries;
}

// Filter holidays based on current filters
function filterHolidays() {
    const selectedCountries = getSelectedCountries();
    const monthFilter = document.getElementById('month-select').value;
    const weekFilter = document.getElementById('week-select').value;
    const yearFilter = document.getElementById('year-select').value;
    
    let filtered = holidaysData.filter(holiday => {
        // Check if country is selected
        if (selectedCountries.length > 0 && !selectedCountries.includes(holiday.country)) {
            return false;
        }
        
        // Check year filter
        if (holiday.year !== parseInt(yearFilter)) {
            return false;
        }
        
        // Check month filter
        if (monthFilter !== 'all' && holiday.month !== parseInt(monthFilter)) {
            return false;
        }
        
        // Check week filter
        if (weekFilter !== 'all' && holiday.week !== parseInt(weekFilter)) {
            return false;
        }
        
        return true;
    });
    
    return filtered;
}

// Update week filter options based on selected month
function updateWeekFilter() {
    const monthSelect = document.getElementById('month-select');
    const weekSelect = document.getElementById('week-select');
    
    // Clear existing options except "All Weeks"
    weekSelect.innerHTML = '<option value="all">All Weeks</option>';
    
    if (monthSelect.value !== 'all') {
        const month = parseInt(monthSelect.value);
        const weeks = getWeeksInMonth(month);
        
        weeks.forEach(week => {
            const option = document.createElement('option');
            option.value = week;
            option.textContent = `Week ${week}`;
            weekSelect.appendChild(option);
        });
    }
}

// Display holidays in list view
function displayHolidays() {
    const holidaysList = document.getElementById('holidays-list');
    const filteredHolidays = filterHolidays();
    
    // Update stats
    document.getElementById('total-holidays').textContent = holidaysData.length;
    document.getElementById('filtered-holidays').textContent = filteredHolidays.length;
    
    if (filteredHolidays.length === 0) {
        holidaysList.innerHTML = `
            <div class="no-results">
                <h3>No holidays found</h3>
                <p>Try adjusting your filters to see more results.</p>
            </div>
        `;
        return;
    }
    
    // Sort holidays by date
    filteredHolidays.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    holidaysList.innerHTML = filteredHolidays.map(holiday => `
        <div class="holiday-item">
            <div class="holiday-info">
                <div class="holiday-name">${holiday.name}</div>
                <div class="holiday-country ${holiday.country}">${holiday.country.charAt(0).toUpperCase() + holiday.country.slice(1)}</div>
                <div class="holiday-date">${formatDate(holiday.date)}</div>
            </div>
            <div class="holiday-week">Week ${holiday.week}</div>
        </div>
    `).join('');
}

// Calendar functions
function getHolidaysForDate(year, month, day) {
    const selectedCountries = getSelectedCountries();
    const monthFilter = document.getElementById('month-select').value;
    const weekFilter = document.getElementById('week-select').value;
    const yearFilter = document.getElementById('year-select').value;
    
    return holidaysData.filter(holiday => {
        const holidayDate = new Date(holiday.date);
        const isSameDate = holidayDate.getFullYear() === year && 
                          holidayDate.getMonth() === month - 1 && 
                          holidayDate.getDate() === day;
        
        if (!isSameDate) return false;
        
        // Check if country is selected
        if (selectedCountries.length > 0 && !selectedCountries.includes(holiday.country)) {
            return false;
        }
        
        // Check year filter
        if (holiday.year !== parseInt(yearFilter)) {
            return false;
        }
        
        // Check month filter
        if (monthFilter !== 'all' && holiday.month !== parseInt(monthFilter)) {
            return false;
        }
        
        // Check week filter
        if (weekFilter !== 'all' && holiday.week !== parseInt(weekFilter)) {
            return false;
        }
        
        return true;
    });
}

function generateCalendar() {
    const calendarDays = document.getElementById('calendar-days');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Update calendar header
    document.getElementById('calendar-month-year').innerHTML = 
        `${monthNames[currentCalendarMonth - 1]} <span id="calendar-year">${currentCalendarYear}</span>`;
    
    // Get first day of month and number of days
    const firstDay = new Date(currentCalendarYear, currentCalendarMonth - 1, 1);
    const lastDay = new Date(currentCalendarYear, currentCalendarMonth, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Clear calendar
    calendarDays.innerHTML = '';
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarDays.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Check if it's today
        const today = new Date();
        if (currentCalendarYear === today.getFullYear() && 
            currentCalendarMonth === today.getMonth() + 1 && 
            day === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        // Add day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Get holidays for this date
        const holidays = getHolidaysForDate(currentCalendarYear, currentCalendarMonth, day);
        
        if (holidays.length > 0) {
            const countries = [...new Set(holidays.map(h => h.country))];
            const indicator = document.createElement('div');
            indicator.className = 'holiday-indicator';
            
            if (countries.length === 2) {
                indicator.classList.add('both');
            } else if (countries[0] === 'colombia') {
                indicator.classList.add('colombia');
            }
            
            dayElement.appendChild(indicator);
            
            // Add tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'holiday-tooltip';
            tooltip.innerHTML = holidays.map(holiday => 
                `<div><strong>${holiday.name}</strong> (${holiday.country})</div>`
            ).join('');
            dayElement.appendChild(tooltip);
            
            // Add hover events for tooltip
            dayElement.addEventListener('mouseenter', () => {
                tooltip.classList.add('show');
            });
            
            dayElement.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        }
        
        calendarDays.appendChild(dayElement);
    }
}

function switchToCalendarView() {
    document.getElementById('list-view').style.display = 'none';
    document.getElementById('calendar-view').style.display = 'block';
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('calendar-view-btn').classList.add('active');
    generateCalendar();
}

function switchToListView() {
    document.getElementById('calendar-view').style.display = 'none';
    document.getElementById('list-view').style.display = 'block';
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('list-view-btn').classList.add('active');
}

function navigateCalendar(direction) {
    if (direction === 'prev') {
        currentCalendarMonth--;
        if (currentCalendarMonth < 1) {
            currentCalendarMonth = 12;
            currentCalendarYear--;
        }
    } else {
        currentCalendarMonth++;
        if (currentCalendarMonth > 12) {
            currentCalendarMonth = 1;
            currentCalendarYear++;
        }
    }
    generateCalendar();
}

// Update year display in title and calendar
function updateYearDisplay() {
    const selectedYear = document.getElementById('year-select').value;
    document.getElementById('current-year').textContent = selectedYear;
    document.getElementById('calendar-year').textContent = selectedYear;
    currentCalendarYear = parseInt(selectedYear);
}

// Clear all filters
function clearFilters() {
    document.getElementById('brazil-checkbox').checked = true;
    document.getElementById('colombia-checkbox').checked = true;
    document.getElementById('year-select').value = '2025';
    document.getElementById('month-select').value = 'all';
    document.getElementById('week-select').value = 'all';
    currentCalendarMonth = 1;
    currentCalendarYear = 2025;
    updateYearDisplay();
    updateWeekFilter();
    displayHolidays();
    if (document.getElementById('calendar-view').style.display !== 'none') {
        generateCalendar();
    }
}

// Initialize the application
function init() {
    addWeekNumbers();
    
    // Add event listeners
    document.getElementById('brazil-checkbox').addEventListener('change', function() {
        displayHolidays();
        if (document.getElementById('calendar-view').style.display !== 'none') {
            generateCalendar();
        }
    });
    
    document.getElementById('colombia-checkbox').addEventListener('change', function() {
        displayHolidays();
        if (document.getElementById('calendar-view').style.display !== 'none') {
            generateCalendar();
        }
    });
    
    document.getElementById('year-select').addEventListener('change', function() {
        updateYearDisplay();
        updateWeekFilter();
        displayHolidays();
        if (document.getElementById('calendar-view').style.display !== 'none') {
            generateCalendar();
        }
    });

    document.getElementById('month-select').addEventListener('change', function() {
        updateWeekFilter();
        displayHolidays();
        
        // FIXED BEHAVIOR: If a specific month is selected, switch to calendar view and navigate to that month
        if (this.value !== 'all') {
            const selectedMonth = parseInt(this.value);
            // Update the calendar month BEFORE switching to calendar view
            currentCalendarMonth = selectedMonth;
            currentCalendarYear = parseInt(document.getElementById('year-select').value);
            switchToCalendarView();
        } else if (document.getElementById('calendar-view').style.display !== 'none') {
            // If "All Months" is selected and calendar is open, just update the calendar
            generateCalendar();
        }
    });
    
    document.getElementById('week-select').addEventListener('change', function() {
        displayHolidays();
        if (document.getElementById('calendar-view').style.display !== 'none') {
            generateCalendar();
        }
    });
    
    document.getElementById('list-view-btn').addEventListener('click', function() {
        switchToListView();
    });
    
    document.getElementById('calendar-view-btn').addEventListener('click', function() {
        switchToCalendarView();
    });
    
    document.getElementById('prev-month').addEventListener('click', () => navigateCalendar('prev'));
    document.getElementById('next-month').addEventListener('click', () => navigateCalendar('next'));
    
    document.getElementById('clear-filters').addEventListener('click', clearFilters);
    
    // Initial display
    displayHolidays();
}

// Start the application when the page loads
document.addEventListener('DOMContentLoaded', init);

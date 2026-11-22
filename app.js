// ==========================================
// IPL 2026 TICKET BOOKING WEBSITE
// Activity 5: JavaScript User Interaction
// Activity 6: Selector Forms and Live Interaction
// Activity 7: Responsive Layout and View Toggle
// ==========================================


// Ticket Prices
const ticketPrices = {
    "RCB vs CSK": {
        General: 800,
        Premium: 1500,
        VIP: 3000
    },

    "MI vs KKR": {
        General: 900,
        Premium: 1700,
        VIP: 3500
    },

    "CSK vs MI": {
        General: 850,
        Premium: 1600,
        VIP: 3200
    },

    "RCB vs SRH": {
        General: 800,
        Premium: 1500,
        VIP: 3000
    },

    "KKR vs RR": {
        General: 900,
        Premium: 1700,
        VIP: 3500
    }
};


// ==========================================
// Toast Notification Function
// ==========================================

function showToast(message) {

    let toast = document.getElementById('toast');

    if (!toast) {

        toast = document.createElement('div');

        toast.id = 'toast';
        toast.className = 'toast';

        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');

        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.classList.add('show');

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        toast.classList.remove('show');

    }, 3000);
}


// ==========================================
// Format Price in Indian Rupees
// ==========================================

function formatPrice(amount) {

    return '₹' + Number(amount).toLocaleString('en-IN');

}


// ==========================================
// Get Saved Bookings from localStorage
// ==========================================

function getBookings() {

    try {

        const bookings = JSON.parse(
            localStorage.getItem('iplBookings')
        );

        return Array.isArray(bookings) ? bookings : [];

    } catch (error) {

        console.error('Error reading bookings:', error);

        return [];
    }
}


// ==========================================
// Test Supabase Connection
// Dynamic Import
// ==========================================

async function testSupabaseConnection() {

    try {

        const { supabase } = await import('./supabase.js');

        const { data, error } = await supabase
            .from('matches')
            .select('id, team1, team2, date, venue, price, available_seats');

        if (error) {

            throw error;

        }

        console.log('Supabase connected successfully!');

        console.log('Matches fetched:', data);

    } catch (error) {

        console.error('Supabase connection error:', error);

    }
}


// ==========================================
// Run JavaScript After HTML Has Loaded
// ==========================================

document.addEventListener('DOMContentLoaded', function () {


    // Get HTML Elements

    const homeBookingForm =
        document.getElementById('homeBookingForm');

    const homeMatch =
        document.getElementById('homeMatch');

    const homeStand =
        document.getElementById('homeStand');

    const homeQuantity =
        document.getElementById('homeQuantity');

    const summaryMatch =
        document.getElementById('summaryMatch');

    const summaryStand =
        document.getElementById('summaryStand');

    const summaryPrice =
        document.getElementById('summaryPrice');

    const summaryQuantity =
        document.getElementById('summaryQuantity');

    const summaryTotal =
        document.getElementById('summaryTotal');

    const homeBookingMessage =
        document.getElementById('homeBookingMessage');


    // ==========================================
    // Activity 7: Mobile Hamburger Navigation
    // ==========================================

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {

        menuToggle.addEventListener('click', function () {

            const isOpen = navLinks.classList.toggle('open');

            menuToggle.setAttribute('aria-expanded', String(isOpen));

            menuToggle.setAttribute(
                'aria-label',
                isOpen ? 'Close navigation menu' : 'Open navigation menu'
            );

        });

        navLinks.querySelectorAll('a').forEach(function (link) {

            link.addEventListener('click', function () {

                navLinks.classList.remove('open');

                menuToggle.setAttribute('aria-expanded', 'false');

                menuToggle.setAttribute('aria-label', 'Open navigation menu');

            });

        });

    }


    // ==========================================
    // Activity 7: Grid and List View Toggle
    // ==========================================

    const matchGrid = document.getElementById('matchGrid');

    const gridViewBtn = document.getElementById('gridViewBtn');

    const listViewBtn = document.getElementById('listViewBtn');


    function setMatchView(view) {

        if (!matchGrid || !gridViewBtn || !listViewBtn) return;

        const isListView = view === 'list';

        matchGrid.classList.toggle('list-view', isListView);

        gridViewBtn.classList.toggle('active', !isListView);

        listViewBtn.classList.toggle('active', isListView);

        gridViewBtn.setAttribute('aria-pressed', String(!isListView));

        listViewBtn.setAttribute('aria-pressed', String(isListView));

    }


    if (gridViewBtn) {

        gridViewBtn.addEventListener('click', function () {

            setMatchView('grid');

        });

    }


    if (listViewBtn) {

        listViewBtn.addEventListener('click', function () {

            setMatchView('list');

        });

    }


    // ==========================================
    // Activity 5: Smooth Scrolling
    // ==========================================

    const bookingLinks = document.querySelectorAll(
        'a[href="#booking"]'
    );

    bookingLinks.forEach(function (link) {

        link.addEventListener('click', function (event) {

            const bookingSection =
                document.getElementById('booking');

            if (bookingSection) {

                event.preventDefault();

                // Select match from Match Schedule Book button

                if (link.classList.contains('book-match')) {

                    const selectedMatch = link.dataset.match;

                    if (selectedMatch && homeMatch) {

                        homeMatch.value = selectedMatch;

                        updateSummary(false);

                    }

                }

                bookingSection.scrollIntoView({

                    behavior: 'smooth',

                    block: 'start'

                });

                showToast('Redirecting to the IPL booking form!');

            }

        });

    });


    // ==========================================
    // Activity 6: Live Booking Summary
    // ==========================================

    function updateSummary(showNotification = false) {

        if (
            !homeMatch ||
            !homeStand ||
            !homeQuantity ||
            !summaryMatch ||
            !summaryStand ||
            !summaryPrice ||
            !summaryQuantity ||
            !summaryTotal
        ) {

            console.error('Booking summary elements are missing.');

            return;

        }


        const selectedMatch = homeMatch.value;

        const selectedStand = homeStand.value;

        let quantity = Number(homeQuantity.value);


        // Validate Quantity

        if (!Number.isInteger(quantity) || quantity < 1) {

            quantity = 1;

        }


        // Calculate Ticket Price

        const price = selectedMatch && selectedStand

            ? ticketPrices[selectedMatch]?.[selectedStand] || 0

            : 0;


        // Calculate Total Amount

        const total = price * quantity;


        // Update Booking Summary Card

        summaryMatch.textContent =
            selectedMatch || 'Not selected';

        summaryStand.textContent =
            selectedStand || 'Not selected';

        summaryPrice.textContent =
            formatPrice(price);

        summaryQuantity.textContent =
            quantity;

        summaryTotal.textContent =
            formatPrice(total);


        // Show Toast Notification

        if (showNotification) {

            showToast('Booking Summary updated successfully!');

        }

    }


    // ==========================================
    // Match Selection Event
    // ==========================================

    if (homeMatch) {

        homeMatch.addEventListener('change', function () {

            updateSummary(true);

        });

    }


    // ==========================================
    // Stand Category Selection Event
    // ==========================================

    if (homeStand) {

        homeStand.addEventListener('change', function () {

            updateSummary(true);

        });

    }


    // ==========================================
    // Ticket Quantity Event
    // ==========================================

    if (homeQuantity) {

        homeQuantity.addEventListener('input', function () {

            updateSummary(true);

        });

    }


    // ==========================================
    // Reset Booking Form
    // ==========================================

    if (homeBookingForm) {

        homeBookingForm.addEventListener('reset', function () {

            setTimeout(function () {

                updateSummary(false);

                if (homeBookingMessage) {

                    homeBookingMessage.textContent = '';

                }

            }, 0);

        });

    }


    // ==========================================
    // Team Filter
    // ==========================================

    const teamFilter = document.getElementById('teamFilter');

    const matchCards = document.querySelectorAll('.match-card');

    const filterMessage = document.getElementById('filterMessage');


    function filterMatches() {

        if (!teamFilter) return;

        const selectedTeam = teamFilter.value;

        let visibleMatches = 0;

        matchCards.forEach(function (card) {

            const teams = (card.dataset.teams || '').split(' ');

            const shouldShow =
                selectedTeam === 'all' || teams.includes(selectedTeam);

            card.hidden = !shouldShow;

            if (shouldShow) visibleMatches++;

        });

        if (filterMessage) {

            filterMessage.textContent =
                visibleMatches + ' match(es) found.';

        }

    }


    if (teamFilter) {

        teamFilter.addEventListener('change', filterMatches);

    }


    // ==========================================
    // Display Saved Bookings
    // ==========================================

    function displayBookings() {

        const myBookingsBody =
            document.getElementById('myBookingsBody');

        if (!myBookingsBody) {

            return;

        }

        const bookings = getBookings();

        myBookingsBody.innerHTML = '';


        // Check Whether Bookings Exist

        if (bookings.length === 0) {

            const row = document.createElement('tr');

            const cell = document.createElement('td');

            cell.colSpan = 6;

            cell.textContent = 'No bookings available yet.';

            row.appendChild(cell);

            myBookingsBody.appendChild(row);

            return;

        }


        // Display Every Booking

        bookings.forEach(function (booking) {

            const row = document.createElement('tr');

            const values = [

                booking.id,

                booking.name,

                booking.match,

                booking.stand,

                booking.quantity,

                formatPrice(booking.total)

            ];


            values.forEach(function (value) {

                const cell = document.createElement('td');

                cell.textContent = value;

                row.appendChild(cell);

            });


            myBookingsBody.appendChild(row);

        });

    }


    // ==========================================
    // Submit Booking Form
    // ==========================================

    if (homeBookingForm) {

        homeBookingForm.addEventListener('submit', function (event) {

            // Prevent Page Refresh

            event.preventDefault();


            // Get User Details

            const name =
                document.getElementById('homeName').value.trim();

            const email =
                document.getElementById('homeEmail').value.trim();

            const phone =
                document.getElementById('homePhone').value.trim();

            const match = homeMatch.value;

            const stand = homeStand.value;

            const quantity = Number(homeQuantity.value);


            const preference = document.querySelector(
                'input[name="homePreference"]:checked'
            )?.value || 'Regular Seating';


            // Validate Match and Stand

            if (!ticketPrices[match] || !ticketPrices[match][stand]) {

                homeBookingMessage.textContent =
                    'Please select a valid match and stand.';

                return;

            }


            // Validate Ticket Quantity

            if (

                !Number.isInteger(quantity) ||

                quantity < 1 ||

                quantity > 10

            ) {

                homeBookingMessage.textContent =
                    'Please select between 1 and 10 tickets.';

                return;

            }


            // Calculate Ticket Price

            const price = ticketPrices[match][stand];

            const total = price * quantity;


            // Create Booking Object

            const newBooking = {

                id: 'IPL' + Date.now(),

                name: name,

                email: email,

                phone: phone,

                match: match,

                stand: stand,

                quantity: quantity,

                preference: preference,

                price: price,

                total: total

            };


            try {

                // Get Existing Bookings

                const bookings = getBookings();

                bookings.push(newBooking);


                // Save Booking in localStorage

                localStorage.setItem(

                    'iplBookings',

                    JSON.stringify(bookings)

                );


                // Display Success Message

                homeBookingMessage.textContent =
                    'Your booking has been submitted successfully!';


                // Refresh My Bookings Table

                displayBookings();


                // Reset Form

                homeBookingForm.reset();


                // Update Booking Summary

                updateSummary(false);


                // Show Toast

                showToast('Your IPL ticket booking was successful!');

            } catch (error) {

                console.error('Booking error:', error);

                homeBookingMessage.textContent =
                    'Unable to save booking. Please try again.';

                showToast('Booking could not be saved.');

            }

        });

    }


    // ==========================================
    // Initial Page Setup
    // ==========================================

    updateSummary(false);

    displayBookings();


    // ==========================================
    // Test Supabase Connection
    // ==========================================

    testSupabaseConnection();


});
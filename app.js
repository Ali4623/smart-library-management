/**
 * Smart Library Management System
 * Pure Vanilla JavaScript Implementation
 */

// --- 1. MOCK DATABASE ---
const libraryData = [
    {
        id: 101,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        status: "Available",
        desc: "Comprehensive guide to algorithms for students."
    },
    {
        id: 102,
        title: "Clean Architecture",
        author: "Robert C. Martin",
        status: "Unavailable", // Checked out
        desc: "A craftsman's guide to software structure and design."
    },
    {
        id: 103,
        title: "Design Patterns",
        author: "Erich Gamma",
        status: "Available",
        desc: "Elements of Reusable Object-Oriented Software."
    },
    {
        id: 104,
        title: "Artificial Intelligence",
        author: "Stuart Russell",
        status: "Available",
        desc: "A Modern Approach to AI."
    },
    {
        id: 105,
        title: "Database System Concepts",
        author: "Abraham Silberschatz",
        status: "Unavailable",
        desc: "The standard text for efficient database design."
    },
    // --- Business Books ---
    {
        id: 106,
        title: "The Lean Startup",
        author: "Eric Ries",
        status: "Available",
        desc: "How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses."
    },
    {
        id: 107,
        title: "Zero to One",
        author: "Peter Thiel",
        status: "Available",
        desc: "Notes on Startups, or How to Build the Future."
    },
    {
        id: 108,
        title: "Atomic Habits",
        author: "James Clear",
        status: "Unavailable",
        desc: "An Easy & Proven Way to Build Good Habits & Break Bad Ones."
    },
    // --- Programming Books ---
    {
        id: 109,
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        status: "Available",
        desc: "A deep dive into the core mechanisms of the JavaScript language."
    },
    {
        id: 110,
        title: "Effective Java",
        author: "Joshua Bloch",
        status: "Available",
        desc: "The definitive guide to Java Platform best practices."
    },
    {
        id: 111,
        title: "Python Crash Course",
        author: "Eric Matthes",
        status: "Available",
        desc: "A Hands-On, Project-Based Introduction to Programming."
    },
    {
        id: 112,
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        status: "Unavailable",
        desc: "A Modern Introduction to Programming."
    }
];

// Mock User Data
const studentProfile = {
    name: "John Doe",
    id: "2024001",
    course: "Computer Science"
};

// Mock Request History
let requestHistory = [
    { title: "Clean Architecture", date: "2024-12-20", status: "Approved" },
    { title: "Database System Concepts", date: "2024-12-25", status: "Pending" }
];

// --- 2. DOM ELEMENTS ---
const elements = {
    // Views
    authView: document.getElementById('authView'),
    dashboardView: document.getElementById('dashboardView'),

    // Auth Components
    authBox: document.getElementById('authBox'),
    signInBtn: document.getElementById('signInBtn'),
    signUpBtn: document.getElementById('signUpBtn'),
    mobileLoginBtn: document.getElementById('mobileLoginBtn'),
    mobileSignupBtn: document.getElementById('mobileSignupBtn'),
    loginForm: document.getElementById('loginForm'),
    signupForm: document.getElementById('signupForm'),
    forgotPassBtn: document.getElementById('forgotPassBtn'),
    logoutBtn: document.getElementById('logoutBtn'),

    // Dashboard Components
    bookGrid: document.getElementById('bookGrid'),
    searchInput: document.getElementById('searchInput'),
    resultCount: document.getElementById('resultCount'),
    profileBtn: document.getElementById('profileBtn'), // New Profile Button

    // Modals
    modals: {
        details: document.getElementById('detailsModal'),
        request: document.getElementById('requestModal'),
        forgot: document.getElementById('forgotModal'),
        student: document.getElementById('studentModal') // New Dashboard Modal
    },

    // Modal Contents
    bs: {
        title: document.getElementById('modalTitle'),
        author: document.getElementById('modalAuthor'),
        status: document.getElementById('modalStatus'),
        desc: document.getElementById('modalDesc')
    },

    form: {
        el: document.getElementById('requestForm'),
        bookDisplay: document.getElementById('bookTitleDisplay'),
        studentName: document.getElementById('studentName'),
        studentId: document.getElementById('studentId')
    },

    // Student Dashboard Elements
    dashName: document.getElementById('dashName'),
    dashId: document.getElementById('dashId'),
    tableBody: document.getElementById('requestTableBody'),

    toast: document.getElementById('toast')
};

// --- 3. STATE MANAGEMENT ---
let currentBooks = [...libraryData];
let selectedBook = null;

// --- 4. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    setupAuthListeners();
    renderBooks(currentBooks);
    setupDashboardListeners();
});

// --- 5. AUTHENTICATION LOGIC ---
function setupAuthListeners() {
    // Panel Sliding Animation
    elements.signUpBtn.addEventListener('click', () => {
        elements.authBox.classList.add("right-panel-active");
    });

    elements.signInBtn.addEventListener('click', () => {
        elements.authBox.classList.remove("right-panel-active");
    });

    // Mobile Toggles
    elements.mobileSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        elements.authBox.classList.add("right-panel-active");
    });

    elements.mobileLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        elements.authBox.classList.remove("right-panel-active");
    });

    // Mock Login Submit
    elements.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Welcome back!");
        // Simulate loading user data
        studentProfile.name = "John Doe";
        setTimeout(enterDashboard, 800);
    });

    // Mock Signup Submit
    elements.signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Account created! Logging in...");
        setTimeout(enterDashboard, 1000);
    });

    // Forgot Password
    elements.forgotPassBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('forgot');
    });

    document.getElementById('forgotForm').addEventListener('submit', (e) => {
        e.preventDefault();
        closeModal('forgot');
        showToast("Reset link sent to your email!");
    });

    // Logout
    if (elements.logoutBtn) {
        elements.logoutBtn.addEventListener('click', () => {
            elements.dashboardView.style.display = 'none';
            elements.authView.style.display = 'flex';
            elements.loginForm.reset();
            showToast("Logged out successfully.");
        });
    }
}

function enterDashboard() {
    elements.authView.style.display = 'none';
    elements.dashboardView.style.display = 'block';
    updateHeaderProfile();
}

function updateHeaderProfile() {
    // Optional: Update header text with user name if needed
}

// --- 6. STUDENT DASHBOARD LOGIC ---
function renderStudentDashboard() {
    elements.dashName.textContent = studentProfile.name;
    elements.dashId.textContent = studentProfile.id;

    elements.tableBody.innerHTML = '';

    if (requestHistory.length === 0) {
        elements.tableBody.innerHTML = '<tr><td colspan="3">No requests found.</td></tr>';
        return;
    }

    requestHistory.forEach(req => {
        const row = document.createElement('tr');

        let badgeClass = 'status-pending';
        if (req.status === 'Approved') badgeClass = 'status-approved';
        if (req.status === 'Rejected') badgeClass = 'status-rejected';

        row.innerHTML = `
            <td>${req.title}</td>
            <td>${req.date}</td>
            <td><span class="status-label ${badgeClass}">${req.status}</span></td>
        `;
        elements.tableBody.appendChild(row);
    });

    openModal('student');
}


// --- 7. MAIN RENDERING LOGIC ---
function renderBooks(books) {
    elements.bookGrid.innerHTML = '';

    elements.resultCount.textContent = `Showing ${books.length} book${books.length !== 1 ? 's' : ''}`;

    if (books.length === 0) {
        elements.bookGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #64748b;">
                <p>No books matches your search.</p>
            </div>
        `;
        return;
    }

    books.forEach(book => {
        const isAvailable = book.status === 'Available';
        const statusClass = isAvailable ? 'status-available' : 'status-unavailable';
        const btnState = !isAvailable ? 'disabled' : '';
        const btnText = isAvailable ? 'Request' : 'Checked Out';

        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p class="author">by ${book.author}</p>
            <div><span class="status-badge ${statusClass}">${book.status}</span></div>
            <div class="card-footer">
                <button class="btn btn-secondary" onclick="app.viewDetails(${book.id})">Details</button>
                <button class="btn btn-primary" onclick="app.openRequest(${book.id})" ${btnState}>${btnText}</button>
            </div>
        `;
        elements.bookGrid.appendChild(card);
    });
}

// --- 8. CORE APP LOGIC ---
const app = {
    viewDetails: (id) => {
        const book = libraryData.find(b => b.id === id);
        if (!book) return;

        elements.bs.title.textContent = book.title;
        elements.bs.author.textContent = book.author;
        elements.bs.status.textContent = book.status;
        elements.bs.status.className = book.status === 'Available'
            ? 'tag status-available'
            : 'tag status-unavailable';
        elements.bs.desc.textContent = book.desc;
        openModal('details');
    },

    openRequest: (id) => {
        const book = libraryData.find(b => b.id === id);
        if (!book || book.status !== 'Available') return;

        selectedBook = book;
        elements.form.bookDisplay.value = book.title;
        elements.form.el.reset();

        // Auto-fill student data from mock profile
        elements.form.studentName.value = studentProfile.name;
        elements.form.studentId.value = studentProfile.id;

        openModal('request');
    }
};
window.app = app;

// --- 9. UTILITIES ---
function openModal(name) {
    if (elements.modals[name]) {
        elements.modals[name].classList.add('active');
        elements.modals[name].setAttribute('aria-hidden', 'false');
    }
}

function closeModal(name) {
    if (elements.modals[name]) {
        elements.modals[name].classList.remove('active');
        elements.modals[name].setAttribute('aria-hidden', 'true');
    }
}

function closeAllModals() {
    Object.keys(elements.modals).forEach(key => closeModal(key));
}

function setupDashboardListeners() {
    // Search
    elements.searchInput.addEventListener('input', (prev) => {
        const term = prev.target.value.toLowerCase().trim();
        currentBooks = libraryData.filter(book =>
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term)
        );
        renderBooks(currentBooks);
    });

    // Profile Button
    if (elements.profileBtn) {
        elements.profileBtn.addEventListener('click', renderStudentDashboard);
    }

    // Close Modals
    document.querySelectorAll('.close-btn, .close-icon, .close-forgot').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeAllModals();
        }
    });

    // Request Form
    elements.form.el.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = elements.form.studentName.value;
        const id = elements.form.studentId.value;

        if (name.length < 3) {
            showToast("Please enter a valid full name.");
            return;
        }

        // Add to Request History (Mock)
        const today = new Date().toISOString().split('T')[0];
        requestHistory.unshift({
            title: selectedBook.title,
            date: today,
            status: "Pending"
        });

        closeAllModals();
        showToast(`Request confirmed for ${name}! Check your dashboard.`);
    });
}

function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.className = "toast show";
    setTimeout(() => { elements.toast.className = elements.toast.className.replace("show", ""); }, 3000);
}

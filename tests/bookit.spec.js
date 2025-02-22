import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:5173';

test.describe('Frontend Tests', () => {

  // Setup: Mock authentication and API responses
    test.beforeEach(async ({ context, page }) => {

    // Set localStorage
    await context.addInitScript(() => {
        window.localStorage.setItem('userId', 'test-user-id');
        window.localStorage.setItem('token', 'fake-token');
    });

    // Mock login API
    await page.route('http://localhost:3000/api/auth/login', route => route.fulfill({
        status: 200,
        body: JSON.stringify({ userId: 'test-user-id', token: 'fake-token', role: 'User' })
    }));

    // Mock cart API
    await page.route('http://localhost:3000/api/cart/**', route => route.fulfill({
        status: 200,
        body: JSON.stringify([])
    }));

    // Mock books API
    await page.route('http://localhost:3000/api/books/**', route => route.fulfill({
        status: 200,
        body: JSON.stringify([{ _id: '1', title: 'Test Book', author: 'Test Author', image: 'test.jpg', availability_status: 'yes' }])
    }));

    // Mock orders API
    await page.route('http://localhost:3000/api/orders/**', route => route.fulfill({
        status: 200,
        body: JSON.stringify([{ id: '1', status: 'Delivered', items: [{ book_id: { title: 'Test Book' } }], total_price: 100 }])
    }));

    // Mock customer API for profile
    await page.route('http://localhost:3000/api/customer/**', route => route.fulfill({
        status: 200,
        body: JSON.stringify({ full_name: 'Test User', username: 'testuser', email: 'test@example.com', contact_no: '1234567890' })
        }));
    });

  // 1. Login Form Submission Test
    test('should login successfully with valid credentials', async ({ page }) => {
        await page.goto(`${baseURL}/loginRegister`);
        await page.waitForLoadState('networkidle');
        await page.fill('input[name="username"]', 'testuser');
        await page.fill('input[name="password"]', 'password123');
        await page.click('button[type="submit"] >> nth=0');
        await page.waitForURL(`${baseURL}/`, { timeout: 10000 });
        await expect(page).toHaveURL(`${baseURL}/`);
    });

  // 2. LoginRegister Switch Test
    test('should switch to registration form when SignUp link is clicked', async ({ page }) => {
        await page.goto(`${baseURL}/loginRegister`);
        await page.waitForLoadState('networkidle');
        await page.click('text=SignUp');
        const fullNameInput = page.locator('input[name="full_name"]');
        await expect(fullNameInput).toBeVisible();
    });

  // 3. Forgot Password Email Step Test
    test('should proceed to verification code step after email submission', async ({ page }) => {
        await page.route('http://localhost:3000/api/auth/forgot-password', route => route.fulfill({
        status: 200,
        body: JSON.stringify({ message: 'Code sent' })
    }));
        await page.goto(`${baseURL}/password-reset`);
        await page.fill('input[placeholder="youremail@example.com"]', 'test@example.com');
        await page.click('button:has-text("Send Code")');
        await expect(page.locator('input[placeholder="Enter code"]')).toBeVisible();
    });

  // 4. Homepage Hero Section Test
    test('should display homepage hero content', async ({ page }) => {
        await page.goto(baseURL);
        await expect(page.locator('h1', { hasText: 'Welcome to BookIt!' })).toBeVisible();
        await expect(page.locator('.hero-button', { hasText: 'Explore Now' })).toBeVisible();
    });

  // 5. Homepage Search Functionality Test
    test('should display search results on homepage', async ({ page }) => {
        await page.route('http://localhost:3000/api/books/search/**', route => route.fulfill({
        status: 200,
        body: JSON.stringify([{ _id: '1', title: 'test book', author: 'Test Author', image: 'test.jpg' }])
    }));
        await page.goto(baseURL);
        await page.fill('.search-input', 'test book');
        await page.waitForTimeout(600);
        const results = page.locator('.bg-white.border', { hasText: 'test book' });
        await expect(results).toBeVisible();
    });

  // 6. BestSeller Page Top Book Test
    test('should display #1 Best Seller on BestSeller page', async ({ page }) => {
        await page.goto(`${baseURL}/bestseller`);
        await page.waitForLoadState('networkidle');
        const topBook = page.locator('.bg-blue-600', { hasText: '#1 Best Seller' });
        await expect(topBook).toBeVisible();
    });

  // 7. LoginRegister Forgot Password Link Test
    test('should navigate to password reset page from forgot password link', async ({ page }) => {
        await page.goto(`${baseURL}/loginRegister`);
        await page.waitForLoadState('networkidle');
        await page.click('a:has-text("Forgot password?")');
        await page.waitForURL(`${baseURL}/password-reset`, { timeout: 10000 });
        await expect(page).toHaveURL(`${baseURL}/password-reset`);
    });

  // 8. Cart Page Empty State Test
    test('should display empty cart message when no items', async ({ page }) => {
        await page.goto(`${baseURL}/cart`);
        await page.waitForLoadState('networkidle');
        await expect(page.locator('text=Your cart is empty')).toBeVisible();
    });

  // 9. Cart Page Continue Shopping Test
    test('should navigate to homepage on clicking Continue Shopping', async ({ page }) => {
        await page.goto(`${baseURL}/cart`);
        await page.waitForLoadState('networkidle');
        await page.click('button:has-text("Continue Shopping")');
        await page.waitForURL(`${baseURL}/`, { timeout: 10000 });
        await expect(page).toHaveURL(`${baseURL}/`);
    });

  // 10. Category Page Filter Test
    test('should filter books by "In Stock"', async ({ page }) => {
        await page.route('http://localhost:3000/api/books/genre/**', route => route.fulfill({
        status: 200,
        body: JSON.stringify([{ _id: '1', title: 'Test Book', availability_status: 'yes' }])
    }));
        await page.goto(`${baseURL}/genre/educational`);
        await page.check('input[value="inStock"]');
        const books = page.locator('.bg-white.shadow-lg');
        await expect(books).toHaveCount(1);
    });

  // 11. Favorite Page Remove Item Test
    test('should remove a book from favorites', async ({ page }) => {
        await page.route('http://localhost:3000/api/favorites/**', route => route.fulfill({
        status: 200,
        body: JSON.stringify([{ _id: '1', book_id: { _id: '1', title: 'Test Book' } }])
    }));
        await page.goto(`${baseURL}/favorite`);
        const initialCount = await page.locator('.flex.gap-6').count();
        await page.click('button:has-text("Remove")', { force: true });
        await expect(page.locator('.flex.gap-6')).toHaveCount(initialCount - 1);
    });

    // 12. Profile Page Edit Popup Test
    test('should open edit profile popup', async ({ page }) => {
        await page.goto(`${baseURL}/profile`);
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('button:has-text("Edit Profile")', { timeout: 10000 });
        await page.click('button:has-text("Edit Profile")', { force: true });
        await expect(page.locator('h2', { hasText: 'Edit Profile' })).toBeVisible();
    });

  // 13. Profile Page Orders Tab Test
    test('should switch to orders tab', async ({ page }) => {
        await page.goto(`${baseURL}/profile`);
        await page.waitForLoadState('networkidle');
        await page.click('button:has-text("Orders")', { force: true });
        await page.waitForSelector('h3:has-text("Recent Orders")', { timeout: 10000 });
        await expect(page.locator('h3', { hasText: 'Recent Orders' })).toBeVisible();
    });

  // 14. LoginRegister Terms Modal Test
    test('should open terms and conditions modal', async ({ page }) => {
        await page.goto(`${baseURL}/loginRegister`);
        await page.click('text=SignUp');
        await page.click('text=Terms & Conditions');
        await expect(page.locator('.bg-white.p-6')).toBeVisible();
    });

  // 15. Homepage Category Scroll Test
    test('should scroll category boxes right', async ({ page }) => {
        await page.goto(baseURL);
        await page.click('.arrow-button >> nth=1', { force: true });
        const container = page.locator('.category-boxes');
        const scrollLeft = await container.evaluate(el => el.scrollLeft);
        expect(scrollLeft).toBeGreaterThan(0);
    });
});
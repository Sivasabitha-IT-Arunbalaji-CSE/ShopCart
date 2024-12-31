import { register, login } from '../services/authService.js';

import { usersDb } from '../database.js'; // Mock database

describe('AuthService Tests', () => {
    beforeEach(() => {
        usersDb.length = 0; // Clear the mock database before each test
    });

    describe('Register Function', () => {
        test('should register a new user successfully', async () => {
            const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
            const newUser = await register(userData);

            expect(newUser).toHaveProperty('id');
            expect(newUser.email).toBe(userData.email);
            expect(newUser.username).toBe(userData.username);
        });

        test('should throw an error if the email already exists', async () => {
            const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
            await register(userData);

            try {
                await register(userData); // Try registering again
            } catch (error) {
                expect(error.message).toBe('Email already exists');
            }
        });
    });

    describe('Login Function', () => {
        test('should login successfully with correct credentials', async () => {
            const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
            await register(userData);

            const { token, user } = await login({ email: userData.email, password: userData.password });

            expect(token).toBeDefined();
            expect(user.email).toBe(userData.email);
            expect(user.username).toBe(userData.username);
        });

        test('should throw an error with invalid credentials', async () => {
            const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
            await register(userData);

            try {
                await login({ email: 'test@example.com', password: 'wrongpassword' });
            } catch (error) {
                expect(error.message).toBe('Invalid credentials');
            }
        });
    });
});

import unittest
from ..server import app
class TestServer(unittest.TestCase):

    def setUp(self):
        """Set up the Flask app for testing"""
        self.app = app.test_client()
        self.app.testing = True

    def test_show_login_page(self):
        """Test that the login page is served correctly"""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_login_successful(self):
        """Test successful login"""
        response = self.app.post('/login', json={
            "username": "martin",
            "password": "password123"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("Login successful", response.get_json()["message"])

    def test_login_unsuccessful(self):
        """Test login with invalid credentials"""
        response = self.app.post('/login', json={
            "username": "invalid_user",
            "password": "wrong_password"
        })
        self.assertEqual(response.status_code, 401)
        self.assertIn("Invalid credentials", response.get_json()["message"])

    def test_logout(self):
        """Test logging out"""
        with self.app.session_transaction() as sess:
            sess['admin'] = 'martin'  # Simulate logged-in session
        
        response = self.app.post('/logout')
        self.assertEqual(response.status_code, 200)
        self.assertIn("Logged out successfully", response.get_json()["message"])

    def test_protected_route_unauthorized(self):
        """Test access to a protected route without login"""
        response = self.app.get('/protected')
        self.assertEqual(response.status_code, 401)
        self.assertIn("Unauthorized", response.get_json()["message"])

    def test_protected_route_authorized(self):
        """Test access to a protected route with login"""
        with self.app.session_transaction() as sess:
            sess['admin'] = 'martin'  # Simulate logged-in session
        
        response = self.app.get('/protected')
        self.assertEqual(response.status_code, 200)
        self.assertIn("Welcome, martin!", response.get_json()["message"])

    def test_admin_dashboard_unauthorized(self):
        """Test access to the admin dashboard without login"""
        response = self.app.get('/admin')
        self.assertEqual(response.status_code, 302)  # Should redirect to login page

    def test_admin_dashboard_authorized(self):
        """Test access to the admin dashboard with login"""
        with self.app.session_transaction() as sess:
            sess['admin'] = 'martin'  # Simulate logged-in session

        response = self.app.get('/admin')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
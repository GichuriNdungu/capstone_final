import sys
sys.path.append('/Users/alu/Desktop/The reshift website makeover/main/api')

import unittest
from ..server import app
from unittest.mock import patch, MagicMock
from bson.objectid import ObjectId

class TestServer(unittest.TestCase):
    def setUp(self):
        """Set up the Flask app for testing"""
        self.app = app.test_client()
        self.app.testing = True

    @patch('server.offsetters_collection.find')
    def test_get_offsetters(self, mock_find):
        """Test retrieving all approved offsetters"""
        mock_find.return_value = [
            {"_id": ObjectId(), "name": "Test Offsetter", "location": "Test Location", "offsetFocus": "Renewable Energy", "CO2ReductionPotential": "50 tons/year"}
        ]

        response = self.app.get('/offsetters')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)
        self.assertEqual(data[0]["name"], "Eco Green Initiative")

    @patch('server.pending_collection.insert_one')
    def test_add_offsetter_success(self, mock_insert_one):
        """Test adding a new offsetter successfully"""
        mock_insert_one.return_value.inserted_id = ObjectId()
        payload = {
            "name": "New Offsetter",
            "location": "Test Location",
            "offsetFocus": "Forestry",
            "CO2ReductionPotential": "20 tons/year",
            "website": "http://example.com",
            "contact": "1234567890"
        }

        response = self.app.post('/add-offsetters', json=payload)
        self.assertEqual(response.status_code, 201)
        self.assertIn("Offsetter submitted for approval", response.get_json()["message"])

    def test_add_offsetter_missing_fields(self):
        """Test adding an offsetter with missing fields"""
        payload = {
            "name": "Incomplete Offsetter"
        }

        response = self.app.post('/add-offsetters', json=payload)
        self.assertEqual(response.status_code, 400)
        self.assertIn("Missing fields", response.get_json()["message"])

    @patch('server.pending_collection.find')
    def test_get_pending_offsetters(self, mock_find):
        """Test retrieving pending offsetters"""
        mock_find.return_value = [
            {"_id": ObjectId(), "name": "Pending Offsetter", "location": "Test Location", "offsetFocus": "Agriculture", "CO2ReductionPotential": "30 tons/year", "status": "Pending"}
        ]

        response = self.app.get('/pending-offsetters')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)
        self.assertEqual(data[0]["status"], "Pending")

    @patch('server.pending_collection.find_one')
    @patch('server.offsetters_collection.insert_one')
    @patch('server.pending_collection.delete_one')
    def test_approve_offsetter(self, mock_delete_one, mock_insert_one, mock_find_one):
        """Test approving a pending offsetter"""
        mock_find_one.return_value = {"_id": ObjectId(), "name": "Pending Offsetter"}
        mock_insert_one.return_value = None
        mock_delete_one.return_value.deleted_count = 1

        response = self.app.post('/approve-offsetter/673e72f344a456248495fbfe')
        self.assertEqual(response.status_code, 200)
        self.assertIn("Offsetter approved successfully", response.get_json()["message"])

    @patch('server.pending_collection.delete_one')
    def test_reject_offsetter(self, mock_delete_one):
        """Test rejecting a pending offsetter"""
        mock_delete_one.return_value.deleted_count = 1

        response = self.app.delete('/reject-offsetter/673e727d858d0e3be4675f39')
        self.assertEqual(response.status_code, 200)
        self.assertIn("Offsetter rejected and removed from pending list", response.get_json()["message"])

    @patch('server.pending_collection.delete_one')
    def test_reject_offsetter_not_found(self, mock_delete_one):
        """Test rejecting a non-existent offsetter"""
        mock_delete_one.return_value.deleted_count = 0

        response = self.app.delete('/reject-offsetter/1234567890abcdef12345678')
        self.assertEqual(response.status_code, 404)
        self.assertIn("Offsetter not found", response.get_json()["message"])

if __name__ == '__main__':
    unittest.main()

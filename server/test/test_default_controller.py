# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from server.models.inline_response200 import InlineResponse200  # noqa: E501
from server.models.report import Report  # noqa: E501
from server.test import BaseTestCase


class TestDefaultController(BaseTestCase):
    """DefaultController integration test stubs"""

    def test_get_csv_transaction_id_get(self):
        """Test case for get_csv_transaction_id_get

        Скачать CSV-файл отчета
        """
        headers = { 
        }
        response = self.client.open(
            '/get-csv/{transaction_id}'.format(transaction_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_pdf_transaction_id_get(self):
        """Test case for get_pdf_transaction_id_get

        Скачать PDF-файл отчета
        """
        headers = { 
        }
        response = self.client.open(
            '/get-pdf/{transaction_id}'.format(transaction_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_report_report_id_get(self):
        """Test case for report_report_id_get

        Получить отчет по конкретному файлу
        """
        headers = { 
        }
        response = self.client.open(
            '/report/{report_id}'.format(report_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    @unittest.skip("multipart/form-data not supported by Connexion")
    def test_upload_post(self):
        """Test case for upload_post

        Загрузить файл для анализа ошибок
        """
        headers = { 
        }
        data = dict(file='/path/to/file')
        response = self.client.open(
            '/upload',
            method='POST',
            headers=headers,
            data=data,
            content_type='multipart/form-data')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()

import os
import uuid

import connexion
import pdfkit
import six
from werkzeug.utils import secure_filename
from flask import request, send_from_directory
from server.models.inline_response200 import InlineResponse200  # noqa: E501
from server.models.report import Report  # noqa: E501
from server import util
from flask_cors import cross_origin

import server.database.models as db_models
from server.models import Report
import server.helpers.parsers as parsers


def get_csv_transaction_id_get(transaction_id):  # noqa: E501
    """Скачать CSV-файл отчета

     # noqa: E501

    :param transaction_id: ID транзакции
    :type transaction_id: int

    :rtype: file
    """
    transaction = db_models.Transaction.get(db_models.Transaction.id == transaction_id)

    reports = transaction.reports
    file = f"report-{transaction_id}.csv"

    return send_from_directory(f'files/report', file, as_attachment=True), 200


def get_pdf_transaction_id_get(transaction_id):  # noqa: E501
    """Скачать PDF-файл отчета

     # noqa: E501

    :param transaction_id: ID транзакции
    :type transaction_id: str

    :rtype: file
    """
    transaction = db_models.Transaction.get(db_models.Transaction.id == transaction_id)

    reports = transaction.reports
    file = f"report-{transaction_id}.pdf"

    return send_from_directory(f'files/report',  file, as_attachment=True), 200


def report_report_id_get(report_id):  # noqa: E501
    """Получить отчет по конкретному файлу

     # noqa: E501

    :param report_id: ID отчета
    :type report_id: int

    :rtype: Report
    """
    return 'do some magic!', 200


def reports_transaction_id_get(transaction_id):
    transaction = db_models.Transaction.get(db_models.Transaction.id == transaction_id)

    reports = transaction.reports
    result = []

    for db_report in reports:
        report = Report(reference=db_report.reference,
                        files_count=db_report.files_count,
                        checked_count=len(list(filter(lambda x: x.is_checked, db_report.files))),
                        match_count=db_report.match_count,
                        files=parsers.db_files_to_files(db_report.files))
        result.append(report)

    return result, 200


@cross_origin()
def upload_post(file=None):  # noqa: E501
    """Загрузить файл для анализа ошибок

     # noqa: E501

    :param file: 
    :type file: str

    :rtype: InlineResponse200
    """

    # Проверяем, есть ли файлы в запросе
    if 'files[]' not in request.files:
        return 'No file part in the request', 400

    files = request.files.getlist('files[]')

    transaction = db_models.Transaction.create()
    transaction_id = transaction.id

    report = db_models.Report.create(transaction=transaction)
    files_count = 0
    for file in files:
        # Если пользователь не выбрал файл
        if file.filename == '':
            pass

        # Если файл есть, сохраняем его
        if file:
            db_file = db_models.File.create(report=report)

            try:
                filename = secure_filename(file.filename).strip()
                if filename.endswith(".pdf"):
                    filename = filename[:-4]

                filename += f"_{db_file.id}_{transaction_id}.pdf"

                db_file.filename = filename
                file.save(os.path.join("files/client", filename))

                with open(os.path.join("files/client", filename), "rb"):
                    pass
                db_file.save()
                files_count += 1
            except Exception as e:
                print("File uploading error:", e)
                db_file.delete_instance()
                return f"File uploading error: {e}", 500
    report.files_count = files_count
    report.save()
    return {"transaction_id": transaction_id}, 200

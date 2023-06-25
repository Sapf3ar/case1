import zipfile

import pandas as pd
from Levenshtein import distance as lev
from fitz import fitz
import re

from peewee import SqliteDatabase

from server.database.models import Transaction, Error


def listToString(s):
    str1 = " "

    for ele in s:
        str1 += ele + " "

    return str1


def cleanText(text):  # очистка текста
    text = text.lower()

    text = re.sub('(-)', '', text)

    text = re.sub('\n', '', text)

    text = re.sub(r'[_\n/_–<\*+«,\#+\№\"\-+\_+\=+{\?+\»%!+\&\}^\+\;\+\>«+"\(\)\/+\:\\+.]', r' ', text)

    text = re.sub(r'[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]', r' ', text)

    text = re.sub(r'(http\S+)|(www\S+)|([\w\d]+www\S+)|([\w\d]+http\S+)', r' ', text)

    text = re.sub(r'(\d+\s\d+)|(\d+)', ' ', text)

    text = re.sub(r'\s+', ' ', text)

    text = re.sub(r'\uf06c\uf020', ' ', text)

    trash = ''
    for t in text:
        if not (t.isalnum() or t == ' '):
            trash += t
    for t in trash:
        text = text.replace(t, '')

    res = []
    for t in text.split():
        if t not in res:
            res.append(t)
    return " ".join(res)


def find_theme(text):
    text = text.replace('\n', '')
    text = text.replace('-', '')
    matches_ = re.findall(r'«([^«»]*)»', text)
    matches_for_replace = re.findall(r'«[^«»]*»', text)
    for i, m in enumerate(matches_for_replace):
        text = text.replace(m, matches_[i])
    matches = re.findall(r'«(.+?)»', text)
    if len(matches) == 0:
        matches = matches_
    len_counter = 0
    chosed_text = ''
    for text in matches:
        if len(text) > len_counter:
            len_counter = len(text)
            chosed_text = text

    if len(chosed_text) < 10:
        arr = text.split(' ')
        text_l = len(arr)
        perc = int(text_l * 0.2)
        arr = [word for word in arr if len(word) > 3]
        arr = arr[perc: text_l - perc]
        chosed_text = listToString(arr)
        chosed_text = cleanText(chosed_text)



    return chosed_text


def jaccard(list1, list2):
    list1, list2 = list(list1), list(list2)
    intersection = len([x1 == x2 for (x1, x2) in zip(list1, list2)])
    union = (len(list1) + len(list2))
    return float(intersection) / union


def split_s(s):
    return [char for char in s]


def analyze_file(source_file_path, report_file_path, reference=None):
    doc = fitz.open(source_file_path)

    page_count = 0

    info = []

    # filename, page, Jaccara, Levent, word, bad_word

    for page in doc:

        if reference is None:
            reference = find_theme(page.get_text())
        phrase_split = reference.split()

        page_count += 1

        text = page.get_text().split()
        text = [word for word in text if len(word) > 3]
        word_dist = []

        for word in text:
            len_w = len(word)
            if word in phrase_split:
                area = page.search_for(word)
                page.add_highlight_annot(area)

            else:
                for word2 in phrase_split:
                    if (len(word2) - len(word)) > 7:
                        continue
                    else:
                        dist = lev(word, word2) / len_w
                        if dist < 0.1:
                            if len(word) == len(word2):
                                description = "Орфографическая ошибка"
                            else:
                                description = "Лишние символы в слове"
                            info.append(
                                {
                                    'filename': source_file_path.split('/')[-1],
                                    'page': page_count,
                                    'match': jaccard(word, word2),
                                    'lev': dist,
                                    'subject': word,
                                    'description': description}
                            )
                            area = page.search_for(word2)
                            page.add_highlight_annot(area)
    doc.save(report_file_path)
    return info


def make_report(transaction_id):
    db = SqliteDatabase('main.sqlite')

    with db:
        transaction = Transaction.get(Transaction.id == transaction_id)

        report = transaction.reports[0]
        cnt = 0
        pdf_files = []

        reference = None
        errors_count = 0
        for file in report.files:
            cnt += 1
            if reference is None:
                doc = fitz.open("files/client/" + file.filename)
                reference = find_theme(doc[0].get_text())
            pdf_files.append(f"files/report/part-{cnt}-{transaction_id}.pdf")
            errors = analyze_file("files/client/" + file.filename, f"files/report/part-{cnt}-{transaction_id}.pdf",
                                  reference)
            for error in errors:
                errors_count += 1
                Error.create(page=error['page'],
                             description=error['description'],
                             match=error['match'],
                             subject=error['subject'],
                             file=file)

        report.checked_count = report.files_count
        report.reference = reference
        report.errors_count = errors_count
        report.save()
        with zipfile.ZipFile(f"files/report/report-pdf-{transaction_id}.zip", "w") as zipf:
            # Добавление файлов в архив
            for file in pdf_files:
                zipf.write(file)

        # csv
        df = pd.DataFrame(errors, columns=['filename', 'page', 'match', 'lev', 'subject', 'description'])
        with open(f"files/report/report-csv-{transaction_id}.csv", 'w') as f:
            df.to_csv(f, index=False)


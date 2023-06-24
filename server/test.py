from Levenshtein import distance as lev
from fitz import fitz
import re

def jaccard(list1, list2):
    list1, list2 = list(list1), list(list2)
    intersection = len([x1 == x2 for (x1, x2) in zip(list1, list2)])
    union = (len(list1) + len(list2))
    return float(intersection) / union


def split_s(s):
    return [char for char in s]


def find_theme(text: str):
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
    return chosed_text


def analyze_file(name, phrase):
    doc = fitz.open(name)
    phrase_split = phrase.split()

    l = len(phrase)
    page_count = 0

    info = []

    # filename, page, Jaccara, Levent, word, bad_word

    for page in doc:
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
                    if (len(word2) - len(word)) > 5:
                        continue
                    else:
                        dist = lev(word, word2) / len_w
                        if dist < 0.1:
                            info.append(
                                {'filename': name, 'page': page_count, 'JaccardDistance': jaccard(word, word2),
                                 'LevenshteinDistance': lev(word, word2), 'row_word': word, 'mistake_word': word2}
                            )
                            area = page.search_for(word2)
                            page.add_highlight_annot(area)
    doc.save("highlighted_text.pdf")
    return info


analyze_file("files/client/la_add_2022.pdf", "функция пространство линейный оператор хаосхолдер")

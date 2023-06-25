def analyze_file_sent(name, phrase):

  doc = fitz.open(name)
  print(len(doc))

  phrase_split = phrase.split()
  l = len(phrase)
  page_count = 0
  info = []
  
  for page in doc:
    page_count+=1
    
    text = sent_tokenize(page.get_text(), language='russian')
    print(text[:10])
    for sent in text:
      
      if sent in phrase_split:
        area = page.search_for(sent)
        page.add_highlight_annot(sent)
      else:
        break
        dist = lev(sent,phrase)
        # print(dist/l, end=' ')
        if dist/l < 0.7:
          print()
        if dist>100000:
          if len(word) == len(word2):
            descr = 'Изменен символ: ' + word + ' and ' + word2
          else:
            descr = 'Разная длина слов: ' + word + ' and ' + word2

          info.append(
              {'filename': name.split('/')[-1], 'page': page_count, 'match': jaccard(word, word2), 'lev': lev(word,word2), 'subject':word, 'description': descr}
              )
          area = page.search_for(word)
          page.add_highlight_annot(area)

              
  doc.save("highlighted_text.pdf")


def process_mask(row_mask, t=4):
  '''
  Убирает все последовательности единиц короче <t>
  Если есть один нуль между единицами, кастует его к единице
  '''

  n = len(row_mask)
  post_mask = [0]*(n)
  hold = t # длина условного эталона - 3
  c=0

  for i in range(n):
    if row_mask[i]:
      c+=1
    else:
      if c >= hold:
        for j in range(i,i-c,-1): post_mask[j]=1
        c = 0

  for i in range(1,n-1):
    if post_mask[i]==0 and post_mask[i-1]==1 and post_mask[i+1]==1:
      post_mask[i]=1

  return post_mask


def jaccard(list1, list2):
  list1, list2 = list(list1), list(list2)
  intersection = len([x1==x2 for (x1,x2) in zip(list1,list2)])
  union = (len(list1) + len(list2))
  return float(intersection)/union

def split_s(s):
  return [char for char in s]


def analyze_file(name, phrase):
  doc = fitz.open(name)
  phrase_split = phrase.split()
  l = len(phrase)
  page_count = 0
  info = []
  
  for page in doc:
    page_count+=1
    
    text = page.get_text().split()
    text = [word for word in text if len(word)>3]

    mask = []

    for word in text:
      len_w = len(word)
      
      if word in phrase_split:
        mask.append(1)
      else:
        flag = False
        for word2 in phrase_split:
          if (len(word2)-len(word)) > 7:
            continue
          else:
            dist = lev(word,word2)/len_w
            if dist<0.2:
              if len(word) == len(word2): descr = 'Изменен символ: ' + word + ' and ' + word2
              else: descr = 'Разная длина слов: ' + word + ' and ' + word2
              info.append({'filename': name.split('/')[-1], 'page': page_count, 'match': jaccard(word, word2), 'lev': lev(word,word2), 'subject':word, 'description': descr})
              mask.append(1)
              flag = True
              break
          if flag:
            break

        if not(flag):
          mask.append(0)

    mask = process_mask(mask, 4)

    for r, word in zip(mask, text):
      if r: page.add_highlight_annot(page.search_for(word))

              
  doc.save("highlighted_text.pdf")
  return info

def make_csv(info):
  df = pd.DataFrame(info, columns=['filename','page','match','lev','subject','description'])
  df.to_csv('info.csv')

def main(name,phrase):

  info = analyze_file(name, phrase)
  make_csv(info)

  return info
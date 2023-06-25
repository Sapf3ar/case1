# Решение команды mlballs_v2 (misis) для кейса ФАУ «Главгосэкспертиза России» на хакатоне Цифровой прорыв.

Наше решение для ФАУ «Главгосэкспертиза России» — это продукт, который с помощью машинного обучения (ML) автоматически определяет и сравнивает наименование объектов капитального строительства в проектной документации. Оно значительно упрощает и ускоряет процесс обработки больших массивов текстовых данных, снижая вероятность ошибок и расхождений.

## Описание решения

Нашим решением является веб портал. На нем можно осуществить следующие действия:

- загрузить набор документов с наименованием объекта капитального строительства (ОКС) (pdf)
- извлечь из файла наименование ОКС
- получить отчет с описанием всех ошибок в наименовании ОКС.
- отчет можно просматривать прямо на веб портале или загрузить архив с pdf файлами, в которых отмечены все ошибки
- отчет можно получить в виде csv файла с указанием всех ошибок и их места в файлах

## Инструкция по запуску

### Работа с сервисом

Фронтенд нашего сервиса доступен по ссылке:  [94.45.223.241:46875](http://94.45.223.241:46875)
Вы можете использовать его для тестирования. Однако, если вы хотите запустить сервис локально, то вам необходимо выполнить следующие действия:

### Локальный запуск

Перед тем, как развернуть у себя сервис необходимо установить [Docker](https://docs.docker.com/get-docker/) и [Docker Compose](https://docs.docker.com/compose/install) на вашу машину.

Далее, необходимо выполнить следующие действия:

```bash
# Клонируем репозиторий
git clone -b main https://github.com/Sapf3ar/case1.git
# Переходим в папку с проектом
cd MISIS_AI_Lab_Xmas/dockerItems
# Запускаем сервис
docker-compose up -d
```

Теперь вы можете открыть в браузере [localhost](http://localhost:80) и увидеть работающий сервис.  

### Структура проекта

Репозиторий состоит из следующих папок:

- [**server**](/server/) - содержит backend сервиса
- [**ML**](/ml/) - содержит модель для обработки документов
- [**frontend**](/frontend/) - содержит фронтенд сервиса

## Архитектура

На диаграмме ниже можно посмотреть на верхнеуровневую архитектуру нашего сервиса.

## Машинное Обучение

### Стек

- **hugginface** - библиотека для разработки и использования моделей глубокого обучения для обработки естественного языка (NLP)
- **sklearn** - библиотека с обучающим пайплайном для торча

  
### Подходы

- **Deep Learning** - подход, основанный на нейронных сетях
- **Transfer Learning** - подход, основанный на использовании предобученных моделей
- **NLP** - подход, основанный на обработке естественного языка
- **Text Classification** - подход, основанный на классификации текста
- **Text Preprocessing** - подход, основанный на предобработке текста

## Контакты

В случае возникновения каких-либо ошибок или вопросов не стесняйтесь создавать Issue в репозитории. 
  

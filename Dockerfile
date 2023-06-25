FROM python:3.8-slim-buster

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN apt-get update && apt-get install -y \
    gcc \
    libmupdf-dev \
    python3-dev \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get purge -y --auto-remove gcc

COPY . .

EXPOSE 8081

ENTRYPOINT ["python3"]
CMD ["-m", "server"]

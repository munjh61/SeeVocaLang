FROM python:3.9

WORKDIR /app

RUN apt-get update && \
    apt-get install -y libgl1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./svl ./svl

COPY ./best.pt ./best.pt

WORKDIR /app/svl

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
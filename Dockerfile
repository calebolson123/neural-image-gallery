FROM python:3.10-alpine

ENV PATH="${PATH}:/sbin"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /server
COPY requirements.txt /server/
RUN pip install -r requirements.txt
COPY . /server/
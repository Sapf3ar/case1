import uuid

from peewee import Model, AutoField, CharField, IntegerField, ForeignKeyField, TextField, UUIDField, BooleanField
from server.database.base import db


class BaseModel(Model):
    class Meta:
        database = db


class Transaction(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)


class Report(BaseModel):
    id = AutoField()
    transaction = ForeignKeyField(Transaction, backref='reports')
    reference = CharField(null=True)
    files_count = IntegerField(null=True)
    checked_count = IntegerField(null=True)
    errors_count = IntegerField(null=True)
    match_count = IntegerField(null=True)


class File(BaseModel):
    id = AutoField()
    report = ForeignKeyField(Report, backref='files')
    is_checked = BooleanField(null=True, default=False)
    filename = CharField(null=True)


class Error(BaseModel):
    id = AutoField()
    file = ForeignKeyField(File, backref='errors')
    description = TextField(null=True)
    subject = CharField(null=True)
    match = IntegerField(null=True)
    page = IntegerField(null=True)
    line = IntegerField(null=True)


db.create_tables([Transaction, Report, File, Error])

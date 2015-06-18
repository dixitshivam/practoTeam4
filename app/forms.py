from flask.ext.wtf import Form
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired


class LoginForm(Form):
    openid = StringField('openid', validators=[DataRequired()])
    remember_me = BooleanField('remember_me', default=False)

class UpdateForm(Form):
    id = IntegerField('id', validators=[DataRequired()], default=None)
    name = StringField(validators=[DataRequired()])
    education = StringField(default=None)
    expertise = StringField(default=None)
    experience = StringField(default=None)
    email = StringField(default=None)
    description = StringField(default=None)
    specialization = StringField(validators=[DataRequired()])
    area = StringField(validators=[DataRequired()])
    city = StringField(validators=[DataRequired()])
    country = StringField()
    completeaddress = StringField(default=None)
    fee = StringField(default=None)
    timings = StringField(default=None)
    phone_number = StringField(default=None)
    dial_extension = StringField(default=None)
    sponsored = StringField(default=None)
    recommended = IntegerField()
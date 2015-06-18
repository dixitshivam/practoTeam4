from flask import render_template, flash, redirect, jsonify, request, url_for
from app import app, models, db, forms
from jinja2 import Environment, PackageLoader
from forms import UpdateForm
import json

env = Environment(loader=PackageLoader('app', "templates"))
basic_template = env.get_template('basic_template.html')
search_template = env.get_template('search_template.html')
city_template = env.get_template('city_template.html')

@app.route("/")
def home_page():
    practoCSS = url_for('static', filename='practo.css')
    functionsJS = url_for('static', filename='city.js')
    return city_template.render(practoCSS=practoCSS, functionsJS=functionsJS)

@app.route("/<city>")
def search_page(city,index=1):
    if city != None:
        city = city.upper()
    practoCSS = url_for('static', filename='practo.css')
    functionsJS = url_for('static', filename='functions.js')
    return search_template.render(practoCSS=practoCSS, functionsJS=functionsJS, city=city, index=index)

@app.route("/get/<city>")
def areas_by_city(city):
    if city != None:
        city = city.upper()
    list = models.AreaMapping.query.filter_by(city=city)
    areas = []
    for li in list:
        m = {}
        for key in li.__dict__.keys():
            if key != '_sa_instance_state':
                m[key] = li.__dict__[key]
        areas.append(m)
    return jsonify(results=areas)

@app.route('/<city>/<area>/<specialization>/<page>',methods=['GET', 'POST'])
def doctors_by_area(city, area, specialization, page):
    if city != None:
        city = city.upper()
    if area != None:
        area = area.upper()
    list = models.Doctor.query.filter_by(
        city=city, area=area, specialization=specialization)
    list_of_doctors = []
    counter = 0
    low = 10*(int(page)-1)
    high = 10*(int(page)) - 1
    for li in list:
        m = {}
        if counter >= low and counter <= high:
            for key in li.__dict__.keys():
                if key != '_sa_instance_state':
                    m[key] = li.__dict__[key]
            list_of_doctors.append(m)
        counter += 1
    return jsonify(results=list_of_doctors)

@app.route('/add_area', methods=['GET', 'POST'])
def add_area():
    if request.method == "POST":
        u = models.AreaMapping(request.form['area'], request.form['city'])
        db.session.add(u)
        db.session.commit()
        return render_template('add_new.html')
    else:
        return render_template('add_new.html')

@app.route('/insert_doctor', methods=['GET', 'POST'])
def insert_doctor():
    return render_template('add_doctor.html')

#Method to add a doctor
@app.route('/add_doctor', methods=['GET', 'POST'])
def add_doctor():
    if request.method == "POST":
        doctor = models.Doctor(request.form['name'], request.form['specialization'], request.form['area'], request.form['city'], request.form['education'], request.form['expertise'], request.form['experience'], request.form['email'], request.form['description'], 
            request.form['country'], request.form['completeaddress'], request.form['fee'], request.form['phone_number'], request.form['timings'])
        db.session.add(doctor)
        db.session.commit()
        add_area(request.form['area'], request.form['city'])
        return render_template('update_result.html', message="Success", doctorId=doctor.id)
    else:
        return render_template('update_result.html', message="Failed")

#Method to show admin page
@app.route('/adminIndex', methods=['GET', 'POST'])
def admin_index():
    return render_template('admin.html')

#Method to show doctor list
@app.route('/doctor/<int:flag>/<city>', methods=['GET', 'POST'])
def doctors_by_city(flag, city):
    if city != None:
            city = city.upper()
    doctor_data = models.Doctor.query.filter_by(city=city).all()
    doctor_list = []
    for doctor in doctor_data:
        doctor_map = {}
        for key in doctor.__dict__.keys():
            if key != '_sa_instance_state':
                doctor_map[key] = doctor.__dict__[key]
        doctor_list.append(doctor_map)
    if flag == 0:
        return render_template('read_data.html', doctor_list=doctor_list)
    elif flag == 1:
        return render_template('delete_data.html', doctor_list=doctor_list)
    else:
        return render_template('update_data.html', doctor_list=doctor_list)

#Method to delete a doctor
@app.route('/deleteDoctor/<int:doctorId>', methods=['GET', 'POST'])
def delete_doctor(doctorId):
    doctor_object = models.Doctor.query.filter_by(id=doctorId).first()
    if doctor_object == None:
        return render_template('deleteMessage.html', message='User not present')
    db.session.delete(doctor_object)
    db.session.commit()
    return render_template('deleteMessage.html', message='Object deleted successfully')

#Method to show single user data
@app.route('/single_user_data/<int:doctorId>', methods=['GET', 'POST'])
def update_doctor(doctorId):
    doctor_data = models.Doctor.query.filter_by(id=doctorId).first()
    if doctor_data == None:
        return render_template('update.html', message='No such user', id=doctorId)
    return render_template('update.html', message='User present', id=doctorId)

#Method to update profile of a doctor
@app.route('/update/<int:doctorId>', methods=['GET', 'POST'])
def single_user_data(doctorId):
    update_form = UpdateForm(request.form)
    doctor_object = models.Doctor.query.filter_by(id=doctorId).first()
    for key in update_form.__dict__.keys():
        if update_form.__dict__[key] != None:
            doctor_object.__dict__[key] = update_form.__dict__[key]
    db.session.commit()
    add_area(update_form.__dict__['area'], update_form.__dict__['city'])
    return render_template('update_result.html', message='Updated successfully')

#Method to add area, city
def add_area(area, city):
    if city != None:
        city = city.upper()
    if area != None:
        area = area.upper()
    area_city = models.Doctor.query.filter_by(area=area, city=city).first()
    if area_city == None:
        area_object = models.AreaMapping(request.form['area'], request.form['city'])
        db.session.add(area_object)
        db.session.commit()
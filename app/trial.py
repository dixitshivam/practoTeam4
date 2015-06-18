

def doctors_by_area(city, area, specialization, page):
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
    print jsonify(results=list_of_doctors)
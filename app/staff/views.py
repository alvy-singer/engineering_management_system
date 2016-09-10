# -*- coding:utf-8 -*-

from flask import render_template, request
from flask_login import login_required, current_user
import json
import traceback

from . import staff
from app.models import Department
from app import db


@staff.route("/manage/", methods=["GET", "POST"])
@login_required
def department():
    user = current_user
    return render_template("staff/staff_list.html", user=user)


@staff.route("/department/get_tree_json/", methods=["GET", "POST"])
@login_required
def get_tree_json():
    query_data = Department.query.all()
    departments = [i.to_dict() for i in query_data]
    return json.dumps(departments)


@staff.route("/department/add/", methods=["POST"])
@login_required
def add_department():
    try:
        current_id = request.form["current_id"]
        name = request.form["name"]
        new_dep = Department(name=name, pId=int(current_id))
        db.session.add(new_dep)
        return json.dumps({"info": "success", "new_id": new_dep.id})
    except:
        print traceback.format_exc()
        return json.dumps({"info": "fail"})


@staff.route("/department/rename/", methods=["POST"])
@login_required
def rename_department():
    try:
        dep_id = request.form["dep_id"]
        new_name = request.form["name"]
        dep = Department.query.get(int(dep_id))
        dep.name = new_name
        db.session.add(dep)
        return json.dumps({"info": "success"})
    except:
        print traceback.format_exc()
        return json.dumps({"info": u"修改失败"})


@staff.route("/department/remove/", methods=["POST"])
@login_required
def remove_department():
    try:
        dep_id = request.form["dep_id"]
        dep = Department.query.get(int(dep_id))
        print 'u'*100
        print dep.users
        if dep.users:
            return json.dumps({"info": u"此部门下有员工，不能删除"})
        db.session.delete(dep)
        return json.dumps({"info": "success"})
    except:
        return json.dumps({"info": u"删除失败"})

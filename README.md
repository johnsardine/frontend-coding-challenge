This challenge is dedicated to front end engineers and consists on building a simple interface that displays the text annotations and mistakes by contacting our SmartCheck service using a REST API.


### Requirements
* Install a package management system for Python, like pip
* Install a virtual environment builder for Python, like virtualenv

How to install on Mac OSX
http://jamie.curle.io/posts/installing-pip-virtualenv-and-virtualenvwrapper-on-os-x/


### Installation
* First fork this repo
* Create a virtualenv for the project
* Install project requirements (pip install -r requirements.txt)
* Start server (python manage.py runserver)


### Instructions
Create a simple TemplateView to display the text returned by the endpoint GET /api/v1/task/ (task.json). The user has to be able to see both "source" and "target" texts on the interface. Only the "target" text can be editable.

Mark the text highlighting the annotations on the task.json.

# 4º, call smartcheck and display issues on sentences

# 6º, preserve annotations

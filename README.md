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
Create a simple TemplateView for the edit interface under the root URL (https://127.0.0.1:8000/).
The text is returned by the endpoint (GET)/api/v1/task/. The user has to be able to see both "source" and "target" texts on the interface.
Only the "target" text can be editable. Each "nugget" should be a paragraph and each has a set o "segments" separated by the markup annotations.

Mark the text highlighting the annotations returned with the text nuggets.

Use SmartCheck to detect and highlight the issues returned. This endpoint should be contacted when the user first sees the task and while he is editing.

Preserve the annotations until the user submits the edited task.json to (POST)/api/v1/task/


### SmartCheck
#### cURL example:
```shell
curl -X POST -H "Content-Type: application/json" -d '{
	"src_segments": ["Tuna fish"],
	"trg_segments": ["Atumj"],
	"src_lang": "en",
	"trg_lang": "pt",
	"fast_analysis": true
}' "https://jobcheck.unbabel.com/analyze_job_segments"
```

#### Response example:
```json
{
    "qa_description": {
        "sentence_issues": {
            "spelling": [
                {
                    "errors": "Atumj",
                    "description": "Misspelled word: Atumj",
                    "suggestions": [
                        "Atum",
                        "Atuam",
                        "Tum",
                        "Atuns"
                    ],
                    "err_start": 0,
                    "rule": "ASPELL-Atumj",
                    "seg_id": 0,
                    "err_length": 5,
                    "context": "Atumj",
                    "type": "error"
                }
            ]
        },
        "document_consistency": {}
    },
    "qa_summary": {
        "major": 1,
        "critical": 0,
        "minor": 0
    },
    "qa_score": 3.8
}
```

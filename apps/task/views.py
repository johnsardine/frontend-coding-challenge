import os
import logging
import json

from django.conf import settings
from django.views.generic import View
from django.http import HttpResponse

from django.utils.decorators import method_decorator

from django.views.decorators.csrf import csrf_exempt


def class_view_decorator(function_decorator):

    def simple_decorator(View):  # noqa
        View.dispatch = method_decorator(function_decorator)(View.dispatch)
        return View

    return simple_decorator


@class_view_decorator(csrf_exempt)
class TaskView(View):
    http_method_names = ['get', 'post']

    def get(self, request, **kwargs):
        task_index = request.COOKIES.get("task_index", 0)
        task_path = os.path.join(settings.STATICFILES_DIRS[0],
                                 'mocks/task{}.json'.format(task_index))
        task_json = open(task_path, 'r').read()
        return HttpResponse(task_json, content_type='application/json')

    def post(self, request, **kwargs):
        import pdb; pdb.set_trace()

        try:
            task_dict = json.loads(request.body)
            task_index = task_dict.get('id')

            assert 'source_language' in task_dict, u'Missing source_language'
            assert 'target_language' in task_dict, u'Missing target_language'
            assert 'source_segments' in task_dict, u'Missing source_segments'
            assert 'target_segments' in task_dict, u'Missing target_segments'
            
        except Exception, e:
            return HttpResponse(json.dumps({'message': str(e)}),
                                content_type='application/json')

        resp = HttpResponse()
        resp.set_cookie("task_index", task_index + 1)
        return resp

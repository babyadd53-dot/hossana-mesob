"""Admin session auth helpers."""
from functools import wraps

from flask import jsonify, session


def login_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if not session.get('admin_id'):
            return jsonify(ok=False, error='Authentication required'), 401
        return fn(*args, **kwargs)
    return wrapper

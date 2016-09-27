from .base import *  # noqa
try:
    from .local import *  # noqa
except ImportError as exc:
    exc.args = tuple(
        ['%s (Did you forget to define symlink to local.py?)' % exc.args[0]])
    raise exc

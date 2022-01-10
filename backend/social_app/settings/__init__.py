from decouple import config

if(config("MODE", default="", cast=str)=="dev"):
    from .dev import *
else:
    from .prod import *

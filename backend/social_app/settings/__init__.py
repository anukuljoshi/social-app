from decouple import config

if(config("MODE", default="dev", cast=str)=="dev"):
    from .dev import *
else:
    from .prod import *

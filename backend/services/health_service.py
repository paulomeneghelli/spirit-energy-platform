from datetime import datetime

from config import Config


class HealthService:

    def status(self):

        return {

            "application": Config.API_NAME,

            "version": Config.VERSION,

            "server_time": datetime.now().isoformat(),

            "status": "online"

        }
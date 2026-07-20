import requests


class HTTPClient:

    def __init__(self):

        self.session = requests.Session()

        self.default_headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

    def get(self, url, headers=None, params=None):

        h = self.default_headers.copy()

        if headers:
            h.update(headers)

        return self.session.get(
            url,
            headers=h,
            params=params
        )

    def post(self, url, json=None, headers=None):

        h = self.default_headers.copy()

        if headers:
            h.update(headers)

        return self.session.post(
            url,
            headers=h,
            json=json
        )

    def put(self, url, json=None, headers=None):

        h = self.default_headers.copy()

        if headers:
            h.update(headers)

        return self.session.put(
            url,
            headers=h,
            json=json
        )

    def delete(self, url, headers=None):

        h = self.default_headers.copy()

        if headers:
            h.update(headers)

        return self.session.delete(
            url,
            headers=h
        )
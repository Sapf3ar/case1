#!/usr/bin/env python3

import connexion

from server import encoder
from flask_cors import CORS
import server.database.models

def main():
    app = connexion.App(__name__, specification_dir='./openapi/')
    CORS(app.app)
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('openapi.yaml',
                arguments={'title': 'API для анализа ошибок в файлах'},
                pythonic_params=True)

    app.run(port=8081)


if __name__ == '__main__':
    main()

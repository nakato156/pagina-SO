from dotenv import load_dotenv

load_dotenv()

from os import getenv
from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=not getenv("PRODUCTION", False))
from pathlib import Path

import uvicorn

ROOT_DIR = Path(__file__).resolve().parent


def main() -> None:
    uvicorn.run(
        "app.app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=[str(ROOT_DIR)],
    )


if __name__ == "__main__":
    main()

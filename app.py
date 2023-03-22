import asyncio
import logging
import re
from datetime import datetime
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
logger = logging.getLogger(__name__)


@app.get("/search")
async def search(r: str, kw: str):
    pkgs_path = re.compile(rf"{r}/.*{kw}.*\.apk", re.MULTILINE).findall(new_text)
    return JSONResponse(pkgs_path[:500])


@app.on_event("startup")
async def startup_event():
    await update()
    asyncio.create_task(update_periodically())


@app.get("/")
async def index():
    return FileResponse("web/index.html")


app.mount("/", StaticFiles(directory="web"), name="web")


async def update():
    global new_text
    pkgs_path = Path(__file__).parent / "web/pkgs.txt"
    if pkgs_path.exists():
        with open(pkgs_path, "r") as f:
            new_text = f.read()
    else:
        cmd = "rsync -avz rsync://mirrors.tuna.tsinghua.edu.cn/fdroid/"
        proc = await asyncio.create_subprocess_shell(
            cmd, stdout=asyncio.subprocess.PIPE
        )
        try:
            stdout = (await asyncio.wait_for(proc.communicate(), timeout=40))[0]
        except asyncio.TimeoutError:
            proc.kill()
            return
        raw_list = stdout.decode()
        new_list = re.compile(r"^-rw.+\d\s(.+?\.apk)$", re.MULTILINE).findall(raw_list)
        new_list.sort()
        new_text = "\n".join(new_list)
        with open(pkgs_path, "w") as f:
            f.write(new_text)
        now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        logger.warning(f"{now_time} | Update: {len(new_list)} lines.")


async def update_periodically():
    while True:
        await asyncio.sleep(600)
        await update()

# fdroid-mirror
根据包名查找并从镜像站下载fdroid的安装包（官方索引实在有够烂的）

## 示例站点：

https://f.aya1.pro/

## 自行部署：
要求 python >= 3.8
```bash
git clone https://github.com/Brx86/fdroid-mirror
cd fdroid-mirror
pip install fastapi uvicorn
uvicorn app:app --host=0.0.0.0 --port=8000
```
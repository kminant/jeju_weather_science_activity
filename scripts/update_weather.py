import os
import json
import requests
from datetime import datetime

# ==========================
# GitHub Secret에서 API Key 읽기
# ==========================

API_KEY = os.environ["KMA_API_KEY"]

# ==========================
# 제주 ASOS 관측소 번호
# ==========================

STN = 184

# ==========================
# ASOS 자료 요청
# ==========================

def get_weather():

    url = "https://apihub.kma.go.kr/api/typ01/url/kma_sfctm2.php"

    today = datetime.now().strftime("%Y%m%d")

    params = {

        "tm1": today + "0000",
        "tm2": today + "2359",

        "stn": STN,

        "help": "0",

        "authKey": API_KEY

    }

    response = requests.get(

        url,

        params=params,

        timeout=20

    )

    print(response.status_code)

    lines = response.text.splitlines()

    data = []

    for line in lines:

        # 주석(#)은 제외
        if line.startswith("#"):
            continue

        # 빈 줄 제외
        if not line.strip():
            continue

        data.append(line)

    latest = data[-1]

    print(latest)

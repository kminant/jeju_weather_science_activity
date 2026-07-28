import os
import requests
from datetime import datetime

# ==========================
# GitHub Secret에서 API Key 읽기
# ==========================

API_KEY = os.environ["KMA_API_KEY"]

# ==========================
# API 주소
# ==========================

URL = "https://apihub.kma.go.kr/api/typ01/url/kma_sfctm2.php"

# ==========================
# 오늘 날짜
# ==========================

today = datetime.now().strftime("%Y%m%d")

# ==========================
# 요청 파라미터
# ==========================

params = {
    "tm1": today + "0000",
    "tm2": today + "2359",
    "stn": "184",          # 제주지방기상청
    "help": "0",
    "authKey": API_KEY
}

print("===== API 요청 시작 =====")

response = requests.get(
    URL,
    params=params,
    timeout=20
)

print("상태코드 :", response.status_code)

if response.status_code != 200:
    raise Exception("API 호출 실패")

# ==========================
# 응답 저장
# ==========================

with open("response.txt", "w", encoding="utf-8") as f:
    f.write(response.text)

print("response.txt 저장 완료")

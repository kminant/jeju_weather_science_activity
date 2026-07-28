import json

weather = {
    "station": "제주(184)",
    "temp": 31.4,
    "feel": 34.8,
    "humid": 73,
    "wind": 4.2,
    "dir": "남동",
    "rain": 0,
    "sky": "맑음",
    "obsTime": "2026-07-28 14:00"
}

with open("weather.json", "w", encoding="utf-8") as f:
    json.dump(weather, f, ensure_ascii=False, indent=4)

print("weather.json 생성 완료")

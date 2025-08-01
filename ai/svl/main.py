from fastapi import FastAPI, UploadFile, File, HTTPException
from ultralytics import YOLO
import numpy as np
import cv2

app = FastAPI()
model = YOLO("../best.pt")

@app.post("/yolo", response_model=str)
async def detect_objects(file: UploadFile = File(...)):
    # # 1) 파일 → OpenCV 이미지
    # data = await file.read()
    # arr  = np.frombuffer(data, np.uint8)
    # img  = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    # if img is None:
    #     raise HTTPException(status_code=400, detail="이미지 디코딩 실패")

    # results = model(img)
    # boxes   = results[0].boxes
    # names   = model.names

    # if len(boxes) == 0:
    #     raise HTTPException(status_code=404, detail="검출된 객체가 없습니다")

    # best_box = max(
    #     boxes,
    #     key=lambda b: float(b.conf[0])
    # )
    # cls_id     = int(best_box.cls[0])
    # class_name = names.get(cls_id, f"class_{cls_id}")

    # return class_name
    data = await file.read()
    arr  = np.frombuffer(data, np.uint8)
    img  = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(status_code=400, detail="이미지 디코딩 실패")

    results = model(img)
    boxes   = results[0].boxes
    names   = model.names

    if len(boxes) == 0:
        raise HTTPException(status_code=404, detail="검출된 객체가 없습니다")

    # 모든 박스의 클래스 이름을 추출해서 리스트로 만들기
    class_list = [
        names.get(int(b.cls[0]), f"class_{int(b.cls[0])}")
        for b in boxes
    ]

    # ","로 구분된 문자열로 반환
    return ",".join(class_list)
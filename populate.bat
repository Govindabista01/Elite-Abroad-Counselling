@echo off
set PATH=%PATH%;C:\Program Files\nodejs
cd backend
call venv\Scripts\activate
python populate_data.py
pause

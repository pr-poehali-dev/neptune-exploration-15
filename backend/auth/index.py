import json
import os
import hashlib
import psycopg2

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def handler(event: dict, context) -> dict:
    """Регистрация и вход участников ESCAPE-CS. action=register|login"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    action = (event.get("queryStringParameters") or {}).get("action", "register")

    conn = get_conn()
    cur = conn.cursor()

    if action == "register":
        nickname = body.get("nickname", "").strip()
        login = body.get("login", "").strip()
        password = body.get("password", "").strip()
        age = body.get("age")

        if not all([nickname, login, password, age]):
            cur.close(); conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Заполните все поля"})}

        try:
            age = int(age)
        except (ValueError, TypeError):
            cur.close(); conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Некорректный возраст"})}

        if age < 10 or age > 99:
            cur.close(); conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Возраст должен быть от 10 до 99"})}

        pw_hash = hash_password(password)

        try:
            cur.execute(
                "INSERT INTO users (nickname, login, password_hash, age) VALUES (%s, %s, %s, %s) RETURNING id",
                (nickname, login, pw_hash, age)
            )
            user_id = cur.fetchone()[0]
            conn.commit()
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            cur.close(); conn.close()
            return {"statusCode": 409, "headers": headers, "body": json.dumps({"error": "Никнейм или логин уже занят"})}

        cur.close(); conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True, "id": user_id, "message": "Добро пожаловать в ESCAPE-CS!"})}

    if action == "login":
        login = body.get("login", "").strip()
        password = body.get("password", "").strip()

        if not all([login, password]):
            cur.close(); conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Введите логин и пароль"})}

        pw_hash = hash_password(password)
        cur.execute(
            "SELECT id, nickname, age, rating, hours_played FROM users WHERE login = %s AND password_hash = %s",
            (login, pw_hash)
        )
        row = cur.fetchone()
        cur.close(); conn.close()

        if not row:
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Неверный логин или пароль"})}

        user = {"id": row[0], "nickname": row[1], "age": row[2], "rating": row[3], "hours_played": row[4]}
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True, "user": user})}

    cur.close(); conn.close()
    return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Неизвестный action"})}

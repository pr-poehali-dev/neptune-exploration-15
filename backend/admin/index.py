import json
import os
import psycopg2

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """Админ-панель ESCAPE-CS: список участников, статистика, удаление, редактирование"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    req_headers = event.get("headers") or {}
    token = req_headers.get("X-Admin-Token") or req_headers.get("x-admin-token") or ""
    admin_password = os.environ.get("ADMIN_PASSWORD", "")

    body = json.loads(event.get("body") or "{}")
    action = (event.get("queryStringParameters") or {}).get("action", "")

    # Логин — не требует токена
    if action == "login":
        password = body.get("password", "")
        if password == admin_password:
            return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True, "token": admin_password})}
        return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Неверный пароль"})}

    # Все остальные действия требуют токен
    if token != admin_password:
        return {"statusCode": 403, "headers": headers, "body": json.dumps({"error": "Доступ запрещён"})}

    conn = get_conn()
    cur = conn.cursor()

    # Список участников + статистика
    if action == "users":
        cur.execute("""
            SELECT id, nickname, login, age, rating, hours_played, created_at
            FROM users ORDER BY created_at DESC
        """)
        rows = cur.fetchall()
        users = [
            {"id": r[0], "nickname": r[1], "login": r[2], "age": r[3],
             "rating": r[4], "hours_played": r[5], "created_at": str(r[6])}
            for r in rows
        ]

        cur.execute("SELECT COUNT(*) FROM users")
        total = cur.fetchone()[0]

        cur.execute("SELECT COUNT(*) FROM users WHERE created_at >= CURRENT_DATE")
        today = cur.fetchone()[0]

        cur.close(); conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({
            "ok": True, "users": users,
            "stats": {"total": total, "today": today}
        })}

    # Удаление участника
    if action == "delete":
        user_id = body.get("id")
        if not user_id:
            cur.close(); conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Не указан id"})}
        cur.execute("DELETE FROM users WHERE id = %s", (user_id,))
        conn.commit()
        cur.close(); conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}

    # Редактирование рейтинга и часов
    if action == "update":
        user_id = body.get("id")
        rating = body.get("rating")
        hours = body.get("hours_played")
        if not user_id:
            cur.close(); conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Не указан id"})}
        cur.execute(
            "UPDATE users SET rating = %s, hours_played = %s WHERE id = %s",
            (int(rating), int(hours), user_id)
        )
        conn.commit()
        cur.close(); conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}

    cur.close(); conn.close()
    return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Неизвестный action"})}

from openai import OpenAI

def consulta(prompt):
    client = OpenAI(api_key="API KEY")
    completion = client.chat.completions.create(
    model="ft:gpt-3.5-turbo-0125:personal:goku2:96rKiPC5",
    messages=[
        {"role": "system", "content": "¡Hey, chicos! ¿Qué tal? Soy Gokú ¡Me alegro de verlos! ¿Listos para otra aventura?"},
        {"role": "user", "content": "Sí, claro ¿Quieres comer algo?"},
        {"role": "system", "content": "¡Me muero de hambre! ¿Cuándo vamos a comer?"},
        {"role": "user", "content": "Después de entrenar juntos"},
        {"role": "system", "content": "¡Eso suena genial! Entrenar juntos me dará aún más hambre. ¡Vamos a hacerlo!"},
        {"role": "user", "content": prompt}
        ]
    )
    return completion.choices[0].message.content
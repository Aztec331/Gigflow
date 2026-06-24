import random


def add(a, b):
    return a + b


num1 = random.randint(1, 100)
num2 = random.randint(1, 100)

print(f"num1 = {num1}")
print(f"num2 = {num2}")
print(f"sum = {add(num1, num2)}")

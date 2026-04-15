---
title: Variables, Data Types & Operators
type: code
duration: 45
---

## Variables and Data Types

A variable is a named container for a value. Python is dynamically typed — you do not declare types explicitly.

```python
# Integers
age = 21
year = 2026

# Floats
gpa = 3.75

# Strings
name = "Amara Diallo"

# Booleans
is_enrolled = True

# Check the type
print(type(age))    # <class 'int'>
print(type(name))   # <class 'str'>
```

### Arithmetic Operators

```python
x = 10
y = 3

print(x + y)   # 13  — addition
print(x - y)   # 7   — subtraction
print(x * y)   # 30  — multiplication
print(x / y)   # 3.333 — true division
print(x // y)  # 3   — floor division
print(x % y)   # 1   — modulo (remainder)
print(x ** y)  # 1000 — exponentiation
```

### String Operations

```python
first = "Kwame"
last  = "Mensah"
full  = first + " " + last       # concatenation
greeting = f"Hello, {full}!"     # f-string (preferred)
print(greeting.upper())          # HELLO, KWAME MENSAH!
print(len(full))                 # 11
```

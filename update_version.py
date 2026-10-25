import ctypes



with open('version.txt', 'r') as file:
    content = file.read().strip()

major, minor, patch = content.split('.')
new_patch = str(int(patch) + 1)
new_content = f"{major}.{minor}.{new_patch}"

with open('version.txt', 'w') as file:
    file.write(new_content)



import pandas as pd
import sys
import os

def obtener_datos_json(file_path):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    abs_file_path = os.path.join(script_dir, file_path)

    datos = pd.read_excel(abs_file_path, engine='openpyxl')
    datos_json = datos.to_json(orient='records')
    return datos_json


# Get the file path from the command-line argument
file_path = sys.argv[1]

# Call the function and obtain the JSON data
datos_json = obtener_datos_json(file_path)

# Print the JSON data
print(datos_json)

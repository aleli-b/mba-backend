import pandas as pd
import json
import re

# Path to the Excel file
# input_file_path = "C:\\Users\\USUARIO\\Desktop\\SQL\\src\\routes\\Libro1 10 al 16-04.xlsx"
input_file_path = "C:\\Users\\USUARIO\\Desktop\\SQL\\src\\routes\\MB-AR-Daily Report-Apr 11th.xlsx"

# Read the Excel file into a DataFrame
data_frame = pd.read_excel(input_file_path)

# Remove newlines from cell values using regular expression
data_frame = data_frame.replace({re.compile(r"\r|\n"): " "}, regex=True)

# Remove newlines from column names
data_frame.columns = data_frame.columns.str.replace(r"\r|\n", " ")

# Convert the DataFrame to a JSON string
json_string = data_frame.to_json(orient="records", force_ascii=False)

# Convert the JSON string back to a list of dictionaries
data = json.loads(json_string)

# Path to save the modified JSON file
output_file_path = "modified_data.json"

# Write the modified JSON to a file
with open(output_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print("Modified JSON file has been created.")

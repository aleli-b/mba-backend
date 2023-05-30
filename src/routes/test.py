import pandas as pd
import json

# Path to the input Excel file
input_file_path = "C:\\Users\\USUARIO\\Desktop\\SQL\\src\\routes\\Libro1 10 al 16-04.xlsx"

# Path to save the JSON file
output_file_path = 'test.json'

# Read the Excel file into a pandas DataFrame
data_frame = pd.read_excel(input_file_path)

# Perform any necessary transformations or data processing on the DataFrame
# For example, you can convert the DataFrame to a JSON string
json_data = data_frame.to_json(orient='records')

# Save the JSON data to the output file
with open(output_file_path, 'w') as file:
    file.write(json_data)

print('File converted to JSON and saved successfully.')

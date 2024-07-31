import os
import pandas as pd
from pymongo import MongoClient
import tkinter as tk
from tkinter import filedialog
import math
import csv
from xml.etree.ElementTree import Element, SubElement, tostring
from xml.etree import ElementTree as ET
from xml.dom import minidom

connection_string = "mongodb+srv://yassirelattar:DPx3HW6FOdSvBEIu@cluster0.ldubnwm.mongodb.net/"

# Connect to MongoDB
client = MongoClient(connection_string)
db_name = 'darijadatabase'

def prettify(elem):
    """Return a pretty-printed XML string for the Element."""
    rough_string = tostring(elem, 'utf-8')
    reparsed = minidom.parseString(rough_string)
    return reparsed.toprettyxml(indent="  ")


def from_csv_to_xml():

    # Open a dialog for selecting a directory
    root = tk.Tk()
    root.withdraw()
    folder_selected = filedialog.askdirectory()

    # Get list of all CSV files in the selected directory
    csv_files = [f for f in os.listdir(folder_selected) if os.path.isfile(os.path.join(folder_selected, f)) and f.endswith('.csv')]
    #print(csv_files)

    os.mkdir(f"{folder_selected}/xml_files")

    #csv_file = 'animals.csv'
    
    #xml_root.set('name', csv_file.split('.')[0])
    for csv_file in csv_files:
        xml_root = Element('corpus')
        with open(f"{folder_selected}/{csv_file}", newline='', encoding='utf-8', errors='ignore') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                entry = SubElement(xml_root, 'entry')
                for field in reader.fieldnames:
                    if field in ['n1', 'darija_ar', 'eng',"indef","def","ana","nta","nti","howa","hia","7na","ntoma","homa","masculine","feminine","masc_plural","fem_plural","verb","noun",] or row[field]:
                        child = SubElement(entry, field)
                        child.text = row[field] if row[field] else ''
        
        xml_str = prettify(xml_root)

        with open(f"{folder_selected}/xml_files/{csv_file.split('.')[0]}.xml", 'w', encoding='utf-8') as xmlfile:
            xmlfile.write(xml_str)

    print('data was converted successfully to xml')


#First version to create db without using XML:
def from_csv_to_db(db_name, client):
    # Open a dialog for selecting a directory
    root = tk.Tk()
    root.withdraw()
    folder_selected = filedialog.askdirectory()

    # Get list of all CSV files in the selected directory
    csv_files = [f for f in os.listdir(folder_selected) if os.path.isfile(os.path.join(folder_selected, f)) and f.endswith('.csv')]

    db = client[db_name]

    for file in csv_files:
        # Read CSV file into a pandas DataFrame
        df = pd.read_csv(os.path.join(folder_selected, file))

        # Convert DataFrame to a list of dictionaries
        data = df.to_dict('records')

        #print(f'before: \n{data}')
        newdata=[]
        for val in data:
            val = {key: value for key, value in val.items() if not str(value) == 'nan'}
            newdata.append(val)
        #print(f'after: \n{newdata}')

        # Create a new collection with the same name as the file (without the .csv extension)
        collection_name = os.path.splitext(file)[0]
        collection = db[collection_name]

        # Insert data into the collection
        collection.insert_many(newdata)

    print("Data imported successfully.")

    client.close()

def fix_conjug_past():
    with open('conjug_past.csv', mode='r', newline='') as infile:
        reader = csv.DictReader(infile)
        rows = list(reader)

    # Add the new column "root" with the same values as "howa"
    for row in rows:
        row['root'] = row['howa']

    # Define the new header
    new_header = ['root', 'ana', 'nta', 'nti', 'howa', 'hia', 'h7na', 'ntoma', 'homa']

    # Write the updated data to a new CSV file
    with open('output.csv', mode='w', newline='') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=new_header)
        writer.writeheader()
        writer.writerows(rows)



def save_xml_to_mongodb(db_name,client):
    # Open a dialog for selecting a directory
    root = tk.Tk()
    root.withdraw()
    folder_selected = filedialog.askdirectory()

    # Get list of all CSV files in the selected directory
    xml_files = [f for f in os.listdir(folder_selected) if os.path.isfile(os.path.join(folder_selected, f)) and f.endswith('.xml')]

    for xml_file in xml_files:
        # Parse the XML files
        tree = ET.parse(xml_file)
        root = tree.getroot()

        # The collection name is the XML file name without the extension
        collection_name = xml_file.split('.')[0]
        collection = client[db_name][collection_name]

        # Iterate over each entry in the XML and insert it into the collection
        for entry in root.findall('entry'):
            record = {child.tag: child.text for child in entry}
            collection.insert_one(record)


#Function to get the collection names in the database:
def get_collection_names(database_name, client):
    
    # Access the specified database
    db = client[database_name]
    
    # Get the names of all collections in the database
    collection_names = db.list_collection_names()
    
    # Close the MongoDB connection
    client.close()
    
    return collection_names

#Remove the NaN values from the collections already in the database:
def remove_nan_values(db_name,collection_name, client, field_names=list):
    
    # Access the specified collection
    db = client[db_name]
    
    for field_name in field_names:
        # Define the update query
        update_query = {
            "$or": [
                { field_name: { "$type": "double" }, "$expr": { "$eq": [f"${field_name}", float("nan")] } }
            ]
        }
        unset_query = { "$unset": { field_name: "" } }
        
        # Execute the update operation
        result = db.collection_name.update_many(update_query, unset_query)
    
    # Close the MongoDB connection
    client.close()
    
    return result



from_csv_to_db(db_name,client)

#from_csv_to_xml()
#save_xml_to_mongodb(db_name,client)

# Example 
"""db_name='darijadb1'
collection_name = "colors"
field_names = ["n2","n3","n4"]
result = remove_nan_values(db_name,collection_name,client, field_names)
print("Modified documents:", result.modified_count)
"""





"""root = tk.Tk()
root.withdraw()
folder_selected = filedialog.askdirectory()"""

# Get list of all CSV files in the selected directory
#xml_files = [f for f in os.listdir(folder_selected) if os.path.isfile(os.path.join(folder_selected, f)) and f.endswith('.xml')]
#print(xml_files)

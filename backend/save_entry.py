import json
import os
from datetime import datetime


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "reflections.json")

def save_entry():
    """
    Function for saving  reflection to reflections.json
    Get user user inputs from console
    """
    print("=== Reflective Journal - Add New Entry ===")
    print()
    
    # Ask user for input
    name = input("Enter your name: ").strip()
    while not name:
        print("Name cannot be empty!")
        name = input("Enter your name: ").strip()
    
    print()
    reflection_text = input("Enter your reflection: ").strip()
    while not reflection_text:
        print("Reflection cannot be empty!")
        reflection_text = input("Enter your reflection: ").strip()
    
    # Create new reflection entry
    new_reflection = {
        "name": name,
        "date": datetime.now().strftime("%a %b %d %Y"),  # Format: "Mon Dec 07 2024"
        "reflection": reflection_text,
        "timestamp": datetime.now().isoformat()
    }
    
    reflections = []
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                reflections = json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            print("Warning: Could not read existing reflections. Starting fresh.")
            reflections = []
    
    # add new entry to reflections
    reflections.append(new_reflection)
    
    # Save to JSON file
    try:
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(reflections, f, indent=4, ensure_ascii=False)
        
        print()
        print("New reflection added successfully!")
        print(f"Name: {name}")
        print(f"Date: {new_reflection['date']}")
        print(f"Reflection: {reflection_text[:100]}{'...' if len(reflection_text) > 100 else ''}")
        
    except Exception as e:
        print(f"Error saving reflection: {e}")
        return False
    
    return True

def view_reflections():
    """
    Function to view all saved reflections
    """
    if not os.path.exists(DATA_FILE):
        print("No reflections file found. Add some reflections first!")
        return
    
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            reflections = json.load(f)
        
        if not reflections:
            print("No reflections found in the file.")
            return
        
        print("\n=== All Saved Reflections ===")
        print(f"Total: {len(reflections)} reflections")
        print("=" * 50)
        
        for i, reflection in enumerate(reflections, 1):
            print(f"\nEntry #{i}")
            print(f"Name: {reflection['name']}")
            print(f"Date: {reflection['date']}")
            print(f"Reflection: {reflection['reflection']}")
            print("-" * 30)
            
    except Exception as e:
        print(f"Error reading reflections: {e}")

if __name__ == "__main__":
    # Main program loop
    while True:
        print("\nReflective Journal - Python Backend")
        print("=" * 40)
        print("1. Add new reflection")
        print("2. View all reflections") 
        print("3. Exit")
        print("=" * 40)
        
        choice = input("Choose an option (1-3): ").strip()
        
        if choice == "1":
            save_entry()
        elif choice == "2":
            view_reflections()
        elif choice == "3":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please enter 1, 2, or 3.")
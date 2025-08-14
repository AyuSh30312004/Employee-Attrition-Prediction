import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import joblib
import os
import warnings

warnings.filterwarnings('ignore')

def create_sample_dataset():
    """Create a comprehensive sample dataset for employee attrition prediction"""
    np.random.seed(42)
    n_samples = 2000
    
    # Generate realistic employee data
    data = {
        'Age': np.random.normal(35, 8, n_samples).astype(int),
        'MonthlyIncome': np.random.lognormal(8.5, 0.5, n_samples).astype(int),
        'DistanceFromHome': np.random.exponential(8, n_samples).astype(int),
        'YearsAtCompany': np.random.exponential(5, n_samples).astype(int),
        'JobSatisfaction': np.random.choice([1, 2, 3, 4], n_samples, p=[0.1, 0.2, 0.4, 0.3]),
        'WorkLifeBalance': np.random.choice([1, 2, 3, 4], n_samples, p=[0.05, 0.15, 0.6, 0.2]),
        'Education': np.random.choice([1, 2, 3, 4, 5], n_samples, p=[0.1, 0.2, 0.3, 0.3, 0.1]),
        'OverTime': np.random.choice([0, 1], n_samples, p=[0.7, 0.3]),
        'Department': np.random.choice(['Sales', 'Research & Development', 'Human Resources'], 
                                     n_samples, p=[0.5, 0.4, 0.1]),
        'JobRole': np.random.choice([
            'Sales Executive', 'Research Scientist', 'Laboratory Technician',
            'Manufacturing Director', 'Healthcare Representative', 'Manager',
            'Sales Representative', 'Research Director', 'Human Resources'
        ], n_samples)
    }
    
    # Create DataFrame
    df = pd.DataFrame(data)
    
    # Ensure realistic ranges
    df['Age'] = np.clip(df['Age'], 18, 65)
    df['MonthlyIncome'] = np.clip(df['MonthlyIncome'], 1500, 25000)
    df['DistanceFromHome'] = np.clip(df['DistanceFromHome'], 1, 50)
    df['YearsAtCompany'] = np.clip(df['YearsAtCompany'], 0, 40)
    
    # Create target variable with realistic correlations
    attrition_prob = (
        0.3 * (df['JobSatisfaction'] <= 2) +
        0.2 * (df['WorkLifeBalance'] <= 2) +
        0.15 * (df['OverTime'] == 1) +
        0.1 * (df['DistanceFromHome'] > 20) +
        0.1 * (df['MonthlyIncome'] < 3000) +
        0.05 * (df['Age'] < 25) +
        0.1 * np.random.random(n_samples)
    )
    
    df['Attrition'] = (attrition_prob > 0.4).astype(int)
    
    return df

def preprocess_data(df):
    """Preprocess the data for machine learning"""
    # Separate features and target
    X = df.drop('Attrition', axis=1)
    y = df['Attrition']
    
    # Identify categorical and numerical columns
    categorical_features = ['Department', 'JobRole']
    numerical_features = [col for col in X.columns if col not in categorical_features]
    
    # Create preprocessing pipeline
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', LabelEncoder(), categorical_features)
        ]
    )
    
    return X, y, preprocessor

def train_model():
    """Train the employee attrition prediction model"""
    print("🚀 Starting Employee Attrition Model Training...")
    
    # Create directories
    os.makedirs('models', exist_ok=True)
    os.makedirs('data', exist_ok=True)
    
    # Create and save sample dataset
    print("📊 Creating sample dataset...")
    df = create_sample_dataset()
    df.to_csv('data/employee_data.csv', index=False)
    print(f"✅ Dataset created with {len(df)} samples")
    
    # Preprocess data
    print("🔄 Preprocessing data...")
    X, y, preprocessor = preprocess_data(df)
    
    # Handle categorical encoding manually for this example
    X_processed = X.copy()
    le_dept = LabelEncoder()
    le_role = LabelEncoder()
    
    X_processed['Department'] = le_dept.fit_transform(X_processed['Department'])
    X_processed['JobRole'] = le_role.fit_transform(X_processed['JobRole'])
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        X_processed, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Scale numerical features
    scaler = StandardScaler()
    numerical_cols = ['Age', 'MonthlyIncome', 'DistanceFromHome', 'YearsAtCompany', 
                     'JobSatisfaction', 'WorkLifeBalance', 'Education', 'OverTime']
    
    X_train_scaled = X_train.copy()
    X_test_scaled = X_test.copy()
    
    X_train_scaled[numerical_cols] = scaler.fit_transform(X_train[numerical_cols])
    X_test_scaled[numerical_cols] = scaler.transform(X_test[numerical_cols])
    
    # Train Random Forest model
    print("🧠 Training Random Forest model...")
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        class_weight='balanced'
    )
    
    model.fit(X_train_scaled, y_train)
    
    # Make predictions
    y_pred = model.predict(X_test_scaled)
    y_pred_proba = model.predict_proba(X_test_scaled)
    
    # Evaluate model
    accuracy = accuracy_score(y_test, y_pred)
    print(f"✅ Model Accuracy: {accuracy:.4f}")
    
    print("\n📊 Classification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save model and preprocessor components
    print("💾 Saving model and preprocessors...")
    joblib.dump(model, 'models/attrition_model.pkl')
    joblib.dump(scaler, 'models/scaler.pkl')
    joblib.dump(le_dept, 'models/label_encoder_dept.pkl')
    joblib.dump(le_role, 'models/label_encoder_role.pkl')
    
    # Save feature importance
    feature_importance = pd.DataFrame({
        'feature': X_processed.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    feature_importance.to_csv('models/feature_importance.csv', index=False)
    
    print("🎉 Model training completed successfully!")
    print(f"📁 Model saved to: models/attrition_model.pkl")
    print(f"📈 Feature importance saved to: models/feature_importance.csv")
    
    return model, scaler, le_dept, le_role

if __name__ == "__main__":
    train_model()

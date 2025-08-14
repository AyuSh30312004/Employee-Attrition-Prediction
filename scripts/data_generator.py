import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

def generate_realistic_employee_data(n_samples=5000):
    """Generate a more realistic and comprehensive employee dataset"""
    
    np.random.seed(42)
    random.seed(42)
    
    # Define realistic distributions
    departments = ['Sales', 'Research & Development', 'Human Resources', 'Marketing', 'Finance', 'IT']
    job_roles = {
        'Sales': ['Sales Executive', 'Sales Representative', 'Sales Manager', 'Account Manager'],
        'Research & Development': ['Research Scientist', 'Laboratory Technician', 'Research Director', 'Data Scientist'],
        'Human Resources': ['HR Specialist', 'HR Manager', 'Recruiter', 'Training Coordinator'],
        'Marketing': ['Marketing Specialist', 'Marketing Manager', 'Digital Marketer', 'Content Creator'],
        'Finance': ['Financial Analyst', 'Accountant', 'Finance Manager', 'Budget Analyst'],
        'IT': ['Software Engineer', 'System Administrator', 'IT Support', 'DevOps Engineer']
    }
    
    education_fields = ['Life Sciences', 'Medical', 'Marketing', 'Technical Degree', 'Human Resources', 'Other']
    marital_status = ['Single', 'Married', 'Divorced']
    
    data = []
    
    for i in range(n_samples):
        # Basic demographics
        age = max(22, int(np.random.normal(36, 10)))
        age = min(age, 65)
        
        gender = random.choice(['Male', 'Female'])
        marital = random.choice(marital_status)
        
        # Department and role
        dept = random.choice(departments)
        role = random.choice(job_roles[dept])
        
        # Experience and tenure
        years_at_company = max(0, int(np.random.exponential(5)))
        years_at_company = min(years_at_company, age - 22)
        
        total_working_years = max(years_at_company, int(np.random.exponential(8)))
        total_working_years = min(total_working_years, age - 22)
        
        years_in_current_role = max(0, min(years_at_company, int(np.random.exponential(3))))
        years_since_last_promotion = max(0, min(years_at_company, int(np.random.exponential(2))))
        years_with_curr_manager = max(0, min(years_at_company, int(np.random.exponential(2))))
        
        # Education
        education = random.choices([1, 2, 3, 4, 5], weights=[5, 15, 30, 35, 15])[0]
        education_field = random.choice(education_fields)
        
        # Location and commute
        distance_from_home = max(1, int(np.random.exponential(10)))
        distance_from_home = min(distance_from_home, 50)
        
        # Compensation
        base_salary_range = {
            1: (25000, 35000), 2: (30000, 45000), 3: (40000, 60000),
            4: (55000, 85000), 5: (75000, 120000)
        }
        
        min_sal, max_sal = base_salary_range[education]
        monthly_income = random.randint(min_sal//12, max_sal//12)
        
        # Adjust salary based on experience and role
        experience_multiplier = 1 + (total_working_years * 0.02)
        if 'Manager' in role or 'Director' in role:
            experience_multiplier *= 1.3
        
        monthly_income = int(monthly_income * experience_multiplier)
        
        hourly_rate = monthly_income / 160  # Assuming 160 hours per month
        daily_rate = hourly_rate * 8
        
        # Performance and satisfaction metrics
        job_satisfaction = random.choices([1, 2, 3, 4], weights=[10, 20, 45, 25])[0]
        environment_satisfaction = random.choices([1, 2, 3, 4], weights=[8, 18, 50, 24])[0]
        job_involvement = random.choices([1, 2, 3, 4], weights=[5, 15, 60, 20])[0]
        work_life_balance = random.choices([1, 2, 3, 4], weights=[5, 20, 55, 20])[0]
        relationship_satisfaction = random.choices([1, 2, 3, 4], weights=[8, 15, 52, 25])[0]
        
        performance_rating = random.choices([1, 2, 3, 4], weights=[5, 15, 65, 15])[0]
        
        # Work patterns
        overtime = random.choices(['Yes', 'No'], weights=[30, 70])[0]
        business_travel = random.choices(['Non-Travel', 'Travel_Rarely', 'Travel_Frequently'], 
                                       weights=[60, 30, 10])[0]
        
        # Training and development
        training_times_last_year = random.choices([0, 1, 2, 3, 4, 5, 6], 
                                                weights=[20, 25, 20, 15, 10, 7, 3])[0]
        
        # Stock options (for some employees)
        stock_option_level = random.choices([0, 1, 2, 3], weights=[60, 25, 10, 5])[0]
        
        # Calculate attrition probability based on multiple factors
        attrition_factors = 0
        
        # Job satisfaction impact (strongest predictor)
        if job_satisfaction &lt;= 2:
            attrition_factors += 0.4
        elif job_satisfaction == 3:
            attrition_factors += 0.1
        
        # Work-life balance impact
        if work_life_balance &lt;= 2:
            attrition_factors += 0.3
        
        # Overtime impact
        if overtime == 'Yes':
            attrition_factors += 0.2
        
        # Distance impact
        if distance_from_home > 20:
            attrition_factors += 0.15
        
        # Income satisfaction (relative to education and experience)
        expected_income = (education * 1000) + (total_working_years * 200)
        if monthly_income &lt; expected_income * 0.8:
            attrition_factors += 0.2
        
        # Career progression
        if years_since_last_promotion > 5:
            attrition_factors += 0.15
        
        # Age factors
        if age &lt; 25:
            attrition_factors += 0.1  # Young employees more likely to switch
        elif age > 50:
            attrition_factors -= 0.1  # Older employees more stable
        
        # Performance impact
        if performance_rating &lt;= 2:
            attrition_factors += 0.1
        
        # Add some randomness
        attrition_factors += random.uniform(-0.1, 0.1)
        
        # Convert to binary outcome
        attrition = 1 if attrition_factors > 0.4 else 0
        
        # Create employee record
        employee = {
            'EmployeeID': f'EMP{i+1:04d}',
            'Age': age,
            'Attrition': attrition,
            'BusinessTravel': business_travel,
            'DailyRate': int(daily_rate),
            'Department': dept,
            'DistanceFromHome': distance_from_home,
            'Education': education,
            'EducationField': education_field,
            'EnvironmentSatisfaction': environment_satisfaction,
            'Gender': gender,
            'HourlyRate': int(hourly_rate),
            'JobInvolvement': job_involvement,
            'JobLevel': min(5, max(1, education + (total_working_years // 5))),
            'JobRole': role,
            'JobSatisfaction': job_satisfaction,
            'MaritalStatus': marital,
            'MonthlyIncome': monthly_income,
            'NumCompaniesWorked': max(1, min(9, int(np.random.poisson(2)))),
            'OverTime': overtime,
            'PercentSalaryHike': random.randint(11, 25),
            'PerformanceRating': performance_rating,
            'RelationshipSatisfaction': relationship_satisfaction,
            'StockOptionLevel': stock_option_level,
            'TotalWorkingYears': total_working_years,
            'TrainingTimesLastYear': training_times_last_year,
            'WorkLifeBalance': work_life_balance,
            'YearsAtCompany': years_at_company,
            'YearsInCurrentRole': years_in_current_role,
            'YearsSinceLastPromotion': years_since_last_promotion,
            'YearsWithCurrManager': years_with_curr_manager
        }
        
        data.append(employee)
    
    return pd.DataFrame(data)

def save_dataset(df, filename='data/comprehensive_employee_data.csv'):
    """Save the generated dataset"""
    import os
    os.makedirs('data', exist_ok=True)
    df.to_csv(filename, index=False)
    print(f"✅ Dataset saved to {filename}")
    print(f"📊 Dataset shape: {df.shape}")
    print(f"📈 Attrition rate: {df['Attrition'].mean():.2%}")

if __name__ == "__main__":
    print("🎯 Generating comprehensive employee dataset...")
    
    # Generate dataset
    df = generate_realistic_employee_data(5000)
    
    # Save dataset
    save_dataset(df)
    
    # Display summary statistics
    print("\n📊 Dataset Summary:")
    print(f"Total employees: {len(df)}")
    print(f"Attrition rate: {df['Attrition'].mean():.2%}")
    print(f"Average age: {df['Age'].mean():.1f}")
    print(f"Average monthly income: ${df['MonthlyIncome'].mean():,.0f}")
    print(f"Departments: {df['Department'].nunique()}")
    print(f"Job roles: {df['JobRole'].nunique()}")
    
    print("\n🎉 Dataset generation completed!")

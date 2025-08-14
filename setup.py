from setuptools import setup, find_packages

setup(
    name="employee-attrition-predictor",
    version="1.0.0",
    author="Your Name",
    author_email="your.email@example.com",
    description="An advanced Employee Attrition Prediction system using Machine Learning",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/employee-attrition-predictor",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
    python_requires=">=3.8",
    install_requires=[
        "streamlit>=1.28.1",
        "pandas>=2.0.3",
        "numpy>=1.24.3",
        "scikit-learn>=1.3.0",
        "plotly>=5.15.0",
        "joblib>=1.3.2",
        "seaborn>=0.12.2",
        "matplotlib>=3.7.2",
    ],
)

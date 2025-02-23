const lectures = [
    "1.Python Basics: Variables, Data Types, Operators, Basic I/O",
    "2.Control Structures: Conditional Statements, Loops",
    "3.Functions and Modules: Defining Functions, Scope, Recursion",
    "4.Data Structures: Lists, Tuples, Sets, Dictionaries",
    "5.File Handling: Reading/Writing files, Handling Exceptions",
    "6.Numpy Basics: Arrays, Indexing, Array Operations",
    "7.Pandas Basics: Series, DataFrames, Data Manipulation",
    "8.Data Visualization with Matplotlib: Basic Plotting, Customizing Plots",
    "9.Data Visualization with Seaborn: Advanced plots like Heatmaps, Pairplots",
    "10.Data Cleaning in Pandas: Handling Missing Data, Duplicates, Outliers",
    "11.Data Aggregation and Grouping in Pandas: groupby, pivot_table",
    "12.Introduction to Machine Learning: Supervised vs Unsupervised Learning",
    "13.Linear Regression: Simple and Multiple Linear Regression",
    "14.Classification with Logistic Regression: Model Implementation, ROC Curve",
    "15.Decision Trees: Theory, Implementation, Pros/Cons",
    "16.Random Forest and Ensemble Methods: Introduction, Implementation",
    "17.Support Vector Machines: Theory, Implementation",
    "18.K-Nearest Neighbors: Theory, Implementation",
    "19.Clustering with K-Means: Introduction, Implementation",
    "20.Dimensionality Reduction with PCA: Introduction, Implementation",
    "21.Time Series Analysis: Basic Concepts, Decomposition, Forecasting",
    "22.Introduction to Deep Learning: Neural Networks, Keras/TensorFlow Basics",
    "23.Convolutional Neural Networks: Theory, Implementation",
    "24.Recurrent Neural Networks: LSTM, Implementation",
    "25.Unsupervised Learning: Anomaly Detection, Clustering Techniques",
    "26.Model Evaluation: Cross-Validation, Hyperparameter Tuning",
    "27.Deploying Machine Learning Models: Flask, Streamlit",
    "28.Advanced Topics: Reinforcement Learning, GANs, Autoencoders",
    "29.Final Project: Capstone Project, Presentation Preparation",
    "30.Portfolio Development: Organizing Projects, Github, LinkedIn"
];

function loadLectures() {
    const lectureColumn = document.getElementById('lecture-column');
    const contentSection = document.querySelector('.content-section');
    lectures.forEach((lecture, index) => {
        // Create lecture box
        const lectureBox = document.createElement('div');
        lectureBox.classList.add('lecture-box');
        lectureBox.innerHTML = `
            <h2>Lecture ${index + 1}</h2>
            <p>${lecture}</p>
            <div class="status">${index === 0 ? 'Current' : ''}</div>
            <button class="view-course-btn" data-lecture="${index}">View Course</button>
        `;
        lectureColumn.appendChild(lectureBox);

        // Create hidden content
        const hiddenContent = document.createElement('div');
        hiddenContent.classList.add('hidden-content');
        hiddenContent.id = `lecture-details-${index}`;
        hiddenContent.innerHTML = `
            <p>Details for Lecture ${index + 1}</p>
            <ul>
                <li>Lecture Overview</li>
                <li>Key Concepts</li>
                <li>Exercises</li>
                <li>Additional Resources</li>
            </ul>
            <a class="next-lecture-btn" href="#lecture-${index + 2}">View Next Lecture</a>
        `;
        contentSection.appendChild(hiddenContent);
    });

    document.querySelectorAll('.view-course-btn').forEach(button => {
        button.addEventListener('click', function() {
            const lectureIndex = this.getAttribute('data-lecture');
            const content = document.getElementById(`lecture-details-${lectureIndex}`);
            content.style.display = content.style.display === 'none' || content.style.display === '' ? 'block' : 'none';
            window.scrollTo({ top: content.offsetTop, behavior: 'smooth' });
        });
    });
}

// Initialize Lectures
loadLectures();
import React, { useState } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import { saveAs } from 'file-saver';


const Dashboard = () => {
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "What do you think is the biggest factor contributing to the recent fluctuations in the Indian stock market?",
            options: [
                { value: 1, label: "Global economic trends and geopolitics" },
                { value: 2, label: "Domestic policy uncertainty" },
                { value: 3, label: "Corporate earnings and performance" },
                { value: 4, label: "Investor sentiment and behavior" }
            ],
            selectedOption: null
        },
        {
            id: 2,
            question: "How do you perceive the impact of the Goods and Services Tax (GST) implementation on the overall Indian economy?",
            options: [
                { value: 1, label: "Negative impact" },
                { value: 2, label: "Neutral impact" },
                { value: 3, label: "Positive impact" },
                { value: 4, label: "Unsure/no opinion" }
            ],
            selectedOption: null
        },
        {
            id: 3,
            question: "In your view, what measures could the government take to stimulate economic growth and recovery post-pandemic?",
            options: [
                { value: 1, label: "Fiscal stimulus packages" },
                { value: 2, label: "Infrastructure spending" },
                { value: 3, label: "Tax reforms and incentives for businesses" },
                { value: 4, label: "Support for small and medium enterprises (SMEs)" }
            ],
            selectedOption: null
        },
        {
            id: 4,
            question: "What role do you believe foreign direct investment (FDI) plays in shaping the Indian economy?",
            options: [
                { value: 1, label: "Essential for growth and development" },
                { value: 2, label: "Can pose challenges to domestic industries" },
                { value: 3, label: "Helps in technology transfer and innovation" },
                { value: 4, label: "Depends on the sectors and regulations" }
            ],
            selectedOption: null
        },
        {
            id: 5,
            question: "How confident are you in the ability of Indian startups to contribute significantly to the economy in the coming years?",
            options: [
                { value: 1, label: "Not confident at all" },
                { value: 2, label: "Somewhat not confident" },
                { value: 3, label: "Somewhat confident" },
                { value: 4, label: "Very confident" }
            ],
            selectedOption: null
        },
        {
            id: 6,
            question: "What is your opinion on the recent economic policies implemented by the government?",
            options: [
                { value: 1, label: "Very effective" },
                { value: 2, label: "Somewhat effective" },
                { value: 3, label: "Neutral" },
                { value: 4, label: "Ineffective" }
            ],
            selectedOption: null
        },
        {
            id: 7,
            question: "Do you believe that political stability is crucial for economic growth in India?",
            options: [
                { value: 1, label: "Strongly agree" },
                { value: 2, label: "Agree" },
                { value: 3, label: "Disagree" },
                { value: 4, label: "Strongly disagree" }
            ],
            selectedOption: null
        },
        {
            id: 8,
            question: "Which sector do you think requires immediate government intervention for growth?",
            options: [
                { value: 1, label: "Agriculture" },
                { value: 2, label: "Manufacturing" },
                { value: 3, label: "Services" },
                { value: 4, label: "Infrastructure" }
            ],
            selectedOption: null
        },
        {
            id: 9,
            question: "How would you rate the current government's handling of unemployment issues?",
            options: [
                { value: 1, label: "Excellent" },
                { value: 2, label: "Good" },
                { value: 3, label: "Fair" },
                { value: 4, label: "Poor" }
            ],
            selectedOption: null
        },
        {
            id: 10,
            question: "Do you believe that foreign investment is beneficial for the Indian economy?",
            options: [
                { value: 1, label: "Strongly believe" },
                { value: 2, label: "Believe" },
                { value: 3, label: "Neutral" },
                { value: 4, label: "Don't believe" }
            ],
            selectedOption: null
        },
    ]);
    

    const [selectedQuestionsCount, setSelectedQuestionsCount] = useState(1);
    const [questionsDisplayed, setQuestionsDisplayed] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [submittedAnswers, setSubmittedAnswers] = useState([]);
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: [],
        }
    });
    const [chartSeries, setChartSeries] = useState([{ data: [] }]);

    const handleOptionSelect = (questionId, optionIndex) => {
        const updatedQuestions = questions.map(question => {
            if (question.id === questionId) {
                return { ...question, selectedOption: optionIndex };
            }
            return question;
        });
        setQuestions(updatedQuestions);
    };

    const handleSelectChange = (e) => {
        setSelectedQuestionsCount(parseInt(e.target.value));
        setQuestionsDisplayed(false); // Reset flag when changing selection
        setCurrentQuestionIndex(0); // Reset current question index
        setSubmittedAnswers([]); // Clear submitted answers
    };

    const handleDisplayQuestions = () => {
        setQuestionsDisplayed(true); // Set flag to true when displaying questions
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleSubmit = async () => {
        const answers = questions.map(question => ({
            question: question.question,
            selectedOption: question.selectedOption !== null ? question.options[question.selectedOption].label : "No answer",
            value: question.selectedOption !== null ? question.options[question.selectedOption].value : null
        }));
        setSubmittedAnswers(answers);
    
        // Update chart data
        const categories = answers.map(answer => answer.question);
        const data = answers.map(answer => answer.value);
        setChartOptions({ ...chartOptions, xaxis: { categories } });
        setChartSeries([{ data }]);
    
        // Prepare user response data
        const { question, selectedOption } = questions[currentQuestionIndex];
        const userResponseData = {
            question,
            chosenOption: selectedOption !== null ? selectedOption.label : "No answer"
        };
    
        try {
            // Make HTTP POST request to save user response
            await axios.post('http://localhost:5000/userResp', userResponseData);
            console.log('User response saved successfully');
        } catch (error) {
            console.error('Error saving user response:', error);
        }
    };
    
    
    const handleDownload = () => {
        // Convert submittedAnswers to CSV format
        const csvContent = submittedAnswers.map(answer => `${answer.question},${answer.selectedOption}`).join('\n');
        
        // Create a Blob object containing the CSV data
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        
        // Trigger download
        saveAs(blob, 'user_responses.csv');
    };

    return (
        <div>
            <section className="py-5 bg-home">
              <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="">
                            <h2 className="secondary-heading">Welcome !</h2>
                            <p className="text-dark fs-4">Pease Complete the survey poll to see the Results</p>
                        </div>
                    </div>
                </div>
              </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <h2 className="secondary-heading">Complete the Survey to see the Results</h2>
                            <select className="form-control" value={selectedQuestionsCount} onChange={handleSelectChange}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(count => (
                                    <option key={count} value={count}>{count} Questions</option>
                                ))}
                            </select>
                            <button className="btn btn-outline-primary my-3 rounded-pill px-5 py-2" type="submit" onClick={handleDisplayQuestions}>Submit</button>
                            {questionsDisplayed && (
                                <div>
                                    <h5 className="my-3" style={{lineHeight:'30px'}}>{questions[currentQuestionIndex].question}</h5>
                                    <ul>
                                        {questions[currentQuestionIndex].options.map((option, index) => (
                                            <li key={index} style={{listStyleType:'none'}} className="my-3 py-2 border px-2 rounded-5">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`question_${questions[currentQuestionIndex].id}`}
                                                        checked={questions[currentQuestionIndex].selectedOption === index}
                                                        onChange={() => handleOptionSelect(questions[currentQuestionIndex].id, index)}
                                                    />
                                                    {option.label}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="btn btn-danger px-4 py-2 rounded-pill " disabled={currentQuestionIndex === 0} onClick={handlePreviousQuestion}>Previous</button>
                                    <button className="btn btn-primary px-4 py-2 mx-3 rounded-pill" disabled={currentQuestionIndex === selectedQuestionsCount - 1} onClick={handleNextQuestion}>Next</button>
                                    {currentQuestionIndex === selectedQuestionsCount - 1 && (
                                        <button className="btn btn-success px-5 py-2 mx-2 rounded-pill" onClick={handleSubmit}>Submit</button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-6">
                            {submittedAnswers.length > 0 && (
                                <div>
                                    <Chart
                                        options={{
                                            ...chartOptions,
                                            tooltip: {
                                                enabled: true,
                                                y: {
                                                    formatter: function (value) {
                                                        // Retrieve the question based on the hovered category
                                                        const question = questions.find(question => question.question === value);
                                                        // If the question is found, return the selected option label
                                                        if (question) {
                                                            const selectedOptionIndex = question.selectedOption;
                                                            const selectedOption = question.options.find((option, index) => index === selectedOptionIndex);
                                                            return `Selected Option: ${selectedOption.label}`;
                                                        }
                                                        return value; // Return the default tooltip content
                                                    }
                                                }
                                            }
                                        }}
                                        series={chartSeries}
                                        type="bar"
                                        height={350}
                                    />

                                    <div>

                                    </div>
                                </div>
                            )}
                        </div>
                       {/* Add a button for downloading */}
                       {submittedAnswers.length > 0 && (
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-5">
                                <h3>User Responses</h3>
                                <table className="table border">
                                    <thead>
                                        <tr>
                                            <th>Question</th>
                                            <th>Selected Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {submittedAnswers.map((answer, index) => (
                                            <tr key={index}>
                                                <td>{answer.question}</td>
                                                <td>{answer.selectedOption}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button className="btn btn-primary px-5 py-2 rounded-pill mt-2" onClick={handleDownload}>Download Responses</button>
                                <a href="/dashboard" className="btn btn-info  px-5 py-2 rounded-pill mt-2 mx-2" >Retake Survey</a>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
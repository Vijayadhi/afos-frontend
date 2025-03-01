import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AssistantComponent() {
    const location = useLocation();
    const seatNumber = sessionStorage.getItem('seat_number');

    const [formData, setFormData] = useState({
        seat_number: seatNumber || '',
        service_subject: '',
        service_message: ''
    });

    const [latestRequest, setLatestRequest] = useState(null); // State for latest request

    // Dynamically load CSS if route matches
    useEffect(() => {
        if (location.pathname.includes('call_for_support')) {
            import('../assets/assistant.css')
                .then(() => console.log('assistant.css loaded'))
                .catch(err => console.error('Failed to load assistant.css:', err));
        }
    }, [location]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.service_subject || !formData.service_message) {
            toast.warn('Please fill in all required fields.');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/service-request/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to send data');
            }

            toast.success('Message sent successfully!');
            setFormData({ 
                seat_number: seatNumber || '', 
                service_subject: '', 
                service_message: '' 
            }); // Clear the form except seat number

        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to send the message. Please try again later.');
        }
    };

    return (
        <>
            <section id="contact-form">
                <h2>Assistance Form</h2>
                <form id="contact" name="contact" acceptCharset="utf-8" onSubmit={handleSubmit}>
                    <label>
                        <span>Seat Number *</span>
                        <input 
                            name="seat_number" 
                            type="text" 
                            value={formData.seat_number} 
                            disabled 
                        />
                    </label>
                    <label>
                        <span>Subject *</span>
                        <input 
                            name="service_subject" 
                            type="text" 
                            placeholder="Subject" 
                            value={formData.service_subject} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>
                        <span>Message *</span>
                        <textarea 
                            name="service_message" 
                            placeholder="Message" 
                            value={formData.service_message} 
                            onChange={handleChange} 
                        />
                    </label>
                    <input 
                        name="submit" 
                        type="submit" 
                        value="Send" 
                        className='submit'
                    />
                </form>

                <div className="text-center mb-3">
                    <a href="/" className="btn btn-outline-primary mt-3">
                        <i className="fa fa-chevron-left"></i> Back to home
                    </a>
                </div>
            </section>

            {/* Toast Container */}
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default AssistantComponent;

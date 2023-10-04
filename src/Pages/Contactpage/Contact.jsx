import React, { useState, useRef } from "react";
import PageHeader from "../../GlobalUI/PageHeader";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [message, setMessage] = useState("");
  const [sendStatus, setSendStatus] = useState("error");
  const formRef = useRef(null);

  const recaptchaRef = useRef(); // Create a ref for reCAPTCHA

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verify reCAPTCHA
    const recaptchaValue = recaptchaRef.current.getValue();

    if (!recaptchaValue) {
      setMessage("Please complete the reCAPTCHA.");
      setSendStatus("error");
      return;
    }

    emailjs
      .sendForm(
        "service_sysw1cy",
        "template_xshaulk",
        formRef.current, // Use the ref here
        "l0xOYpKvedCBx2t6c"
      )
      .then(
        (result) => {
          // console.log(result.text);
          setMessage("Your Message has been successfully sent!");
          setSendStatus("succes");
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          setMessage("Oops, there is a problem, try again later!");
          setSendStatus("error");
        }
      );
  };

  return (
    <div className="w-[80vw] max-w-[480px] mx-auto flex flex-col items-center">
      <PageHeader css="specialFont">Contact Me</PageHeader>
      <p className="text-lg text-center my-10">
        For business partnerships or collaborations or just to say hello, please
        send me a message here.
      </p>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-[#F4E0B9] w-screen flex flex-col items-center mt-4 py-10"
      >
        <div className="">
          <p className="my-2">Your Name :</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 rounded-md w-[80vw] sm:w-[400px]"
            required
          />
        </div>
        <div className="my-4">
          <p className="mb-2">Your Email :</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 rounded-md w-[80vw] sm:w-[400px]"
            required
          />
        </div>
        <div className="my-4">
          <p className="mb-2">Subject :</p>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="p-2 rounded-md w-[80vw] sm:w-[400px]"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="my-4">
          <p className="mb-2">Message :</p>
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="p-2 rounded-md w-[80vw] sm:w-[400px] min-h-[150px]"
            required
          ></textarea>
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LeMb3YoAAAAAL0EULE9WK5pgHEYV17Dv_DTS5WN" // Replace with your reCAPTCHA Site Key
            />
          </div>
          {message && (
            <p
              className={
                sendStatus === "error"
                  ? "text-center text-red-500"
                  : "text-center text-green-600"
              }
            >
              {message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}

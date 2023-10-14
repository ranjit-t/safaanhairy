import React, { useState } from "react";

export default function Form() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [language, setLanguage] = useState("");
  const [formMessage, setFormMessage] = useState(null);
  const [formMessageColor, setFormMessageColor] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for MailChimp
    const formData = new FormData();
    formData.append("EMAIL", email);
    formData.append("FNAME", firstName);
    formData.append("MMERGE3", "French"); // Set the language to French

    // Replace this URL with your MailChimp subscribe URL
    const mailchimpSubscribeUrl =
      "https://safaanhairy.us17.list-manage.com/subscribe/post?u=5d8c152b0054cad0f5be4d099&amp;id=442d5f8443&amp;f_id=007f55e0f0";

    // Send the data to MailChimp
    setFormMessage(""); // Clear any previous messages
    try {
      const response = await fetch(mailchimpSubscribeUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors", // This is important for cross-origin requests
      });

      // Handle successful subscription
      setFormMessage("Merci pour votre abonnement!"); // Success message in French
      setFormMessageColor("text-green-600");
      clearForm();
    } catch (error) {
      console.error("Error: ", error);
      setFormMessage("Oops, il y a une erreur. Veuillez réessayer plus tard."); // Error message in French
      setFormMessageColor("text-red-600");
    }
  };

  const clearForm = () => {
    setEmail("");
    setFirstName("");
    setLanguage("");
  };

  return (
    <div id="mc_embed_shell" className="flex flex-col items-center mb-8">
      <link
        href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
        rel="stylesheet"
        type="text/css"
      />
      <style type="text/css">
        {`
          #mc_embed_signup {
            clear: left;
            font: 14px Helvetica, Arial, sans-serif;
          }
        `}
      </style>
      <h2 className="text-3xl font-bold mb-4">Rejoignez notre communauté!</h2>
      <p className="mb-4">
        Abonnez-vous à notre newsletter et ne manquez jamais une mise à jour de
        notre part!
      </p>
      {formMessage && (
        <p className={`mb-4 ${formMessageColor}`}>{formMessage}</p>
      )}
      <div id="mc_embed_signup">
        <form
          onSubmit={handleSubmit}
          action="#"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate w-[90vw] sm:w-[500px]"
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">
                Email : <span className="asterisk">*</span>
              </label>
              <input
                type="email"
                name="EMAIL"
                className="required email"
                id="mce-EMAIL"
                required=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-FNAME">
                Prénom : <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                name="FNAME"
                className="text"
                id="mce-FNAME"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="prénom"
              />
            </div>
            {/* <div className="mc-field-group">
              <label htmlFor="mce-MMERGE3">
                Langue : <span className="asterisk">*</span>
              </label>
              <select
                name="MMERGE3"
                className=""
                id="mce-MMERGE3"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value=""></option>
                <option value="English">English</option>
                <option value="French">French</option>
              </select>
            </div> */}
            <div id="mce-responses" className="clear foot">
              <div
                className="response"
                id="mce-error-response"
                style={{ display: "none" }}
              ></div>
              <div
                className="response"
                id="mce-success-response"
                style={{ display: "none" }}
              ></div>
            </div>
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-5000px" }}
            >
              <input
                type="text"
                name="b_5d8c152b0054cad0f5be4d099_442d5f8443"
                tabIndex="-1"
                value=""
                onChange={() => {}}
              />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                  value="S'abonner"
                  onChange={() => {}}
                />
                <p style={{ margin: "0px auto" }}>
                  <a
                    href="http://eepurl.com/hRdsiD"
                    title="Mailchimp - email marketing made easy and fun"
                  >
                    <span
                      style={{
                        display: "inline-block",
                        backgroundColor: "transparent",
                        borderRadius: "4px",
                      }}
                    >
                      <img
                        className="refferal_badge"
                        src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                        alt="Intuit Mailchimp"
                        style={{
                          width: "220px",
                          height: "40px",
                          display: "flex",
                          padding: "2px 0px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
